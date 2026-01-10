import { useState } from 'react';
import Navbar from '../components/Navbar';
import { aiResponses } from '../data/mockData';
import './AIAssistant.css';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'ai',
      content: "Hello! I'm your AI assistant. I can help you manage tasks, generate sprint plans, and identify project blockers. How can I help you today?",
      time: '09:08:35'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const quickActions = [
    { id: 'generate-tasks', label: 'Generate tasks for my project', icon: '✨' },
    { id: 'sprint-plan', label: 'Create sprint plan', icon: '📅' },
    { id: 'summarize-status', label: 'Summarize project status', icon: '📊' },
    { id: 'identify-blockers', label: 'Identify blockers', icon: '⚠️' }
  ];

  const handleQuickAction = (actionId) => {
    const action = quickActions.find(a => a.id === actionId);
    
    // Add user message
    const userMessage = {
      id: messages.length + 1,
      type: 'user',
      content: action.label,
      time: new Date().toLocaleTimeString('en-US', { hour12: false })
    };
    
    // Get AI response
    const aiResponse = aiResponses[actionId];
    const aiMessage = {
      id: messages.length + 2,
      type: 'ai',
      content: aiResponse.content.join('\n'),
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
