# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Accept arguments
ARG BUILD_NUMBER
ARG COMMIT_SHA

# Set environment variables
ENV BUILD_NUMBER=${BUILD_NUMBER}
ENV COMMIT_SHA=${COMMIT_SHA}

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json before installing dependencies
COPY package*.json ./

# Install dependencies
RUN npm install --only=production

# Copy the rest of the application files
COPY . .

# Expose the application port
EXPOSE 8080

# Define environment variables (optional, can be overridden at runtime)
ENV PORT=8080

# Command to run the application
CMD ["node", "index.js"]