# Dockerfile
FROM node:20-bullseye

WORKDIR /usr/src/app

# Copy dependencies first
COPY package.json ./
RUN npm install --force

# Copy all source code and configs
COPY . .

# Prisma generate (after prisma/schema.prisma is available)
RUN npx prisma generate

# Now run the build (tsconfig.json is now present)
RUN npm run build

# Expose your port
EXPOSE 4000

# Run the app
CMD ["node", "dist/main.js"]