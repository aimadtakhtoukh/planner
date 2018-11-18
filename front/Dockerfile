FROM node:8.12.0-alpine
WORKDIR /app
COPY dist .
COPY node-app .
EXPOSE 1443
ENTRYPOINT ["node","/app/server.js"]