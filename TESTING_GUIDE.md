# Testing Guide

## Backend Testing

### 1. Setup Postman

1. Download Postman: https://www.postman.com/downloads/
2. Import `postman_collection.json` into Postman
3. Create environment with variables:
   - `base_url`: http://localhost:5000/api
   - `token`: (empty, will be filled after login)
   - `complaint_id`: (empty, will be filled)
   - `agent_id`: (empty, will be filled)

### 2. Authentication Tests

#### Test 1: User Registration
- Endpoint: `POST /auth/register`
- Send valid user data
- Expected: 201, user object, and token
- Store token in `token` variable

```json
{
  "name": "Test User",
  "email": "testuser@example.com",
  "password": "Test@123",
  "phone": "9876543210",
  "role": "USER"
}
```

#### Test 2: User Login
- Endpoint: `POST /auth/login`
- Send email and password
- Expected: 200, user object, and token

```json
{
  "email": "testuser@example.com",
  "password": "Test@123"
}
```

#### Test 3: Get Profile
- Endpoint: `GET /auth/profile`
- Include Authorization header
- Expected: 200, user profile data

#### Test 4: Invalid Credentials
- Endpoint: `POST /auth/login`
- Send wrong password
- Expected: 400, error message

```json
{
  "email": "testuser@example.com",
  "password": "WrongPassword"
}
```

### 3. Complaint Tests

#### Test 5: Create Complaint
- Endpoint: `POST /complaints`
- Method: form-data (multipart)
- Include: title, description, category, priority
- Optional: attachment file
- Expected: 201, complaint object
- Store complaint ID in `complaint_id` variable

```
title: Service Issue
description: I am facing service disruption
category: Service
priority: High
attachment: (optional file)
```

#### Test 6: Get Complaints (Pagination)
- Endpoint: `GET /complaints?page=1&limit=5`
- Expected: 200, array of complaints with pagination info

#### Test 7: Get Complaint Details
- Endpoint: `GET /complaints/{{complaint_id}}`
- Expected: 200, detailed complaint object with populated references

#### Test 8: Update Complaint Status (Agent)
- Create agent account first
- Endpoint: `PUT /complaints/{{complaint_id}}/status`
- Request: `{ "status": "In Progress" }`
- Expected: 200, updated complaint

#### Test 9: Assign Agent (Admin)
- Create admin account first
- Endpoint: `PUT /complaints/{{complaint_id}}/assign`
- Request: `{ "agentId": "{{agent_id}}" }`
- Expected: 200, complaint with agent assigned

### 4. Feedback Tests

#### Test 10: Add Feedback
- Endpoint: `POST /feedback`
- Only works after complaint is Resolved
- First update complaint status to Resolved
- Request:
```json
{
  "complaintId": "{{complaint_id}}",
  "rating": 5,
  "comment": "Excellent service!"
}
```
- Expected: 201, feedback object

#### Test 11: Get Feedbacks
- Endpoint: `GET /feedback/{{complaint_id}}`
- Expected: 200, array of feedbacks

### 5. Chat Tests

#### Test 12: Send Message
- Endpoint: `POST /chat`
- Request:
```json
{
  "complaintId": "{{complaint_id}}",
  "message": "Please provide update on my complaint"
}
```
- Expected: 201, chat message object

#### Test 13: Get Messages
- Endpoint: `GET /chat/{{complaint_id}}`
- Expected: 200, array of messages sorted by timestamp

### 6. Admin Tests

#### Test 14: Create Agent (Admin)
- Create admin account
- Endpoint: `POST /admin/agents`
- Request:
```json
{
  "name": "New Agent",
  "email": "newagent@example.com",
  "phone": "9876543213",
  "password": "Agent@123"
}
```
- Expected: 201, agent object
- Store agent ID

#### Test 15: Get Analytics (Admin)
- Endpoint: `GET /admin/analytics`
- Expected: 200, analytics object with stats and trends

#### Test 16: Access Control Test
- Try to access `/admin/analytics` with USER token
- Expected: 403 Forbidden

---

## Frontend Testing

### 1. User Journey Test (USER)

1. **Register**
   - Go to `/register`
   - Fill form with valid data
   - Click Register
   - Expected: Redirected to home, logged in

