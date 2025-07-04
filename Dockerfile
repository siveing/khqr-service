FROM node:18

WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies, including devDependencies
RUN npm install

# Copy source files
COPY . .

# Expose port
EXPOSE 6800

# Run with nodemon
CMD ["npm", "start"]