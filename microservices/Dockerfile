FROM node:18-alpine

WORKDIR /app
COPY package.json ./
COPY tsconfig.json .

RUN npm install
COPY . .

# Expose port 80 for Azure
EXPOSE 80

# Set the PORT environment variable
ENV PORT 80

CMD ["npm", "run", "dev"]
