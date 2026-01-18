// Task API Service
// Handles all API calls to the backend

const API_BASE_URL = 'http://localhost:5000/api/tasks';

export const taskAPI = {
  // Create a new task
  createTask: async (taskData) => {
    try {
      const response = await fetch(API_BASE_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(taskData)
      });

      if (!response.ok) throw new Error('Failed to create task');
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error creating task:', error);
      throw error;
    }
  },

  // Get all tasks for a project
  getTasksByProject: async (projectId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/project/${projectId}`);

      if (!response.ok) throw new Error('Failed to fetch tasks');
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('❌ Error fetching tasks:', error);
      return [];
    }
  },

  // Get all tasks for a user (across all projects)
  getTasksByUser: async (userId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/${userId}`);

      if (!response.ok) throw new Error('Failed to fetch user tasks');
      const result = await response.json();
      return result.data || [];
    } catch (error) {
      console.error('❌ Error fetching user tasks:', error);
      return [];
    }
  },

  // Update a task
  updateTask: async (taskId, updateData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) throw new Error('Failed to update task');
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error updating task:', error);
      throw error;
    }
  },

  // Delete a task
  deleteTask: async (taskId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to delete task');
      const result = await response.json();
      return result.data;
    } catch (error) {
      console.error('❌ Error deleting task:', error);
      throw error;
    }
  }
};

export default taskAPI;
