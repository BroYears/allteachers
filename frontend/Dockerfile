# ── 빌드 스테이지 ──────────────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

# VITE_API_URL은 빌드 시 ARG로 주입 (docker-compose build args 또는 CI 환경변수)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json .
RUN npm ci

COPY . .
RUN npm run build

# ── 런타임 스테이지 (Nginx) ─────────────────────────────────────────────────────
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html

# React Router (BrowserRouter) 사용 → 모든 경로를 index.html로 fallback
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
