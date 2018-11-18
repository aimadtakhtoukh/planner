FROM node:8.12.0-alpine
WORKDIR /app
COPY dist .
COPY node-app .
ENTRYPOINT ["node","/app/server.js"]