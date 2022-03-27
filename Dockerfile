FROM node:16.14.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install

COPY . .

EXPOSE 8080

ENTRYPOINT [ "node", "src/index.js" ]