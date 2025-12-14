# Cogneoverse.org

Enterprise-grade, CMS-driven organizational website with public frontend, admin dashboard, and Django + PostgreSQL backend.

## 📁 Project Structure

```
cogneoverse/
├── apps/
│   ├── frontend/        # Next.js public website
│   ├── dashboard/       # Next.js admin CMS
│   └── shared/          # Shared types and utilities
├── backend/             # Django REST API
├── infra/               # Infrastructure config
└── scripts/             # Utility scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and pnpm
- Python 3.9+
- PostgreSQL (NeonDB configured)

### 1. Install Dependencies

**Root:**
```bash
pnpm install
```

**Backend:**
```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install django djangorestframework psycopg2-binary django-cors-headers python-dotenv cloudinary requests PyJWT dj-database-url
```

### 2. Run Migrations

```bash
cd backend
source .venv/bin/activate
python manage.py migrate
python manage.py createsuperuser  # Optional
```

### 3. Start Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
source .venv/bin/activate
python manage.py runserver
```

**Terminal 2 - Dashboard:**
```bash
cd apps/dashboard
pnpm dev
```

**Terminal 3 - Frontend:**
```bash
cd apps/frontend
pnpm dev
```

### 4. Access Applications

- **Backend API**: http://localhost:8000/api/
- **Django Admin**: http://localhost:8000/admin/
- **Dashboard**: http://localhost:3000
- **Frontend**: http://localhost:3000 (or 3001 if dashboard is on 3000)

## 🔑 Environment Variables

All environment variables are already configured in `.env` files:

- `backend/.env` - Database, Cloudinary, Django settings
- `apps/dashboard/.env.local` - Clerk auth, API URL
- `apps/frontend/.env.local` - API URL

## 🛠️ Tech Stack

**Backend:**
- Django 4.2 + Django REST Framework
- PostgreSQL (NeonDB)
- Cloudinary (Media storage)
- Clerk JWT Authentication

**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion, GSAP, Anime.js

**Dashboard:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Clerk Authentication

## 📚 Documentation

Detailed documentation for each component:
- [Backend README](./backend/README.md)
- [Dashboard README](./apps/dashboard/README.md)
- [Frontend README](./apps/frontend/README.md)

## 🎯 Features

✅ **Backend Core**
- Department, Project, and Media models
- RESTful API with pagination
- Clerk JWT authentication
- CORS configured for frontend/dashboard

✅ **Dashboard**
- Clerk authentication
- Department CRUD operations
- Project management
- Responsive admin UI

✅ **Frontend**
- Animated homepage with hero section
- Department and project listings
- Dynamic routing
- API integration

## 📝 Next Steps

- [ ] Implement Block Editor Component
- [ ] Add more public pages (Academy, Media, Network)
- [ ] Implement media upload functionality
- [ ] Add comprehensive tests
- [ ] Deploy to production

## 🤝 Contributing

This is an enterprise project. Please follow the coding standards and conventions established in each application.
# CogneoVerse.Org
