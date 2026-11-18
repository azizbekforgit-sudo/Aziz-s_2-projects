# Как устроен TALENT TO IMPACT

Это карта проекта. Здесь описано, где что лежит, как данные проходят через систему и куда идти, чтобы что-то добавить или починить.

---

## 1. Общая картина

```mermaid
flowchart LR
  U[Браузер ученика / админа] -->|HTTPS| R[Render: веб-сервис<br/>Next.js]
  R -->|Prisma| DB[(Render: PostgreSQL)]
  GH[GitHub<br/>ветка claude/…] -->|пуш| CI[GitHub Actions<br/>проверки]
  GH -->|пуш| R
```

| Часть | Технология | Где живёт |
|---|---|---|
| Сайт и сервер | Next.js 15 (App Router), React 19, TypeScript | `src/app` |
| База данных | PostgreSQL 16 + Prisma ORM | `prisma/schema.prisma` |
| Вход | Auth.js (next-auth v5), логин/пароль, JWT-cookie | `src/auth.ts`, `src/auth.config.ts` |
| Дизайн | Свой CSS с токенами, без фреймворков | `src/app/globals.css` |
| Хостинг | Render (Blueprint) | `render.yaml` |
| Проверки | ESLint, TypeScript, Vitest, Playwright + axe | `tests/`, `.github/workflows/ci.yml` |

---

## 2. Папки «по полочкам»

```
prisma/
  schema.prisma        ← ВСЕ таблицы базы. Изменил здесь → изменилась база при деплое
  seed.ts              ← создаёт регион Навои, супер-админа и 8 компетенций

src/
  auth.config.ts       ← часть настроек входа, безопасная для Edge (без базы!)
  auth.ts              ← полный вход: проверка пароля в базе
  middleware.ts        ← «охранник»: без входа не пускает на /dashboard, /admin, /projects/new

  lib/                 ← ЛОГИКА (без UI). Сюда в первую очередь при новых функциях
    validators.ts      ← правила всех форм (zod) + тексты ошибок
    roles.ts           ← кто админ, кто модератор (единственное место!)
    session.ts         ← requireUser() / requireRole(): проверка доступа по БАЗЕ
    users.ts           ← регистрация ученика
    projects.ts        ← какие статусы проекта видны публично
    admin.ts           ← цифры для админки
    audit.ts           ← запись в журнал действий
    format.ts          ← даты (часовой пояс Ташкента), имена
    prisma.ts          ← подключение к базе (одно на всё приложение)

  components/          ← ПЕРЕИСПОЛЬЗУЕМЫЙ UI
    public-page.tsx    ← шапка + подвал для публичных страниц
    site-header.tsx    ← шапка (знает, вошёл ли человек) + мобильное меню
    app-shell.tsx      ← каркас личного кабинета: боковое меню + PageHeader
    app-nav.tsx        ← пункты меню кабинета (Admin виден только админам)
    auth-layout.tsx    ← двухколоночный макет для входа/регистрации
    form-fields.tsx    ← поля форм с подписями и ошибками, кнопка с загрузкой
    status-badge.tsx   ← PENDING → «Awaiting approval» и цвет
    coming-soon.tsx    ← честная заглушка для модулей, которые ещё не готовы

  app/                 ← СТРАНИЦЫ. Папка = адрес в браузере
    page.tsx           → /
    login/             → /login          (page + форма + server action)
    register/          → /register
    dashboard/         → /dashboard      (кабинет ученика)
    projects/          → /projects       (публичный список)
    projects/new/      → /projects/new   (подать проект)
    opportunities/     → /opportunities
    admin/             → /admin          (очереди модерации + actions.ts)
    talent-map/, community/, mentorship/ → заглушки «Coming soon»
    api/               → JSON-API для внешних клиентов (register, projects, admin/overview)

tests/
  unit/                ← быстрые тесты логики (Vitest)
  e2e/                 ← браузерные тесты всего пути пользователя (Playwright + axe)
```

**Правило слоёв:** страница (`app/`) → вызывает логику (`lib/`) → логика ходит в базу (`prisma`). Компоненты (`components/`) только рисуют.

