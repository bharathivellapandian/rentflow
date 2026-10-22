# Security Notes

This repository contains a browser-only demonstration application. Demo credentials are intentionally visible and must never be treated as production secrets.

## Production requirements

- Store users in a server-side database.
- Never store plaintext passwords; use Argon2id or bcrypt password hashes.
- Use HTTPS only.
- Implement secure HTTP-only session cookies or carefully designed token authentication.
- Enforce RBAC on the backend, not only in the UI.
- Add MFA for administrators and property owners.
- Add login throttling, lockout controls, audit logs, and password reset flows.
- Encrypt sensitive tenant/legal documents at rest and in transit.
- Use object-level authorization so owners/tenants can access only permitted properties and documents.
- Keep payment card data out of the application and use a compliant payment provider.
- Define document retention, deletion, backup, and recovery policies.
