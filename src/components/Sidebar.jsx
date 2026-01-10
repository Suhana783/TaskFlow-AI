import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/projects', icon: '📁', label: 'Projects' },
    { path: '/kanban', icon: '🧩', label: 'Kanban Board' },
    { path: '/ai-assistant', icon: '🤖', label: 'AI Assistant' },
    { path: '/insights', icon: '📈', label: 'Insights' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo-icon">📋</div>
        <h2 className="logo-text">TaskFlow</h2>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`sidebar-item ${location.pathname === item.path ? 'active' : ''}`}
          >
            <span className="sidebar-icon">{item.icon}</span>
            <span className="sidebar-label">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <div className="user-avatar">S</div>
          <div className="user-info">
            <p className="user-name">Suhana</p>
            <p className="user-email">suhana@taskflow.com</p>
          </div>
        </div>
        <Link to="/login" className="logout-btn">
          <span>🚪</span> Logout
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
