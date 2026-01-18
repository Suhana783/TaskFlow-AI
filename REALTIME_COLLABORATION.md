# Real-Time Collaboration Guide

## Overview
TaskFlow AI now supports real-time collaboration using Socket.IO. Multiple users can work on the same project simultaneously and see updates instantly without page refresh.

## What's Real-Time?
✅ Task creation - See new tasks appear instantly
✅ Task updates - Status, priority, due date changes sync live
✅ Task movement - Watch tasks move across Kanban columns
✅ Task deletion - Tasks removed by others disappear immediately

## Architecture

### Backend (Socket.IO Server)
**File:** `server/server.js`

- HTTP server created from Express app
- Socket.IO attached with CORS for frontend
- Room-based broadcasting using project IDs
- Events: `join-project`, `task-created`, `task-updated`, `task-deleted`

### Frontend (Socket.IO Client)
**File:** `client/src/utils/socket.js`

- Single socket instance connected to backend
- Auto-reconnection enabled
- Connection logging for debugging

**File:** `client/src/pages/KanbanBoard.jsx`

- Joins project room on mount
- Listens for real-time events from other users
- Updates React state without API calls
- Emits events after local actions

## How It Works

### Flow for Task Creation:
1. User A creates a task
2. Task saved to localStorage (existing logic)
3. Socket emits `task-created` to server
4. Server broadcasts to all users in project room (except User A)
5. User B receives event and adds task to local state
6. UI updates instantly for User B

### Flow for Task Update/Move:
1. User A moves task to "In Progress"
2. State updated locally
3. Socket emits `task-updated` to server
4. Server broadcasts to room
5. All other users receive updated task
6. Tasks move across columns in real-time

### Flow for Task Deletion:
1. User A deletes a task
2. Task removed from local state
3. Socket emits `task-deleted` with taskId
4. Server broadcasts to room
5. Other users remove task from their state
6. Task disappears from all screens

## Key Features

### Duplicate Prevention
- Checks if task already exists before adding
- Uses task ID for unique identification

### State Management
- Updates React state using functional updates
- Saves to localStorage for persistence
- No race conditions or infinite loops

### Room Isolation
- Users only see updates from their project
- Project ID used as room identifier
- Secure and scoped broadcasting

## Testing Real-Time Features

### Setup:
1. Start backend: `cd server && npm run dev`
2. Start frontend: `cd client && npm run dev`
3. Open app in two browser windows (or different browsers)
4. Login to same project in both windows

### Test Cases:

**Test 1: Task Creation**
- Window 1: Click "Add Task" and create a new task
- Window 2: Task should appear instantly without refresh

**Test 2: Task Movement**
- Window 1: Move a task from "TO DO" to "IN PROGRESS"
- Window 2: Task should move to the same column immediately

**Test 3: Task Deletion**
- Window 1: Click delete button (🗑️) on any task
- Window 2: Task should disappear instantly

**Test 4: Multiple Operations**
- Perform rapid task operations in Window 1
- Window 2 should stay synchronized throughout

## Troubleshooting

### Socket not connecting?
- Check if backend is running on port 5000
- Verify CORS origin matches frontend URL (default: http://localhost:5173)
- Look for connection logs in browser console

### Updates not syncing?
- Verify both users are in the same project
- Check browser console for socket events
- Ensure `join-project` event was emitted with correct projectId

### Duplicate tasks appearing?
- This is prevented by checking task.id before adding
- If it happens, clear localStorage and refresh

## Configuration

### Change Backend Port:
In `server/server.js`:
```javascript
const PORT = process.env.PORT || 5000;
```

### Change Frontend Socket URL:
In `client/src/utils/socket.js`:
```javascript
const socket = io('http://localhost:5000', {
  // ... options
});
```

### Update CORS Origin:
In `server/server.js`:
```javascript
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // Change this
    // ...
  }
});
```

## What's NOT Included (By Design)

❌ Chat/messaging
❌ Comments on tasks
❌ Notifications
❌ User presence indicators
❌ Cursor tracking
❌ Conflict resolution for simultaneous edits

These were intentionally excluded to keep the implementation minimal and focused.

## Future Enhancements

Possible additions (not implemented):
- User avatars showing who's online
- Task edit locking (prevent simultaneous edits)
- Activity feed/history
- Real-time notifications
- Undo/redo synchronization

## Code Locations

**Backend:**
- `server/server.js` - Socket.IO setup and event handlers
- `server/package.json` - Added `socket.io` dependency

**Frontend:**
- `client/src/utils/socket.js` - Socket instance
- `client/src/pages/KanbanBoard.jsx` - Real-time integration
- `client/src/components/TaskCard.jsx` - Delete button added
- `client/package.json` - Added `socket.io-client` dependency

## Summary

Real-time collaboration is now live! The implementation is:
- ✅ Minimal (only task operations)
- ✅ Clean (no code rewrites)
- ✅ Modular (easy to extend)
- ✅ Reliable (room-based isolation)
- ✅ Fast (instant updates)

Users can now collaborate on projects like Trello/Jira with instant synchronization.
