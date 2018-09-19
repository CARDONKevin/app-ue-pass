FROM node:latest

RUN npm install express
RUN mkdir -p /push
WORKDIR /push

EXPOSE 80

CMD node app.js