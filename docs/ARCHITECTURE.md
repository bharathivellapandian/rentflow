# RentFlow Architecture Roadmap

## Current prototype

`Browser -> index.html (HTML/CSS/JavaScript) -> in-memory demo data`

The current application is intentionally self-contained so the UI and role logic can be demonstrated without infrastructure.

## Recommended production architecture

`Web/Mobile Client -> HTTPS -> API Gateway/Backend -> PostgreSQL`

Backend integrations:

- Object storage for tenant and legal documents
- Payment provider for rent collection
- Email/SMS notification provider
- Audit/event logging
- Background jobs for reminders and scheduled notices

## Suggested repository migration

```text
rentflow/
  apps/
    web/             # React/Next.js frontend
    api/             # Node.js/NestJS or Express API
  packages/
    shared/          # shared schemas/types
  database/
    migrations/
    seeds/
  docs/
  tests/
  .github/workflows/
```

## Core backend domains

- Identity and access management
- Property/unit management
- Tenant/lease management
- Payment ledger
- Maintenance/work orders
- Document/evidence management
- Legal document management
- Reporting and audit
