# ReSellPro API Documentation

This document provides an overview of the API endpoints available in the ReSellPro backend.

## Table of Contents

- [Authentication Routes](#authentication-routes)
- [User Routes](#user-routes)
- [Listing Routes](#listing-routes)
- [Listing Category Routes](#listing-category-routes)

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
      "status_code": 201
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
  - **400 Bad Request**: No token provided or invalid token.

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

### GET /api/auth/facebook

- **Description**: Initiate Facebook OAuth authentication.
- **Response**: Redirects to Facebook for authentication.

### GET /api/auth/facebook/callback

- **Description**: Facebook OAuth callback endpoint.
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Facebook authentication successful",
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
  - **400 Bad Request**: Facebook authentication failed.

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
          "role": "buyer"
        },
        {
          "name": "Jane Smith",
          "email": "jane@example.com",
          "phone": "",
          "role": "seller"
        }
      ]
    }
    ```

## Listing Routes

### POST /api/listings/create

- **Description**: Create a new listing.
- **Request Body**:
  - **Form Data**:
    - `title`: String
    - `description`: String
    - `price`: Number
    - `category_id`: String (ObjectId)
    - `condition`: String (one of "new", "used", "like_new")
    - `isEcoFriendly`: Boolean
    - `autoRelist`: Boolean
    - `images`: Array of image files (JPEG, PNG, WEBP)
- **Response**:
  - **201 Created**:
    ```json
    {
      "success": true,
      "message": "Listing created successfully",
      "status_code": 201,
      "data": {
        "_id": "60cf601a372f86ecf68759e2",
        "title": "Sample Listing",
        "description": "This is a sample listing.",
        "price": 100.00,
        "category": {
          "_id": "60cf601a372f86ecf68759e1",
          "name": "Electronics"
        },
        "seller": {
          "_id": "60cf601a372f86ecf68759e3",
          "name": "John Doe",
          "email": "john@example.com",
          "phone": ""
        },
        "condition": "new",
        "isEcoFriendly": true,
        "status": "active",
        "createdAt": "2025-03-10T21:56:42.443Z",
        "updatedAt": "2025-03-10T21:56:42.443Z",
        "images": [
          {
            "_id": "60cf601a372f86ecf68759e4",
            "image_url": "http://localhost:5000/api/uploads/1626012345678-sample.jpg",
            "original_name": "sample.jpg"
          }
        ]
      }
    }
    ```
  - **400 Bad Request**: Validation error, category not found, or invalid file type.

# **GET /api/listings**

## **Description**
Retrieve all listings with optional filters, search, pagination, and related data (category, seller, and images).

---

## **Query Parameters**

| Parameter       | Type    | Description |
|---------------|--------|-------------|
| `search`      | String | Search listings by title or description (case-insensitive). |
| `minPrice`    | Number | Minimum price filter. |
| `maxPrice`    | Number | Maximum price filter. |
| `category`    | String | Category ID filter. |
| `condition`   | String | Filter by condition (e.g., "new", "used"). |
| `isEcoFriendly` | Boolean | Filter listings that are eco-friendly (`true` or `false`). |
| `autoRelist`  | Boolean | Filter listings that auto-relist (`true` or `false`). |
| `page`        | Number | Page number (default: `1`). |
| `limit`       | Number | Number of listings per page (default: `10`). |

---

## **Response**

### **✅ 200 OK**
```json
{
  "success": true,
  "message": "Listings fetched successfully",
  "status_code": 200,
  "data": [
    {
      "_id": "60cf601a372f86ecf68759e2",
      "title": "Sample Listing",
      "description": "This is a sample listing.",
      "price": 100.00,
      "category": {
        "_id": "60cf601a372f86ecf68759e1",
        "name": "Electronics",
        "description": "Electronic gadgets"
      },
      "seller": {
        "_id": "60cf601a372f86ecf68759e3",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "123-456-7890"
      },
      "condition": "new",
      "isEcoFriendly": true,
      "autoRelist": false,
      "status": "active",
      "createdAt": "2025-03-10T21:56:42.443Z",
      "updatedAt": "2025-03-10T21:56:42.443Z",
      "images": [
        {
          "_id": "60cf601a372f86ecf68759e4",
          "image_url": "http://localhost:5000/api/uploads/1626012345678-sample.jpg",
          "original_name": "sample.jpg"
        }
      ]
    }
  ],
  "pagination": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "pages": 10
  }
}
```
## Error Responses

### 400 Bad Request
Occurs when invalid query parameters are provided.

```json
{
  "success": false,
  "message": "Invalid query parameters",
  "status_code": 400
}
```

### 404 Not Found
Occurs when no listings match the query.

```json
{
  "success": false,
  "message": "No listings found",
  "status_code": 404
}
```

### 500 Internal Server Error
Occurs when an unexpected error happens on the server.

```json
{
  "success": false,
  "message": "Internal Server Error",
  "status_code": 500
}
```

## Query Parameters

| Parameter     | Type    | Description                                      |
|---------------|---------|--------------------------------------------------|
| search        | string  | Search keyword for title/description             |
| minPrice      | number  | Minimum price filter                             |
| maxPrice      | number  | Maximum price filter                             |
| category      | string  | Category ID to filter listings                   |
| condition     | string  | Condition filter (new, used, like_new)           |
| isEcoFriendly | boolean | Filter eco-friendly listings (true or false)     |
| autoRelist    | boolean | Filter listings with auto-relist enabled         |
| page          | number  | Page number for pagination (default: 1)          |
| limit         | number  | Number of listings per page (default: 10)        |

## Example Requests

### 1️⃣ Fetch All Listings (Paginated, Default Page 1, 10 per page)
```bash
GET http://localhost:5000/api/listings
```

### 2️⃣ Search Listings by Title/Description
```bash
GET http://localhost:5000/api/listings?search=phone
```

### 3️⃣ Filter Listings by Price Range
```bash
GET http://localhost:5000/api/listings?minPrice=100&maxPrice=500
```

### 4️⃣ Fetch Listings in a Specific Category
```bash
GET http://localhost:5000/api/listings?category=60cf601a372f86ecf68759e1
```

### 5️⃣ Fetch Eco-Friendly Listings
```bash
GET http://localhost:5000/api/listings?isEcoFriendly=true
```

### 6️⃣ Search + Pagination (Page 2, 5 Listings per Page)
```bash
GET http://localhost:5000/api/listings?search=example&page=2&limit=5
``` 

### GET /api/listings/:id

- **Description**: Retrieve a specific listing by ID.
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Listing fetched successfully",
      "status_code": 200,
      "data": {
        "_id": "60cf601a372f86ecf68759e2",
        "title": "Sample Listing",
        "description": "This is a sample listing.",
        "price": 100.00,
        "category": {
          "_id": "60cf601a372f86ecf68759e1",
          "name": "Electronics"
        },
        "seller": {
          "_id": "60cf601a372f86ecf68759e3",
          "name": "John Doe",
          "email": "john@example.com",
          "phone": ""
        },
        "condition": "new",
        "isEcoFriendly": true,
        "status": "active",
        "createdAt": "2025-03-10T21:56:42.443Z",
        "updatedAt": "2025-03-10T21:56:42.443Z",
        "images": [
          {
            "_id": "60cf601a372f86ecf68759e4",
            "image_url": "http://localhost:5000/api/uploads/1626012345678-sample.jpg",
            "original_name": "sample.jpg"
          }
        ]
      }
    }
    ```
  - **404 Not Found**: Listing not found.

