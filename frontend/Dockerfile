FROM node:lts

WORKDIR /var/www/frontend

COPY package.json /var/www/frontend/

RUN npm install

COPY . .

# this what make hot reloading works
# because you are starting your project
# in the same way you running it locally
#RUN npm run build
EXPOSE 5173

CMD ["npm", "run", "dev"]