# TALENT TO IMPACT — starter platform

A working foundation for the TALENT TO IMPACT ecosystem, based on Master Specification 2.0.

📘 **Full project overview in Russian (what it does, who uses it, how it works): [`PROJECT.md`](PROJECT.md)**

## Stack
- Next.js 15 App Router + React 19 + TypeScript (strict)
- PostgreSQL 16 + Prisma
- Auth.js v5 credentials authentication (JWT sessions)
- Own CSS design system "school notebook" (`src/app/globals.css`, made with the unslop skill), Golos Text + Literata via `next/font`, Lucide icons
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
- Public pages in Uzbek (default) and Russian: home, approved projects, project page, competitions & scholarships
- Student registration with school and grade → coordinator approval (pending and rejected accounts get different messages)
- Sign-in with a limit of 5 failed attempts per 15 minutes, safe redirect back
- Project submission → moderator reads the full project and approves or returns it with a required note → student sees the note
- Moderation page: account requests, projects in review, adding competitions/scholarships, decision log (all decisions transactional)
- Honest "coming soon" pages for Talent Map, Knowledge Bridge and Mentorship

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
See `docs/ARCHITECTURE.md` §6: warm paper, one blue ink accent, a notebook sheet as the only rich moment and a teacher's check stamp for project status. No gradients, glows or uppercase labels.