---

## 3. Главные сценарии

### 3.1 Регистрация и одобрение

```mermaid
sequenceDiagram
  actor S as Ученик
  participant R as /register (форма)
  participant A as registerAction
  participant L as lib/users.ts
  participant DB as База
  actor AD as Админ
  S->>R: заполняет форму
  R->>A: server action
  A->>A: registerSchema (lib/validators)
  A->>L: registerStudent()
  L->>DB: INSERT user (status=PENDING, role=STUDENT)
  A-->>S: «You’re on the list!»
  AD->>DB: /admin → Approve → setUserStatus()
  DB-->>DB: status=ACTIVE + запись в AuditLog
  S->>S: теперь может войти
```

- Публичная регистрация **всегда** создаёт `STUDENT` + `PENDING`. Сделать себя админом через форму невозможно (на это есть тест).
- Пока аккаунт `PENDING`, при входе ученик видит объяснение, а не «неверный пароль».

### 3.2 Вход и защита страниц

```mermaid
flowchart TD
  A[Запрос /dashboard] --> B{middleware:<br/>есть cookie сессии?}
  B -- нет --> L[/login?callbackUrl=…/]
  B -- да --> C[страница вызывает requireUser]
  C --> D{пользователь в базе<br/>и status=ACTIVE?}
  D -- нет --> L2[/login?error=inactive/]
  D -- да --> E{нужна роль?<br/>requireRole}
  E -- нет прав --> F[/dashboard/]
  E -- ок --> G[страница]
```

Почему два уровня. В cookie (JWT) лежит роль на **момент входа**. Если админ заблокирует ученика, cookie об этом не узнает. Поэтому каждая защищённая страница и каждый server action заново читают пользователя из базы через `requireUser()` / `requireRole()`.

### 3.3 Проект: подача → модерация → публикация

```mermaid
stateDiagram-v2
  [*] --> PENDING_REVIEW: ученик подал (/projects/new)
  PENDING_REVIEW --> APPROVED: админ Approve
  PENDING_REVIEW --> REJECTED: админ Reject
  APPROVED --> [*]: виден на /projects
```

Публично видны только статусы из `PUBLIC_PROJECT_STATUSES` (`src/lib/projects.ts`).

---

## 4. Роли

| Роль | Кабинет | Видит /admin | Одобряет аккаунты и проекты |
|---|---|---|---|
| STUDENT | ✅ | — | — |
| MENTOR, TEACHER | ✅ | — | — |
| REGIONAL_COORDINATOR | ✅ | ✅ (только просмотр) | — |
| ADMIN, SUPER_ADMIN | ✅ | ✅ | ✅ |

Списки ролей лежат **только** в `src/lib/roles.ts`. Не копируйте их в страницы.

---

## 5. База данных (кратко)

```mermaid
erDiagram
  User ||--o{ Project : "владеет"
  User }o--o| Region : "из"
  User }o--o| School : "учится"
  Region ||--o{ School : ""
  Region ||--o{ District : ""
  User ||--o{ TeamMember : ""
  Team ||--o{ TeamMember : ""
  Team }o--o| Hackathon : ""
  User ||--o{ TalentAssessment : ""
  TalentAssessment ||--o{ CompetencyScore : ""
  User ||--o{ XpTransaction : ""
  User ||--o{ AuditLog : "действовал"
```

Сейчас используются `User`, `Project`, `Opportunity`, `Region`, `Competency`, `AuditLog`. Остальные таблицы заготовлены под будущие модули (хакатоны, Talent Map, XP).

**Как меняется база.** При каждом запуске на Render выполняется `prisma db push`. Он приводит базу к `schema.prisma`, но **отказывается** делать изменения с потерей данных (удаление колонки и т. п.), и тогда деплой падает. Это защита. Для таких изменений переходите на `prisma migrate` (см. раздел 8).

---

## 6. Дизайн-система

Всё оформление лежит в `src/app/globals.css`, который разбит на 6 разделов: токены → база → раскладка → компоненты → страницы → адаптив.

