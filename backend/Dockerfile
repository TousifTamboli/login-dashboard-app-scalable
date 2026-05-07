# ---------- Base ----------
FROM node:20-alpine AS base

WORKDIR /app

RUN apk add --no-cache dumb-init

# ---------- Dependencies ----------
FROM base AS deps

COPY package*.json ./

RUN npm ci --omit=dev

# ---------- Production ----------
FROM base AS production

ENV NODE_ENV=production

# Create non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

COPY --from=deps /app/node_modules ./node_modules

COPY . .

RUN chown -R appuser:appgroup /app

USER appuser

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000 || exit 1

ENTRYPOINT ["dumb-init", "--"]

CMD ["node", "src/server.js"]