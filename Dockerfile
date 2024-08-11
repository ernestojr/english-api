FROM node:20-alpine AS base

FROM base AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM base AS production

WORKDIR /app

COPY package*.json ./

RUN npm install --only=production && npm install core-js

COPY --from=builder /app/dist ./dist

RUN npm install pm2 -g

EXPOSE 8080

CMD ["pm2-runtime", "dist/server.js"]