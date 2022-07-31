FROM node:16.16-alpine
WORKDIR /app
COPY package*.json .
RUN npm install --legacy-peer-deps
COPY . .
RUN node ./node_modules/.bin/prisma generate --schema=./prisma/schema.prisma
EXPOSE 4000
CMD ["npm", "run", "start:dev"]