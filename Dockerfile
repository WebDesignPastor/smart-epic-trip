FROM golang:alpine

RUN apk add --no-cache git

# RUN apk add nodejs

# RUN apk add npm

WORKDIR /app

COPY go.* .

COPY *air.toml .

RUN go mod download

COPY . .

RUN go env -w GOFLAGS="-buildvcs=false"

RUN go install github.com/a-h/templ/cmd/templ@v0.2.432

RUN go install github.com/cosmtrek/air@latest

# RUN npm install

CMD ["air", "-c", ".air.toml"]