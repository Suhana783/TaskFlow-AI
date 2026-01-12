import { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import TaskCard from '../components/TaskCard';
import { useAuth } from '../context/AuthContext';
import './KanbanBoard.css';

const KanbanBoard = () => {
  const [searchParams] = useSearchParams();
  const projectId = parseInt(searchParams.get('project'));
  const { getUserData, saveUserData } = useAuth();
  
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium',
    dueDate: ''
  });

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
    setLoading(false);
  }, []);

  const projects = userData?.projects || [];
  const currentProject = projectId ? projects.find(p => p.id === projectId) : null;

  const handleMoveTask = (task, newStatus) => {
    if (!currentProject) return;

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: project.tasks.map(t => 
            t.id === task.id ? { ...t, status: newStatus } : t
          )
        };
      }
      return project;
    });

    const updatedData = {
      ...userData,
      projects: updatedProjects
    };

    saveUserData(updatedData);
    setUserData(updatedData);
  };

  const handleAddTask = (e) => {
    e.preventDefault();

    if (!newTask.title.trim()) {
      alert('Please enter a task title');
      return;
    }

    if (!currentProject) return;

    const task = {
      id: Date.now(),
      ...newTask,
      status: 'todo'
    };

    const updatedProjects = projects.map(project => {
      if (project.id === projectId) {
        return {
          ...project,
          tasks: [...project.tasks, task],
          totalTasks: (project.totalTasks || 0) + 1
        };
      }
      return project;
    });

    const updatedData = {
      ...userData,
      projects: updatedProjects
    };

    saveUserData(updatedData);
    setUserData(updatedData);
    setNewTask({ title: '', description: '', priority: 'medium', dueDate: '' });
    setShowAddTask(false);
  };

  if (loading) {
    return <div className="page-container"><p>Loading...</p></div>;
  }

  if (!currentProject) {
    return (
      <div className="page-container">
        <Navbar title="Kanban Board" />
        <div className="page-content">
          <div className="empty-state">
            <h3>Project not found</h3>
            <p>Please select a valid project</p>
            <Link to="/projects" className="btn-primary">Go to Projects</Link>
          </div>
        </div>
      </div>
    );
  }

  const todoTasks = (currentProject.tasks || []).filter(t => t.status === 'todo');
  const inProgressTasks = (currentProject.tasks || []).filter(t => t.status === 'in-progress');
  const doneTasks = (currentProject.tasks || []).filter(t => t.status === 'done');

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
                  key={task.id} 
                  task={task}
                  onMove={handleMoveTask}
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
                  key={task.id} 
                  task={task}
                  onMove={handleMoveTask}
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
                  key={task.id} 
                  task={task}
                  onMove={handleMoveTask}
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
                    type="text"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({...newTask, dueDate: e.target.value})}
                    placeholder="DD/MM/YYYY"
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
