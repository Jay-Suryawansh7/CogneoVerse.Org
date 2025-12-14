FROM node:20-alpine AS builder

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy workspace config
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./

# Copy backend package setup
COPY apps/backend/package.json ./apps/backend/

# Install dependencies (frozen-lockfile is safer but in dev sometimes tricky if lockfile out of sync)
RUN pnpm install --frozen-lockfile

# Copy source
COPY apps/backend ./apps/backend

# Generate Prisma Client
WORKDIR /app/apps/backend
RUN npx prisma generate

# Build
RUN pnpm build

# --- Runtime Stage ---
FROM node:20-alpine AS runner

WORKDIR /app

# Enable pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

COPY --from=builder /app/package.json .
COPY --from=builder /app/pnpm-lock.yaml .
COPY --from=builder /app/pnpm-workspace.yaml .

# Copy built backend
COPY --from=builder /app/apps/backend/package.json ./apps/backend/
COPY --from=builder /app/apps/backend/dist ./apps/backend/dist
COPY --from=builder /app/apps/backend/prisma ./apps/backend/prisma

# Install prod dependencies
WORKDIR /app/apps/backend
RUN pnpm install --prod

# Expose port
EXPOSE 8000

# Start command
CMD ["npm", "start"]
