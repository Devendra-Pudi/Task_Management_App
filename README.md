# TaskMagic - Modern Task Management Application

TaskMagic is a full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). It offers a beautiful, intuitive interface for managing tasks with features like drag-and-drop organization, real-time updates, and team collaboration.

## 🎯 Introduction

TaskMagic revolutionizes the way you manage tasks and projects. With its modern interface and powerful features, it helps individuals and teams stay organized, meet deadlines, and boost productivity. The application combines the best of Kanban-style organization with intuitive task management, making it perfect for both personal and professional use.

## 🌐 Live Demo

Experience TaskMagic in action:
- **Live Site**: [TaskMagic App](https://taskmagic-app-devendra-pudi.netlify.app)
- **Demo Account**:
  - Email: demo@taskmagic.com
  - Password: Demo@12345
- Maybe start with your Own Account !!
![TaskMagic LandingPage](frontend/public/image.png)

![TaskMagic Logo](frontend/public/task.png)

## 🌟 Features

- **User Authentication**
  - Secure signup and login
  - JWT-based authentication
  - Password recovery via email

- **Task Management**
  - Create, update, and delete tasks
  - Drag-and-drop task organization
  - Task categories and priority levels
  - Due date tracking
  - Task status updates

- **User Interface**
  - Modern, responsive design
  - Dark/Light mode support
  - Intuitive navigation
  - Real-time updates
  - Interactive notifications

- **Additional Features**
  - User feedback system
  - Email notifications
  - Performance analytics
  - Mobile-responsive design

## 🚀 Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Framer Motion
- Axios
- React Router DOM

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Nodemailer
- Socket.io

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB
- Git

### Setting Up the Project

1. **Clone the Repository**
   ```bash
   git clone https://github.com/Devendra-Pudi/Task_Management_App.git
   cd Task_Management_App
   ```

2. **Backend Setup**
   ```bash
   # Navigate to backend directory
   cd backend

   # Install dependencies
   npm install

   # Create .env file
   cp .env.template .env

   # Update .env with your values
   # Edit the .env file with your configuration
   ```

3. **Frontend Setup**
   ```bash
   # Navigate to frontend directory
   cd ../frontend

   # Install dependencies
   npm install

   # Create .env file
   cp .env.development.template .env.development
   ```

4. **Environment Variables**

   Backend (.env):
   ```
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your_email
   EMAIL_PASS=your_app_specific_password
   FRONTEND_URL=http://localhost:3000
   ```

   Frontend (.env.development):
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_APP_ENV=development
   ```

5. **Running the Application**

   Development Mode:
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm run dev

   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

   Production Mode:
   ```bash
   # Backend
   cd backend
   npm start

   # Frontend
   cd frontend
   npm run build
   ```

## 🌐 Deployment

### Backend Deployment (Render)
1. Create a [Render](https://render.com) account
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - Environment: `Node.js`
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Set up environment variables in Render dashboard:
   ```
   NODE_ENV=production
   PORT=10000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   FRONTEND_URL=https://taskmagic-app-devendra-pudi.netlify.app
   ```
6. Deploy the backend service

### Frontend Deployment (Netlify)
1. Create a [Netlify](https://netlify.app) account
2. Import your GitHub repository
3. Configure build settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. Set up environment variables:
   ```
   VITE_API_URL=https://task-management-app-1-nmv7.onrender.com/api
   VITE_APP_ENV=production
   ```
5. Deploy the frontend application
6. Configure custom domain (optional)

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Task Endpoints
- `GET /api/tasks` - Get all tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task

### User Endpoints
- `GET /api/user/profile` - Get user profile
- `PUT /api/user/profile` - Update user profile

### Feedback Endpoints
- `POST /api/feedback` - Submit feedback
- `GET /api/feedback` - Get feedback (admin only)

## 👤 Author

**Devendra Prasad Pudi**
- Full Stack Developer
- GitHub: [@Devendra-Pudi](https://github.com/Devendra-Pudi)

## 📞 Support

For support, email [pudidevendraprasad@gmail.com] or join our Slack channel.

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Made with ❤️ by Devendra Prasad Pudi
