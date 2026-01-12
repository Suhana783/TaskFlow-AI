import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import StatCard from '../components/StatCard';
import ProjectCard from '../components/ProjectCard';
import ProgressBar from '../components/ProgressBar';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
  const { currentUser, getUserData } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user's specific data from localStorage
    const data = getUserData();
    setUserData(data);
    setLoading(false);
  }, []);

  if (loading) {
    return <div className="page-container"><p>Loading...</p></div>;
  }

  // Calculate stats from user's own projects data
  const projects = userData?.projects || [];
  const totalTasks = projects.reduce((sum, project) => sum + (project.totalTasks || 0), 0);
  const completedTasks = projects.reduce((sum, project) => sum + (project.completedTasks || 0), 0);
  const inProgressTasks = projects.reduce((sum, project) => {
    return sum + (project.tasks?.filter(task => task.status === 'in-progress').length || 0);
  }, 0);
  const overdueTasks = 0; // Calculate based on due dates if needed

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
            current={completedTasks}
            total={totalTasks}
          />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
