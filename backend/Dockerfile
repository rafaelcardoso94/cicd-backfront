FROM golang:1.21-alpine

WORKDIR /app

COPY go.mod ./
RUN go mod tidy

RUN go get gopkg.in/yaml.v2

COPY . .

RUN go build -o main .

EXPOSE 8080
CMD ["./main"]