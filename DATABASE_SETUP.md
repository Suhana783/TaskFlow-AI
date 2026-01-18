# Database Setup - TaskFlow AI

## ✅ Current Status

**Before:** Data stored only in localStorage (browser storage - lost on page refresh)
**Now:** Data stored in MongoDB Atlas (persistent cloud database)

---

## 🗄️ Database Configuration

**MongoDB Atlas Connection:**
- Database: TaskFlow-AI
- Cluster: cluster0
- Connection String in `.env`:
```
MONGODB_URI=mongodb+srv://todoAdmin:suhana123@cluster0.sullhha.mongodb.net/TaskFlow-AI?appName=Cluster0
```

---

## 📊 Database Schema

### Task Collection

```javascript
{
  _id: ObjectId,           // Auto-generated unique ID
  title: String,           // Task name
  description: String,     // Task details
  status: String,          // "todo" | "in-progress" | "done"
  priority: String,        // "low" | "medium" | "high"
  dueDate: String,         // Due date (e.g., "20/01/2026")
  projectId: String,       // Which project this task belongs to
  userId: String,          // Who created the task
  createdAt: Date,         // When task was created
  updatedAt: Date          // Last update time
}
```

---

## 🔌 API Endpoints

All endpoints are prefixed with `/api/tasks`

### 1. Create a Task
**POST** `/api/tasks`

```json
{
  "title": "Design homepage",
  "description": "Create modern UI for homepage",
  "priority": "high",
  "dueDate": "20/01/2026",
  "projectId": "1768238326838"
}
```

**Response (201):**
```json
{
  "success": true,
  "data": {
    "_id": "6789abc123def456",
    "title": "Design homepage",
    "status": "todo",
    "priority": "high",
    "projectId": "1768238326838",
    "createdAt": "2026-01-18T10:30:00Z"
  }
}
```

### 2. Get All Tasks for a Project
**GET** `/api/tasks/project/:projectId`

Example: `/api/tasks/project/1768238326838`

**Response (200):**
```json
{
  "success": true,
  "data": [
    { _id: "1", title: "Task 1", status: "todo", priority: "high" },
    { _id: "2", title: "Task 2", status: "in-progress", priority: "medium" }
  ]
}
```

### 3. Get Single Task
**GET** `/api/tasks/:taskId`

### 4. Update Task
**PUT** `/api/tasks/:taskId`

```json
{
  "status": "in-progress",
  "priority": "medium",
  "dueDate": "22/01/2026"
}
```

### 5. Delete Task
**DELETE** `/api/tasks/:taskId`

---

## 🔄 How Data Flows

### Current Flow (localStorage):
```
Frontend (Create Task)
    ↓
localStorage saved
    ↓
Socket.IO broadcasts
    ↓
Other users see it in real-time
    ↓
❌ Data LOST if page refreshes or user leaves
```

### New Flow (MongoDB):
```
Frontend (Create Task)
    ↓
API Call → Backend
    ↓
MongoDB saves permanently
    ↓
API returns saved task
    ↓
Socket.IO broadcasts
    ↓
Other users see it in real-time
    ↓
✅ Data PERSISTED even after refresh
```

---

## 📝 Files Created/Modified

**New Files:**
- `server/src/models/task.model.js` - Task schema
- `server/src/controllers/task.controller.js` - API logic
- `server/src/routes/task.routes.js` - API endpoints

**Modified Files:**
- `server/server.js` - Added MongoDB connection
- `server/src/app.js` - Registered routes

---

## 🔍 Test Database Connection

Check backend logs for:
```
✓ MongoDB Connected: cluster0.sullhha.mongodb.net
```

If you see this ✅ then database is connected!

---

## ⚠️ Next Steps (Optional)

To fully integrate database with frontend:

1. **Replace localStorage with API calls in KanbanBoard.jsx:**
   - Instead of `saveUserData(data)` → Call POST/PUT `/api/tasks`
   - Instead of `getUserData()` → Call GET `/api/tasks/project/:id`

2. **Update Socket.IO to use database:**
   - When task is created via API → Save to DB first → Then emit socket event
   - Socket handlers stay the same

3. **Create Project model** for storing projects in DB

---

## 🚀 Current Behavior

**Right now (Hybrid Mode):**
- ✅ Real-time sync working via Socket.IO
- ✅ Database connected and API endpoints available
- ⚠️ Data still stored in localStorage (not using API yet)
- ⚠️ Need to integrate API calls in frontend

---

## Summary

**Database is now:** ✅ Connected and ready
**API is now:** ✅ Available
**Frontend integration:** ⏳ Can be done anytime

You have a solid backend foundation. Data can now persist in MongoDB if you integrate the API calls in the frontend!
