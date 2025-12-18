# Cogneoverse Dashboard

Admin dashboard for managing Cogneoverse content.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Clerk Authentication
- Lucide Icons

## Setup

1. **Install Dependencies**
```bash
cd apps/dashboard
pnpm install
```

2. **Environment Variables**
Create `.env.local` (already created) with:
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`: Clerk publishable key
- `CLERK_SECRET_KEY`: Clerk secret key
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: `http://localhost:8000/api`)

## Running the Dashboard

```bash
pnpm dev
```

The dashboard will be available at `http://localhost:3000`

## Features

- **Authentication**: Clerk-based authentication
- **Department Management**: Create, edit, and delete departments
- **Project Management**: Manage projects (similar to departments)
- **Media Library**: Upload and manage media files
- **Live Preview**: Preview content before publishing

## Routes

- `/` - Dashboard overview
- `/content/departments` - List all departments
- `/content/departments/new` - Create new department
- `/content/departments/[slug]` - Edit department
- `/content/projects` - List all projects
- `/content/media` - Media library
- `/users` - User management
