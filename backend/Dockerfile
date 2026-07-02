FROM node:20-slim

# Create a non-root user with a proper home directory (avoids npm EACCES issues)
RUN groupadd -r appgroup && useradd -r -g appgroup -m -d /home/appuser -s /bin/bash appuser

WORKDIR /app

RUN chown -R appuser:appgroup /app
RUN mkdir -p /home/appuser/.npm && chown -R appuser:appgroup /home/appuser
ENV HOME=/home/appuser

USER appuser

COPY --chown=appuser:appgroup package*.json ./
RUN npm ci --omit=dev

COPY --chown=appuser:appgroup . .

EXPOSE 5000

ENV NODE_ENV=production
ENV PORT=5000

HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD node -e "require('http').get('http://localhost:5000/api/health', (r) => {if(r.statusCode !== 200) process.exit(1); process.exit(0);})" || exit 1

CMD ["node", "server.js"]