FROM node:8.12.0-alpine
WORKDIR /app
COPY dist ./dist
COPY node-app ./node-app
EXPOSE 1443
ENTRYPOINT ["node","/app/node-app/server.js"]