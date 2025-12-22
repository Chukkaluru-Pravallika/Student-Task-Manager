# 📝 Student Task Manager

A full-stack task management web application built with React, Node.js, Express, and MongoDB. This project demonstrates end-to-end full-stack development skills including CRUD operations, state management, API integration.

## ✨ Features

### ✅ Core Features
- **Add Tasks** with title, description, due date, and priority (low/medium/high)
- **Edit Tasks** using a modal interface
- **Mark Complete/Uncomplete** with toggle functionality
- **Delete Tasks** with confirmation dialog
- **Filter Tasks** by status (All/Pending/Completed)
- **Sort Tasks** by priority or due date
- **Responsive Design** for both mobile and desktop
- **Persistent Storage** with MongoDB Atlas

### 🚀 Optional Features (Stretch Goals)
- User authentication with JWT (planned)
- Client-side task search
- Drag-and-drop task ordering
- Notifications for overdue tasks

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite for fast development
- **CSS3** with custom styling and responsive design
- **Fetch API** for HTTP requests
- **Date-fns** for date formatting

### Backend
- **Node.js** runtime environment
- **Express.js** web framework
- **MongoDB Atlas** cloud database
- **Mongoose** ODM for MongoDB
- **CORS** for cross-origin requests

### Development & Deployment
- **Git & GitHub** for version control
- **Postman** for API testing

## 📁 Project Structure
student-task-manager/
├── backend/
│ ├── server.js # Main Express server
│ ├── models/ # MongoDB models
│ │ └── Task.js # Task schema and model
│ ├── package.json # Backend dependencies
│ └── .env # Environment variables
├── frontend/
│ ├── src/
│ │ ├── components/ # React components
│ │ │ ├── Header.jsx
│ │ │ ├── AddTaskForm.jsx
│ │ │ ├── TaskList.jsx
│ │ │ ├── TaskCard.jsx
│ │ │ ├── FilterBar.jsx
│ │ │ └── EditModal.jsx
│ │ ├── services/
│ │ │ └── api.js # API service layer
│ │ ├── App.jsx # Main React component
│ │ ├── index.css # Global styles
│ │ └── main.jsx # React entry point
│ ├── package.json # Frontend dependencies
│ └── .env # Frontend environment variables
└── README.md # Project documentation

text

## 📋 Prerequisites

Before you begin, ensure you have installed:
- **Node.js** (v16 or higher)
- **npm** or **yarn**
- **Git**
- **MongoDB Atlas account** (free tier)

## ⚡ Quick Start

# Backend Setup
cd backend
npm install

# Start the backend server:
npm run dev
Backend will run on: http://localhost:5001

# Frontend Setup
cd frontend
npm install

# Start the frontend development server:
npm run dev
Frontend will run on: http://localhost:5173

# 📚 API Documentation
Base URL: /api
Endpoints
Tasks
GET /api/tasks - Get all tasks

http://localhost:5001/api/tasks
GET /api/tasks/:id - Get single task

http://localhost:5001/api/tasks/123
POST /api/tasks - Create new task

POST http://localhost:5001/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"New Task","description":"Task description","priority":"medium","dueDate":"2024-12-31"}'
PUT /api/tasks/:id - Update task

PUT http://localhost:5001/api/tasks/123 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
DELETE /api/tasks/:id - Delete task

DELETE http://localhost:5001/api/tasks/123

## 🗄️ Data Models
# Task Schema

{
  _id: ObjectId,
  title: String,
  description: String,
  priority: String, // 'low', 'medium', 'high'
  dueDate: Date,
  completed: Boolean,
  createdAt: Date,
  updatedAt: Date
}
