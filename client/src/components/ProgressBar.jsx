import './ProgressBar.css';

const ProgressBar = ({ label, current, total, percentage }) => {
  const calculatedPercentage = percentage || (total > 0 ? Math.round((current / total) * 100) : 0);
  
  return (
    <div className="progress-container">
      <div className="progress-header">
        <span className="progress-label">{label}</span>
        <span className="progress-text">{calculatedPercentage}%</span>
      </div>
      <div className="progress-bar-wrapper">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${calculatedPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
