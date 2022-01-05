FROM node:14

# install yarn and give permissions
RUN apt-get update -qq
RUN npm install -g yarn --force
RUN chmod +x /usr/local/bin/yarn

# copy across files from each of the projects
WORKDIR /home/web-app
COPY ./web-app/package.json ./web-app/yarn.lock ./web-app/tsconfig.json ./
COPY ./web-app/src ./src

WORKDIR /home/core-backend
COPY ./core-backend/package.json ./core-backend/yarn.lock ./core-backend/tsconfig.json ./
COPY ./core-backend/src ./src

WORKDIR /home/data
COPY ./data/package.json ./data/yarn.lock ./data/tsconfig.json ./
COPY ./data/src ./src

WORKDIR /home/api
COPY ./api/package.json ./api/yarn.lock ./api/tsconfig.json ./
COPY ./api/src ./src

WORKDIR /home/api-interfaces
COPY ./api-interfaces/tsconfig.json ./
COPY ./api-interfaces/src ./src

# copy across files from root project, yarn in all projects and build all projects
WORKDIR /home
COPY ./package.json ./yarn.lock ./tsconfig.json ./

RUN yarn prepare-javascript-environment

WORKDIR /home/build/api

EXPOSE 3001
CMD [ "node", "src/index.js" ]