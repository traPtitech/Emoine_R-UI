FROM node:16-alpine as build
RUN apk add --update --no-cache openjdk8-jre-base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run gen-api
RUN npm run build

FROM caddy:2.4.3-alpine
EXPOSE 80
COPY build/Caddyfile /etc/caddy/Caddyfile
COPY --from=build /app/dist /usr/share/caddy
