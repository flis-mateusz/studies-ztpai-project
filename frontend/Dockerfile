FROM node:lts

WORKDIR /var/www/frontend

COPY package.json .

RUN npm install

COPY . .

CMD [ "npm", "run", "dev" ]