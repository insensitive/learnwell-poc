# Repo Context

This file helps Verity/Codex understand how to work in this repository.

## What This Project Does
_(Not auto-generated — the deterministic doc sync script never writes here, so this survives
every refresh. The first Codex run in this repo fills this in from the actual codebase before
generating anything else. If it still says this after that run, something upstream skipped
Step 0 of use-case generation.)_

## What Verity detected
- Detected at: 2026-08-18T19:26:24Z
- Repo: insensitive/learnwell-poc
- Default branch: main

## Suggested commands (review before enabling automation)
These are written into `.verity/config.yml` (in a PR) if empty.

### Setup
_(none configured)_

### Tests
_(none configured)_

### Build
_(none configured)_

### Deploy
_(none configured)_

## Notes for humans
- If you change commands here, also update `.verity/config.yml`.
- No secrets should be committed. Use GitHub Secrets.
- Verity-managed runtime files (`.github/workflows`, `.github/codex`, `.verity/bootstrap.json`, and context-kernel scripts) should be updated by bootstrap/runtime rollout PRs, not direct default-branch pushes.
- Keep project-owned `.verity/config.yml` values intact when refreshing runtime templates.
- Full-auto behavior is opt-in and bounded by policy, dispatch ledger, duplicate checks, tests, deploy gates, and rollout state.

## Context Kernel
- `scripts/verity_context_kernel.py` writes RepoMap, SymbolGraph, CodeTape, FailureTape, DiffTape, PatchContract, DeltaTape, and receipt files under `.verity/kernel/`.
- Raw kernel artifacts remain local to GitHub Actions by default; Verity receives only redacted receipt metadata.
- Kernel prompts are intended to improve code focus and reduce retry/failure prompt tokens.

## Auto Documentation Snapshot
<!-- verity:auto-doc:start -->
- Commit: `826c8e428fe8e4d774c7c38dfcefd55d78640f06`
- Commit date: `2026-08-18T19:26:24Z`
- Repository: `insensitive/learnwell-poc`
- Default branch: `main`

### Configured Commands
Setup:
_(none configured)_
Tests:
_(none configured)_
Build:
_(none configured)_
Deploy:
_(none configured)_

### Top-level Directories
- `app`
- `components`
- `docs`
- `lib`
- `public`
- `Screenshots`
- `scripts`

### Workflow Files
- `codex-deploy.yml`
- `codex-dev-cycle.yml`
- `codex-pr-review.yml`
- `codex-test-generation.yml`
- `codex-test-to-issue.yml`
- `codex-usecase-generation.yml`
- `verity-auto-docs.yml`
- `verity-builder-plan.yml`
- `verity-command-router.yml`
- `verity-guardrails.yml`
- `verity-monitor.yml`
- `verity-post-merge-validation.yml`
- `verity-pr-auto-fix.yml`
- `verity-repo-context-builder.yml`

### Enabled Policy Flags
- `- `deploy.enabled`: `False``
- `- `openai_guardrail.enabled`: `True``
- `- `pr_review.enabled`: `True``
<!-- verity:auto-doc:end -->
