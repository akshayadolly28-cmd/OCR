# API Documentation

## Base URL
```
http://localhost:5000/api
Production: https://ocr-server.onrender.com/api
```

## Authentication

All protected endpoints require JWT token in header:
```
Authorization: Bearer <token>
```

---

## 1. Authentication Endpoints

### Register User
**POST** `/auth/register`

**Request:**
```json
{
  "name": "John User",
  "email": "user@example.com",
  "password": "User@123",
  "phone": "9876543210",
  "role": "USER"
}
```

**Response (201):**
```json
{
  "user": {
    "id": "63d4e5f2a1b2c3d4e5f6g7h8",
    "name": "John User",
    "email": "user@example.com",
    "role": "USER"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Validation:**
- name: required, string
- email: required, valid email, unique
- password: required, min 6 characters
- phone: optional
- role: "USER" (default), "AGENT", "ADMIN"

---

### Login User
**POST** `/auth/login`

**Request:**
```json
{
  "email": "user@example.com",
  "password": "User@123"
}
```

**Response (200):**
```json
{
  "user": {
    "id": "63d4e5f2a1b2c3d4e5f6g7h8",
    "name": "John User",
    "email": "user@example.com",
    "role": "USER"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Error (400):**
```json
{ "message": "Invalid credentials" }
```

---

### Get Profile
**GET** `/auth/profile`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "user": {
    "_id": "63d4e5f2a1b2c3d4e5f6g7h8",
    "name": "John User",
    "email": "user@example.com",
    "phone": "9876543210",
    "role": "USER",
    "createdAt": "2023-01-15T10:30:00Z"
  }
}
```

---

## 2. Complaints Endpoints

### Create Complaint
**POST** `/complaints`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: multipart/form-data
```

**Form Data:**
```
title: "Service Issue"
description: "I am facing service disruption..."
category: "Service"
priority: "High"
attachment: <file> (optional, max 5MB)
```

**Response (201):**
```json
{
  "complaint": {
    "_id": "63d4f5a1b2c3d4e5f6g7h8i9",
    "title": "Service Issue",
    "description": "I am facing service disruption...",
    "category": "Service",
    "priority": "High",
    "status": "Pending",
    "userId": "63d4e5f2a1b2c3d4e5f6g7h8",
    "attachment": "/uploads/1677000000000-123456789.pdf",
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2023-01-15T10:30:00Z"
  }
}
```

---

### Get Complaints
**GET** `/complaints?page=1&limit=10&status=Pending`

**Headers:**
```
Authorization: Bearer <token>
```

**Query Parameters:**
- page: page number (default: 1)
- limit: items per page (default: 10)
- status: filter by status (optional)
- userId: filter by user (ADMIN only, optional)

**Response (200):**
```json
{
  "total": 25,
  "page": 1,
  "limit": 10,
  "complaints": [
    {
      "_id": "63d4f5a1b2c3d4e5f6g7h8i9",
      "title": "Service Issue",
      "description": "I am facing service disruption...",
      "category": "Service",
      "priority": "High",
      "status": "Pending",
      "userId": {
        "_id": "63d4e5f2a1b2c3d4e5f6g7h8",
        "name": "John User",
        "email": "user@example.com"
      },
      "createdAt": "2023-01-15T10:30:00Z"
    }
  ]
}
```

---

### Get Complaint Details
**GET** `/complaints/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "complaint": {
    "_id": "63d4f5a1b2c3d4e5f6g7h8i9",
    "title": "Service Issue",
    "description": "I am facing service disruption...",
    "category": "Service",
    "priority": "High",
    "status": "Assigned",
    "userId": {
      "_id": "63d4e5f2a1b2c3d4e5f6g7h8",
      "name": "John User",
      "email": "user@example.com",
      "phone": "9876543210"
    },
    "agentId": {
      "_id": "63d5a2f1b2c3d4e5f6g7h8i9",
      "name": "Jane Agent",
      "email": "agent@example.com",
      "phone": "9876543211"
    },
    "attachment": "/uploads/1677000000000-123456789.pdf",
    "createdAt": "2023-01-15T10:30:00Z",
    "updatedAt": "2023-01-16T14:20:00Z"
  }
}
```

---

### Update Complaint Status
**PUT** `/complaints/:id/status`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "status": "In Progress"
}
```

**Status Values:**
- Pending
- Assigned
- In Progress
- Resolved
- Closed

**Response (200):**
```json
{
  "complaint": { ... }
}
```

**Authorization:** AGENT, ADMIN only

---

### Assign Agent to Complaint
**PUT** `/complaints/:id/assign`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "agentId": "63d5a2f1b2c3d4e5f6g7h8i9"
}
```

**Response (200):**
```json
{
  "complaint": { ... }
}
```

**Authorization:** ADMIN only

---

### Update Complaint (User)
**PUT** `/complaints/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "title": "Updated Title",
  "description": "Updated description",
  "priority": "Medium"
}
```

**Response (200):**
```json
{
  "complaint": { ... }
}
```

---

### Delete Complaint
**DELETE** `/complaints/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Deleted"
}
```

**Authorization:** ADMIN only

---

## 3. Feedback Endpoints

