# Build stage
FROM node:18-alpine as build

# Set the working directory
WORKDIR /app

ARG VITE_UNLEASH_API_CLIENT_KEY_PROD

# Copy package.json and package-lock.json from the root and webapp
COPY package*.json ./
COPY apps/webapp/package*.json ./apps/webapp/


# Install dependencies
RUN npm ci

RUN npm install -g nx

# Copy the necessary application code.
COPY . .

# Create .env file
RUN echo "VITE_API_BASE_URL=https://app.rhino.energy/api/app/" > apps/webapp/.env && \
    echo "VITE_WICKET_BASE_URL=https://app.rhino.energy/" >> apps/webapp/.env && \
    echo "VITE_STATIC_ASSET_URL=https://static-assets.rhino.energy/" >> apps/webapp/.env && \
    echo "VITE_UNLEASH_API_URL=https://unleash.rhino.energy/api/frontend" >> apps/webapp/.env && \
    echo "VITE_UNLEASH_API_CLIENT_KEY=${VITE_UNLEASH_API_CLIENT_KEY_PROD}" >> apps/webapp/.env

# Build packages (if necessary)
RUN nx run-many --target=build --all

# Build the React app
RUN npx nx build @app/webapp

# Production stage
FROM nginx:alpine

# Copy the built files to nginx html directory
COPY --from=build /app/apps/webapp/dist/ /usr/share/nginx/html/

# Copy custom nginx configuration
COPY apps/webapp/nginx.conf /etc/nginx/nginx.conf

# Expose port 3000
EXPOSE 3000

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
