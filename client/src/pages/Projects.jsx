import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { useAuth } from '../context/AuthContext';
import './Projects.css';

const Projects = () => {
  const { getUserData, saveUserData } = useAuth();
  const [userData, setUserData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: ''
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load user's data from localStorage
    const data = getUserData();
    setUserData(data);
    setLoading(false);
  }, []);

  const projects = userData?.projects || [];

  const handleInputChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateProject = (e) => {
    e.preventDefault();

    if (!newProject.name.trim() || !newProject.description.trim()) {
      alert('Please fill in all fields');
      return;
    }

    const project = {
      id: Date.now(),
      name: newProject.name,
      description: newProject.description,
      progress: 0,
      totalTasks: 0,
      completedTasks: 0,
      startDate: new Date().toLocaleDateString('en-GB'),
      tasks: []
    };

    // Update user data with new project
    const updatedData = {
      ...userData,
      projects: [...projects, project],
      activityLog: [
        ...(userData?.activityLog || []),
        {
          id: Date.now(),
          action: 'created',
          title: project.name,
          project: project.name,
          type: 'created',
          time: new Date().toLocaleTimeString('en-US', { hour12: false })
        }
      ]
    };

    saveUserData(updatedData);
    setUserData(updatedData);
    setNewProject({ name: '', description: '' });
    setShowModal(false);
  };

  if (loading) {
    return <div className="page-container"><p>Loading...</p></div>;
  }

  return (
    <div className="page-container">
      <Navbar 
        title="Projects" 
        subtitle="Manage and track your projects" 
      />
      
      <div className="page-content">
        <div className="projects-header">
          <button 
            onClick={() => setShowModal(true)}
            className="create-project-btn"
          >
            ➕ Create New Project
          </button>
        </div>

        {projects.length === 0 ? (
          <div style={{ padding: '3rem 2rem', textAlign: 'center', color: '#666' }}>
            <p style={{ fontSize: '1.3rem', marginBottom: '1rem' }}>📭 No projects yet</p>
            <p style={{ color: '#999', marginBottom: '2rem' }}>Create your first project by clicking the button above</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map(project => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>

      {/* Create Project Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Create New Project</h2>
              <button 
                className="modal-close"
                onClick={() => setShowModal(false)}
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleCreateProject} className="modal-form">
              <div className="form-group">
                <label>Project Name</label>
                <input
                  type="text"
                  name="name"
                  value={newProject.name}
                  onChange={handleInputChange}
                  placeholder="Enter project name"
                  required
                />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={newProject.description}
                  onChange={handleInputChange}
                  placeholder="Describe your project"
                  rows="4"
                  required
                />
              </div>

              <div className="modal-actions">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
