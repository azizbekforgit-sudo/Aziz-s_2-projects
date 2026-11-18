# TALENT TO IMPACT — starter platform

A working foundation for the TALENT TO IMPACT ecosystem, based on Master Specification 2.0.

## Stack
- Next.js App Router + React + TypeScript
- PostgreSQL + Prisma
- Auth.js Credentials authentication
- Tailwind CSS v4, Framer Motion dependency, Lucide icons
- Manrope / Plus Jakarta Sans visual system

## Requirements
- Node.js 20.9+
- Docker Desktop (or PostgreSQL 16)
- npm

## Run locally

```bash
cp .env.example .env
docker compose up -d
npm install
npx prisma generate
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Open http://localhost:3000.

The seed command creates a Super Administrator using `SEED_ADMIN_EMAIL` and `SEED_ADMIN_PASSWORD` from `.env`. Change the example password before running it. The seeded admin account is active. Public registration only creates a pending student account; users cannot self-assign privileged roles.

## Implemented in this starter
- Premium responsive public landing page and core design tokens
- PostgreSQL schema for users, roles, regions, schools, Talent Map structures, hackathons, teams, projects, opportunities, mentorship requests, notifications, XP and audit logs
- Credentials sign-in backed by hashed passwords
- Student registration API with validation and pending approval state
- Protected student dashboard with real database counts
- Projects read/create API; new projects enter moderation queue
- Public projects and approved opportunities listings
- Role-gated admin overview with real database counts
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
