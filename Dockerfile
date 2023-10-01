FROM node:alpine

WORKDIR /app

COPY ./src ./src
COPY ./index.html ./index.html
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./tsconfig.json ./tsconfig.json

RUN npm ci
RUN npm run build
RUN npm i -g http-server

CMD [ "http-server", "./dist", "-p 3000" ]
