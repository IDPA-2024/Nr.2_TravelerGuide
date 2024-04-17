FROM node:20.4.0

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]