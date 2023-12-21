FROM node:18.0.0

WORKDIR app

COPY package-lock.json .
COPY package.json .
COPY dist dist
COPY prisma prisma
COPY .env .

RUN npm install --production

CMD [ "npm", "run", "start:prod" ]