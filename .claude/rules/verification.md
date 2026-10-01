# Verification Rules

Before declaring work complete:
1. Re-read the requested outcome.
2. Inspect the changed files/diff.
3. Check for duplicate or conflicting implementations.
4. Run available build, typecheck, lint, and tests relevant to the change.
5. For UI changes, verify responsive behavior and important interactions.
6. Check routes and links affected by the change.
7. Check for obvious runtime errors.
8. Check that environment variables and secrets were not exposed.
9. For database/API changes, verify callers and error handling.
10. State exactly what was verified and what could not be verified.

If verification fails, diagnose the failure, fix it when within scope, rerun the relevant check, and do not report success until the result is actually verified.

Never silence errors by deleting tests, weakening checks, hiding console errors, or adding arbitrary ignores.
