# WebAura AI Development System

## Mission
Build reliable, premium, conversion-focused digital products for WebAura clients. Optimize for business outcomes, correctness, maintainability, performance, accessibility, and polished UX.

## Core operating rule
For complex requests, do not start coding immediately. First understand the outcome, inspect the existing project, identify dependencies/routes/data flows, make a concise plan, implement the smallest coherent change, verify it, review for regressions, then report what actually changed and what was verified.

Never claim a task is complete merely because code was written.

## Source of truth
- Existing project code and configuration are authoritative.
- Never invent client facts, addresses, prices, services, reviews, statistics, social accounts, or policies.
- If information is missing, mark it unknown or ask for it.
- Preserve working functionality unless the requested change requires otherwise.
- Reuse existing components and design tokens before creating new ones.

## WebAura design principles
- Premium, intentional visual hierarchy.
- Strong typography and spacing.
- Mobile-first responsive behavior.
- Clear calls to action.
- Fast loading and optimized assets.
- Accessible semantic HTML and keyboard navigation.
- Consistent components instead of repeated one-off markup.
- Use real client assets/content when available; do not fabricate authenticity.
- Avoid repetitive sections that communicate the same thing.
- Every section should have a clear purpose.

## Engineering rules
- Prefer simple, maintainable solutions over clever abstractions.
- Do not introduce a dependency when existing capabilities are sufficient.
- Keep secrets out of source control.
- Never hard-code credentials, API keys, tokens, or private service-role keys.
- Validate external/user-controlled data.
- Treat database permissions and authentication as security boundaries.
- Preserve type safety where the project uses TypeScript.
- Keep changes scoped to the task.
- Do not rewrite unrelated files just to make the diff look cleaner.

## Before modifying anything
Inspect package/config files, routing, relevant components, styles/design tokens, data/API/database access, environment-variable usage, tests, and build scripts. For bugs, reproduce or identify the failure path before patching when practical.

## Verification
After implementation, run the strongest available checks: build, typecheck, lint, tests, route validation, and relevant integration checks. For UI work also inspect mobile/desktop layouts, overflow, broken images/links, empty/error states, and runtime errors. If a check cannot be run, say so explicitly.

## Completion standard
A task is complete only when the requested behavior exists, the implementation fits the architecture, obvious regressions were checked, relevant checks pass or their limitation is documented, and the final response distinguishes verified facts from assumptions.

## Git discipline
- Use a feature/fix branch for non-trivial changes.
- Keep commits focused.
- Do not force-push or rewrite history unless explicitly requested.
- Do not merge simply because the project compiles.
- Review the diff before considering work finished.
