# ----- BASE -----
FROM node:18-alpine AS base

WORKDIR /app

COPY package*.json ./
RUN npm install -f

# ----- BUILD -----
FROM base AS build

COPY . .
RUN npm run build

# ----- PROD -----
FROM node:18-alpine AS production

WORKDIR /app

COPY --from=base /app/node_modules ./node_modules
COPY --from=build /app/dist ./dist
COPY package*.json ./

ENV NODE_ENV=production

CMD ["node", "dist/src/main.js"]
