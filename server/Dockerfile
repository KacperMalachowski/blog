FROM golang:1.20-alpine3.18 as builder

RUN apk update && apk add --no-cache git ca-certificates && update-ca-certificates

ENV USER=appuser
ENV UID=10001 

RUN adduser \    
  --disabled-password \    
  --gecos "" \    
  --home "/nonexistent" \    
  --shell "/sbin/nologin" \    
  --no-create-home \    
  --uid "${UID}" \    
  "${USER}"

WORKDIR $GOPATH/src/github.com/KacperMalachowski/blog/server

COPY . .

RUN go mod download
RUN go mod verify

RUN GOOS=linux go build -ldflags="-w -s" -o /go/bin/server

FROM scratch

COPY --from=builder /usr/share/zoneinfo /usr/share/zoneinfo
COPY --from=builder /etc/ssl/certs/ca-certificates.crt /etc/ssl/certs/
COPY --from=builder /etc/passwd /etc/passwd
COPY --from=builder /etc/group /etc/group

COPY --from=builder /go/bin/server /go/bin/server

USER appuser:appuser

EXPOSE 3000

ENTRYPOINT ["/go/bin/server"]