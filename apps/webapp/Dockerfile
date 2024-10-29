# Build stage
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json from the root and webapp
COPY package*.json ./
COPY apps/webapp/package*.json ./apps/webapp/

# Install dependencies
RUN npm ci

RUN npm install -g nx

# Copy the necessary application code
COPY . .

# Build packages (if necessary)
RUN nx run-many --target=build --all

# Build the React app
RUN npx nx build @app/webapp

# Production stage
FROM nginx:alpine

# Copy assets to v1/assets directory
COPY --from=build /app/apps/webapp/dist/assets /usr/share/nginx/html/v1/assets

# Copy everything else to root
COPY --from=build /app/apps/webapp/dist/ /usr/share/nginx/html/

# Copy custom nginx configuration
COPY apps/webapp/nginx.conf /etc/nginx/nginx.conf

# Expose port 3000
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
