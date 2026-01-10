import { useState } from 'react';
import Navbar from '../components/Navbar';
import ProjectCard from '../components/ProjectCard';
import { projects as initialProjects } from '../data/mockData';
import './Projects.css';

const Projects = () => {
  const [projects, setProjects] = useState(initialProjects);
  const [showModal, setShowModal] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: ''
  });

  const handleInputChange = (e) => {
    setNewProject({
      ...newProject,
      [e.target.name]: e.target.value
    });
  };

  const handleCreateProject = (e) => {
    e.preventDefault();
    const project = {
      id: projects.length + 1,
      name: newProject.name,
      description: newProject.description,
      progress: 0,
      totalTasks: 0,
      completedTasks: 0,
      startDate: new Date().toLocaleDateString('en-GB'),
      tasks: []
    };
    setProjects([...projects, project]);
    setNewProject({ name: '', description: '' });
    setShowModal(false);
  };

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

        <div className="projects-grid">
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
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
