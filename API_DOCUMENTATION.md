# ReSellPro API Documentation

This document provides an overview of the API endpoints available in the ReSellPro backend.

## Table of Contents

- [Authentication Routes](#authentication-routes)
- [User Routes](#user-routes)

## Authentication Routes

### POST /api/auth/signup

- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "buyer"
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "success": true,
      "message": "User created successfully",
      "status_code": 201,
      "data": {
        "user": {
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "",
          "role": "buyer",
          "is_verified_email": false,
          "is_verified_phone": false,
          "phone_verification_code": null,
          "email_verification_code": "123456",
          "created_at": "2025-03-10T21:56:42.443Z",
          "updated_at": "2025-03-10T21:56:42.443Z",
          "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
    ```
  - **400 Bad Request**: Validation error or user already exists.

### POST /api/auth/login

- **Description**: Log in an existing user.
- **Request Body**:
  ```json
  {
    "email": "john@example.com",
    "password": "password123",
    "role": "buyer"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "User logged in successfully",
      "status_code": 200,
      "data": {
        "user": {
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "",
          "role": "buyer",
          "is_verified_email": true,
          "is_verified_phone": false,
          "phone_verification_code": null,
          "email_verification_code": null,
          "created_at": "2025-03-10T21:56:42.443Z",
          "updated_at": "2025-03-10T21:56:42.443Z",
          "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
    ```
  - **400 Bad Request**: Invalid email or password.

### POST /api/auth/logout

- **Description**: Log out the current user.
- **Request Header**:
  ```
  Authorization: Bearer <token>
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "User logged out successfully",
      "status_code": 200
    }
    ```
### Authentication Middleware

- **Description**: Middleware to check if the user is authenticated.
- **Request Header**:
  ```
  Authorization: Bearer <token>
  ```
  - **400 Bad Request**: 
    ```json
      {
        "success": false,  
        "message": "No token provided",
        "status_code": 400
      }
    ```
  - **401 Unauthorized**:
    ```json
      {
        "success": false,  
        "message": "Token expired! Please log in again.",
        "status_code": 401
      }
    ```
  - **403 Forbidden**:
    ```json
      {
        "success": false,  
        "message": "Access denied! One of these roles required: admin, seller, buyer",
        "status_code": 403
      }
    ```

### GET /api/auth/google

- **Description**: Initiate Google OAuth authentication.
- **Response**: Redirects to Google for authentication.

### GET /api/auth/google/callback

- **Description**: Google OAuth callback endpoint.
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Google authentication successful",
      "status_code": 200,
      "data": {
        "user": {
          "name": "Farouq Akinola",
          "email": "akinolaakinkunmifa@gmail.com",
          "phone": "",
          "role": "buyer",
          "is_verified_email": true,
          "is_verified_phone": false,
          "phone_verification_code": null,
          "email_verification_code": null,
          "created_at": "2025-03-10T21:56:42.443Z",
          "updated_at": "2025-03-10T21:56:42.443Z",
          "__v": 0
        },
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
      }
    }
    ```
  - **400 Bad Request**: Google authentication failed.

## User Routes

### GET /api/users

- **Description**: Retrieve a list of all users.
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Users fetched successfully",
      "status_code": 200,
      "data": [
        {
          "name": "John Doe",
          "email": "john@example.com",
          "phone": "",
          "role": "buyer",
        },
        {
          "name": "Jane Smith",
          "email": "jane@example.com",
          "phone": "",
          "role": "seller",
        }
      ]
    }
    ```

## Error Handling

All endpoints return a JSON response with a `success` flag, `message`, and `status_code` to indicate the result of the request. 