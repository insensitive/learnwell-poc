from __future__ import annotations

import hashlib
import re
from pathlib import Path

SECRET_VALUE_RE = re.compile(
    r"(?i)(api[_-]?key|authorization|bearer|client[_-]?secret|password|private[_-]?key|secret|token)\s*[:=]\s*['\"]?[^'\"\s]+"
)


def sha256_text(value: str) -> str:
    return hashlib.sha256(value.encode("utf-8", errors="ignore")).hexdigest()


def estimate_tokens(value: str) -> int:
    return max(1, len(value) // 4) if value else 0


def redact_secrets(value: str) -> str:
    return SECRET_VALUE_RE.sub(lambda m: f"{m.group(1)}=<redacted>", value)


def is_probably_text(path: Path) -> bool:
    if path.suffix.lower() in {
        ".png",
        ".jpg",
        ".jpeg",
        ".gif",
        ".webp",
        ".ico",
        ".pdf",
        ".zip",
        ".gz",
        ".tar",
        ".tgz",
        ".mp4",
        ".mov",
        ".mp3",
        ".wav",
        ".woff",
        ".woff2",
        ".ttf",
        ".eot",
        ".lock",
    }:
        return False
    return True
