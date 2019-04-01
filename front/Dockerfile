FROM node:8.12.0-alpine
WORKDIR /app
COPY src ./src
COPY node-app ./node-app
COPY env.properties angular.json karma.conf.js package*.json tsconfig.json ./
RUN npm install
RUN npm run build
WORKDIR /app/node-app
RUN npm install
EXPOSE 1443
ENTRYPOINT ["node","/app/node-app/server.js"]
