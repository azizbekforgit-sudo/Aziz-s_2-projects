# TALENT TO IMPACT — starter platform

A working foundation for the TALENT TO IMPACT ecosystem, based on Master Specification 2.0.

## Stack
- Next.js 15 App Router + React 19 + TypeScript (strict)
- PostgreSQL 16 + Prisma
- Auth.js v5 credentials authentication (JWT sessions)
- Own CSS design system (`src/app/globals.css`), Lucide icons, Manrope / Plus Jakarta Sans via `next/font`
- Vitest (unit), Playwright + axe (end-to-end, accessibility), GitHub Actions CI

📐 **How the project is structured, with diagrams: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)**

## Requirements
- Node.js 20.9+
- Docker Desktop (or PostgreSQL 16)
- npm

## Run locally

```bash
cp .env.example .env      # then set SEED_ADMIN_PASSWORD and AUTH_SECRET
docker compose up -d
npm install
npm run db:push
npm run db:seed
npm run dev
```

Open http://localhost:3000. The seed creates an active Super Administrator from `SEED_ADMIN_EMAIL` / `SEED_ADMIN_PASSWORD`. Public registration only creates a pending student account; an administrator approves it in `/admin`.

## Quality checks
```bash
npm run check       # Prisma schema, ESLint, TypeScript, unit tests
npm run test:e2e    # production build + full user journey in a real browser + accessibility + mobile layout
```
CI runs both on every push (`.github/workflows/ci.yml`).

## Implemented
- Public landing page, projects and opportunities listings
- Student registration with validation → pending approval
- Sign-in with clear errors (wrong password vs. account not yet approved), safe redirect back
- Student dashboard: own projects with review status, verified XP, teams
- Project submission form → moderation queue
- Admin: live counts, approve/reject accounts, approve/reject projects, audit log
- Role-based access checked against the database on every request
- Honest "coming soon" pages for Talent Map, Knowledge Bridge and Mentorship
- Initial Navoi region, administrator and eight competency records

## Explicitly not complete yet
This is a runnable foundation / first implementation slice, **not yet the fully deployed national platform**. The following must not be mistaken for completed functionality:
- Approved Talent Map questionnaire, scoring weights and interpretation methodology
- Full CRUD management for all admin modules and granular regional resource scoping
- Complete SCHOOL HACK 72 registration, team invitations, server-authoritative sprint controls, submissions and jury workflow
- KNOWLEDGE BRIDGE posts, peer sessions, file library, upload scanning and moderation queue
- OPPORTUNITY RELAY full catalogue management, mentor verification and minor-safe communication
- XP rules, anti-abuse ledger workflows, badges, leaderboard snapshots
- Certificate PDF generation, QR verification and revocation
- Notification delivery integrations, search, analytics exports and audit-log viewer
- Uzbek / Russian / English translation catalogue and language routing
- Parent/legal consent workflows, retention and deletion policy review under applicable Uzbekistan law
- Production deployment, object storage, monitoring, backup automation, security review and end-to-end test suite

The specification deliberately leaves some scoring and governance rules to formal approval. The code does not invent them.

## Deployment
Render Blueprint in `render.yaml` (web service + PostgreSQL). Every push to the configured branch deploys automatically; on start the app syncs the schema (`prisma db push`), runs the idempotent seed and starts Next.js.

## Important production checklist
1. Replace `AUTH_SECRET` with a cryptographically random secret.
2. Use managed PostgreSQL with TLS and automated backups.
3. Configure a production domain and HTTPS.
4. Configure secure email verification and password reset delivery.
5. Add object storage (e.g. S3-compatible / Cloudflare R2) with MIME validation, size limits and malware scanning.
6. Review personal-data processing and consent requirements for minors with qualified local counsel.
7. Add rate limiting at the edge and on authentication / registration endpoints.
8. Add scoped RBAC checks to every management operation.
9. Add unit, integration, security and Playwright E2E tests before real student onboarding.
10. Do not expose student contact details or private profiles publicly.

## Design direction
Deep purple (#160B2E), electric purple (#9B5CFF), neon pink (#D66BFF), cyan (#55D6E8), gold (#FFC857); restrained glass surfaces, subtle glow and generous spacing. The layout uses premium SaaS visual language rather than a school portal template.
