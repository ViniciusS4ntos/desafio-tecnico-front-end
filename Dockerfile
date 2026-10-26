# ==========================================
# Estágio 1: Build (Compilação do Angular)
# ==========================================
FROM node:24-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build --configuration=production

# ==========================================
# Estágio 2: Production (Nginx)
# ==========================================
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist/crud-front-end/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]