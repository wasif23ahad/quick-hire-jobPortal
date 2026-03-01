# Build stage
FROM node:20-alpine AS builder
WORKDIR /app

# Enable corepack for faster installs or just use npm
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=3000

# Copy necessary files from builder
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000

# server.js is created by next build from the standalone output
CMD ["node", "server.js"]
