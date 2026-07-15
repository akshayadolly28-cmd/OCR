# Online Complaint Registration and Management System (MERN)

A **production-ready** full-stack MERN application for managing complaints with role-based access, real-time chat, analytics, and comprehensive admin controls.

## ?? Overview

This system enables organizations to:
- Register and track complaints from users
- Assign complaints to support agents
- Track complaint status in real-time
- Provide feedback and ratings
- Generate analytics and performance metrics
- Manage users, agents, and the system

## ? Key Features

### ?? User Role
- ? Register and login with JWT authentication
- ? Submit complaints with file attachments
- ? Track complaint status in real-time
- ? Chat with assigned agents
- ? Submit feedback and ratings after resolution
- ? View complaint history with filters

### ?? Agent Role
- ? View assigned complaints
- ? Update complaint status
- ? Communicate with users via chat
- ? Mark complaints as resolved

### ?? Admin Role
- ? Manage users and agents
- ? View system-wide analytics
- ? Monitor complaint trends
- ? View agent performance metrics
- ? Assign complaints to agents
- ? Manage all complaints

## ?? Tech Stack

### Frontend
- **React.js 18** - UI library
- **React Router v6** - Client-side routing
- **Axios** - HTTP client
- **Bootstrap 5** - Responsive UI
- **React Toastify** - Notifications
- **Recharts** - Analytics charts
- **React Icons** - Icons

### Backend
- **Node.js & Express.js** - Server framework
- **MongoDB & Mongoose** - Database
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Multer** - File uploads
- **Express-validator** - Input validation
- **Helmet** - Security headers
- **Nodemailer** - Email notifications
- **CORS** - Cross-origin requests

## ?? Project Structure

\\\
OCR/
+-- server/                          # Backend (Express + MongoDB)
¦   +-- config/                      # Configuration
¦   +-- controllers/                 # Business logic
¦   ¦   +-- authController.js       # Auth endpoints
¦   ¦   +-- complaintController.js  # Complaint CRUD
¦   ¦   +-- feedbackController.js   # Feedback operations
¦   ¦   +-- chatController.js       # Chat messages
¦   ¦   +-- adminController.js      # Admin operations & analytics
¦   +-- middleware/                  # Middleware functions
¦   ¦   +-- auth.js                 # JWT verification
¦   ¦   +-- roles.js                # Role-based access
¦   ¦   +-- validate.js             # Input validation
¦   ¦   +-- upload.js               # File upload handling
¦   ¦   +-- errorHandler.js         # Error handling
¦   +-- models/                      # Mongoose schemas
¦   ¦   +-- User.js                 # User schema
¦   ¦   +-- Complaint.js            # Complaint schema
¦   ¦   +-- Feedback.js             # Feedback schema
¦   ¦   +-- Chat.js                 # Chat schema
¦   +-- routes/                      # API routes
¦   ¦   +-- auth.js                 # Auth routes
¦   ¦   +-- complaints.js           # Complaint routes
¦   ¦   +-- feedback.js             # Feedback routes
¦   ¦   +-- chat.js                 # Chat routes
¦   ¦   +-- admin.js                # Admin routes
¦   ¦   +-- index.js                # Route aggregator
¦   +-- services/                    # Business services
¦   ¦   +-- emailService.js         # Email sending
¦   +-- utils/                       # Utility functions
¦   ¦   +-- generateToken.js        # JWT token generation
¦   +-- uploads/                     # Uploaded files storage
¦   +-- app.js                       # Express app
¦   +-- server.js                    # Server entry point
¦   +-- package.json                 # Dependencies
¦   +-- .env.example                 # Environment template
¦
+-- client/                          # Frontend (React)
¦   +-- public/
¦   ¦   +-- index.html
¦   +-- src/
¦   ¦   +-- components/             # Reusable components
¦   ¦   +-- pages/                  # Page components
¦   ¦   ¦   +-- HomePage.js
¦   ¦   ¦   +-- LoginPage.js
¦   ¦   ¦   +-- RegisterPage.js
¦   ¦   ¦   +-- UserDashboard.js
¦   ¦   ¦   +-- ComplaintFormPage.js
¦   ¦   ¦   +-- ComplaintDetailsPage.js
¦   ¦   ¦   +-- AgentDashboard.js
¦   ¦   ¦   +-- AdminDashboard.js
¦   ¦   ¦   +-- NotFoundPage.js
¦   ¦   +-- context/                # React Context
¦   ¦   ¦   +-- AuthContext.js      # Auth state management
¦   ¦   +-- services/               # API calls
¦   ¦   ¦   +-- api.js              # Axios instance
¦   ¦   +-- routes/                 # Route configuration
¦   ¦   +-- layouts/                # Layout components
¦   ¦   ¦   +-- Navbar.js
¦   ¦   ¦   +-- Sidebar.js
¦   ¦   +-- hooks/                  # Custom hooks
¦   ¦   +-- utils/                  # Helper functions
¦   ¦   ¦   +-- helpers.js          # Protected routes
¦   ¦   +-- App.js                  # Main app with routing
¦   ¦   +-- App.css                 # Styles
¦   ¦   +-- index.js                # React entry point
¦   +-- package.json
¦   +-- .env
¦
+-- INSTALLATION_GUIDE.md            # Setup instructions
+-- API_DOCUMENTATION.md             # API reference
+-- DEPLOYMENT.md                    # Deployment guide
+-- TESTING_GUIDE.md                 # Testing procedures
+-- sampleData.json                  # Sample seed data
+-- postman_collection.json          # Postman API tests
+-- README.md                        # This file
\\\