### PUT /api/listings/:id

- **Description**: Update a specific listing by ID.
- **Request Body**:
  ```json
  {
    "title": "Updated Listing",
    "description": "This is an updated listing.",
    "price": 150.00,
    "category_id": "60cf601a372f86ecf68759e1",
    "condition": "used",
    "isEcoFriendly": false,
    "autoRelist": true
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Listing updated successfully",
      "status_code": 200,
      "data": {
        "_id": "60cf601a372f86ecf68759e2",
        "title": "Updated Listing",
        "description": "This is an updated listing.",
        "price": 150.00,
        "category": {
          "_id": "60cf601a372f86ecf68759e1",
          "name": "Electronics"
        },
        "condition": "used",
        "isEcoFriendly": false,
        "status": "active",
        "createdAt": "2025-03-10T21:56:42.443Z",
        "updatedAt": "2025-03-10T21:56:42.443Z",
        "images": [
          {
            "_id": "60cf601a372f86ecf68759e4",
            "image_url": "http://localhost:5000/api/uploads/1626012345678-sample.jpg",
            "original_name": "sample.jpg"
          }
        ]
      }
    }
    ```
  - **400 Bad Request**: Validation error.
  - **403 Forbidden**: Not authorized to update this listing.
  - **404 Not Found**: Listing not found.

