FROM golang:alpine
WORKDIR /app
COPY . .
RUN apk add --no-cache git
RUN apk add build-base
RUN go install github.com/cosmtrek/air@latest
RUN go install github.com/swaggo/swag/cmd/swag@latest
CMD ["air", "-c", ".air.toml"]
