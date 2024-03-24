FROM node:20.11.1

# this is a development Dockerfile
# and is not intended for production use
WORKDIR /var/www/frontend

COPY package.json /var/www/frontend/
# COPY yarn.lock /var/www/frontend/
RUN npm install

# this what make hot reloading works
# because you are starting your project
# in the same way you running it locally
# RUN npm run build

CMD npm start --host 0.0.0.0 --port 3000 --disableHostCheck true