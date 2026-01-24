# Tixio Full-Stack Monorepo

Modern full-stack application built as a monorepo using pnpm workspaces.

- **Frontend**: Next.js (App Router), React, TypeScript, Tailwind CSS  
- **Backend**: NestJS, Prisma, PostgreSQL  
- **Deployment**: Railway  

Live links (replace with actual URLs once deployed):

- Frontend: https://frontend-production-97bc.up.railway.app  
- Backend API: https://backend-production-c6b1.up.railway.app  
- Swagger API Documentation: https://docs.google.com/document/d/1t6TtKHcA9vcWHfxhfV9RqsWB5BODwUv3Doo2GaLBtfA/edit?usp=sharing

## Tech Stack

### Frontend
- Next.js 16 (App Router)  
- React 19+  
- TypeScript  
- Tailwind CSS  
- Radix UI (components)  
- React Hook Form + Zod (forms & validation)  
- TanStack Query (data fetching & caching)

### Backend
- NestJS 10+  
- Prisma ORM 7 (PostgreSQL)  
- bcrypt (password hashing)  
- class-validator + class-transformer (DTO validation)  
- Swagger / OpenAPI (@nestjs/swagger)

### Tooling & DevOps
- pnpm workspaces (monorepo)  
- Railway (deployment platform)  
- ESLint + TypeScript strict mode  
- Prisma migrations

## Monorepo Structure

```
tixio-fullstack/
├── apps/
│   ├── frontend/                # Next.js application
│   └── backend/                 # NestJS API
├── packages/
│   ├── ui/                      # (optional) shared UI components
│   └── config/                  # (optional) shared eslint, tsconfig, etc.
├── prisma/                      # Prisma schema & migrations (shared)
├── .github/                     # CI/CD workflows
├── pnpm-workspace.yaml
├── pnpm-lock.yaml
├── package.json
└── README.md
```

## Prerequisites

- Node.js ≥ 18.17 (preferably 20 LTS or 22)  
- pnpm ≥ 9  
- PostgreSQL 15+ (local or cloud – Railway Postgres, Neon, Supabase, etc.)  
- Git

## Local Development Setup

1. Clone the repository

```bash
git clone https://github.com/rabiulkhan7224/tixio-fullstack-task.git
cd tixio-fullstack
```

2. Install all dependencies (from root)

```bash
pnpm install
```

3. Create `.env` files

Copy example environment files:

```bash
# Backend
cp apps/backend/.env.example apps/backend/.env

# Frontend (if needed)
cp apps/frontend/.env.example apps/frontend/.env.local
```

4. Configure database

Edit `apps/backend/.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/tixio?schema=public"
# or use Railway/Neon/Supabase connection string
```

5. Generate Prisma client & apply schema

```bash
pnpm --filter backend prisma:generate
pnpm --filter backend prisma:migrate:dev
# or if using push in early development:
# pnpm --filter backend prisma:db:push
```

6. Start development servers

In separate terminals:

```bash
# Backend (usually http://localhost:5000 or 3001)
pnpm --filter backend dev

# Frontend (http://localhost:3000)
pnpm --filter frontend dev
```

## Environment Variables

### Backend (`apps/backend/.env`)

```env
# Required
DATABASE_URL=postgresql://...

# Optional / recommended for production
PORT=3000
NODE_ENV=development

# When auth is added
JWT_SECRET=your-very-long-random-secret
JWT_REFRESH_SECRET=another-very-long-random-secret
```

### Frontend (`apps/frontend/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000
# or https://api.tixio.example.com in production
```

> Never commit `.env` or `.env.local` files.

## Available Scripts

Run these from the **monorepo root**:

```bash
pnpm dev                # Run both frontend & backend in dev mode (if configured)
pnpm --filter frontend dev
pnpm --filter backend dev

pnpm build              # Build both apps
pnpm --filter backend build
pnpm --filter frontend build

pnpm lint               # Run ESLint across workspace
pnpm typecheck          # Run tsc --noEmit

# Prisma commands (run from backend filter or root if scripts are set)
pnpm --filter backend prisma:generate
pnpm --filter backend prisma:migrate:dev
pnpm --filter backend prisma:db:push     # schema sync without migration files
pnpm --filter backend prisma:studio      # open Prisma Studio
```

## API Overview – Users Module

Base URL: `/api` (or `/` depending on prefix)

| Method | Endpoint                        | Description                                  | Query Params / Notes                   |
|--------|---------------------------------|----------------------------------------------|----------------------------------------|
| POST   | `/users`                        | Create new user                              | body: CreateUserDto                    |
| GET    | `/users`                        | List users (paginated)                       | ?page=1&limit=10&search=john&role=editor |
| GET    | `/users/:id`                    | Get single user                              | :id = UUID / CUID                      |
| PATCH  | `/users/:id`                    | Update user (partial)                        | body: UpdateUserDto                    |
| PATCH  | `/users/:id/toggle-active`      | Toggle user active status                    | Returns updated user                   |
| DELETE | `/users/:id`                    | Delete user                                  | (optional – may be restricted)         |

**Swagger UI**: `/api` (or `/api/docs` depending on configuration)

## Deployment – Railway

1. Create two services in Railway:
   - **Backend** service (NestJS)
   - **Frontend** service (Next.js static/export or server)

2. Link PostgreSQL plugin (Railway Postgres) or external provider

3. Set environment variables in Railway dashboard

4. Root directory:
   - Backend: `apps/backend`
   - Frontend: `apps/frontend`

5. Build & Start commands (usually auto-detected):
   - Build: `pnpm build --filter backend` / `pnpm build --filter frontend`
   - Start: `pnpm start --filter backend` / `pnpm start --filter frontend`

6. Important: Railway runs `pnpm install --frozen-lockfile` → always commit `pnpm-lock.yaml`

## Best Practices Followed

- pnpm workspaces for monorepo efficiency
- Strict TypeScript configuration
- DTO pattern + class-validator for input validation
- Never expose password hashes in API responses
- Offset-based pagination with metadata
- Global exception filters & validation pipe
- Clean separation: controller → service → prisma
- Environment variable validation (recommended with @nestjs/config + Joi/Zod)
- Swagger documentation for public API visibility

## Future Improvements

- JWT authentication & refresh tokens
- Role-based access control (RBAC) guards
- Soft deletes instead of hard deletes
- Rate limiting & throttling
- Email verification flow
- Comprehensive unit & integration tests (Jest / Vitest)
- End-to-end tests (Playwright / Cypress)
- CI/CD with GitHub Actions
- Docker support for local & alternative deployments
- Monitoring (Sentry, Prometheus, etc.)