### Add Feedback
**POST** `/feedback`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "complaintId": "63d4f5a1b2c3d4e5f6g7h8i9",
  "rating": 5,
  "comment": "Great service! Agent was very helpful."
}
```

**Validation:**
- complaintId: required, valid ObjectId
- rating: required, integer 1-5
- comment: optional, string

**Response (201):**
```json
{
  "feedback": {
    "_id": "63d5b3a2c1d2e3f4g5h6i7j8",
    "complaintId": "63d4f5a1b2c3d4e5f6g7h8i9",
    "userId": "63d4e5f2a1b2c3d4e5f6g7h8",
    "rating": 5,
    "comment": "Great service! Agent was very helpful.",
    "createdAt": "2023-01-16T15:45:00Z"
  }
}
```

---

### Get Feedbacks
**GET** `/feedback/:complaintId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "feedbacks": [
    {
      "_id": "63d5b3a2c1d2e3f4g5h6i7j8",
      "complaintId": "63d4f5a1b2c3d4e5f6g7h8i9",
      "userId": {
        "_id": "63d4e5f2a1b2c3d4e5f6g7h8",
        "name": "John User",
        "email": "user@example.com"
      },
      "rating": 5,
      "comment": "Great service! Agent was very helpful.",
      "createdAt": "2023-01-16T15:45:00Z"
    }
  ]
}
```

---

## 4. Chat Endpoints

### Add Message
**POST** `/chat`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "complaintId": "63d4f5a1b2c3d4e5f6g7h8i9",
  "message": "Can you provide more details about the issue?"
}
```

**Validation:**
- complaintId: required, valid ObjectId
- message: required, non-empty string

**Response (201):**
```json
{
  "chat": {
    "_id": "63d5c4a3d2e3f4g5h6i7j8k9",
    "complaintId": "63d4f5a1b2c3d4e5f6g7h8i9",
    "senderId": "63d4e5f2a1b2c3d4e5f6g7h8",
    "message": "Can you provide more details about the issue?",
    "timestamp": "2023-01-16T16:00:00Z"
  }
}
```

---

### Get Messages
**GET** `/chat/:complaintId`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "messages": [
    {
      "_id": "63d5c4a3d2e3f4g5h6i7j8k9",
      "complaintId": "63d4f5a1b2c3d4e5f6g7h8i9",
      "senderId": {
        "_id": "63d4e5f2a1b2c3d4e5f6g7h8",
        "name": "John User",
        "role": "USER"
      },
      "message": "Can you provide more details about the issue?",
      "timestamp": "2023-01-16T16:00:00Z"
    }
  ]
}
```

---

## 5. Admin Endpoints

### Create Agent
**POST** `/admin/agents`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Jane Agent",
  "email": "jane@example.com",
  "phone": "9876543211",
  "password": "Agent@123"
}
```

**Response (201):**
```json
{
  "user": {
    "_id": "63d5a2f1b2c3d4e5f6g7h8i9",
    "name": "Jane Agent",
    "email": "jane@example.com",
    "phone": "9876543211",
    "role": "AGENT"
  }
}
```

**Authorization:** ADMIN only

---

### Update Agent
**PUT** `/admin/agents/:id`

**Headers:**
```
Authorization: Bearer <token>
Content-Type: application/json
```

**Request:**
```json
{
  "name": "Jane Agent Updated",
  "phone": "9876543212"
}
```

**Response (200):**
```json
{
  "user": { ... }
}
```

**Authorization:** ADMIN only

---

### Delete Agent
**DELETE** `/admin/agents/:id`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "message": "Deleted"
}
```

**Authorization:** ADMIN only

---

### Get Analytics
**GET** `/admin/analytics`

**Headers:**
```
Authorization: Bearer <token>
```

**Response (200):**
```json
{
  "totalUsers": 15,
  "totalAgents": 3,
  "totalComplaints": 42,
  "resolved": 28,
  "pending": 14,
  "monthly": [
    {
      "_id": "2023-01",
      "count": 10
    },
    {
      "_id": "2023-02",
      "count": 12
    }
  ],
  "agents": [
    {
      "agent": {
        "name": "Jane Agent",
        "email": "jane@example.com"
      },
      "total": 15,
      "resolved": 12
    }
  ]
}
```

**Authorization:** ADMIN only

---

## Error Responses

### 400 Bad Request
```json
{
  "message": "Validation error or invalid request",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

### 401 Unauthorized
```json
{
  "message": "No token" / "Invalid token" / "User not found"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden - Insufficient permissions"
}
```

### 404 Not Found
```json
{
  "message": "Not found"
}
```

### 500 Server Error
```json
{
  "message": "Server Error"
}
```

---

## Status Codes

| Code | Meaning |
|------|---------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 422 | Unprocessable Entity (Validation) |
| 500 | Internal Server Error |

---

## Rate Limiting

Currently no rate limiting implemented. Consider adding:
```bash
npm install express-rate-limit
```

---

## CORS Headers

Enabled for all origins (configurable for production).

---

## Best Practices

1. Always include Authorization header for protected endpoints
2. Use appropriate HTTP methods (GET, POST, PUT, DELETE)
3. Send proper Content-Type header
4. Handle errors gracefully on client side
5. Use pagination for list endpoints
6. Validate input data

---

**API Documentation v1.0**
