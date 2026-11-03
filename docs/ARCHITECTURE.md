# RentFlow Architecture

## Application flow

Admin / Property Owner / Tenant
→ Web or mobile client
→ HTTPS
→ Node.js API
→ Authentication + RBAC middleware
→ Domain services
→ PostgreSQL

Supporting services:
- Object storage for renter evidence, lease and legal documents
- Payment gateway for rent payments
- Email/SMS/in-app notifications
- Background jobs for reminders and recurring work
- Centralized logging/monitoring

## Security boundary
The browser must never be the authoritative source of permissions. Every protected API endpoint validates the authenticated identity, role, and resource ownership before reading or mutating data.
