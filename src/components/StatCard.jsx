import './StatCard.css';

const StatCard = ({ icon, title, value, color }) => {
  return (
    <div className="stat-card">
      <div className="stat-header">
        <span className="stat-title">{title}</span>
        <div className={`stat-icon ${color}`}>{icon}</div>
      </div>
      <div className="stat-value">{value}</div>
    </div>
  );
};

export default StatCard;
