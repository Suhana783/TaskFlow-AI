import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();

  const menuItems = [
    { path: '/dashboard', icon: '📊', label: 'Dashboard' },
    { path: '/projects', icon: '📁', label: 'Projects' },
    { path: '/kanban', icon: '🧩', label: 'Kanban Board' },
    { path: '/ai-assistant', icon: '🤖', label: 'AI Assistant' },
    { path: '/insights', icon: '📈', label: 'Insights' },
    { path: '/settings', icon: '⚙️', label: 'Settings' }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Get user's first letter for avatar
  const avatarLetter = currentUser?.name?.charAt(0).toUpperCase() || 'U';

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
          <div className="user-avatar">{avatarLetter}</div>
          <div className="user-info">
            <p className="user-name">{currentUser?.name || 'User'}</p>
            <p className="user-email">{currentUser?.email || 'user@example.com'}</p>
          </div>
        </div>
        <button 
          onClick={handleLogout} 
          className="logout-btn"
          style={{ border: 'none', background: 'none', cursor: 'pointer', width: '100%' }}
        >
          <span>🚪</span> Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
