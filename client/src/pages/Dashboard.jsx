import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';
import taskAPI from '../utils/taskAPI';
import socket from '../utils/socket';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, getUserData } = useAuth();
  const [userData, setUserData] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Load tasks from API
  const loadTasks = async () => {
    if (!currentUser) return;
    
    try {
      // Use email as primary userId for consistency
      const userId = currentUser.email || currentUser.id;
      console.log('📊 Dashboard loading tasks for userId:', userId);
      const userTasks = await taskAPI.getTasksByUser(userId);
      console.log('📊 Dashboard loaded tasks:', userTasks.length);
      setTasks(userTasks);
    } catch (error) {
      console.error('Error loading tasks:', error);
      setTasks([]);
    }
  };

  useEffect(() => {
    // Load user's specific data from localStorage
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

  // Calculate stats from actual tasks data
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'done').length;
  const inProgressTasks = tasks.filter(t => t.status === 'in-progress').length;
  
  // Calculate overdue tasks (due date < today AND not done)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueTasks = tasks.filter(t => {
    if (t.status === 'done' || !t.dueDate) return false;
    const dueDate = new Date(t.dueDate);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today;
  }).length;

  // Calculate overall progress percentage
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const projects = userData?.projects || [];
  const activityLog = userData?.activityLog || [];

  return (
    <div className="page-container">
      <Navbar 
        title="Dashboard" 
        subtitle={`Welcome back, ${currentUser?.name}! Here's an overview of your projects.`}
      />
      
      <div className="page-content">
        {/* Stats Grid */}
        <div className="stats-grid">
          <StatCard 
            icon="📋" 
            title="Total Tasks" 
            value={totalTasks}
            color="blue"
          />
          <StatCard 
            icon="✓" 
            title="Tasks Completed" 
            value={completedTasks}
            color="green"
          />
          <StatCard 
            icon="⏳" 
            title="In Progress" 
            value={inProgressTasks}
            color="yellow"
          />
          <StatCard 
            icon="⚠️" 
            title="Overdue Tasks" 
            value={overdueTasks}
            color="red"
          />
        </div>

        <div className="dashboard-grid">
          {/* Active Projects */}
          <div className="dashboard-section">
            <h2 className="section-title">Active Projects</h2>
            {projects.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                <p style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>📭 No projects yet</p>
                <p style={{ color: '#999' }}>Create your first project to get started</p>
              </div>
            ) : (
              <div className="projects-list">
                {projects.map(project => (
                  <div key={project.id} className="project-summary">
                    <h3 className="project-summary-name">{project.name}</h3>
                    <p className="project-summary-desc">{project.description}</p>
                    <ProgressBar 
                      label="Progress"
                      percentage={project.progress || 0}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Recent Activity */}
          <div className="dashboard-section">
            <h2 className="section-title">Recent Activity</h2>
            {activityLog.length === 0 ? (
              <div style={{ padding: '2rem', textAlign: 'center', color: '#666' }}>
                <p style={{ fontSize: '1.1rem' }}>✨ No recent activity</p>
              </div>
            ) : (
              <div className="activity-list">
                {activityLog.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      {activity.type === 'completed' && '✓'}
                      {activity.type === 'updated' && '↻'}
                      {activity.type === 'created' && '+'}
                    </div>
                    <div className="activity-content">
                      <p className="activity-text">
                        <span className="activity-action">{activity.action}</span>
                        {' '}
                        <strong>{activity.title}</strong>
                      </p>
                      <p className="activity-meta">
                        {activity.project} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Overall Progress */}
        <div className="dashboard-section">
          <h2 className="section-title">Overall Progress</h2>
          <ProgressBar 
            label={`${completedTasks} of ${totalTasks} tasks completed`}
            percentage={overallProgress}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
