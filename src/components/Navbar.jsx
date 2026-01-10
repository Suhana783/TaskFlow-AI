import './Navbar.css';

const Navbar = ({ title, subtitle }) => {
  return (
    <div className="navbar">
      <div className="navbar-content">
        <div className="navbar-title-section">
          <h1 className="navbar-title">{title}</h1>
          {subtitle && <p className="navbar-subtitle">{subtitle}</p>}
        </div>
        <div className="navbar-actions">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search projects, tasks..." />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
