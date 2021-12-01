FROM node:16
EXPOSE 3000
WORKDIR /incode-app
COPY . /incode-app
ENTRYPOINT node src/index.js