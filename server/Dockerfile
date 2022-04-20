FROM node:16-alpine

WORKDIR /src

COPY package.json /src/package.json

RUN yarn install

COPY . .