2. **Create Complaint**
   - Click "New Complaint" in dashboard
   - Fill form: title, description, category, priority
   - Optional: Upload file
   - Click Submit
   - Expected: Redirected to complaint details

3. **View Complaints**
   - Go to `/user/dashboard`
   - See list of your complaints
   - Click View on any complaint
   - Expected: Complaint details with chat

4. **Send Message**
   - In complaint details
   - Type message in chat box
   - Click Send
   - Expected: Message appears in chat

5. **Submit Feedback** (after Resolved)
   - After complaint is Resolved
   - Fill feedback form
   - Submit
   - Expected: Success toast notification

6. **Logout**
   - Click Logout button
   - Expected: Redirected to login

### 2. Agent Journey Test (AGENT)

1. **Login as Agent**
   - Go to `/login`
   - Email: agent@example.com
   - Password: Agent@123
   - Expected: Logged in, can see agent menu

2. **Agent Dashboard**
   - Click "Agent Dashboard"
   - See assigned complaints
   - Expected: Complaints with status options

3. **Update Status**
   - Select new status from dropdown
   - Expected: Status updated, toast notification

4. **View Complaint**
   - Click View on complaint
   - Send message to user
   - Expected: Message appears in chat

### 3. Admin Journey Test (ADMIN)

1. **Login as Admin**
   - Email: admin@example.com
   - Password: Admin@123

2. **Admin Dashboard**
   - Click "Admin Dashboard"
   - Expected: See analytics, complaints, agent performance

3. **View Analytics**
   - See total users, agents, complaints
   - See monthly trends chart
   - See agent performance table
   - Expected: All data loads correctly

### 4. Error Handling Tests

#### Test: Invalid Login
- Try login with wrong password
- Expected: Error message displayed

#### Test: Unauthorized Access
- Modify URL to access /admin/dashboard as USER
- Expected: Redirected to home or login

#### Test: File Upload
- Try uploading file > 5MB
- Expected: Error message

#### Test: Validation
- Try creating complaint without title
- Expected: Validation error

---

## Performance Testing

### Load Testing (Apache Bench)

```bash
# Test GET endpoint
ab -n 100 -c 10 -H "Authorization: Bearer <token>" \
  http://localhost:5000/api/complaints

# Test POST endpoint
ab -n 50 -c 5 -p complaint.json \
  http://localhost:5000/api/complaints
```

### Response Time
- Target: < 500ms for API calls
- Monitor in browser DevTools

---

## Security Testing

### 1. Authentication Tests
- Token expiration
- Invalid token rejection
- Missing token rejection

### 2. Authorization Tests
- USER cannot access AGENT endpoints
- AGENT cannot access ADMIN endpoints
- ADMIN can access all endpoints

### 3. Input Validation
- SQL injection attempts (will be sanitized)
- XSS attempts (React escapes by default)
- File upload validation

### 4. CORS Testing
- Requests from different domains
- Preflight requests
- Credentials handling

---

## Automated Tests (Optional)

### Setup Jest + Supertest

```bash
npm install --save-dev jest supertest
```

### Example Test

```javascript
// tests/auth.test.js
const request = require('supertest');
const app = require('../app');

describe('Auth Endpoints', () => {
  test('POST /auth/login with valid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'User@123'
      });
    
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('POST /auth/login with invalid credentials', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        email: 'user@example.com',
        password: 'WrongPassword'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.message).toContain('Invalid');
  });
});
```

### Run Tests
```bash
npm test
```

---

## Browser Testing

### Browsers to Test
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile: iOS Safari, Chrome Mobile

### Test Scenarios
- Form submission
- File upload
- Pagination
- Responsive design
- Touch interactions

---

## Checklist

- [ ] All authentication flows working
- [ ] Create complaint with/without attachment
- [ ] View complaints with pagination
- [ ] Send chat messages
- [ ] Update complaint status (Agent)
- [ ] View analytics (Admin)
- [ ] Error messages display correctly
- [ ] Toast notifications work
- [ ] Loading spinners display
- [ ] Responsive design on mobile
- [ ] Protected routes working
- [ ] Token expiration handling
- [ ] CORS working correctly
- [ ] File upload validation

---

**Testing complete! Ready for production deployment.**
