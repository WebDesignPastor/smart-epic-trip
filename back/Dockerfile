FROM golang:alpine

WORKDIR /app

COPY . .

RUN apk add --no-cache git
RUN apk add build-base
RUN go mod download
RUN go env -w GOFLAGS="-buildvcs=false"
RUN go install github.com/cosmtrek/air@latest

CMD ["air", "-c", ".air.toml"]
