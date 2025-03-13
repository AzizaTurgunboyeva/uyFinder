# Dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package.json ./

RUN npm install --force

COPY . .

RUN npm run build

CMD ["node", "dist/main.js"]

EXPOSE 4000