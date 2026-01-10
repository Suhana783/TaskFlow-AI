# TaskFlow AI - Project Management Tool

A modern, clean, and intuitive project management application built with React and Vite. This is a beginner-friendly MERN stack frontend project designed to manage tasks, projects, and provide AI-assisted insights.

## 🎯 Project Overview

TaskFlow AI is a Jira/Trello-like project management tool that helps users:
- Manage multiple projects with progress tracking
- Organize tasks using a Kanban board (To Do, In Progress, Done)
- Get AI-powered suggestions and insights
- Track project analytics and completion rates
- Manage user settings and preferences

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.2.4
- **Routing:** React Router DOM
- **Styling:** Pure CSS with CSS Variables
- **State Management:** React useState/useEffect (lifting state)

## 📁 Project Structure

```
TaskFlow-AI/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── ProjectCard.jsx
│   │   ├── TaskCard.jsx
│   │   └── ProgressBar.jsx
│   ├── pages/              # Main application pages
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   ├── Dashboard.jsx
│   │   ├── Projects.jsx
│   │   ├── KanbanBoard.jsx
│   │   ├── AIAssistant.jsx
│   │   ├── Insights.jsx
│   │   └── Settings.jsx
│   ├── data/               # Mock data
│   │   └── mockData.js
│   ├── utils/              # Helper functions
│   ├── App.jsx             # Main app component with routing
│   ├── main.jsx            # Entry point
│   └── index.css           # Global styles
├── public/                 # Static assets
├── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd TaskFlow-AI
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to:
```
http://localhost:5173
```

### Default Login

The app uses localStorage for simple authentication. You can log in with any email and password.

## ✨ Features

### 🔐 Authentication
- Login and Register pages
- Simple form validation
- Protected routes with authentication guard

### 🏠 Dashboard
- **Statistics Cards:** Total tasks, completed, in progress, overdue
- **Active Projects:** Quick overview with progress bars
- **Recent Activity:** Timeline of project updates
- **Overall Progress:** Visual progress tracking

### 📁 Projects Page
- View all projects as cards
- Create new projects with modal
- Each project shows:
  - Name and description
  - Progress percentage
  - Task completion stats
  - Quick access to Kanban board

### 🧩 Kanban Board
- Three columns: To Do, In Progress, Done
- Task cards with:
  - Title and description
  - Priority badges (High, Medium, Low)
  - Due dates
  - Move buttons between columns
- Add new tasks with modal
- Project-specific task management

### 🤖 AI Assistant
- Chat-style interface
- Quick action buttons:
  - Generate tasks for projects
  - Create sprint plans
  - Summarize project status
  - Identify blockers
- Predefined intelligent responses
- Message history
- Extendable for real AI integration

### 📊 Insights Page
- **Tasks by Status:** Visual distribution (To Do, In Progress, Done)
- **Tasks by Priority:** Priority-based breakdown
- **Project Completion:** Bar chart comparison
- **AI Suggestions:** Rule-based recommendations
  - Break down large tasks
  - Address overdue items
  - Balance workload

### ⚙️ Settings
- **Profile Management:** Update name, email, role
- **Change Password:** Password update form
- **Notification Preferences:** Toggle various notifications
- **Appearance:** Dark mode toggle (coming soon)

## 🎨 Design Principles

- **Clean & Modern:** Professional SaaS-like interface
- **Consistent:** CSS variables for unified theming
- **Responsive:** Works on desktop and tablet
- **Accessible:** Clear typography and color contrast
- **Intuitive:** Easy navigation with persistent sidebar

## 🔄 State Management

Simple and clear state management using:
- `useState` for local component state
- `useEffect` for side effects
- Props for parent-child communication
- localStorage for authentication state

No Redux or complex state management - keeping it beginner-friendly!

## 🎯 Why This Architecture?

### Component Organization
- **Reusable Components:** Small, focused components (Sidebar, Navbar, Cards)
- **Page Components:** Feature-complete pages combining multiple components
- **Data Separation:** Mock data isolated in `/data` folder
- **Clear Naming:** Component names describe their purpose

### Routing Strategy
- Protected routes with authentication guard
- Layout wrapper for authenticated pages
- Automatic redirects based on auth state

### Styling Approach
- CSS Variables for easy theming
- Component-specific CSS files
- No CSS-in-JS complexity
- Easy to customize and extend

## 📈 Future Enhancements

Ready for backend integration:
- Connect to REST API endpoints
- Real authentication with JWT
- Database persistence
- Real-time updates
- Drag-and-drop for Kanban board
- Dark mode implementation
- Real AI/ML integration

## 🤝 Contributing

This project is designed for learning. Feel free to:
- Add new features
- Improve existing functionality
- Enhance styling
- Add animations
- Integrate with backend

## 📝 License

MIT License - feel free to use this for learning and portfolio projects.

## 🎓 Learning Outcomes

By building this project, you'll learn:
- React component architecture
- React Router for navigation
- Form handling and validation
- State management patterns
- CSS variables and modern layouts
- Project structure best practices
- Building production-ready UI

## 🙏 Acknowledgments

Built with ❤️ as a portfolio-ready MERN project for beginners.

---

**Note:** This is the frontend only. Backend integration can be added separately using Node.js, Express, and MongoDB.

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
