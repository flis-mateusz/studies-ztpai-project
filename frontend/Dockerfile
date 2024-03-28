FROM node:alpine

WORKDIR /var/www/frontend

COPY package.json .

RUN npm i

COPY . .

CMD [ "npm", "run", "dev" ]