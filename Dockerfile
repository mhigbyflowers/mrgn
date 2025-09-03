# Stage 1: Build the React app

# FROM node:latest as build
FROM node:18-alpine AS build

WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Optional rollup binary for certain arm64/musl environments
RUN npm install @rollup/rollup-linux-arm64-musl --save-optional

# Build the React app based on env (currently unused but kept for flexibility)
ARG ENV=dev
RUN npm run build

# Stage 2: Serve the React app
FROM nginx:alpine

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy the build output to the Nginx html directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 8080
EXPOSE 8080

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]

