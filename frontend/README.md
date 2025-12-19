# Cogneoverse Frontend

Public-facing website for Cogneoverse.org.

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- GSAP
- Anime.js
- Lucide Icons

## Setup

1. **Install Dependencies**
```bash
cd frontend
pnpm install
```

2. **Environment Variables**
Create `.env.local` (already created) with:
- `NEXT_PUBLIC_API_URL`: Backend API URL (default: `http://localhost:8000/api`)

## Running the Frontend

```bash
pnpm dev
```

The frontend will be available at `http://localhost:3000`

## Features

- **Homepage**: Animated hero section with gradient background
- **Departments**: Browse all departments with filtering
- **Projects**: View active, completed, and planned projects
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Smooth Animations**: Framer Motion for page transitions

## Routes

- `/` - Homepage with hero section
- `/departments` - List all departments
- `/departments/[slug]` - Department detail page
- `/projects` - List all projects
- `/projects/[slug]` - Project detail page
- `/explore` - Explore all content
- `/academy` - Academy section
- `/media` - Media gallery
- `/network` - Network section
