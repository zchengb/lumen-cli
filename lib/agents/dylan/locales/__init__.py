from __future__ import annotations

import json
from pathlib import Path
from typing import Any

_CACHE: dict[str, dict[str, str]] = {}
_DIR = Path(__file__).resolve().parent



def normalize_locale(language: str) -> str:
    value = str(language or "").strip()
    if value.startswith("zh-Hant") or value in {"zh-TW", "zh-HK", "zh_Hant"}:
        return "zh_Hant"
    if value.startswith("zh") or value in {"zh-Hans", "zh_CN", "zh_Hans"}:
        return "zh_Hans"
    return "en"


def load_locale(language: str) -> dict[str, str]:
    key = normalize_locale(language)
    if key in _CACHE:
        return _CACHE[key]
    path = _DIR / f"{key}.json"
    fallback = _DIR / "en.json"
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except Exception:
        data = json.loads(fallback.read_text(encoding="utf-8")) if fallback.is_file() else {}
    _CACHE[key] = {str(k): str(v) for k, v in (data or {}).items()}
    return _CACHE[key]


def t(language: str, key: str, **kwargs: Any) -> str:
    table = load_locale(language)
    text = table.get(key) or load_locale("en").get(key) or key
    if kwargs:
        try:
            return text.format(**kwargs)
        except Exception:
            return text
    return text
