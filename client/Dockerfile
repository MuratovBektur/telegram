FROM node:16-alpine

RUN yarn global add @vue/cli

WORKDIR /src

COPY package.json /src/package.json

RUN yarn install

COPY . .