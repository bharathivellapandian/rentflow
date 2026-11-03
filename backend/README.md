# Backend

Node.js/Express REST API.

Suggested request flow:
`route -> auth/RBAC middleware -> validator -> controller -> service -> model/repository -> PostgreSQL`

External integrations such as object storage, payments, email and background jobs should be isolated under `services/` and `jobs/`.
