# RentFlow Property Management Prototype

RentFlow is a front-end prototype for managing rental properties, tenants, leases, rent payments, maintenance requests, tenant evidence documents, and legal documents.

## Demo accounts

| Role | Email | Password |
|---|---|---|
| Admin | admin@rentflow.demo | RentFlow123! |
| Property Owner | owner@rentflow.demo | RentFlow123! |
| Tenant | tenant@rentflow.demo | RentFlow123! |

> These credentials are for local prototype testing only. Do not use client-side credentials in production.

## Run locally

No build step is required.

1. Clone the repository.
2. Open `index.html` directly in a browser, or run a local static server.

Using Python:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Modules

- Authentication and role-based access
- Dashboard
- Properties and units
- Tenants and leases
- Payments
- Maintenance
- Tenant evidence documents
- Legal documents
- Reports
- Administration / role permissions

## Prototype authentication

Authentication is implemented in browser-side JavaScript for demonstration. It validates the entered email/password against demo users and applies role-based navigation/authorization rules.

Production authentication should move user records and authorization enforcement to the server, hash passwords with Argon2id or bcrypt, use secure sessions/tokens, add MFA for privileged accounts, implement rate limiting/account lockout, and enforce permissions on every API endpoint.

## Git workflow

```bash
git init
git add .
git commit -m "Initial RentFlow property management prototype"
git branch -M main
git remote add origin <YOUR_GIT_REPOSITORY_URL>
git push -u origin main
```

For subsequent changes:

```bash
git checkout -b feature/<feature-name>
git add .
git commit -m "Add <feature-name>"
git push -u origin feature/<feature-name>
```
