# Base image
FROM node:18

# Workdir
WORKDIR /app

# Copy source code
COPY ./app .

# Install dependencies
RUN npm install

# Build React app
RUN npm run build

# Run the app
CMD ["npm", "run", "dev"]
