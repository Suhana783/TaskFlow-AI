#!/bin/bash

# TaskFlow AI - Start with Real-Time Collaboration

echo "🚀 Starting TaskFlow AI with Real-Time Collaboration..."
echo ""

# Check if node_modules exist
if [ ! -d "server/node_modules" ]; then
    echo "📦 Installing server dependencies..."
    cd server && npm install && cd ..
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Installing client dependencies..."
    cd client && npm install && cd ..
fi

echo ""
echo "✅ Dependencies ready!"
echo ""
echo "Starting servers..."
echo "📡 Backend will run on http://localhost:5000"
echo "🌐 Frontend will run on http://localhost:5173"
echo ""
echo "To test real-time collaboration:"
echo "1. Open http://localhost:5173 in two different browser windows"
echo "2. Login and navigate to the same project in both windows"
echo "3. Create, move, or delete tasks in one window"
echo "4. Watch them sync instantly in the other window!"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Start both servers
cd server && npm run dev &
SERVER_PID=$!

cd client && npm run dev &
CLIENT_PID=$!

# Trap Ctrl+C to kill both processes
trap "kill $SERVER_PID $CLIENT_PID; exit" INT

# Wait for both processes
wait
