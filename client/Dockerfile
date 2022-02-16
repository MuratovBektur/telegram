FROM node:14

RUN yarn global add @vue/cli

WORKDIR /src

ENV PATH /src/node_modules/.bin:$PATH

COPY package.json /src/package.json

RUN yarn install

CMD ["yarn", "serve"]