FROM node:20.4.0 AS builder

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

CMD [ "npm", "run", "start" ]