## ?? Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

**1. Clone and setup backend:**
\\\ash
cd server
npm install
cp .env.example .env
# Update .env with your MongoDB URI and JWT secret
npm run dev
\\\

**2. In another terminal, setup frontend:**
\\\ash
cd client
npm install
npm start
\\\

Frontend runs on http://localhost:3000
Backend runs on http://localhost:5000

### Environment Variables

**Backend (.env):**
\\\
PORT=5000
MONGO_URI=mongodb://localhost:27017/ocr
JWT_SECRET=your_secret_key_here
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
\\\

**Frontend (.env):**
\\\
REACT_APP_API_URL=http://localhost:5000/api
\\\

## ?? Documentation

- **[INSTALLATION_GUIDE.md](INSTALLATION_GUIDE.md)** - Detailed setup instructions
- **[API_DOCUMENTATION.md](API_DOCUMENTATION.md)** - Complete API reference
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Deploy to Render & Vercel
- **[TESTING_GUIDE.md](TESTING_GUIDE.md)** - Testing procedures

## ?? Sample Credentials

\\\
User:
Email: user@example.com
Password: User@123

Agent:
Email: agent@example.com
Password: Agent@123

Admin:
Email: admin@example.com
Password: Admin@123
\\\

## ?? Security Features

? JWT-based authentication with 7-day expiration
? Password hashing using bcryptjs (10 rounds)
? Role-based authorization middleware
? Input validation with express-validator
? Helmet for security headers
? CORS configuration
? File upload validation (size, type)
? Encrypted passwords in database
? Protected API endpoints
? Error handling middleware

## ?? Database Schema

### Users Collection
\\\javascript
{
  name: String,
  email: String (unique, indexed),
  password: String (hashed),
  phone: String,
  role: String (USER|AGENT|ADMIN),
  createdAt: Date
}
\\\

### Complaints Collection
\\\javascript
{
  title: String (indexed),
  description: String,
  category: String (indexed),
  attachment: String,
  status: String (Pending|Assigned|In Progress|Resolved|Closed, indexed),
  priority: String (Low|Medium|High),
  userId: ObjectId (ref: User, indexed),
  agentId: ObjectId (ref: User),
  createdAt: Date,
  updatedAt: Date
}
\\\

