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

  /**
   * Generate AI response based on user message and their project data
   * Uses keyword matching to provide intelligent, context-aware responses
   */
  const generateAIResponse = (userMessage, userProjects) => {
    const message = userMessage.toLowerCase();
    const projectCount = userProjects.length;
    
    // Handle empty state - no projects
    if (projectCount === 0) {
      return "You don't have any projects yet. Start by creating one, and I'll help you plan it step by step. 😊";
    }

    // Calculate task statistics across all projects
    const allTasks = userProjects.flatMap(p => p.tasks || []);
    const totalTasks = allTasks.length;
    const completedTasks = allTasks.filter(t => t.status === 'done').length;
    const inProgressTasks = allTasks.filter(t => t.status === 'in-progress').length;
    const todoTasks = allTasks.filter(t => t.status === 'todo').length;
    
    // Check for overdue tasks (comparing with today's date)
    const today = new Date();
    const overdueTasks = allTasks.filter(task => {
      if (!task.dueDate || task.status === 'done') return false;
      const [day, month, year] = task.dueDate.split('/');
      const dueDate = new Date(year, month - 1, day);
      return dueDate < today;
    });

    // 📊 PROGRESS / STATUS KEYWORDS
    if (message.includes('update') || message.includes('status') || 
        message.includes('progress') || message.includes('work') || 
        message.includes('how am i doing') || message.includes('summary')) {
      return `Here's your current status:\n\n📊 Projects: ${projectCount}\n✅ Completed tasks: ${completedTasks}\n🔄 In progress: ${inProgressTasks}\n📝 To-do: ${todoTasks}\n\nYou're making great progress! Keep up the momentum. 💪`;
    }

    // 🧱 BLOCKERS / ISSUES KEYWORDS
    if (message.includes('block') || message.includes('issue') || 
        message.includes('stuck') || message.includes('problem') || 
        message.includes('delay') || message.includes('trouble')) {
      
      if (overdueTasks.length > 0) {
        const overdueList = overdueTasks.slice(0, 3).map(t => `• ${t.title} (due ${t.dueDate})`).join('\n');
        return `I found ${overdueTasks.length} overdue task${overdueTasks.length > 1 ? 's' : ''}:\n\n${overdueList}\n\n💡 Tip: Focus on these first, or adjust their deadlines if priorities have changed.`;
      }

      // Find high-priority tasks
      const highPriorityTasks = allTasks.filter(t => t.priority === 'high' && t.status !== 'done');
      if (highPriorityTasks.length > 0) {
        return `I don't see any overdue tasks, but you have ${highPriorityTasks.length} high-priority task${highPriorityTasks.length > 1 ? 's' : ''} to watch:\n\n${highPriorityTasks.slice(0, 3).map(t => `• ${t.title}`).join('\n')}\n\nTackle these one at a time to stay ahead! 🎯`;
      }

      return "Good news! I don't see any major blockers right now. Your projects are on track. Keep monitoring deadlines and priorities. 👍";
    }

    // 🧭 NEXT STEPS / PLANNING KEYWORDS
    if (message.includes('next') || message.includes('plan') || 
        message.includes('do') || message.includes('suggest') || 
        message.includes('should i') || message.includes('recommend')) {
      
      if (todoTasks > 0) {
        const nextTodo = allTasks.find(t => t.status === 'todo');
        return `Here's what I suggest:\n\n1. Move "${nextTodo.title}" to "In Progress"\n2. Break it into smaller steps if needed\n3. Set aside focused time to complete it\n\nYou have ${todoTasks} task${todoTasks > 1 ? 's' : ''} in your backlog. Let's tackle them one by one! 🚀`;
      }

      if (inProgressTasks > 0) {
        return `You currently have ${inProgressTasks} task${inProgressTasks > 1 ? 's' : ''} in progress. My recommendation:\n\n✅ Focus on completing those before starting new work\n📌 Avoid multitasking to maintain quality\n\nYou're doing great! 💪`;
      }

      return `Awesome! You've completed all your tasks. 🎉\n\nTime to plan your next milestone:\n• Review completed work\n• Add new tasks to your projects\n• Celebrate this achievement! 🥳`;
    }

    // 🙋 GENERAL HELP / CONFUSION KEYWORDS
    if (message.includes('help') || message.includes('confused') || 
        message.includes('how') || message.includes('what') || 
        message.includes('explain') || message.includes('guide')) {
      return `I'm here to help you manage your projects! 😊\n\nHere's what you can do:\n\n📊 **Projects page**: Create and manage your projects\n📋 **Kanban Board**: Drag tasks between Todo, In Progress, and Done\n🤖 **Quick Actions** (above): Get instant insights\n\nAsk me about your progress, blockers, or next steps anytime!`;
    }

    // Thanks/Greeting keywords
    if (message.includes('thank') || message.includes('thanks') || 
        message.includes('appreciate')) {
      return "You're very welcome! I'm always here to help you stay organized and productive. 😊";
    }

    if (message.includes('hello') || message.includes('hi') || 
        message.includes('hey')) {
      return `Hello! 👋 Great to see you. You currently have ${projectCount} project${projectCount > 1 ? 's' : ''} and ${totalTasks} task${totalTasks > 1 ? 's' : ''}. How can I assist you today?`;
    }

    // 🤖 DEFAULT FALLBACK (MOST IMPORTANT)
    // If no keywords match, provide a friendly generic response
    return `Thanks for your message! 😊\n\nI'm here to help you manage your projects. You can ask me about:\n• Progress updates\n• Blockers or issues\n• Next steps and planning\n\nOr use the quick action buttons above for instant insights!`;
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

    // Generate intelligent AI response based on user's message and data
    const aiResponse = generateAIResponse(inputMessage, projects);

    const aiMessage = {
      id: messages.length + 2,
      type: 'ai',
      content: aiResponse,
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
