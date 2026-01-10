import { Link } from 'react-router-dom';
import './ProjectCard.css';

const ProjectCard = ({ project }) => {
  return (
    <div className="project-card">
      <div className="project-card-header">
        <div className="project-icon">📁</div>
        <span className="project-date">{project.startDate}</span>
      </div>
      
      <h3 className="project-name">{project.name}</h3>
      <p className="project-description">{project.description}</p>
      
      <div className="project-progress">
        <div className="progress-info">
          <span className="progress-label">Progress</span>
          <span className="progress-percentage">{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${project.progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="project-stats">
        <span className="project-stat">{project.totalTasks} total tasks</span>
        <span className="project-stat">{project.completedTasks} completed</span>
      </div>
      
      <Link to={`/kanban?project=${project.id}`} className="project-btn">
        Open Project
      </Link>
    </div>
  );
};

export default ProjectCard;
