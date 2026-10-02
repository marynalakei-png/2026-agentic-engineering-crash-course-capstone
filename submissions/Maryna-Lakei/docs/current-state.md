# Current State

> Persistent handoff file for future agent windows. A quick map, not a
> replacement for source-of-truth artifacts. Always verify with OpenSpec,
> tests, and the repo.

## Last Updated

- **Date and time:** 2026-10-02 17:00:00 (Europe/Kyiv)
- **Current phase:** Phase 4
- **Last completed gate:** none
- **Active change:** none (`add-requirement-generation` archived)
- **Progress:** A non-empty request returns one User Story, acceptance-criteria bullets, and 3 to 5 questions. Automated tests use a fake model. The owner confirmed a live OpenAI call in the browser on 2026-10-02: one User Story, Acceptance Criteria, and 5 Clarifying Questions. Failure copy is still the next slice.
- **Next task:** Do not start `add-result-review` until the owner asks. Do not commit a key.
- **Claims:**
  - Plan approved — evidence: `docs/mvp-capability-plan.md` status line
  - Red run before generation code — evidence: `npm run test:run` failed with `Cannot find module './parse-generation'` and `Cannot find module './generate'`; Chromium success test failed because `user-story` was absent. Existing validation tests stayed green (13).
  - Unit tests green — evidence: `npm run test:run` on 2026-10-02 16:23 Europe/Kyiv, 36 passed
  - Chromium tests green — evidence: `npm run test:e2e` on 2026-10-02 16:23 Europe/Kyiv, 8 passed
  - Lint and build green — evidence: `npm run lint` exit 0 (3 unused-var warnings in tests) and `npm run build` exit 0 on 2026-10-02 16:23 Europe/Kyiv
  - OpenSpec strict validate passed — evidence: `add-requirement-generation` and `--all`
  - Review clean — evidence: `openspec/changes/archive/2026-10-02-add-requirement-generation/review-findings.json` (`clean: true`). Security and spec auditors reported no findings. One state bug was fixed: a new submit clears the previous failure reason.
  - Browser smoke with the fake model — evidence: desktop Chromium at http://127.0.0.1:3000 on 2026-10-02, server started with `REQUIREMENTS_MODEL_MODE=fake` and `LLM_API_KEY` unset. Empty and whitespace showed "Enter a business request." and left Generate enabled. A non-empty request disabled Generate, then showed the fixture story, two criteria, and three questions. The field value remained. No login, no copy control, no Regenerate, no section headings, HTTP 200, and no request to api.openai.com (server log: local POST only).
  - Slice archived — evidence: `openspec/changes/archive/2026-10-02-add-requirement-generation/`
  - Live OpenAI check — evidence: `docs/qa/2026-10-02-add-requirement-generation-live-smoke.md`. Owner report on 2026-10-02: a real business request in the browser returned one User Story, Acceptance Criteria, and 5 Clarifying Questions. The key stayed in local `.env.local`.

## Source Of Truth

1. `docs/requirements.md` — signed off 2026-09-30.
2. `docs/product-brief.md` — product narrative.
3. `docs/adr/` — ADR-0001 stack, ADR-0002 context budget, ADR-0003 OpenAI `gpt-4.1-mini`.
4. `docs/mvp-capability-plan.md` — approved 2026-10-02.
5. `docs/current-state.md` — this handoff.

## OpenSpec Status

Five baseline specs. Active changes: none. Archived: `2026-10-02-add-request-intake`, `2026-10-02-add-requirement-generation`.

## Completed Changes

- `add-request-intake`
- `add-requirement-generation`

## Validation Commands

From `submissions/Maryna-Lakei/`: `npm run lint`, `npm run test:run`, `npm run test:e2e`, `npm run build`, `npx --yes @fission-ai/openspec@latest validate --all --strict`.

## Environment / Deployment

- Target host: Vercel (TC-6). No database, auth, or email (TC-3).
- LLM API key stays in server environment variables only. The owner verified a live call with local `.env.local` on 2026-10-02. Do not commit that file or the key.
- Project directory: `submissions/Maryna-Lakei/` on branch `capstone-project`. Course root files (`README.md`, `RUBRIC.md`, `.github/PULL_REQUEST_TEMPLATE.md`) stay untouched.

## Agent Rules / Gotchas

- Scope and the capability plan are approved. Do not start `add-result-review` until the owner asks.
- Do not renumber FR/NFR/TC/BC ids.
- Do not archive OpenSpec changes before implementation and smoke test.
