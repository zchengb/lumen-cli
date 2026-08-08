from __future__ import annotations

import json
import re
import urllib.error
import urllib.parse
import urllib.request
from typing import Any, Optional

from feishu.messenger import FeishuMessenger


_SHEET_URL_RE = re.compile(r"/sheets/([A-Za-z0-9_-]+)", re.IGNORECASE)


def parse_spreadsheet_token(value: str) -> str:
    raw = str(value or "").strip()
    if not raw:
        return ""
    match = _SHEET_URL_RE.search(raw)
    if match:
        return match.group(1)
    return raw.split("?", 1)[0].rstrip("/").split("/")[-1] if "/" in raw else raw


def column_letter(index: int) -> str:
    n = int(index) + 1
    letters = ""
    while n > 0:
        n, rem = divmod(n - 1, 26)
        letters = chr(65 + rem) + letters
    return letters or "A"


class FeishuSheets:
    def __init__(self, *, agent_id: str = "mark", messenger: FeishuMessenger | None = None) -> None:
        self.messenger = messenger or FeishuMessenger(agent_id)

    def _request(self, method: str, path: str, payload: Optional[dict[str, Any]] = None) -> dict[str, Any]:
        token = self.messenger.tenant_token()
        url = f"https://open.feishu.cn/open-apis{path}"
        data = None if payload is None else json.dumps(payload).encode("utf-8")
        request = urllib.request.Request(
            url,
            data=data,
            headers={
                "Content-Type": "application/json",
                "Authorization": f"Bearer {token}",
            },
            method=method.upper(),
        )
        try:
            with urllib.request.urlopen(request, timeout=45) as response:
                raw = response.read().decode("utf-8")
                body = json.loads(raw) if raw.strip() else {}
        except urllib.error.HTTPError as exc:
            detail = exc.read().decode("utf-8", errors="replace")
            raise RuntimeError(f"Feishu Sheets HTTP {exc.code}: {detail}") from exc
        if int(body.get("code") or 0) != 0:
            raise RuntimeError(f"Feishu Sheets error: {body.get('msg') or body}")
        return body.get("data") if isinstance(body.get("data"), dict) else body

    def get_meta(self, spreadsheet_token: str) -> dict[str, Any]:
        token = parse_spreadsheet_token(spreadsheet_token)
        data = self._request("GET", f"/sheets/v2/spreadsheets/{token}/metainfo")
        return data if isinstance(data, dict) else {}

    def list_sheets(self, spreadsheet_token: str) -> list[dict[str, Any]]:
        meta = self.get_meta(spreadsheet_token)
        sheets = meta.get("sheets") if isinstance(meta.get("sheets"), list) else []
        return [s for s in sheets if isinstance(s, dict)]

    def resolve_sheet(self, spreadsheet_token: str, sheet_name: str = "Sheet1") -> dict[str, Any]:
        wanted = str(sheet_name or "Sheet1").strip() or "Sheet1"
        sheets = self.list_sheets(spreadsheet_token)
        for sheet in sheets:
            title = str(sheet.get("title") or sheet.get("name") or "").strip()
            if title == wanted:
                return sheet
        if sheets:
            return sheets[0]
        raise RuntimeError(f"No worksheet found in spreadsheet for tab {wanted!r}")

    def add_sheet(self, spreadsheet_token: str, title: str, *, index: int | None = None) -> dict[str, Any]:
        token = parse_spreadsheet_token(spreadsheet_token)
        props: dict[str, Any] = {"title": str(title or "Sheet").strip() or "Sheet"}
        if index is not None:
            props["index"] = int(index)
        data = self._request(
            "POST",
            f"/sheets/v2/spreadsheets/{token}/sheets_batch_update",
            {"requests": [{"addSheet": {"properties": props}}]},
        )
        replies = data.get("replies") if isinstance(data, dict) else []
        if isinstance(replies, list):
            for reply in replies:
                if not isinstance(reply, dict):
                    continue
                added = reply.get("addSheet") if isinstance(reply.get("addSheet"), dict) else {}
                properties = added.get("properties") if isinstance(added.get("properties"), dict) else added
                if isinstance(properties, dict) and (properties.get("sheetId") or properties.get("sheet_id")):
                    return properties
        return data if isinstance(data, dict) else {}

    def ensure_sheet(self, spreadsheet_token: str, sheet_name: str) -> dict[str, Any]:
        wanted = str(sheet_name or "").strip()
        if not wanted:
            raise ValueError("sheet_name required")
        for sheet in self.list_sheets(spreadsheet_token):
            title = str(sheet.get("title") or sheet.get("name") or "").strip()
            if title == wanted:
                return sheet
        created = self.add_sheet(spreadsheet_token, wanted)
        sheet_id = str(created.get("sheetId") or created.get("sheet_id") or "").strip()
        if sheet_id:
            return {"sheetId": sheet_id, "title": wanted, **created}
        for sheet in self.list_sheets(spreadsheet_token):
            title = str(sheet.get("title") or sheet.get("name") or "").strip()
            if title == wanted:
                return sheet
        raise RuntimeError(f"failed to create worksheet {wanted!r}")

    def set_dropdown(
        self,
        spreadsheet_token: str,
        *,
        sheet_id: str,
        range_a1: str,
        options: list[str],
    ) -> dict[str, Any]:
        token = parse_spreadsheet_token(spreadsheet_token)
        sid = str(sheet_id or "").strip()
        values = [str(item).strip() for item in options if str(item).strip()]
        if not sid or not values:
            return {}
        target = range_a1 if "!" in range_a1 else f"{sid}!{range_a1}"
        return self._request(
            "POST",
            f"/sheets/v2/spreadsheets/{token}/dataValidation",
            {
                "range": target,
                "dataValidationType": "list",
                "dataValidation": {
                    "conditionValues": values,
                    "options": {"multipleValues": False, "highlightValidData": True, "colors": ["#34C759", "#FF3B30"][: len(values)]},
                },
            },
        )

    def get_values(self, spreadsheet_token: str, range_a1: str) -> list[list[Any]]:
        token = parse_spreadsheet_token(spreadsheet_token)
        encoded = urllib.parse.quote(range_a1, safe="!:")
        data = self._request("GET", f"/sheets/v2/spreadsheets/{token}/values/{encoded}")
        value_range = data.get("valueRange") if isinstance(data, dict) else {}
        values = value_range.get("values") if isinstance(value_range, dict) else data.get("values")
        return values if isinstance(values, list) else []

    def append_values(
        self,
        spreadsheet_token: str,
        *,
        sheet_id: str,
        values: list[list[Any]],
        start_col: str = "A",
        end_col: str = "J",
    ) -> dict[str, Any]:
        token = parse_spreadsheet_token(spreadsheet_token)
        sid = str(sheet_id or "").strip()
        if not sid:
            raise ValueError("sheet_id required")
        if not values:
            return {}
        width = max(len(row) for row in values)
        end = end_col or column_letter(max(width - 1, 0))
        rows = max(len(values), 1)
        range_a1 = f"{sid}!{start_col}1:{end}{rows}"
        return self._request(
            "POST",
            f"/sheets/v2/spreadsheets/{token}/values_append?insertDataOption=INSERT_ROWS",
            {"valueRange": {"range": range_a1, "values": values}},
        )
