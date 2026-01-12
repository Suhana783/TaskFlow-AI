import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import './AIAssistant.css';

const AIAssistant = () => {
  const { getUserData } = useAuth();
  const [userData, setUserData] = useState(null);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI assistant. I can help you manage tasks, generate sprint plans, and identify project blockers. How can I help you today?",
      time: '09:08:35'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = getUserData();
    setUserData(data);
    setLoading(false);
  }, []);

  const projects = userData?.projects || [];
  const hasProjects = projects.length > 0;

  const quickActions = [
    { id: 'generate-tasks', label: 'Generate tasks for my project', icon: '✨', requiresProjects: true },
    { id: 'sprint-plan', label: 'Create sprint plan', icon: '📅', requiresProjects: true },
    { id: 'summarize-status', label: 'Summarize project status', icon: '📊', requiresProjects: true },
    { id: 'identify-blockers', label: 'Identify blockers', icon: '⚠️', requiresProjects: true }
  ];

  const handleQuickAction = (actionId) => {
    if (!hasProjects && quickActions.find(a => a.id === actionId)?.requiresProjects) {
      const userMessage = {
        id: messages.length + 1,
        type: 'user',
        content: quickActions.find(a => a.id === actionId).label,
        time: new Date().toLocaleTimeString('en-US', { hour12: false })
      };

      const aiMessage = {
        id: messages.length + 2,
        type: 'ai',
        content: "You don't have any projects yet. Create a project first to get started with AI-powered insights!",
        time: new Date().toLocaleTimeString('en-US', { hour12: false })
      };

      setMessages([...messages, userMessage, aiMessage]);
      return;
    }

    const action = quickActions.find(a => a.id === actionId);

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: action.label,
      time: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    // Generate AI response based on user's data
    let aiResponse = '';
    
    if (!hasProjects) {
      aiResponse = "You don't have any projects yet. Create a project to get started!";
    } else {
      const projectCount = projects.length;
      const totalTasks = projects.reduce((sum, p) => sum + (p.totalTasks || 0), 0);
      
      switch(actionId) {
        case 'generate-tasks':
          aiResponse = `Based on your ${projectCount} project${projectCount > 1 ? 's' : ''}, I recommend:\n• Break down larger tasks into subtasks\n• Assign clear ownership\n• Set realistic deadlines`;
          break;
        case 'sprint-plan':
          aiResponse = `Your sprint plan: You have ${totalTasks} total tasks across ${projectCount} project${projectCount > 1 ? 's' : ''}. I suggest:\n• Focus on high-priority items first\n• Aim for 60% capacity utilization\n• Plan buffer time for blockers`;
          break;
        case 'summarize-status':
          aiResponse = `Project Status Summary:\n• Total Projects: ${projectCount}\n• Total Tasks: ${totalTasks}\n• Keep up the good work!`;
          break;
        case 'identify-blockers':
          aiResponse = `Potential blockers to watch:\n• Incomplete task descriptions\n• Undefined dependencies\n• Unrealistic timelines\n\nReview your tasks to address these!`;
          break;
        default:
          aiResponse = "I'm analyzing your projects...";
      }
    }

    const aiMessage = {
      id: messages.length + 2,
      type: 'ai',
      content: aiResponse,
      time: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    setMessages([...messages, userMessage, aiMessage]);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      time: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    // Simple response for custom messages
    const aiMessage = {
      id: messages.length + 2,
      type: 'ai',
      content: "I understand your request. In a production environment, I would process this using advanced AI models. For now, try using the quick action buttons above for predefined intelligent responses!",
      time: new Date().toLocaleTimeString('en-US', { hour12: false })
    };

    setMessages([...messages, userMessage, aiMessage]);
    setInputMessage('');
  };

  if (loading) {
    return <div className="page-container"><p>Loading...</p></div>;
  }

  return (
    <div className="page-container">
      <Navbar 
        title="AI Assistant" 
        subtitle="Get intelligent insights and recommendations" 
      />
      
      <div className="page-content ai-content">
        <div className="ai-container">
          {/* Quick Actions */}
          <div className="quick-actions">
            <h3 className="quick-actions-title">Quick Actions:</h3>
            <div className="quick-actions-grid">
              {quickActions.map(action => (
                <button
                  key={action.id}
                  onClick={() => handleQuickAction(action.id)}
                  className="quick-action-btn"
                >
                  <span className="action-icon">{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="chat-container">
            <div className="chat-messages">
              {messages.map(message => (
                <div key={message.id} className={`message ${message.type}`}>
                  <div className="message-avatar">
                    {message.type === 'ai' ? '🤖' : 'S'}
                  </div>
                  <div className="message-content">
                    <div className="message-text">{message.content}</div>
                    <div className="message-time">{message.time}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="chat-input-container">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about your projects..."
                className="chat-input"
              />
              <button type="submit" className="chat-send-btn">
                ➤
              </button>
            </form>
            <p className="chat-hint">Press Enter to send, Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIAssistant;
