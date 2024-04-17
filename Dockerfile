FROM node:20.4.0 AS builder

WORKDIR /temp

RUN npm config set strict-ssl false
RUN npm config set registry http://registry.npmjs.org/

COPY . .

RUN npm install

RUN npm run build


FROM node:20.4.0 AS server

WORKDIR /

COPY --from=builder /temp ./


CMD [ "npm", "run", "start" ]