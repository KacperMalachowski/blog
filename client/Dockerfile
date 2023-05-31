FROM node:18.16-bullseye as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:1.25.0-alpine3.17

COPY --from=builder /app/dist /var/www/kacpermalachowski.pl/html
COPY --from=builder /app/nginx.conf /etc/nginx/sites-available/kacpermalachowski.pl

EXPOSE 80

CMD ["nginx", "-g", "daemon off"]

