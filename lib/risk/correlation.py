from __future__ import annotations

import hashlib
import re
from typing import Any, Optional


def normalize_text(value: Any) -> str:
    text = str(value or "").strip().lower()
    text = re.sub(r"\s+", " ", text)
    return text


def module_from_path(file_path: str) -> str:
    parts = [part for part in str(file_path or "").replace("\\", "/").split("/") if part]
    if not parts:
        return "unknown"
    for part in parts:
        lower = part.lower()
        if lower in {"src", "main", "java", "kotlin", "app", "lib", "services"}:
            continue
        return lower
    return parts[0].lower()


def trigger_signature(trigger: Any) -> str:
    raw = normalize_text(trigger)
    if not raw:
        return "none"
    return hashlib.sha256(raw.encode("utf-8")).hexdigest()[:16]


def category_from_finding(finding: dict) -> str:
    root = normalize_text(finding.get("root_cause") or finding.get("category") or "")
    title = normalize_text(finding.get("title") or "")
    blob = f"{root} {title}"
    for key in ("auth", "payment", "security", "race", "null", "sql", "xss", "timeout", "retry"):
        if key in blob:
            return key
    return (root[:40] or "general")


def canonical_fingerprint(finding: dict) -> str:
    repo = normalize_text(finding.get("repository"))
    module = module_from_path(str(finding.get("file") or ""))
    title = normalize_text(finding.get("title"))
    category = category_from_finding(finding)
    trigger = trigger_signature(finding.get("trigger"))
    material = f"{repo}|{module}|{title}|{category}|{trigger}"
    return hashlib.sha256(material.encode("utf-8")).hexdigest()


def evidence_hash(finding: dict) -> str:
    material = "|".join(
        [
            normalize_text(finding.get("file")),
            normalize_text(finding.get("line_range")),
            normalize_text(finding.get("code_snippet")),
            trigger_signature(finding.get("trigger")),
        ]
    )
    return hashlib.sha256(material.encode("utf-8")).hexdigest()[:20]


def similarity_score(left: dict, right: dict) -> float:
    score = 0.0
    if normalize_text(left.get("repository")) == normalize_text(right.get("repository")):
        score += 0.35
    if module_from_path(str(left.get("file") or "")) == module_from_path(str(right.get("file") or "")):
        score += 0.2
    if category_from_finding(left) == category_from_finding(right):
        score += 0.2
    left_title = set(normalize_text(left.get("title")).split())
    right_title = set(normalize_text(right.get("title")).split())
    if left_title and right_title:
        overlap = len(left_title & right_title) / max(len(left_title | right_title), 1)
        score += 0.25 * overlap
    return score


def correlate_finding(
    finding: dict,
    existing_rows: list[Any],
) -> tuple[str, Optional[Any], float]:
    fingerprint = canonical_fingerprint(finding)
    for row in existing_rows:
        if str(row["canonical_fingerprint"]) == fingerprint:
            return "exact_match", row, 1.0
    best = None
    best_score = 0.0
    for row in existing_rows:
        candidate = {
            "repository": row["repository"],
            "file": "",
            "title": row["title"],
            "root_cause": row["category"],
            "trigger": "",
        }
        score = similarity_score(finding, candidate)
        if score > best_score:
            best_score = score
            best = row
    if best is not None and best_score >= 0.85:
        return "probable_match", best, best_score
    if best is not None and best_score >= 0.7:
        return "ambiguous", best, best_score
    return "new_finding", None, 0.0
