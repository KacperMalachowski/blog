FROM node:18.16-alpine3.18 as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM alpine:3.13.2 AS server

RUN apk add gcc musl-dev make perl

RUN wget https://busybox.net/downloads/busybox-1.35.0.tar.bz2 \
  && tar xf busybox-1.35.0.tar.bz2 \
  && mv /busybox-1.35.0 /busybox

WORKDIR /busybox

COPY .config .

RUN make && make install

RUN adduser -D static

FROM ghcr.io/kacpermalachowski/static-serve
ENV PORT=8080

WORKDIR /app
COPY --from=builder /app/dist /app

CMD ["/go/bin/serve", "-p", $PORT]

