# Database Documentation

This repository contains the database application with general overview and configuration for use in server

## Configuration

Before running the application, ensure the following environment variables are set:

- **POSTGRES_DB**: The name of the postgres database to be connected to
- **POSTGRES_USER**: Postgres database user containing the required access for the above database
- **POSTGRES_PASSWORD**: Postgres user connection password

## Steps to Run

- Install Docker and navigate to the directory containing this repository
- Run the application for production use cases with `docker-compose docker-compose.prod.yml up --build -d`
- Run the application for development use cases with `docker-compose docker-compose.prod.yml up --build`

## Environment Overview

The docker environment defines `postgres` and `pgadmin4` services. The `postgres` service is mapped to port **5432** and contains a volume mounted to it for persistent data storage. The `pgadmin4` service runs on port **5050** and allows administrators to manage the database directly on the server. Make sure to set the correct firewall settings to only allow controlled access to the **pgadmin4** page and prevent public from accessing it