# Online Complaint Registration and Management System (MERN)

A production-ready full-stack MERN application for managing complaints with role-based access (USER, AGENT, ADMIN), real-time chat, feedback system, and analytics.

## Features

✅ **User Authentication**
- Registration and Login with JWT
- Password hashing using bcryptjs
- Protected routes with role-based access control

✅ **Complaint Management**
- Users can submit complaints with file attachments
- Track complaint status (Pending → Assigned → In Progress → Resolved → Closed)
- Real-time chat between users and agents
- Feedback and rating system

✅ **Agent Dashboard**
- View assigned complaints
- Update complaint status
- Communicate with users

✅ **Admin Dashboard**
- Manage users and agents
- View analytics and trends
- Agent performance metrics
- Monthly complaint trends chart

✅ **Security & Validation**
- Helmet for security headers
- CORS enabled
- Express-validator for input validation
- JWT authentication
- Role-based authorization middleware

✅ **File Uploads**
- Support for PDF, JPG, PNG
- 5MB file size limit
- Automatic file serving

## Tech Stack

### Frontend
- React.js 18
- React Router DOM v6
- Axios
- Bootstrap 5
- React Toastify
- Recharts for analytics
- React Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT
- bcryptjs
- Multer (file uploads)
- Nodemailer (email notifications)
- Express-validator

## Project Structure

```
OCR/
├── server/                    # Backend (Express + MongoDB)
│   ├── config/               # Configuration files
│   ├── controllers/           # Business logic
│   ├── middleware/            # Auth, validation, upload, error handling
│   ├── models/                # Mongoose schemas
│   ├── routes/                # API endpoints
│   ├── services/              # Email service
│   ├── utils/                 # Utilities (token generation)
│   ├── uploads/               # Uploaded files
│   ├── app.js                 # Express app
│   ├── server.js              # Server entry point
│   └── package.json
│
├── client/                    # Frontend (React)
│   ├── public/
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── context/           # React Context (Auth)
│   │   ├── services/          # API calls (Axios)
│   │   ├── routes/            # Route config
│   │   ├── layouts/           # Navbar, Sidebar
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Helpers (Protected Routes)
│   │   ├── App.js             # Main app with routing
│   │   └── index.js
│   └── package.json
│
├── sampleData.json            # Sample seed data
├── postman_collection.json    # API testing
└── README.md
```

## Installation

### Backend Setup

```bash
cd server
npm install
cp .env.example .env
```

Update `.env` with:
```
PORT=5000
MONGO_URI=mongodb://localhost:27017/ocr
JWT_SECRET=your_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

### Frontend Setup

```bash
cd client
npm install
cp .env.example .env
```

Ensure `.env` has:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

### Start Backend
```bash
cd server
npm run dev
```
Server will run on `http://localhost:5000`

### Start Frontend
```bash
cd client
npm start
```
App will open at `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (Protected)

### Complaints
- `POST /api/complaints` - Create complaint (Protected, USER only)
- `GET /api/complaints` - Get complaints (Protected, with pagination)
- `GET /api/complaints/:id` - Get complaint details (Protected)
- `PUT /api/complaints/:id/status` - Update status (Protected, AGENT/ADMIN only)
- `PUT /api/complaints/:id/assign` - Assign to agent (Protected, ADMIN only)

### Feedback
- `POST /api/feedback` - Add feedback (Protected)
- `GET /api/feedback/:complaintId` - Get feedbacks (Protected)

### Chat
- `POST /api/chat` - Send message (Protected)
- `GET /api/chat/:complaintId` - Get messages (Protected)

### Admin
- `POST /api/admin/agents` - Create agent (Protected, ADMIN only)
- `PUT /api/admin/agents/:id` - Update agent (Protected, ADMIN only)
- `DELETE /api/admin/agents/:id` - Delete agent (Protected, ADMIN only)
- `GET /api/admin/analytics` - Get analytics (Protected, ADMIN only)

## Pages & Features

| Page | Role | Features |
|------|------|----------|
| Home | All | Welcome page, navigation |
| Login | All | User authentication |
| Register | All | User registration |
| User Dashboard | USER | View complaints, filter, pagination |
| File Complaint | USER | Submit new complaint with attachment |
| Complaint Details | All | View details, chat, feedback (if resolved) |
| Agent Dashboard | AGENT | View assigned complaints, update status |
| Admin Dashboard | ADMIN | Analytics, agent management, trends |

## Authentication Flow

1. User registers/logs in
2. Backend returns JWT token
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes
5. Middleware verifies token and role
6. Access granted/denied based on role

## Database Schema

### Users
- name, email, password (hashed), phone, role, createdAt

### Complaints
- title, description, category, attachment, status, priority
- userId (ref: User), agentId (ref: User)
- createdAt, updatedAt

### Feedback
- complaintId (ref: Complaint), userId (ref: User)
- rating (1-5), comment, createdAt

### Chat
- complaintId (ref: Complaint), senderId (ref: User)
- message, timestamp

## Testing with Postman

1. Import `postman_collection.json` into Postman
2. Set `base_url` variable to `http://localhost:5000/api`
3. Register/Login to get token
4. Set `token` variable in Postman
5. Test endpoints

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions on Render and Vercel.

## Error Handling

- Centralized error handler middleware
- Validation errors with express-validator
- JSON responses for all errors
- Proper HTTP status codes

## Security Features

- JWT-based authentication
- Password hashing (bcryptjs)
- CORS enabled
- Helmet for security headers
- Role-based authorization
- Input validation

## Sample User Credentials

```
User:
Email: user@example.com
Password: User@123

Agent:
Email: agent@example.com
Password: Agent@123

Admin:
Email: admin@example.com
Password: Admin@123
```

## Contributing

This project is part of an internship submission. Follow best practices and clean code principles.

## License

MIT

---

**Made with ❤️ for complaint management**
