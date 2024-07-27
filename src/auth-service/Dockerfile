# auth-service/Dockerfile

# Use Node.js LTS version
FROM node:lts

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source
COPY . .

# Build the TypeScript code
RUN npm run build

# Start the service
CMD ["npm", "start"]
