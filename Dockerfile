FROM node:14-alpine as build-stage

ARG API_URL=https://onoshkomax.pp.ua/server/api
ARG SOCKET_URL=wss://onoshkomax.pp.ua/socket
ENV VUE_APP_API_URL=$API_URL
ENV VUE_APP_SOCKET_URL=$SOCKET_URL

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

RUN npm run build

FROM nginx

COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist /dist
