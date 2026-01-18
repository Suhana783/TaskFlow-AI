import { createServer } from 'http';
import { Server } from 'socket.io';
import app from './src/app.js';
import connectDB from './src/config/db.js';

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Create HTTP server
const httpServer = createServer(app);

// Attach Socket.IO with CORS configuration
const io = new Server(httpServer, {
  cors: {
    origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"],
    methods: ["GET", "POST"],
    credentials: true
  }
});

// Socket.IO connection handler
io.on('connection', (socket) => {
  console.log('🔌 User connected:', socket.id);

  // Join project room
  socket.on('join-project', (projectId) => {
    socket.join(`project-${projectId}`);
    console.log(`📂 User ${socket.id} joined project-${projectId}`);
  });

  // Task created event
  socket.on('task-created', ({ projectId, task }) => {
    socket.to(`project-${projectId}`).emit('task-created', { task });
    console.log(`✅ Task created in project-${projectId}:`, task.title);
  });

  // Task updated event
  socket.on('task-updated', ({ projectId, task }) => {
    socket.to(`project-${projectId}`).emit('task-updated', { task });
    console.log(`📝 Task updated in project-${projectId}:`, task.title);
  });

  // Task deleted event
  socket.on('task-deleted', ({ projectId, taskId }) => {
    socket.to(`project-${projectId}`).emit('task-deleted', { taskId });
    console.log(`🗑️ Task deleted in project-${projectId}:`, taskId);
  });

  // Disconnect handler
  socket.on('disconnect', () => {
    console.log('🔌 User disconnected:', socket.id);
  });
});

httpServer.listen(PORT, () => {
  console.log(`🚀 TaskFlow AI Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`⚡ Socket.IO enabled for real-time collaboration`);
});
