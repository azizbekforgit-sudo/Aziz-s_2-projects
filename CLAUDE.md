# CLAUDE.md — working on TALENT TO IMPACT

Read `docs/ARCHITECTURE.md` first (Russian, has diagrams). Short version for agents:

## Stack
Next.js 15 App Router · React 19 · TypeScript strict · Prisma 6 + PostgreSQL 16 · Auth.js v5 (credentials, JWT) · zod 4 · plain CSS design system (`src/app/globals.css`) · Vitest · Playwright + axe. Deployed on Render via `render.yaml`.

## Rules (each one exists because it broke before)
- **Layers:** pages in `src/app` → logic in `src/lib` → Prisma. Components in `src/components` only render.
- **Access control:** protected pages and every server action call `requireUser()` / `requireRole()` from `src/lib/session.ts` (reads the DB). Never trust `session.user.role` from the JWT. Role lists live only in `src/lib/roles.ts`.
- **Edge safety:** `src/middleware.ts` and `src/auth.config.ts` must not import Prisma, bcrypt or `@/auth`.
- **Validation:** all form rules + user-facing messages live in `src/lib/validators.ts`. API routes and server actions share them.
- **Moderation actions** write to the audit log via `audit()`.
- **Styling:** no `style={{}}` (ESLint error). Use tokens/classes from `globals.css`. Min text 12px, min tap target 44px, `:focus-visible` on everything. DB enum values are shown via `<StatusBadge>`, never raw.
- **Dates:** use `formatDate()` (fixed locale + Asia/Tashkent).
- **Prisma schema:** run `npx prisma format`; enums one value per line. `prisma db push` runs on every Render start and refuses data-loss changes — use migrations for those.
- **Don't invent** Talent Map scores, statistics or methodology — the spec requires formal approval.
- **No secrets in code.** They're Render env vars.

## Commands
```bash
npm run dev            # local dev (needs .env + Postgres)
npm run check          # db:check + lint + typecheck + unit tests — run before every commit
npm run test:e2e       # builds, starts on :3100, runs browser tests (needs DB seeded + SEED_ADMIN_PASSWORD)
npm run db:push        # sync schema to local DB
npm run db:seed        # region + super admin + competencies (reads .env)
```
If e2e behaves oddly, make sure no old server is running on port 3100 (`fuser -k 3100/tcp`) — Playwright reuses it locally.

## Definition of done
`npm run check` green, `npm run test:e2e` green, new UI flows covered by an e2e step, new rules covered by a unit test, docs updated if structure changed.
