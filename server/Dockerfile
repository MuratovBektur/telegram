FROM node:14-alpine

WORKDIR /src

COPY package.json /src/package.json

RUN yarn install

COPY . .

