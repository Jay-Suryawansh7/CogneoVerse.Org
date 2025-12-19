# CogneoVerse.Org

Enterprise-grade, CMS-driven organizational website with a public frontend, powerful admin dashboard, and a robust Node.js + PostgreSQL backend.

## 📁 Project Structure

```
cogneoverse/
├── frontend/        # Next.js 15 public website (App Router)
├── dashboard/       # Next.js 15 admin CMS (App Router)
├── backend/         # Express.js + Prisma REST API
├── shared/          # Shared UI components and types
└── render.yaml      # Render deployment config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm
- PostgreSQL (or NeonDB)

### 1. Install Dependencies

Each project has its own dependencies. Install them separately:

```bash
cd backend && npm install
cd frontend && npm install
cd dashboard && npm install
```

### 2. Configure Environment

Ensure you have `.env` files set up in each application directory:
- `backend/.env` (Database URL, Cloudinary, Clerk keys)
- `frontend/.env.local` (API URL, Public keys)
- `dashboard/.env.local` (API URL, Clerk keys)

### 3. Database Setup (Prisma)

Navigate to the backend and push the schema:
```bash
cd backend
npx prisma generate
npx prisma db push
```

### 4. Start Development Servers

Run each in a separate terminal:

*Terminal 1 - Backend:*
```bash
cd backend
npm run dev
```

*Terminal 2 - Frontend:*
```bash
cd frontend
npm run dev
```

*Terminal 3 - Dashboard:*
```bash
cd dashboard
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