### DELETE /api/listings/:id

- **Description**: Delete a specific listing by ID.
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Listing deleted successfully",
      "status_code": 200,
      "data": {
        "_id": "60cf601a372f86ecf68759e2",
        "title": "Sample Listing",
        "description": "This is a sample listing.",
        "price": 100.00,
        "category": {
          "_id": "60cf601a372f86ecf68759e1",
          "name": "Electronics"
        },
        "seller": {
          "_id": "60cf601a372f86ecf68759e3",
          "name": "John Doe",
          "email": "john@example.com",
          "phone": ""
        },
        "condition": "new",
        "isEcoFriendly": true,
        "status": "active",
        "createdAt": "2025-03-10T21:56:42.443Z",
        "updatedAt": "2025-03-10T21:56:42.443Z",
        "images": [
          {
            "_id": "60cf601a372f86ecf68759e4",
            "image_url": "http://localhost:5000/api/uploads/1626012345678-sample.jpg",
            "original_name": "sample.jpg"
          }
        ]
      }
    }
    ```
  - **403 Forbidden**: Not authorized to delete this listing.
  - **404 Not Found**: Listing not found.

## Listing Category Routes

### POST /api/listing-categories/create

- **Description**: Create a new listing category.
- **Request Body**:
  ```json
  {
    "name": "Electronics",
    "description": "Category for electronic items."
  }
  ```
- **Response**:
  - **201 Created**:
    ```json
    {
      "success": true,
      "message": "Listing category created successfully",
      "status_code": 201,
      "data": {
        "_id": "60cf601a372f86ecf68759e1",
        "name": "Electronics",
        "description": "Category for electronic items.",
        "createdAt": "2025-03-10T21:56:42.443Z",
        "updatedAt": "2025-03-10T21:56:42.443Z"
      }
    }
    ```
  - **400 Bad Request**: Validation error or category already exists.

### GET /api/listing-categories

- **Description**: Retrieve all listing categories.
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Listing categories fetched successfully",
      "status_code": 200,
      "data": [
        {
          "_id": "60cf601a372f86ecf68759e1",
          "name": "Electronics",
          "description": "Category for electronic items.",
          "createdAt": "2025-03-10T21:56:42.443Z",
          "updatedAt": "2025-03-10T21:56:42.443Z"
        }
      ]
    }
    ```

### GET /api/listing-categories/:id

- **Description**: Retrieve a specific listing category by ID, including its listings.
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Category with listings fetched successfully",
      "status_code": 200,
      "data": {
        "_id": "60cf601a372f86ecf68759e1",
        "name": "Electronics",
        "description": "Category for electronic items.",
        "listings": [
          {
            "_id": "60cf601a372f86ecf68759e2",
            "title": "Sample Listing",
            "description": "This is a sample listing.",
            "price": 100.00,
            "condition": "new",
            "isEcoFriendly": true,
            "status": "active",
            "createdAt": "2025-03-10T21:56:42.443Z",
            "updatedAt": "2025-03-10T21:56:42.443Z",
            "images": [
              {
                "_id": "60cf601a372f86ecf68759e4",
                "image_url": "http://localhost:5000/api/uploads/1626012345678-sample.jpg",
                "original_name": "sample.jpg"
              }
            ]
          }
        ]
      }
    }
    ```
  - **404 Not Found**: Category not found.

### PUT /api/listing-categories/:id

- **Description**: Update a specific listing category by ID.
- **Request Body**:
  ```json
  {
    "name": "Updated Electronics",
    "description": "Updated category for electronic items."
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Listing category updated successfully",
      "status_code": 200,
      "data": {
        "_id": "60cf601a372f86ecf68759e1",
        "name": "Updated Electronics",
        "description": "Updated category for electronic items.",
        "createdAt": "2025-03-10T21:56:42.443Z",
        "updatedAt": "2025-03-10T21:56:42.443Z"
      }
    }
    ```
  - **400 Bad Request**: Validation error.
  - **404 Not Found**: Listing category not found.

### DELETE /api/listing-categories/:id

- **Description**: Delete a specific listing category by ID.
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Listing category deleted successfully",
      "status_code": 200,
      "data": {
        "_id": "60cf601a372f86ecf68759e1",
        "name": "Electronics",
        "description": "Category for electronic items.",
        "createdAt": "2025-03-10T21:56:42.443Z",
        "updatedAt": "2025-03-10T21:56:42.443Z"
      }
    }
    ```
  - **404 Not Found**: Listing category not found.

