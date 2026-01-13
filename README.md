# TaskFlow AI - MERN Project

A complete project management application built with the MERN stack (MongoDB, Express, React, Node.js). This repository is organized as a clean monorepo with separate frontend and backend folders.

## 📁 Repository Structure

```
TaskFlow-AI/
├── client/          # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── public/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/          # Node.js + Express backend
│   ├── src/
│   │   ├── config/          # Database & config setup
│   │   ├── controllers/     # Route logic & business logic
│   │   ├── routes/          # API endpoints
│   │   ├── models/          # MongoDB schemas
│   │   ├── middleware/      # Auth, error handling
│   │   ├── utils/           # Helper functions
│   │   └── app.js           # Express app setup
│   ├── server.js            # Entry point
│   ├── package.json
│   ├── .env                 # Environment variables
│   └── .gitignore
│
├── README.md        # This file
└── .gitignore      # Root gitignore
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v16+)
- npm or yarn
- MongoDB (local or Atlas)

### Frontend Setup

```bash
cd client
npm install
npm run dev
```

Frontend runs on: `http://localhost:5173`

### Backend Setup

```bash
cd server
npm install
npm run dev
```

Backend runs on: `http://localhost:5000`

## 📚 Documentation

- **Client README:** See [client/](./client/) for frontend documentation
- **Component Guide:** Check [COMPONENTS.md](./client/COMPONENTS.md) for component documentation
- **Quick Start:** See [QUICK_START.md](./client/QUICK_START.md) for usage guide
- **Implementation Guide:** [IMPLEMENTATION_COMPLETE.md](./IMPLEMENTATION_COMPLETE.md) - Technical details
- **AI Assistant:** [AI_ASSISTANT_UPGRADE.md](./AI_ASSISTANT_UPGRADE.md) - Intelligent response system
- **Testing Guide:** [TESTING_GUIDE.md](./TESTING_GUIDE.md) - Comprehensive test cases
- **Quick Reference:** [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Quick lookup guide

## 🛠️ Tech Stack

### Frontend
- React 19.2.0
- Vite 7.2.4
- React Router DOM
- Pure CSS with CSS Variables

### Backend
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- CORS

## 📋 Available Scripts

### Client Commands
```bash
cd client
npm run dev         # Start dev server
npm run build       # Build for production
npm run lint        # Run ESLint
npm run preview     # Preview production build
```

### Server Commands
```bash
cd server
npm run dev         # Start dev server with nodemon
npm start           # Start production server
```

## 🔧 Environment Variables

### Server (.env)
Create a `.env` file in the `server/` folder:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskflow-ai
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
```

## ✨ Features

### Frontend
- 🔐 Authentication (Login/Register)
- 🏠 Dashboard with stats
- 📁 Project management
- 🧩 Kanban board
- 🤖 **AI Assistant with intelligent rule-based responses**
  - Smart keyword matching (6 response categories)
  - Automatic overdue task detection
  - Context-aware suggestions based on your data
  - Human-like, helpful tone
  - Always responds - no "not implemented" messages
- 📊 Analytics & Insights
- ⚙️ Settings management

### Backend (To Be Implemented)
- User authentication & JWT
- Project CRUD operations
- Task management
- Real-time updates
- Data validation
- Error handling

## 📈 Development Workflow

1. **Frontend Development** → Changes in `client/` folder
2. **Backend Development** → Changes in `server/` folder
3. **Integration** → Connect frontend APIs to backend endpoints

## 🚢 Deployment

### Frontend (Netlify/Vercel)
```bash
cd client
npm run build
# Deploy the dist/ folder
```

### Backend (Heroku/Railway/AWS)
```bash
cd server
npm start
# Set environment variables on hosting platform
```

## 📝 Project Status

- ✅ Frontend: Complete with all features
- 🔄 Backend: Basic structure ready, implementation pending

## 🤝 Contributing

1. Make changes in appropriate folder (client/ or server/)
2. Test thoroughly
3. Commit with descriptive messages
4. Push to repository

## 📄 License

MIT License - Feel free to use for learning and portfolio projects.

## 🎓 Learning Outcomes

- ✅ MERN stack architecture
- ✅ Monorepo organization
- ✅ Frontend-backend separation
- ✅ API integration patterns
- ✅ Full-stack development workflow

---

**Happy Coding!** 🎉
