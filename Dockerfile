FROM ubuntu:16.04
LABEL maintainer="Oluwasegun Matthews"

# set working directory
WORKDIR /root/EventsManagerApp

# install curl, nodejs and npm
RUN apt-get update -y && \
  apt-get install curl -y && \
  curl -sL https://deb.nodesource.com/setup_9.x -o nodesource_setup.sh && \
  bash nodesource_setup.sh && \
  apt-get install nodejs -y

USER root

# copy all application files
COPY . .

RUN npm install && \
  npm run full-build

EXPOSE 8002

ENTRYPOINT [ "node", "./build/server.js" ]

