import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import KanbanBoard from './pages/KanbanBoard';
import AIAssistant from './pages/AIAssistant';
import Insights from './pages/Insights';
import Settings from './pages/Settings';
import './App.css';

function App() {
  // Simple auth check - in real app, use proper auth context
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Layout with sidebar for authenticated routes
  const AuthenticatedLayout = ({ children }) => (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/register" element={!isAuthenticated ? <Register /> : <Navigate to="/dashboard" />} />
        
        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={
            isAuthenticated ? 
            <AuthenticatedLayout><Dashboard /></AuthenticatedLayout> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/projects" 
          element={
            isAuthenticated ? 
            <AuthenticatedLayout><Projects /></AuthenticatedLayout> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/kanban" 
          element={
            isAuthenticated ? 
            <AuthenticatedLayout><KanbanBoard /></AuthenticatedLayout> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/ai-assistant" 
          element={
            isAuthenticated ? 
            <AuthenticatedLayout><AIAssistant /></AuthenticatedLayout> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/insights" 
          element={
            isAuthenticated ? 
            <AuthenticatedLayout><Insights /></AuthenticatedLayout> : 
            <Navigate to="/login" />
          } 
        />
        <Route 
          path="/settings" 
          element={
            isAuthenticated ? 
            <AuthenticatedLayout><Settings /></AuthenticatedLayout> : 
            <Navigate to="/login" />
          } 
        />
        
        {/* Default redirect */}
        <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
      </Routes>
    </Router>
  );
}

export default App;
