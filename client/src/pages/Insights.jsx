import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import taskAPI from '../utils/taskAPI';
import socket from '../utils/socket';
import './Insights.css';

const Insights = () => {
  const { getUserData, currentUser } = useAuth();
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from API
  const loadTasks = async () => {
    if (!currentUser) return;
    
    try {
      // Use email as primary userId for consistency
      const userId = currentUser.email || currentUser.id;
      console.log('📈 Insights loading tasks for userId:', userId);
      const userTasks = await taskAPI.getTasksByUser(userId);
      console.log('📈 Insights loaded tasks:', userTasks.length);
      setTasks(userTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks([]);
    }
  };

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
    
    // Load tasks from API
    loadTasks();
    setLoading(false);
  }, [currentUser]);

  // Listen for real-time task updates
  useEffect(() => {
    const handleTaskCreated = () => {
      loadTasks();
    };

    const handleTaskUpdated = () => {
      loadTasks();
    };

    const handleTaskDeleted = () => {
      loadTasks();
    };

    socket.on('task-created', handleTaskCreated);
    socket.on('task-updated', handleTaskUpdated);
    socket.on('task-deleted', handleTaskDeleted);

    return () => {
      socket.off('task-created', handleTaskCreated);
      socket.off('task-updated', handleTaskUpdated);
      socket.off('task-deleted', handleTaskDeleted);
    };
  }, [currentUser]);

  if (loading) {
    return <div className="page-container"><p>Loading...</p></div>;
  }

  const projects = userData?.projects || [];
  const hasData = tasks.length > 0;

  if (!hasData) {
    return (
      <div className="page-container">
        <Navbar 
          title="Progress & Insights" 
          subtitle="Analytics and recommendations for your projects" 
        />
        
        <div className="page-content">
          <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#666' }}>
            <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>📊 No data yet</p>
            <p style={{ color: '#999', marginBottom: '2rem' }}>Create projects and tasks to see insights and analytics</p>
          </div>
        </div>
      </div>
    );
  }

  // Calculate stats from actual tasks data
  const todoTasks = tasks.filter(t => t.status === 'todo').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  const doneTasks = tasks.filter(t => t.status === 'done').length;
  const totalTasks = tasks.length;

  const highPriorityTasks = tasks.filter(t => t.priority === 'high').length;
  const mediumPriorityTasks = tasks.filter(t => t.priority === 'medium').length;
  const lowPriorityTasks = tasks.filter(t => t.priority === 'low').length;

  // Group tasks by project for project completion chart
  const tasksByProject = {};
  tasks.forEach(task => {
    if (!tasksByProject[task.projectId]) {
      tasksByProject[task.projectId] = {
        total: 0,
        done: 0
      };
    }
    tasksByProject[task.projectId].total++;
    if (task.status === 'done') {
      tasksByProject[task.projectId].done++;
    }
  });

  return (
    <div className="page-container">
      <Navbar 
        title="Progress & Insights" 
        subtitle="Analytics and recommendations for your projects" 
      />
      
      <div className="page-content">
        <div className="insights-grid">
          {/* Tasks by Status */}
          <div className="insight-card">
            <h3 className="insight-title">Tasks by Status</h3>
            <div className="chart-container">
              <div className="pie-chart">
                <div className="chart-item">
                  <div 
                    className="chart-color-box" 
                    style={{ backgroundColor: '#3b82f6' }}
                  ></div>
                  <span className="chart-label">To Do: {todoTasks}</span>
                </div>
                <div className="chart-item">
                  <div 
                    className="chart-color-box" 
                    style={{ backgroundColor: '#fbbf24' }}
                  ></div>
                  <span className="chart-label">In Progress: {inProgressTasks}</span>
                </div>
                <div className="chart-item">
                  <div 
                    className="chart-color-box" 
                    style={{ backgroundColor: '#10b981' }}
                  ></div>
                  <span className="chart-label">Done: {doneTasks}</span>
                </div>
              </div>
              <div className="pie-visual">
                {todoTasks > 0 && (
                  <div className="pie-segment blue" style={{ '--percentage': `${(todoTasks / totalTasks) * 100}%` }}>
                    <span>To Do: {todoTasks}</span>
                  </div>
                )}
                {inProgressTasks > 0 && (
                  <div className="pie-segment yellow" style={{ '--percentage': `${(inProgressTasks / totalTasks) * 100}%` }}>
                    <span>In Progress: {inProgressTasks}</span>
                  </div>
                )}
                {doneTasks > 0 && (
                  <div className="pie-segment green" style={{ '--percentage': `${(doneTasks / totalTasks) * 100}%` }}>
                    <span>Done: {doneTasks}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tasks by Priority */}
          <div className="insight-card">
            <h3 className="insight-title">Tasks by Priority</h3>
            <div className="chart-container">
              <div className="pie-chart">
                <div className="chart-item">
                  <div 
                    className="chart-color-box" 
                    style={{ backgroundColor: '#ef4444' }}
                  ></div>
                  <span className="chart-label">High: {highPriorityTasks}</span>
                </div>
                <div className="chart-item">
                  <div 
                    className="chart-color-box" 
                    style={{ backgroundColor: '#fbbf24' }}
                  ></div>
                  <span className="chart-label">Medium: {mediumPriorityTasks}</span>
                </div>
                <div className="chart-item">
                  <div 
                    className="chart-color-box" 
                    style={{ backgroundColor: '#3b82f6' }}
                  ></div>
                  <span className="chart-label">Low: {lowPriorityTasks}</span>
                </div>
              </div>
              <div className="pie-visual">
                {highPriorityTasks > 0 && (
                  <div className="pie-segment red" style={{ '--percentage': `${(highPriorityTasks / totalTasks) * 100}%` }}>
                    <span>High: {highPriorityTasks}</span>
                  </div>
                )}
                {mediumPriorityTasks > 0 && (
                  <div className="pie-segment yellow" style={{ '--percentage': `${(mediumPriorityTasks / totalTasks) * 100}%` }}>
                    <span>Medium: {mediumPriorityTasks}</span>
                  </div>
                )}
                {lowPriorityTasks > 0 && (
                  <div className="pie-segment blue" style={{ '--percentage': `${(lowPriorityTasks / totalTasks) * 100}%` }}>
                    <span>Low: {lowPriorityTasks}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Project Completion Status */}
        {projects.length > 0 && Object.keys(tasksByProject).length > 0 && (
          <div className="insight-card full-width">
            <h3 className="insight-title">Project Completion Status</h3>
            <div className="bar-chart">
              {projects.map(project => {
                const projectTasks = tasksByProject[project.id];
                const completion = projectTasks 
                  ? Math.round((projectTasks.done / projectTasks.total) * 100) 
                  : 0;
                
                return (
                  <div key={project.id} className="bar-item">
                    <div className="bar-label">
                      {project.name} ({projectTasks?.done || 0}/{projectTasks?.total || 0})
                    </div>
                    <div className="bar-container">
                      <div 
                        className="bar-fill green" 
                        style={{ width: `${completion}%` }}
                      >
                        {completion}%
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* AI Suggestions */}
        <div className="insight-card full-width">
          <h3 className="insight-title">
            <span className="title-icon">🤖</span> AI Suggestions
          </h3>
          <div className="suggestions-list">
            {totalTasks === 0 ? (
              <div style={{ padding: '1rem', color: '#666' }}>
                <p>Start creating tasks to receive personalized suggestions</p>
              </div>
            ) : (
              <>
                {doneTasks === 0 && totalTasks > 0 && (
                  <div className="suggestion-item recommendation">
                    <div className="suggestion-header">
                      <span className="suggestion-badge">Action</span>
                      <span className="suggestion-title">Get started with your first task</span>
                    </div>
                    <p className="suggestion-description">Move a task to "In Progress" to start making progress</p>
                  </div>
                )}
                {inProgressTasks > 3 && (
                  <div className="suggestion-item warning">
                    <div className="suggestion-header">
                      <span className="suggestion-badge">Optimization</span>
                      <span className="suggestion-title">High work-in-progress</span>
                    </div>
                    <p className="suggestion-description">You have {inProgressTasks} tasks in progress. Consider completing some before starting new ones.</p>
                  </div>
                )}
                {highPriorityTasks > 0 && (
                  <div className="suggestion-item priority">
                    <div className="suggestion-header">
                      <span className="suggestion-badge">Priority</span>
                      <span className="suggestion-title">Focus on high-priority tasks</span>
                    </div>
                    <p className="suggestion-description">You have {highPriorityTasks} high-priority task{highPriorityTasks > 1 ? 's' : ''}. Consider prioritizing these.</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
