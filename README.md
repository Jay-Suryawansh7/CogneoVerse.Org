# CogneoVerse.Org

Enterprise-grade, CMS-driven organizational website with a public frontend, powerful admin dashboard, and a robust Node.js + PostgreSQL backend.

## 📁 Project Structure

```
cogneoverse/
├── apps/
│   ├── frontend/        # Next.js 15 public website (App Router)
│   ├── dashboard/       # Next.js 15 admin CMS (App Router)
│   ├── backend/         # Express.js + Prisma REST API
│   └── shared/          # Shared UI components and types
├── infra/               # Infrastructure config
└── scripts/             # Utility scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL (or NeonDB)

### 1. Install Dependencies

**Root:**
```bash
pnpm install
```

### 2. Configure Environment

Ensure you have `.env` files set up in each application directory:
- `apps/backend/.env` (Database URL, Cloudinary, Clerk keys)
- `apps/frontend/.env` (API URL, Public keys)
- `apps/dashboard/.env` (API URL, Clerk keys)

### 3. Database Setup (Prisma)

Navigate to the backend and push the schema:
```bash
cd apps/backend
npx prisma generate
npx prisma db push
```

### 4. Start Development Servers

**Option A: Run everything (if script available)**
```bash
./start_dev.sh
```

**Option B: Run individually**

*Terminal 1 - Backend:*
```bash
cd apps/backend
npm run dev
```

*Terminal 2 - Dashboard:*
```bash
cd apps/dashboard
npm run dev
```

*Terminal 3 - Frontend:*
```bash
cd apps/frontend
npm run dev
```

## 🛠️ Tech Stack

**Backend:**
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database ORM:** Prisma
- **Database:** PostgreSQL
- **Storage:** Cloudinary
- **Auth:** Clerk SDK
- **Validation:** Zod
- **Language:** TypeScript

**Frontend & Dashboard:**
- **Framework:** Next.js 15 (App Router)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **UI Components:** Shadcn/UI (implied), Custom Components
- **Animations:** Framer Motion, GSAP

## 🎯 Features

✅ **Backend Core**
- Robust REST API structure
- Role-based interaction
- Media management with Cloudinary
- Typed schema with Prisma

✅ **Dashboard**
- CMS for Departments and Projects
- Rich text editing
- Content management workflows
- Admin analytics

✅ **Frontend**
- Immersive UI/UX
- Dynamic content rendering
- Responsive design
- Interactive animations

## 🤝 Contributing

Please ensure you follow the TypeScript strict mode guidelines and run linting before pushing changes.
