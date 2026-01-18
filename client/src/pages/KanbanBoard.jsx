import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';
import socket from '../utils/socket';
import taskAPI from '../utils/taskAPI';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [searchParams] = useSearchParams();
  const projectId = parseInt(searchParams.get('project'));
  const { getUserData, saveUserData, currentUser } = useAuth();
  
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  // Load user data and tasks from database
  useEffect(() => {
    const data = getUserData();
    setUserData(data);
    
    // Load tasks from database
    if (projectId) {
      loadTasksFromDatabase();
    }
    setLoading(false);
  }, [projectId]);

  // Load tasks from database
  const loadTasksFromDatabase = async () => {
    try {
      console.log('📦 Loading tasks from database for project:', projectId);
      const dbTasks = await taskAPI.getTasksByProject(projectId);
      setTasks(dbTasks);
      console.log('✅ Loaded', dbTasks.length, 'tasks from database');
    } catch (error) {
      console.error('❌ Error loading tasks:', error);
      setTasks([]);
    }
  };

  // Socket.IO: Join project room and listen for real-time updates from other users
  useEffect(() => {
    if (!projectId) return;

    // Join the project room
    socket.emit('join-project', projectId);
    console.log(`🔌 Joined project room: ${projectId}`);

    // Listen for task created by other users
    const handleTaskCreated = ({ task }) => {
      console.log('📥 Received task-created from other user:', task);
      
      // Add task to local state (avoid duplicates by checking _id)
      setTasks((prevTasks) => {
        const taskExists = prevTasks.some(t => t._id === task._id);
        if (taskExists) return prevTasks;
        return [...prevTasks, task];
      });
    };

    // Listen for task updated by other users
    const handleTaskUpdated = ({ task }) => {
      console.log('📥 Received task-updated from other user:', task);
      
      // Update task in local state
      setTasks((prevTasks) =>
        prevTasks.map(t => t._id === task._id ? task : t)
      );
    };

    // Listen for task deleted by other users
    const handleTaskDeleted = ({ taskId }) => {
      console.log('📥 Received task-deleted from other user:', taskId);
      
      // Remove task from local state
      setTasks((prevTasks) =>
        prevTasks.filter(t => t._id !== taskId)
      );
    };

    // Register event listeners
    socket.on('task-created', handleTaskCreated);
    socket.on('task-updated', handleTaskUpdated);
    socket.on('task-deleted', handleTaskDeleted);

    // Cleanup on unmount
    return () => {
      socket.off('task-created', handleTaskCreated);
      socket.off('task-updated', handleTaskUpdated);
      socket.off('task-deleted', handleTaskDeleted);
    };
  }, [projectId]);

  const handleMoveTask = async (task, newStatus) => {
    try {
      console.log('🔄 Moving task to:', newStatus);
      
      // Update in database
      const updatedTask = await taskAPI.updateTask(task._id, {
        ...task,
        status: newStatus
      });

      // Update local state
      setTasks(prevTasks =>
        prevTasks.map(t => t._id === task._id ? updatedTask : t)
      );

      // Emit socket event to notify other users
      socket.emit('task-updated', {
        projectId,
        task: updatedTask
      });

      console.log('✅ Task moved successfully');
    } catch (error) {
      console.error('❌ Error moving task:', error);
      alert('Failed to move task');
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    // Validate due date is not in the past
    if (newTask.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // Parse the date (assuming format DD/MM/YYYY or YYYY-MM-DD)
      let taskDueDate;
      if (newTask.dueDate.includes('/')) {
        const [day, month, year] = newTask.dueDate.split('/');
        taskDueDate = new Date(year, month - 1, day);
      } else {
        taskDueDate = new Date(newTask.dueDate);
      }
      taskDueDate.setHours(0, 0, 0, 0);
      
      if (taskDueDate < today) {
        alert('Due date cannot be in the past');
        return;
      }
    }

    try {
      console.log('📝 Creating task...');
      
      // Save to database
      const createdTask = await taskAPI.createTask({
        title: newTask.title,
        description: newTask.description,
        priority: newTask.priority,
        dueDate: newTask.dueDate,
        projectId: projectId,
        userId: currentUser?.email || currentUser?.id || '',
        status: 'todo'
      });

      // Add to local state
      setTasks(prevTasks => [...prevTasks, createdTask]);
      
      // Reset form
      setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
      setShowAddTask(false);

      // Emit socket event to notify other users
      socket.emit('task-created', {
        projectId,
        task: createdTask
      });

      console.log('✅ Task created successfully');
    } catch (error) {
      console.error('❌ Error creating task:', error);
      alert(error.message || 'Failed to create task');
    }
  };

  const handleDeleteTask = async (task) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${task.title}"?`);
    if (!confirmDelete) return;

    try {
      console.log('🗑️ Deleting task...');
      
      // Delete from database
      await taskAPI.deleteTask(task._id);

      // Remove from local state
      setTasks(prevTasks => prevTasks.filter(t => t._id !== task._id));

      // Emit socket event to notify other users
      socket.emit('task-deleted', {
        projectId,
        taskId: task._id
      });

      console.log('✅ Task deleted successfully');
    } catch (error) {
      console.error('❌ Error deleting task:', error);
      alert('Failed to delete task');
    }
  };

  if (loading) {
    return <div className="page-container"><p>Loading...</p></div>;
  }

  const currentProject = userData?.projects?.find(p => p.id === projectId);

  if (!currentProject) {
    return (
      <div className="page-container">
        <Navbar title="Kanban Board" />
        <div className="page-content">
          <div className="empty-state">
            <h3>Project not found</h3>
            <Link to="/projects" className="btn-primary" style={{ marginTop: '1rem' }}>Go to Projects</Link>
          </div>
        </div>
      </div>
    );
  }

  // Filter tasks by status
  const todoTasks = tasks.filter(t => t.status === 'todo');
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress');
  const doneTasks = tasks.filter(t => t.status === 'done');

  return (
    <div className="page-container">
      <Navbar 
        title={currentProject.name} 
        subtitle="Redesign the company website with modern UI/UX"
      />
      
      <div className="page-content">
        <div className="kanban-header">
          <Link to="/projects" className="back-link">← Back to Projects</Link>
          <button 
            onClick={() => setShowAddTask(true)}
            className="add-task-btn"
          >
            ➕ Add Task
          </button>
        </div>

        <div className="kanban-board">
          {/* TO DO Column */}
          <div className="kanban-column">
            <div className="column-header">
              <h3 className="column-title">TO DO</h3>
              <span className="column-count">{todoTasks.length}</span>
            </div>
            <div className="column-content">
              {todoTasks.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task}
                  onMove={handleMoveTask}
                  onDelete={handleDeleteTask}
                />
              ))}
              {todoTasks.length === 0 && (
                <div className="empty-column">No tasks</div>
              )}
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className="kanban-column">
            <div className="column-header in-progress">
              <h3 className="column-title">IN PROGRESS</h3>
              <span className="column-count">{inProgressTasks.length}</span>
            </div>
            <div className="column-content">
              {inProgressTasks.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task}
                  onMove={handleMoveTask}
                  onDelete={handleDeleteTask}
                />
              ))}
              {inProgressTasks.length === 0 && (
                <div className="empty-column">No tasks</div>
              )}
            </div>
          </div>

          {/* DONE Column */}
          <div className="kanban-column">
            <div className="column-header done">
              <h3 className="column-title">DONE</h3>
              <span className="column-count">{doneTasks.length}</span>
            </div>
            <div className="column-content">
              {doneTasks.map(task => (
                <TaskCard 
                  key={task._id} 
                  task={task}
                  onMove={handleMoveTask}
                  onDelete={handleDeleteTask}
                />
              ))}
              {doneTasks.length === 0 && (
                <div className="empty-column">No tasks</div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div className="modal-overlay" onClick={() => setShowAddTask(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Add New Task</h2>
              <button 
                className="modal-close"
                onClick={() => setShowAddTask(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleAddTask} className="modal-form">
              <div className="form-group">
                <label>Task Title</label>
                <input
                  type="text"
                  value={newTask.title}
                  onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                  placeholder="Enter task title"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                  placeholder="Describe the task"
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Priority</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Due Date</label>
                  <input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    min={new Date().toISOString().split('T')[0]}
                    required
                  />
                </div>
              </div>

              <div className="modal-actions">
                <button 
                  type="button"
                  onClick={() => setShowAddTask(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Add Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default KanbanBoard;
