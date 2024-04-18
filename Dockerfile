FROM node:20.4.0

WORKDIR /app

RUN git clone https://github.com/IDPA-2024/Nr.2_TravelerGuide.git .

RUN npm install

RUN npm run build

ENTRYPOINT [ "npm", "run", "start" ]