# Use an official Node.js runtime as a parent image
FROM node:18-alpine

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