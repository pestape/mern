# --- Base stage ---
FROM node:22-alpine AS base
WORKDIR /app
COPY package*.json ./

# --- Dev stage ---
FROM base AS dev
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]

# --- Build stage ---
FROM base AS build
RUN npm ci
COPY . .
ARG VITE_API_BASE_URL
ARG VITE_AUTH0_DOMAIN
ARG VITE_AUTH0_CLIENT_ID
ARG VITE_AUTH0_CALLBACK_URL
ARG VITE_AUTH0_AUDIENCE
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
ENV VITE_AUTH0_DOMAIN=${VITE_AUTH0_DOMAIN}
ENV VITE_AUTH0_CLIENT_ID=${VITE_AUTH0_CLIENT_ID}
ENV VITE_AUTH0_CALLBACK_URL=${VITE_AUTH0_CALLBACK_URL}
ENV VITE_AUTH0_AUDIENCE=${VITE_AUTH0_AUDIENCE}
RUN npm run build

# --- Production stage ---
FROM nginx:alpine AS prod
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
