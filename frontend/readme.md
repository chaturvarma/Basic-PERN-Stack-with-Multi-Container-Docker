# Frontend Documentation

This repository contains the frontend application with general overview and configuration for use in server

## Configuration

Before running the application, ensure the following environment variables are set:

- **`NGINX_PORT`**: Port on which the NGINX server will listen (default: `80`)
- **`NGINX_SSL_PORT`**: Port for NGINX to handle SSL traffic (default: `443`)
- **`REACT_APP_API_URL`**: URL for the React frontend to connect to the API through proxy (e.g., `http://127.0.0.8/api/`)
- **`BACKEND_APP_API_URL`**: URL for the backend API service (e.g., `http://10.70.17.142:5000/`)
- **`SERVER_NAME`**: Hostname or IP address for the server (e.g., `127.0.0.8`)
- **`SERVER_ENV`**: Environment type for the server (e.g., `0` for development)
- **`SSL_LOCATION`**: Path to SSL certificate files (e.g., `./certs`)

## Steps to Run

- Install Docker and navigate to the directory containing this repository
- Run the application for production use cases with `docker-compose -f docker-compose.prod.yml up --build -d`
- Run the application for development use cases with `docker-compose -f docker-compose.prod.yml up --build`
- Navigate to `http://{SERVER_NAME}/` in your local browser

## Environment Overview (Production)

This section describes the Docker setup for running the production environment. It includes the configuration files for Docker Compose and the Dockerfile used to build and serve the frontend application

### In Summary

- The server listens for requests on port 80 (or any other port specified in the configuration) and serves static files from the build directory
- The frontend React application is configured to send all API requests to the `/api/` directory (or any other specified in **REACT_APP_API_URL** environment variables) to avoid CORS and browser-related issues
- The Nginx server proxies API requests from `/api/` to the **BACKEND_APP_API_URL**
- The backend server processes and responds to API requests
- The SERVER_ENV is used to specify and map the required ssl certificate and privatekey

### Docker Compose

The `docker-compose.prod.yml` file defines a single service, **frontend**, which is configured with all the necessary environment variables from the `.env` file. Additionally, the logs directory is mounted to the Nginx log directory to simplify access to log files

### Dockerfile

The `Dockerfile.prod` uses the **node:20** image, copies all the required files, and runs `npm install` to install the dependencies and create the build directory for production use

The **nginx:1.21-alpine** image is then used to serve the application using the build files. It copies the necessary files from the Nginx directory to the Docker Nginx directory, exposes ports 80 and 443, and runs the entrypoint file from the Nginx directory

### Nginx Server

The `default_prod.template` file contains the production configuration for the root Nginx server. It accepts connections on port 80 and dynamically defines the server name and access log directories using environment variables. The configuration is optimized to handle requests efficiently, with client header and buffer sizes carefully tuned. Additionally, it redirects all 404 errors to the homepage. The `location /` block serves the main content of the application from the build files and routes requests based on URL paths. The `location /api/` block is configured to act as a proxy for API requests. It rewrites the API location defined in the React frontend's environment variables and forwards these requests to the backend server's API endpoint. This approach prevents CORS and other browser-related issues by internally redirecting API requests through the Nginx server

The `nginx_prod.conf` file contains the production configuration for the `http` block, including settings for gzip compression. It also defines global configurations applicable to the entire server.

The `logrotate.conf` file is a shared configuration for both development and production environments. It handles log rotation on a daily basis for both access and error logs.

The `entrypoint_prod.sh` file is a bash script executed during Docker initialization. It configures the `default_prod.template` file into the final `default_prod.conf` by mapping the required environment variables correctly.

## Environment Overview (Development)

This section describes the Docker setup for running the development environment. It includes the configuration files for Docker Compose and the Dockerfile used to build and serve the frontend application

### In Summary

- The frontend and nginx server work independently and run on different ports
- The frontend react development server runs on port **3000** and is reponsible for copying and managing the react app files
- The Nginx server listens for requests on port **80** and proxy passes all the requests to the frontend server running on port **3000**
- The frontend server is configured to send all API requests to `/api/` directory from the environment variable
- The Nginx server proxy passes all the requests made to `/api/` to the backend service from the environment variable to prevent cors and other issues

### Docker Compose

The `docker-compose.dev.yml` file defines two services, frontend and nginx which run as their own server independently. The **frontend** service is mounted to log directory for easier access to the server log files and the working directory. The **nginx** service maps necessary environment variables and mounts the logs docker directory to the local logs directory

### Dockerfile

The `Dockerfile.dev` file copies necessary files to the working directory and starts the react development server on port **3000**

### Nginx Server

The `Dockerfile.dev` file for the nginx server copies all the necessary development files and runs the entrypoint script

The `default_dev.template` file contains the development configuration for the root server. The first server block redirects all the www requests to non-www url. The second server block listens for all connections on port 80 and proxy passes all the requests to the frontend service with the port **3000** directly by using the frontend service via network from the same docker initialization and proxy passes all the API requests from frontend server from the `/api/` route to the backend api service 

## Dependencies and Packages Used

- axios
- react
- react-dom
- react-router-dom
- vite
- @vitejs/plugin-react
- concurrently
- tailwindcss
- postcss
- autoprefixer