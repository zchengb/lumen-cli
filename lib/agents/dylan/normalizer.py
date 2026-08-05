from __future__ import annotations

import re
from dataclasses import dataclass
from typing import Optional

_FINDING_ID_RE = re.compile(r"\b(FIND-[a-f0-9]{8,}|ISSUE-[A-Za-z0-9]+)\b", re.I)
_RUN_ID_RE = re.compile(r"\b(scan-[A-Za-z0-9_-]+)\b", re.I)
_SLUG_RE = re.compile(r"\b([a-z][a-z0-9_-]{1,32})\b", re.I)

_TC_TO_SC = str.maketrans(
    {
        "掃": "扫",
        "嗎": "吗",
        "麼": "么",
        "關": "关",
        "係": "系",
        "問": "问",
        "題": "题",
        "風": "风",
        "險": "险",
        "復": "复",
        "發": "发",
        "剛": "刚",
        "纔": "才",
        "這": "这",
        "個": "个",
        "們": "们",
        "與": "与",
        "為": "为",
        "裡": "里",
        "還": "还",
        "沒": "没",
        "見": "见",
        "說": "说",
        "請": "请",
        "對": "对",
        "應": "应",
        "開": "开",
        "終": "终",
        "結": "结",
        "來": "来",
        "過": "过",
        "時": "时",
        "間": "间",
        "長": "长",
        "樣": "样",
        "狀": "状",
        "態": "态",
        "碼": "码",
        "庫": "库",
        "項": "项",
        "妳": "你",
        "誰": "谁",
        "謝": "谢",
        "幫": "帮",
        "處": "处",
        "東": "东",
    }
)

_STATUS_SYNONYMS = (
    ("完成了吗", "完成了吗"),
    ("好了吗", "完成了吗"),
    ("结束了吗", "完成了吗"),
    ("跑完了吗", "完成了吗"),
    ("怎么样了", "完成了吗"),
    ("到哪了", "完成了吗"),
)


@dataclass
class NormalizedMessage:
    original_text: str
    normalized_text: str
    language: str
    project_slug: Optional[str] = None
    finding_id: Optional[str] = None
    run_id: Optional[str] = None


def _detect_language(text: str) -> str:
    if re.search(r"[\u3400-\u9fff]", text):
        if any(ch in text for ch in "嗎麼關問風險復剛這們與為"):
            return "zh-Hant"
        return "zh-Hans"
    return "en"


def _to_simplified(text: str) -> str:
    return text.translate(_TC_TO_SC)


def normalize_message(text: str, known_slugs: Optional[set[str]] = None) -> NormalizedMessage:
    original = str(text or "").strip()
    cleaned = re.sub(r"@_user_\d+", "", original)
    cleaned = re.sub(r"@\S+", "", cleaned)
    cleaned = cleaned.replace("\u3000", " ")
    cleaned = re.sub(
        r"[！？；：，。、“”‘’（）【】]",
        lambda m: {
            "！": "!",
            "？": "?",
            "；": ";",
            "：": ":",
            "，": ",",
            "。": ".",
            "、": ",",
            "“": '"',
            "”": '"',
            "‘": "'",
            "’": "'",
            "（": "(",
            "）": ")",
            "【": "[",
            "】": "]",
        }.get(m.group(0), m.group(0)),
        cleaned,
    )
    cleaned = re.sub(r"\s+", " ", cleaned).strip()
    simplified = _to_simplified(cleaned).lower()
    for src, dst in _STATUS_SYNONYMS:
        if src in simplified:
            simplified = simplified.replace(src, dst)
    finding = _FINDING_ID_RE.search(cleaned)
    run = _RUN_ID_RE.search(cleaned)
    slug = None
    known = {s.lower() for s in (known_slugs or set())}
    for match in _SLUG_RE.finditer(simplified):
        candidate = match.group(1).lower()
        if candidate in {"scan", "status", "cancel", "dylan", "lumen", "high", "days", "risk", "mark", "irving"}:
            continue
        if known and candidate in known:
            slug = candidate
            break
        if not known and candidate not in {"code", "repo"}:
            slug = candidate
            break
    return NormalizedMessage(
        original_text=original,
        normalized_text=simplified,
        language=_detect_language(original),
        project_slug=slug,
        finding_id=finding.group(1) if finding else None,
        run_id=run.group(1) if run else None,
    )
