# Use stable Node 20
FROM node:20

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json first
COPY package*.json ./

# Install dependencies inside container
RUN npm install

# Copy the rest of the project code
COPY . .

# Expose port 3000
EXPOSE 3000

# Default command to run dev server
CMD ["npm", "run", "dev"]
