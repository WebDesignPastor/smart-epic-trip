FROM golang:alpine

# Set the working directory inside the container
WORKDIR /app

# Copy all project files into the working directory
COPY . .

# Install necessary packages for the build environment
RUN apk add --no-cache git build-base

# Download Go module dependencies and ensure go.sum is up to date
RUN go mod tidy
RUN go mod download

# Install the air package for live reloading
RUN go install github.com/air-verse/air@latest

# Install the swag package for Swagger generation
RUN go install github.com/swaggo/swag/cmd/swag@latest

# Expose port 80 for Azure
EXPOSE 80

# Make sure the app listens on the Azure-provided port (default to 80)
ENV PORT 80
CMD ["air", "-c", ".air.toml"]
