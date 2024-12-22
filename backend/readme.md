# Backend Documentation

This repository contains the backend application with general overview and configuration for use in server

## Configuration

Before running the application, ensure the following environment variables are set:

- **CORS_ORIGIN**: The base URL of the frontend application
- **DATABASE_HOST**: The URL or IP address where the database application is hosted
- **DATABASE_USERNAME**: The username to access the database
- **DATABASE_PASSWORD**: The password for the database user
- **DATABASE_NAME**: The name of the database
- **DATABASE_PORT**: The port number used by the database

## Steps to Run

- Install Docker and navigate to the directory containing this repository
- Run the application for production use cases with `docker-compose up --build -d`

## Environment Overview (Production)

This section describes the Docker setup for running the production environment. It includes the configuration files for Docker Compose and the Dockerfile used to build and serve the frontend application.

The `docker-compose.prod.yml` defines the `backend`, `prometheus`, and `node-exporter` services. The `backend` service runs on **port 5000** (default, configurable via environment variables). It includes the required environment variables and mounts the logs directory to a local directory for easier access to log files. The `prometheus` service runs on **port 9090** and uses the `prometheus.yml` file to mount the necessary configuration. The `node-exporter` service runs on **port 9100**

The `Dockerfile.prod` copies the necessary files from the local directory to the working directory and starts the server on **port 5000** using `npm run start` or `npm run dev` provided in the environment configuration

## API Dependencies and packages used

- sequelize (handling database)
- express (routing)
- bcryptjs (password hashing)
- jsonwebtoken (authentication)
- cookie-parser (interacting with cookies)
- dotenv (secure access tokens)
- pg (postgres)
- prom-client (prometheus client)
- cors (security)