### Feedback Collection
\\\javascript
{
  complaintId: ObjectId (ref: Complaint, indexed),
  userId: ObjectId (ref: User),
  rating: Number (1-5),
  comment: String,
  createdAt: Date
}
\\\

### Chat Collection
\\\javascript
{
  complaintId: ObjectId (ref: Complaint, indexed),
  senderId: ObjectId (ref: User),
  message: String,
  timestamp: Date
}
\\\

## ?? API Endpoints

### Authentication
- \POST /api/auth/register\ - Register user
- \POST /api/auth/login\ - Login user
- \GET /api/auth/profile\ - Get user profile (Protected)

### Complaints
- \POST /api/complaints\ - Create complaint (Protected, USER)
- \GET /api/complaints\ - List complaints (Protected)
- \GET /api/complaints/:id\ - Get complaint (Protected)
- \PUT /api/complaints/:id/status\ - Update status (Protected, AGENT|ADMIN)
- \PUT /api/complaints/:id/assign\ - Assign to agent (Protected, ADMIN)

### Feedback
- \POST /api/feedback\ - Add feedback (Protected)
- \GET /api/feedback/:complaintId\ - Get feedbacks (Protected)

### Chat
- \POST /api/chat\ - Send message (Protected)
- \GET /api/chat/:complaintId\ - Get messages (Protected)

### Admin
- \POST /api/admin/agents\ - Create agent (Protected, ADMIN)
- \PUT /api/admin/agents/:id\ - Update agent (Protected, ADMIN)
- \DELETE /api/admin/agents/:id\ - Delete agent (Protected, ADMIN)
- \GET /api/admin/analytics\ - Get analytics (Protected, ADMIN)

## ?? Testing

### Postman Testing
1. Import \postman_collection.json\ into Postman
2. Set base URL and authentication token
3. Run all endpoints
4. See [TESTING_GUIDE.md](TESTING_GUIDE.md) for detailed tests

### Frontend Testing
- Manual testing of all user flows
- Test protected routes
- Verify error handling
- Check responsive design

## ?? Features Checklist

### User Management
- [x] User registration
- [x] User login
- [x] User profile
- [x] Password hashing
- [x] JWT authentication

### Complaint Management
- [x] Create complaint
- [x] View complaints
- [x] Track status
- [x] File attachments
- [x] Pagination
- [x] Status filtering

### Agent Features
- [x] Agent dashboard
- [x] View assigned complaints
- [x] Update status
- [x] Chat with users
- [x] Performance tracking

### Admin Features
- [x] User management
- [x] Agent management
- [x] System analytics
- [x] Complaint overview
- [x] Trend charts
- [x] Agent performance

### Communication
- [x] Real-time chat
- [x] Message history
- [x] User-agent communication
- [x] Feedback system

### Analytics
- [x] Total statistics
- [x] Monthly trends
- [x] Agent performance
- [x] Resolution rates

## ?? Deployment

### Frontend Deployment (Vercel)
\\\ash
npm run build
# Deploy with Vercel CLI or GitHub integration
\\\

### Backend Deployment (Render)
\\\
Push to GitHub ? Connect Render ? Auto-deploy
See DEPLOYMENT.md for detailed steps
\\\

## ?? Best Practices Implemented

? Clean code architecture
? Separation of concerns (models, controllers, routes)
? Middleware pattern for cross-cutting concerns
? RESTful API design
? Error handling and logging
? Input validation
? Security measures
? Database indexing
? Pagination for large datasets
? Responsive design
? Protected routes
? Role-based access control
? Code comments and documentation

## ?? Contributing

This is an academic project for internship submission. Follow the existing code patterns and best practices.

## ?? License

MIT License - feel free to use this project

---

## ?? Support

For issues or questions:
1. Check the documentation files
2. Review the API documentation
3. Check error messages in console
4. Test with Postman collection

---

**Built with ?? for efficient complaint management**

**Version:** 1.0.0
**Last Updated:** 2026-06-12
**Status:** Production Ready ?
