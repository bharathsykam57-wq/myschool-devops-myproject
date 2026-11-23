# MySchool DevOps Project

## Description

A simple web application developed using Node.js and Express as part of the MLOps course in the MSc Data Science & AI programme at DSTI.

The project demonstrates fundamental DevOps practices, including project initialization, Git version control, dependency management, web application development, and documentation.

## Technologies Used

- JavaScript
- Node.js
- Express.js
- npm
- Git and GitHub

## Features

- Runs a local HTTP web server using Express.
- Listens for requests on port 3000.
- Displays "Hello world!" on the home page.
- Uses npm for dependency management and application execution.

## Prerequisites

- Node.js
- npm
- Git

## Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd myschool-devops-myproject
```

Install dependencies:

```bash
npm install
```

## Usage

Start the web server:

```bash
npm start
```

Open your browser and navigate to:

http://localhost:3000

Expected output:

```text
Hello world!
```

To stop the server, press `Ctrl + C` in the terminal.

## Project Structure

```text
myschool-devops-myproject/
├── .gitignore
├── CHANGELOG.md
├── README.md
├── index.js
├── package.json
└── package-lock.json
```

The `node_modules` directory is created locally when dependencies are installed and is excluded from Git.


## Docker Containers Lab

### Objectives

This lab demonstrates:
- Building a Docker image using a Dockerfile.
- Running a Node.js application inside a container.
- Mapping container ports to the host machine.
- Persisting data using Docker bind mounts.
- Sharing storage between two Docker containers.

### Build the Docker Image

```bash
docker build -t bharath/my-node-app .
```

### Run Container 1

```bash
mkdir -p shared-data

docker run -d \
  --name my-node-container \
  -p 3000:3000 \
  -v "$(pwd)/shared-data:/usr/src/app/data" \
  bharath/my-node-app
```

Access the application at:

http://localhost:3000

### User API

The application provides three endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | / | Displays Hello world! |
| GET | /users | Retrieves saved users |
| POST | /users | Creates a new user |

Create a user:

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Bharath"}'
```

User information is stored in `shared-data/users.json`.

### Run Container 2

Start another container using the same shared directory:

```bash
docker run -d \
  --name my-node-container-2 \
  -p 3001:3000 \
  -v "$(pwd)/shared-data:/usr/src/app/data" \
  bharath/my-node-app
```

Container 1: http://localhost:3000/users

Container 2: http://localhost:3001/users

Both containers access the same user data.

### Verify Shared Storage

Create a user through Container 2:

```bash
curl -X POST http://localhost:3001/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice"}'
```

Retrieve users through Container 1:

```bash
curl http://localhost:3000/users
```

Expected response:

```json
[
  {
    "id": 1,
    "name": "Bharath"
  },
  {
    "id": 2,
    "name": "Alice"
  }
]
```

This demonstrates that both containers share persistent storage through a Docker bind mount.

Note: This file-based implementation is intended for learning. Concurrent writes from multiple containers are not protected against race conditions.

### Stop Containers

```bash
docker stop my-node-container my-node-container-2
```

### Lab Results

- Docker image built successfully.
- Express application accessible through Docker.
- Two containers ran on different host ports.
- User data persisted on the host machine.
- Both containers successfully accessed shared data.

All lab objectives were completed.

## Author

Bharath Sykam

## License

ISC
