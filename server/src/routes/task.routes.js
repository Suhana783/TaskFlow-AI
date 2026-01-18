import express from 'express';
import {
  createTask,
  getTasksByProject,
  getTasksByUser,
  getTask,
  updateTask,
  deleteTask
} from '../controllers/task.controller.js';

const router = express.Router();

// Create a new task
router.post('/', createTask);

// Get all tasks for a user (across all projects)
router.get('/user/:userId', getTasksByUser);

// Get all tasks for a project
router.get('/project/:projectId', getTasksByProject);

// Get a single task
router.get('/:taskId', getTask);

// Update a task
router.put('/:taskId', updateTask);

// Delete a task
router.delete('/:taskId', deleteTask);

export default router;
