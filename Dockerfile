# Dockerfile

# Build stage
FROM node:18-alpine AS builder

WORKDIR /usr/src/app

# Copy only package files first to leverage Docker cache
COPY package*.json ./

# Use npm ci for reproducible installs
RUN npm ci

COPY . .

# Run build process
RUN npm run build

# Production stage
FROM node:18-alpine

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

# Create a non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy production dependencies manifest
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy built application from builder stage
COPY --from=builder /usr/src/app/dist ./dist

# Expose port
EXPOSE 3000

# Run the application
CMD ["node", "dist/index.js"]