## Seller Routes

### GET /api/seller/profile-details

- **Description**: Retrieve the seller's profile details.
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Seller profile details fetched successfully",
      "status_code": 200,
      "data": {
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "",
        "businessName": "John Doe's Business",
        "description": "This is a description of John Doe's business."
      }
    }
    ```
  - **404 Not Found**: Seller not found.

### POST /api/payments/initialize

- **Description**: Initialize a payment transaction.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "amount": 100.00,
    "userId": "60cf601a372f86ecf68759e3",
    "userType": "seller",
    "paymentReason": "Payment for listing",
    "paymentMethod": "paystack"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json

    {
      "success": true,
      "message": "Transaction initialized successfully",
      "data": {
          "status": true,
          "message": "Authorization URL created",
          "data": {
              "authorization_url": "https://checkout.paystack.com/7s7pffrn21w6zsx",
              "access_code": "7s7pffrn21w6zsx",
              "reference": "il1n0ncpel"
          }
      },
      "status_code": 200
    }   
    ```
  - **400 Bad Request**: Validation error or invalid payment method.

### GET /api/payments/verify/:reference

- **Description**: Verify a payment transaction.
- **Request Params**:
  ```
  {
    "reference": "il1n0ncpel"
  }
  ```
- **Response**:
  - **200 OK**:
    ```json
    {
      "success": true,
      "message": "Transaction verified successfully",
      "data": {
          "status": true,
          "message": "Verification successful",
          "data": {
              "id": 4841792480,
              "domain": "test",
              "status": "success",
              "reference": "il1n0ncpel",
              "receipt_number": null,
              "amount": 50000,
              "message": null,
              "gateway_response": "Successful",
              "paid_at": "2025-04-04T09:40:59.000Z",
              "created_at": "2025-04-04T09:40:46.000Z",
              "channel": "card",
              "currency": "NGN",
              "ip_address": "197.211.63.189",
              "metadata": "",
              "log": {
                  "start_time": 1743759657,
                  "time_spent": 3,
                  "attempts": 1,
                  "errors": 0,
                  "success": true,
                  "mobile": false,
                  "input": [],
                  "history": [
                      {
                          "type": "action",
                          "message": "Attempted to pay with card",
                          "time": 2
                      },
                      {
                          "type": "success",
                          "message": "Successfully paid with card",
                          "time": 3
                      }
                  ]
              },
              "fees": 750,
              "fees_split": null,
              "authorization": {
                  "authorization_code": "AUTH_wlchuv78z6",
                  "bin": "408408",
                  "last4": "4081",
                  "exp_month": "12",
                  "exp_year": "2030",
                  "channel": "card",
                  "card_type": "visa ",
                  "bank": "TEST BANK",
                  "country_code": "NG",
                  "brand": "visa",
                  "reusable": true,
                  "signature": "SIG_j4nATKyBZlsCzqQldwIE",
                  "account_name": null
              },
              "customer": {
                  "id": 258541514,
                  "first_name": null,
                  "last_name": null,
                  "email": "akinolaakinkunmifa@gmail.com",
                  "customer_code": "CUS_5u47t2hyjwdgdmm",
                  "phone": null,
                  "metadata": null,
                  "risk_action": "default",
                  "international_format_phone": null
              },
              "plan": null,
              "split": {},
              "order_id": null,
              "paidAt": "2025-04-04T09:40:59.000Z",
              "createdAt": "2025-04-04T09:40:46.000Z",
              "requested_amount": 50000,
              "pos_transaction_data": null,
              "source": null,
              "fees_breakdown": null,
              "connect": null,
              "transaction_date": "2025-04-04T09:40:46.000Z",
              "plan_object": {},
              "subaccount": {}
          }
      },
      "status_code": 200
    }
    ```
  - **400 Bad Request**: Transaction not found or invalid reference.
  - **401 Unauthorized**: User not authorized to verify this transaction.
  - **404 Not Found**: Transaction not found.

## Error Handling

All endpoints return a JSON response with a `success` flag, `message`, and `status_code` to indicate the result of the request. 