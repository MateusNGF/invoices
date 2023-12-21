FROM node:18.0.0

WORKDIR app

COPY package-lock.json .
COPY package.json .
COPY src src
COPY public public
COPY .env .

RUN npm install --production

CMD [ "npm", "run", "start" ]