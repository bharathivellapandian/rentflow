# Contributing to RentFlow

## Branching

- `main` - stable prototype
- `feature/<name>` - new functionality
- `fix/<name>` - defect fixes

## Commit examples

- `feat: add tenant document upload workflow`
- `feat: add maintenance request status tracking`
- `fix: prevent tenant access to owner pages`
- `docs: update authentication requirements`

## Pull request checklist

- Verify Admin login and permissions.
- Verify Property Owner login and permissions.
- Verify Tenant login and permissions.
- Verify unauthorized pages cannot be opened by direct navigation calls.
- Verify logout clears the active session state.
- Verify responsive layout on desktop and mobile widths.
- Do not commit passwords, API keys, tokens, tenant PII, financial data, or legal evidence.
