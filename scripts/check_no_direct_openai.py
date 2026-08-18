#!/usr/bin/env python3
import os
import sys
from pathlib import Path

# Patterns to detect
BAD_SUBSTRINGS = [
    "import openai",
    "from openai",
    "api.openai.com",
]

REQUIRED_WORKFLOWS = [
    "codex-dev-cycle.yml",
    "codex-pr-review.yml",
    "codex-test-generation.yml",
    "codex-usecase-generation.yml",
    "codex-test-to-issue.yml",
    "codex-deploy.yml",
    "verity-builder-plan.yml",
    "verity-pr-auto-fix.yml",
    "verity-post-merge-validation.yml",
    "verity-auto-docs.yml",
    "verity-repo-context-builder.yml",
    "verity-guardrails.yml",
    "verity-monitor.yml",
    "verity-command-router.yml",
]

# Unsubstituted template tokens must not ship in customer repos.
#
# The deployed staging callback URL is deliberately NOT listed here. Bootstrap
# substitutes that exact URL into every project created against staging, and the
# runtime's own `isPlaceholderCallbackUrl` counts only `__VERITY_CALLBACK_URL__`
# as a placeholder. Blocking it therefore failed this guardrail on every
# correctly configured staging repo, for a value the product itself had written.
# A repo that was never personalised is still caught, by `__VERITY_PROJECT_ID__`.
PLACEHOLDER_BLOCKLIST = [
    "__VERITY_CALLBACK_URL__",
    "__VERITY_PROJECT_ID__",
    "__BOOTSTRAP_VERSION__",
]

# Allowlist prefixes (repo-relative, forward-slash)
ALLOW_PREFIXES = [
    ".github/",
    ".claude/",
    "docs/openai-usage-inventory.md",
    "scripts/check_no_direct_openai.py",
    "verity_templates/bootstrap/v2/scripts/check_no_direct_openai.py",
    "backend/verity_templates/bootstrap/v2/scripts/check_no_direct_openai.py",
    "backend/services/bootstrapTemplatePacks.ts",
    # Provider locations (customize per repo; safe defaults)
    "backend/src/ai/",
    "backend/src/ai_provider.py",
    "backend/services/ai/",
    "backend/services/utils/aiClient.ts",
]

SKIP_DIR_NAMES = {
    ".aws-sam",
    ".benchmarks",
    ".codex-logs",
    ".git",
    ".incident-evidence",
    ".incident-worktrees",
    ".pytest_cache",
    ".test-dist",
    ".tmp-sam-appdata",
    ".venv",
    ".verify-appdata",
    "node_modules",
    "dist",
    "build",
    "coverage",
    "test-results",
    "verity_kernel",
}

SKIP_DIR_PREFIXES = (
    ".cache",
    ".next",
    ".turbo",
    ".vercel",
    "build",
    "dist",
)

def is_allowed(rel: str) -> bool:
    rel = rel.replace("\\", "/")
    return any(rel == p or rel.startswith(p) for p in ALLOW_PREFIXES)

def should_skip_dir(name: str) -> bool:
    return name in SKIP_DIR_NAMES or any(name.startswith(prefix) for prefix in SKIP_DIR_PREFIXES)

def iter_repo_files(root: Path):
    for dirpath, dirnames, filenames in os.walk(root):
        dirnames[:] = [name for name in dirnames if not should_skip_dir(name)]
        current = Path(dirpath)
        for filename in filenames:
            yield current / filename

def main() -> int:
    root = Path(".").resolve()
    offenders = []
    required_file_errors = []
    placeholder_errors = []

    workflows_dir = root / ".github" / "workflows"
    for workflow in REQUIRED_WORKFLOWS:
        if not (workflows_dir / workflow).exists():
            required_file_errors.append(f".github/workflows/{workflow}")

    bootstrap_path = root / ".verity" / "bootstrap.json"
    bootstrap_text = ""
    if bootstrap_path.exists():
        bootstrap_text = bootstrap_path.read_text(encoding="utf-8", errors="ignore")
    # This repo is the template *source*, not a bootstrapped project: its own
    # `.verity/` files are the ones bootstrap substitutes into customer repos,
    # so their tokens are supposed to still be there. A real bootstrapped repo
    # carries its project's UUID here instead, which is what makes this a
    # reliable discriminator — `__INSTALLED_FILES__` alone missed the
    # owner-rollout layout, so Verity's own repo failed its own guardrail.
    template_source_repo = (
        "__INSTALLED_FILES__" in bootstrap_text or "__VERITY_PROJECT_ID__" in bootstrap_text
    )

    config_path = root / ".verity" / "config.yml"
    if config_path.exists() and not template_source_repo:
        config_text = config_path.read_text(encoding="utf-8", errors="ignore")
        for placeholder in PLACEHOLDER_BLOCKLIST:
            if placeholder in config_text:
                placeholder_errors.append(
                    f"{config_path.relative_to(root)} still contains placeholder {placeholder}"
                )

    for path in iter_repo_files(root):
        if path.is_dir():
            continue
        # skip common binaries/large dirs
        rel = str(path.relative_to(root)).replace("\\", "/")
        if is_allowed(rel):
            continue
        try:
            if path.stat().st_size > 1_000_000:
                continue
        except Exception:
            continue
        # only scan text-like files
        if path.suffix.lower() in [".png",".jpg",".jpeg",".gif",".pdf",".zip",".gz",".tar",".mp4",".mov",".mp3",".wav",".woff",".woff2",".ttf",".eot"]:
            continue
        try:
            text = path.read_text(encoding="utf-8", errors="ignore")
        except Exception:
            continue

        for bad in BAD_SUBSTRINGS:
            if bad in text:
                offenders.append((rel, bad))

    has_errors = bool(offenders or required_file_errors or placeholder_errors)
    if required_file_errors:
        print("Missing required workflow files:", file=sys.stderr)
        for rel in required_file_errors:
            print(f" - {rel}", file=sys.stderr)

    if placeholder_errors:
        print("Bootstrap placeholders still present in .verity/config.yml:", file=sys.stderr)
        for msg in placeholder_errors:
            print(f" - {msg}", file=sys.stderr)
        print(
            "Hint: set verity.project_id and verity.callback_url from your Verity project "
            "(the bootstrap template tokens must be substituted).",
            file=sys.stderr,
        )

    if offenders:
        print("Direct OpenAI usage detected outside allowlist:", file=sys.stderr)
        for rel, bad in offenders:
            print(f" - {rel} (matched: {bad})", file=sys.stderr)
        return 1
    if has_errors:
        return 1
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
