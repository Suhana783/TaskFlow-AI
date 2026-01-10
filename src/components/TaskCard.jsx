import './TaskCard.css';

const TaskCard = ({ task, onMove, onStatusChange }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'red';
      case 'medium': return 'yellow';
      case 'low': return 'blue';
      default: return 'blue';
    }
  };

  return (
    <div className="task-card">
      <div className="task-card-header">
        <span className={`task-priority ${getPriorityColor(task.priority)}`}>
          {task.priority}
        </span>
        <span className="task-date">📅 {task.dueDate}</span>
      </div>
      
      <h4 className="task-title">{task.title}</h4>
      <p className="task-description">{task.description}</p>
      
      {onMove && (
        <div className="task-actions">
          {task.status !== 'todo' && (
            <button 
              onClick={() => onMove(task, 'todo')}
              className="task-action-btn"
            >
              ← To Do
            </button>
          )}
          {task.status === 'todo' && (
            <button 
              onClick={() => onMove(task, 'in-progress')}
              className="task-action-btn primary"
            >
              Start →
            </button>
          )}
          {task.status === 'in-progress' && (
            <button 
              onClick={() => onMove(task, 'done')}
              className="task-action-btn success"
            >
              Complete →
            </button>
          )}
          {task.status === 'done' && (
            <button 
              onClick={() => onMove(task, 'in-progress')}
              className="task-action-btn"
            >
              ← Reopen
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default TaskCard;
