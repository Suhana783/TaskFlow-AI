import Task from '../models/task.model.js';

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, projectId, userId } = req.body;

    // Validate due date is not in the past
    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskDueDate = new Date(dueDate);
      taskDueDate.setHours(0, 0, 0, 0);
      
      if (taskDueDate < today) {
        return res.status(400).json({
          success: false,
          error: 'Due date cannot be in the past'
        });
      }
    }

    const task = new Task({
      title,
      description,
      priority,
      dueDate,
      projectId,
      userId: userId || '',
      status: 'todo'
    });

    const savedTask = await task.save();
    res.status(201).json({
      success: true,
      data: savedTask
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get all tasks for a project
export const getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;
    const tasks = await Task.find({ projectId });

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get a single task
export const getTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, description, status, priority, dueDate } = req.body;

    // Validate due date is not in the past (if being updated)
    if (dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const taskDueDate = new Date(dueDate);
      taskDueDate.setHours(0, 0, 0, 0);
      
      if (taskDueDate < today) {
        return res.status(400).json({
          success: false,
          error: 'Due date cannot be in the past'
        });
      }
    }

    const task = await Task.findByIdAndUpdate(
      taskId,
      {
        title,
        description,
        status,
        priority,
        dueDate,
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByIdAndDelete(taskId);

    if (!task) {
      return res.status(404).json({
        success: false,
        error: 'Task not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Task deleted successfully',
      data: task
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

// Get all tasks for a user (across all projects)
export const getTasksByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const tasks = await Task.find({ userId });

    res.status(200).json({
      success: true,
      data: tasks
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
