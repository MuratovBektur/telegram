FROM node:16

RUN npm install -g nodemon

WORKDIR /src

COPY package.json /src/package.json

RUN npm install

COPY . .

