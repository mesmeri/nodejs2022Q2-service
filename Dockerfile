FROM node:16.16-alpine
WORKDIR /app/src
COPY package*.json .
RUN npm install --legacy-peer-deps
COPY . .
EXPOSE 4000
CMD ["npm", "run", "start:dev"]