- **Цвета** задаются только через переменные `--…`. У каждого механизма свой акцент: Talent Map — `purple`, School Hack — `pink`, Knowledge Bridge — `cyan`, Opportunity Relay — `gold`. Акцент включается классом `accent-pink` и т. п. на любом блоке.
- **Шрифты**: Plus Jakarta Sans для заголовков, Manrope для текста (через `next/font`, с кириллицей).
- **Минимальный размер текста** 12px, кнопки не ниже 44px (удобно попадать пальцем).
- **Фокус** с клавиатуры виден всегда (голубая обводка).
- **Инлайн-стили (`style={{…}}`) запрещены** линтером, всё делается классами.
- Статусы из базы никогда не выводятся «сырыми»: только через `<StatusBadge>`.

---

## 7. Защита от повторения ошибок

| Что ловит | Чем | Команда |
|---|---|---|
| Сломанная схема базы (как было с enum) | `prisma validate` + `prisma format --check` | `npm run db:check` |
| Ошибки кода, забытые импорты, инлайн-стили | ESLint (next + typescript) | `npm run lint` |
| Ошибки типов | TypeScript strict | `npm run typecheck` |
| Правила форм и ролей | Vitest | `npm test` |
| Весь путь пользователя в настоящем браузере, доступность (WCAG AA), вёрстка на 375px без горизонтального скролла, ошибки в консоли | Playwright + axe | `npm run test:e2e` |

`npm run check` запускает всё, кроме e2e. **CI в GitHub** (`.github/workflows/ci.yml`) на каждый пуш запускает всё, включая e2e на настоящей базе Postgres. Если CI красный, не мержить.

---

## 8. Как сделать…

**Новую страницу.** Создайте `src/app/<адрес>/page.tsx`. Если она для вошедших, начните с `const user = await requireUser()` и оберните в `<AppShell user={user}>`. Если публичная, оберните в `<PublicPage>`. Пункт меню добавляется в `src/components/app-nav.tsx`.

**Новую форму.** 1) Схема в `lib/validators.ts` с человеческими текстами ошибок. 2) Server action рядом со страницей (`actions.ts`): `requireUser()` → `schema.safeParse` → запись в базу. 3) Клиентская форма через `useActionState` и поля из `components/form-fields.tsx`. 4) Unit-тест на схему и e2e-шаг.

**Новое поле в базе.** Поменяйте `prisma/schema.prisma` → `npx prisma format` → `npm run db:push` локально → пуш. На Render оно применится само.

**Действие админа.** Добавьте функцию в `src/app/admin/actions.ts`. Внутри обязательно `requireRole(MODERATOR_ROLES)` и `audit(...)`. Server action — это публичный HTTP-адрес: спрятанная кнопка не защищает.

---

## 9. Локальный запуск

```bash
cp .env.example .env          # и заполнить пароли
docker compose up -d          # PostgreSQL
npm install
npm run db:push               # создать таблицы
npm run db:seed               # регион + админ
npm run dev                   # http://localhost:3000
```

Перед пушем выполните `npm run check`, а для изменений в UI ещё и `npm run test:e2e`.

---

## 10. Деплой (Render)

- `render.yaml` описывает веб-сервис `talent-to-impact` (Starter) и базу `talent-to-impact-db` (basic-256mb), регион Франкфурт.
- Каждый пуш в ветку из `render.yaml` вызывает автодеплой: `npm ci && npm run build`, затем `npm run start:prod` (`db push` → `seed` → `next start`).
- Секреты (`AUTH_SECRET`, `SEED_ADMIN_PASSWORD`) хранятся в настройках сервиса на Render, в коде их нет.
- Логи и статус смотрите в Render Dashboard → talent-to-impact → Logs / Events.

---

## 11. Что ещё не сделано (честно)

Talent Map (ждёт утверждённой методики), хакатоны SCHOOL HACK 72, Knowledge Bridge, менторство, XP и бейджи, сертификаты, переводы uz/ru, сброс пароля по email, ограничение частоты входов (rate limit), загрузка файлов. Полный список есть в README.
