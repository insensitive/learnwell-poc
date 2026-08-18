# OpenAI Usage Inventory

## Central defaults
- Backend model defaults are centralized in Verity and projected into `.verity/config.yml`.
- The current default/fallback model is `gpt-5.5`.
- Model resolution order is project override, tenant/organization override, environment override, then default.

## Model slots
- `planner`
- `summarizer`
- `duplicate_triage`
- `coding`
- `hard_coding`
- `pr_review`

## Workflow variables
- `VERITY_CODEX_MODEL` controls general coding workflows.
- `VERITY_CODEX_FRONTIER_MODEL` can override hard-coding/frontier tasks.
- `VERITY_CODEX_REVIEW_MODEL` can override PR review.
- `VERITY_KERNEL_PLANNER_MODEL`, `VERITY_PLANNER_MODEL`, `VERITY_TRIAGE_MODEL`, and `VERITY_DEDUPE_MODEL` can override planning/triage/dedupe slots.

## Privacy boundary
- Workflows compile local context with `scripts/verity_context_kernel.py`.
- Raw source, raw prompts, raw logs, and model outputs remain local to GitHub Actions by default.
- Verity receives redacted `ContextKernelReceipt` metadata only unless a tenant explicitly opts in.
