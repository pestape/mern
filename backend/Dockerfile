# --- Base stage ---
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# --- Dev stage ---
FROM base AS dev
RUN npm install
COPY . .
EXPOSE 8000
CMD ["npm", "run", "dev"]

# --- Test stage ---
FROM base AS test
RUN npm ci
COPY . .
CMD ["npm", "test"]

# --- Build stage ---
FROM base AS build
RUN npm ci
COPY . .
RUN npm run build

# --- Production stage ---
FROM node:22-alpine AS prod
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --from=build /app/dist ./dist
EXPOSE 8000
CMD ["node", "dist/index.js"]