# ReSellPro Backend

This is the backend for the ReSellPro web application, which provides a platform for users to buy and sell products. The backend is built using Node.js, Express, and MongoDB, and it supports Google OAuth for authentication.

## Table of Contents

- [Project Description](#project-description)
- [Setup Instructions](#setup-instructions)
  - [Using Docker](#using-docker)
  - [Without Docker](#without-docker)
- [Environment Variables](#environment-variables)

## Project Description

ReSellPro is a web application that allows users to list products for sale and purchase items from other users. The backend provides RESTful API endpoints for user authentication, product management, and more. It integrates with Google OAuth for user authentication and uses JWT for session management.

## Setup Instructions

### Using Docker

1. **Install Docker**: Ensure you have Docker installed on your machine. You can download it from [Docker's official website](https://www.docker.com/products/docker-desktop).

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/resellpro-backend.git
   cd resellpro-backend
   ```

3. **Build and Run the Docker Containers**:
   ```bash
   docker-compose up --build
   ```

4. **Access the Application**: The backend server will be running on `http://localhost:5000`.

### Without Docker

1. **Install Node.js**: Ensure you have Node.js installed. You can download it from [Node.js official website](https://nodejs.org/).

2. **Clone the Repository**:
   ```bash
   git clone https://github.com/yourusername/resellpro-backend.git
   cd resellpro-backend
   ```

3. **Install Dependencies**:
   ```bash
   npm install
   ```

4. **Set Up Environment Variables**: Create a `.env` file in the root directory and add the necessary environment variables as shown in the [Environment Variables](#environment-variables) section.

5. **Run the Application**:
   ```bash
   npm run seed:users
   npm start
   ```

6. **Access the Application**: The backend server will be running on `http://localhost:5000`.

## Environment Variables

Ensure you have the following environment variables set in your `.env` file:

MONGO_URI=mongodb://localhost:27017/resell 