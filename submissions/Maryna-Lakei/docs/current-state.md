# Current State

> Persistent handoff file for future agent windows. A quick map, not a
> replacement for source-of-truth artifacts. Always verify with OpenSpec,
> tests, and the repo.

## Last Updated

- **Date and time:** 2026-10-02 15:05:00 (Europe/Kyiv)
- **Current phase:** Phase 4
- **Last completed gate:** none
- **Active change:** none
- **Progress:** The capability plan was approved on 2026-10-02. Next.js 16.3.8 is scaffolded. Slice add-request-intake is implemented, tested, reviewed, smoked in the browser, and archived. The page accepts a raw business request, rejects empty or whitespace-only input with an inline message, and disables Generate during a one-second stub. No LLM output yet.
- **Next task:** Start slice `add-requirement-generation` (FR-3, FR-4, FR-5, FR-9, FR-10, FR-11) test-first. Use a fake model in unit tests. Do not add accounts or a database.
- **Claims:**
  - Plan approved — evidence: `docs/mvp-capability-plan.md` status line
  - Intake unit tests green — evidence: `npm run test:run` on 2026-10-02, 13 passed
  - Intake Chromium tests green — evidence: `npm run test:e2e` on 2026-10-02, 5 passed
  - Lint and build green — evidence: `npm run lint` and `npm run build` on 2026-10-02
  - Red run before implementation — evidence: test-engineer report, unit suite failed with `Cannot find module './validation'`; Chromium tests failed because the raw-request field was absent
  - Slice archived — evidence: `openspec/changes/archive/2026-10-02-add-request-intake/`
  - Browser smoke — evidence: desktop page at http://127.0.0.1:3000 on 2026-10-02, empty and whitespace showed "Enter a business request.", `reports` disabled Generate then re-enabled with the text still in the field and no generated sections

## Source Of Truth

1. `docs/requirements.md` — canonical FR/NFR/TC/BC requirements (draft, not signed off).
2. `docs/product-brief.md` — product narrative (draft, not signed off).
3. `docs/adr/ADR-0001-minimal-next-llm-stack.md` — accepted stack.
4. `docs/current-state.md` — this handoff.

Not created yet: `AGENTS.md`, `docs/mvp-capability-plan.md`, `openspec/`, `docs/qa/`.

## OpenSpec Status

OpenSpec is not initialized. Expected after Gate G0.

## Completed Changes

None.

## Validation Commands

Not wired yet. Gate G0 (loop install) is the next engineering step after scope sign-off, and it comes before `npm run lint` / `npm run build`.

## Environment / Deployment

- Target host: Vercel (TC-6). No database, auth, or email (TC-3).
- LLM API key will live in server environment variables only. Do not commit secrets.
- Project directory: `submissions/Maryna-Lakei/` on branch `capstone-project`. Course root files (`README.md`, `RUBRIC.md`, `.github/PULL_REQUEST_TEMPLATE.md`) stay untouched.

## Agent Rules / Gotchas

- Do not scaffold or implement the application until the owner explicitly approves scope.
- Do not renumber FR/NFR/TC/BC ids.
- Do not archive OpenSpec changes before implementation and smoke test.
