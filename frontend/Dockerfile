FROM node:20-alpine AS builder

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

ARG VITE_AUTH_URL
ARG VITE_GOOGLE_CLIENT_ID
ENV VITE_AUTH_URL=$VITE_AUTH_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID

RUN npm run build

FROM nginx:alpine

RUN addgroup -S nginxgroup && \
    adduser -S -D -H -h /var/cache/nginx -s /sbin/nologin -G nginxgroup nginxuser

COPY --from=builder /app/dist /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN chown -R nginxuser:nginxgroup /usr/share/nginx/html && \
    chown -R nginxuser:nginxgroup /var/cache/nginx && \
    chown -R nginxuser:nginxgroup /var/log/nginx && \
    chown -R nginxuser:nginxgroup /etc/nginx/conf.d && \
    mkdir -p /var/run && \
    touch /var/run/nginx.pid && \
    chown -R nginxuser:nginxgroup /var/run

EXPOSE 8080

USER nginxuser

HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://127.0.0.1:8080/ || exit 1

CMD ["nginx", "-g", "daemon off;"]