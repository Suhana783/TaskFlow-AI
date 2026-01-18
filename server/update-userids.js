import mongoose from 'mongoose';
import Task from './src/models/task.model.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/taskflow';

async function updateUserIds() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Get the email from command line argument or use default
    const userEmail = process.argv[2];
    
    if (!userEmail) {
      console.error('❌ Please provide user email as argument');
      console.log('Usage: node update-userids.js your-email@example.com');
      process.exit(1);
    }

    console.log(`🔄 Updating tasks with userId: ${userEmail}`);

    // Update all tasks with empty userId
    const result = await Task.updateMany(
      { $or: [{ userId: '' }, { userId: { $exists: false } }] },
      { $set: { userId: userEmail } }
    );

    console.log(`✅ Updated ${result.modifiedCount} tasks`);

    // Verify the update
    const tasks = await Task.find({ userId: userEmail });
    console.log(`\n✓ Verification: Found ${tasks.length} tasks for ${userEmail}`);
    tasks.forEach(task => {
      console.log(`  - ${task.title} (${task.status})`);
    });

    await mongoose.disconnect();
    console.log('\n✅ Done!');
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

updateUserIds();
