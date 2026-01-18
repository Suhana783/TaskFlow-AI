import mongoose from 'mongoose';
import Task from './src/models/task.model.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow';

async function fixUserIds() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Find all tasks
    const tasks = await Task.find({});
    console.log(`📋 Found ${tasks.length} tasks`);

    // Update tasks with empty or numeric userId
    let updatedCount = 0;
    for (const task of tasks) {
      // If userId is empty, missing, or looks like a numeric ID
      if (!task.userId || task.userId.trim() === '' || !task.userId.includes('@')) {
        // Set a placeholder - you'll need to update this with your actual email
        console.log(`⚠️  Task "${task.title}" has userId: "${task.userId}"`);
        console.log(`   Please update manually with correct email`);
      } else {
        console.log(`✓ Task "${task.title}" has valid userId: ${task.userId}`);
      }
    }

    console.log('\n📊 Summary:');
    console.log(`Total tasks: ${tasks.length}`);
    console.log(`Updated: ${updatedCount}`);

    // Show all unique userIds in the database
    const userIds = [...new Set(tasks.map(t => t.userId).filter(Boolean))];
    console.log('\n🔑 Unique userIds found:');
    userIds.forEach(id => console.log(`  - ${id}`));

    await mongoose.disconnect();
    console.log('\n✅ Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

fixUserIds();
