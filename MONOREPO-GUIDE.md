# Monorepo Migration Guide

## What Changed?

Your TaskFlow AI repository has been successfully restructured into a clean monorepo with separate `client/` and `server/` folders.

## 📁 New Structure

```
TaskFlow-AI/
├── client/                 # React + Vite Frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── data/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   ├── index.css
│   │   └── App.css
│   ├── public/
│   ├── node_modules/
│   ├── index.html
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── eslint.config.js
│
├── server/                 # Node.js + Express Backend
│   ├── src/
│   │   ├── config/         # DB & configuration
│   │   │   └── db.js
│   │   ├── controllers/    # Route logic
│   │   │   └── example.controller.js
│   │   ├── routes/         # Express routes
│   │   │   └── example.routes.js
│   │   ├── models/         # MongoDB schemas
│   │   │   └── example.model.js
│   │   ├── middleware/     # Auth & error handling
│   │   │   └── auth.middleware.js
│   │   ├── utils/          # Helpers
│   │   │   └── helpers.js
│   │   └── app.js          # Express app setup
│   ├── server.js           # Entry point
│   ├── package.json
│   ├── package-lock.json
│   ├── .env                # Environment variables
│   └── .gitignore
│
├── README.md               # Root documentation (new)
└── .gitignore             # Updated root gitignore
```

## ✅ Migration Checklist

### ✓ Completed
- [x] Created `client/` folder with all frontend files
- [x] Created `server/` folder with backend structure
- [x] Moved React files to `client/src/`
- [x] Moved Node dependencies to respective folders
- [x] Created server folder structure (config, controllers, routes, models, middleware, utils)
- [x] Created server entry files (server.js, app.js, .env)
- [x] Updated root .gitignore
- [x] Created root README.md with monorepo documentation

### ✓ Server Files Created
- `server/package.json` - Backend dependencies
- `server/server.js` - Entry point
- `server/src/app.js` - Express app setup
- `server/src/config/db.js` - MongoDB connection
- `server/src/controllers/` - Example controller template
- `server/src/routes/` - Example route template
- `server/src/models/` - Example model template
- `server/src/middleware/` - Auth middleware template
- `server/src/utils/` - Helper functions template
- `server/.env` - Environment variables template
- `server/.gitignore` - Server-specific gitignore

## 🚀 How to Run

### Start Both Client and Server

**Terminal 1 - Frontend:**
```bash
cd client
npm install  # If not already done
npm run dev
```
Frontend: `http://localhost:5173`

**Terminal 2 - Backend:**
```bash
cd server
npm install  # First time only
npm run dev
```
Backend: `http://localhost:5000`

## 🔑 Key Points

### File Locations

| What | Where Before | Where Now |
|------|-------------|----------|
| React components | `/src/components/` | `/client/src/components/` |
| React pages | `/src/pages/` | `/client/src/pages/` |
| React data | `/src/data/` | `/client/src/data/` |
| React styles | `/src/*.css` | `/client/src/*.css` |
| package.json (frontend) | `/package.json` | `/client/package.json` |
| Vite config | `/vite.config.js` | `/client/vite.config.js` |
| Node dependencies (frontend) | `/node_modules/` | `/client/node_modules/` |
| Backend code | N/A (new) | `/server/src/` |
| Backend entry | N/A (new) | `/server/server.js` |
| Backend dependencies | N/A (new) | `/server/node_modules/` |

### Development

**For Frontend Changes:**
- Edit files in `client/src/`
- Dev server automatically reloads

**For Backend Changes:**
- Edit files in `server/src/`
- Use `npm run dev` for auto-reload with nodemon

**For Adding Packages:**

Frontend:
```bash
cd client
npm install package-name
```

Backend:
```bash
cd server
npm install package-name
```

## 📝 Environment Setup

### Frontend (.env if needed)
Create `.env` in `client/` if you need to set backend API URL:
```
VITE_API_URL=http://localhost:5000/api
```

### Backend (.env - already created)
File: `server/.env`
```
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/taskflow-ai
JWT_SECRET=your_jwt_secret_key_here
CLIENT_URL=http://localhost:5173
```

## 🔄 Git Workflow

The monorepo structure works seamlessly with git:

```bash
# In root directory
git add .
git commit -m "Restructure: Organize monorepo with client/ and server/ separation"
git push origin main
```

Both client and server changes can be committed together or separately.

## 📚 Documentation

- **Root README:** [README.md](../README.md)
- **Frontend Docs:** Check original docs in `client/` folder
- **Backend Docs:** To be added as you implement features

## 🎯 Next Steps

### Immediate
1. ✅ Verify client still runs: `cd client && npm run dev`
2. ✅ Server structure is ready for development

### For Backend Development
1. Update `server/src/app.js` with real routes
2. Create actual MongoDB models in `server/src/models/`
3. Implement controllers with business logic
4. Create Express routes
5. Add authentication middleware
6. Connect frontend APIs to backend

### For Integration
1. Frontend will call APIs at `http://localhost:5000/api`
2. Use environment variables for flexibility
3. Test CORS settings in `server/src/app.js`

## ✨ Benefits of This Structure

✅ **Clarity** - Clear separation of concerns
✅ **Scalability** - Easy to add more backend services
✅ **Maintainability** - Each part has its own package.json
✅ **Deployment** - Can deploy client and server independently
✅ **Development** - Team members can work on frontend/backend separately

## 🆘 Troubleshooting

### Port Already in Use
If ports 5173 or 5000 are already in use:

Frontend:
```bash
cd client
npm run dev -- --port 3000
```

Backend:
```bash
cd server
PORT=5001 npm run dev
```

### node_modules Issues
If there are issues with dependencies:

```bash
# Frontend
cd client
rm -rf node_modules package-lock.json
npm install

# Backend
cd server
rm -rf node_modules package-lock.json
npm install
```

### Git Issues
If git tracking seems off:
```bash
# In root directory
git status  # Should show files in client/ and server/
git log --oneline  # Should show your commits
```

---

Your monorepo is now properly structured and ready for full-stack development! 🎉
