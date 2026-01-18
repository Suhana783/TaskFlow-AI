import { io } from 'socket.io-client';

// Create a single socket instance
const socket = io('http://localhost:5000', {
  autoConnect: true,
  reconnection: true,
  reconnectionDelay: 1000,
  reconnectionAttempts: 5
});

// Connection event handlers
socket.on('connect', () => {
  console.log('✅ Connected to Socket.IO server:', socket.id);
});

socket.on('disconnect', () => {
  console.log('❌ Disconnected from Socket.IO server');
});

socket.on('connect_error', (error) => {
  console.error('🔴 Socket connection error:', error);
});

export default socket;
