FROM node:20-alpine3.17 AS base
WORKDIR /app

RUN corepack enable
COPY . .

FROM base AS builder
WORKDIR /app

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm build

FROM nginx:1.25-alpine3.18 AS runner

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html/

EXPOSE 80
CMD ["nginx","-g", "daemon off;"]
