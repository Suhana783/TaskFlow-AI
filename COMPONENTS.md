# Component Documentation

## Component Architecture Overview

This document explains each component, its purpose, props, and usage.

---

## 🧩 Reusable Components

### 1. Sidebar
**Location:** `src/components/Sidebar.jsx`

**Purpose:** Main navigation sidebar for the application

**Features:**
- Logo and app name
- Navigation menu with icons
- Active route highlighting
- User profile section
- Logout button

**Usage:**
```jsx
import Sidebar from './components/Sidebar';

<Sidebar />
```

**No props needed** - Uses `useLocation()` from React Router to determine active page

---

### 2. Navbar
**Location:** `src/components/Navbar.jsx`

**Purpose:** Top navigation bar with page title and search

**Props:**
- `title` (string, required): Main page title
- `subtitle` (string, optional): Descriptive subtitle

**Usage:**
```jsx
import Navbar from './components/Navbar';

<Navbar 
  title="Dashboard" 
  subtitle="Welcome back! Here's an overview of your projects." 
/>
```

---

### 3. StatCard
**Location:** `src/components/StatCard.jsx`

**Purpose:** Display statistics with icon and number

**Props:**
- `icon` (string, required): Emoji or icon to display
- `title` (string, required): Label for the stat
- `value` (number, required): The numerical value
- `color` (string, required): Color theme ('blue', 'green', 'yellow', 'red')

**Usage:**
```jsx
import StatCard from './components/StatCard';

<StatCard 
  icon="📋" 
  title="Total Tasks" 
  value={5}
  color="blue"
/>
```

---

### 4. ProjectCard
**Location:** `src/components/ProjectCard.jsx`

**Purpose:** Display project information as a card

**Props:**
- `project` (object, required): Project data object
  - `id` (number): Project ID
  - `name` (string): Project name
  - `description` (string): Project description
  - `progress` (number): Completion percentage (0-100)
  - `totalTasks` (number): Total number of tasks
  - `completedTasks` (number): Number of completed tasks
  - `startDate` (string): Project start date

**Usage:**
```jsx
import ProjectCard from './components/ProjectCard';

const project = {
  id: 1,
  name: "Website Redesign",
  description: "Redesign the company website",
  progress: 65,
  totalTasks: 3,
  completedTasks: 1,
  startDate: "01/01/2026"
};

<ProjectCard project={project} />
```

---

### 5. TaskCard
**Location:** `src/components/TaskCard.jsx`

**Purpose:** Display task information in Kanban board

**Props:**
- `task` (object, required): Task data object
  - `id` (number): Task ID
  - `title` (string): Task title
  - `description` (string): Task description
  - `status` (string): 'todo', 'in-progress', or 'done'
  - `priority` (string): 'low', 'medium', or 'high'
  - `dueDate` (string): Due date
- `onMove` (function, optional): Callback for moving task between columns
  - Parameters: `(task, newStatus)`

**Usage:**
```jsx
import TaskCard from './components/TaskCard';

const task = {
  id: 1,
  title: "Setup authentication",
  description: "Implement user login",
  status: "todo",
  priority: "medium",
  dueDate: "25/01/2026"
};

const handleMove = (task, newStatus) => {
  // Update task status
};

<TaskCard task={task} onMove={handleMove} />
```

---

### 6. ProgressBar
**Location:** `src/components/ProgressBar.jsx`

**Purpose:** Visual progress indicator

**Props:**
- `label` (string, required): Label for the progress bar
- `current` (number, optional): Current value
- `total` (number, optional): Total value
- `percentage` (number, optional): Direct percentage (if not using current/total)

**Usage:**
```jsx
import ProgressBar from './components/ProgressBar';

// Option 1: Using current/total
<ProgressBar 
  label="Project Progress"
  current={5}
  total={10}
/>

// Option 2: Using direct percentage
<ProgressBar 
  label="Overall Progress"
  percentage={75}
/>
```

---

## 📄 Page Components

### 1. Login
**Location:** `src/pages/Login.jsx`

**Purpose:** User login page

**Features:**
- Email and password inputs
- Form validation
- Redirects to dashboard on success
- Link to register page

**State:**
- `formData`: { email, password }

**No props needed**

---

### 2. Register
**Location:** `src/pages/Register.jsx`

**Purpose:** User registration page

**Features:**
- Name, email, password, confirm password inputs
- Password matching validation
- Redirects to dashboard on success
- Link to login page

**State:**
- `formData`: { name, email, password, confirmPassword }

**No props needed**

---

### 3. Dashboard
**Location:** `src/pages/Dashboard.jsx`

**Purpose:** Main dashboard overview

**Features:**
- Statistics cards (total, completed, in-progress, overdue)
- Active projects list
- Recent activity timeline
- Overall progress bar

**State:**
- Uses mock data from `data/mockData.js`
- Calculates stats from projects data

**No props needed**

---

### 4. Projects
**Location:** `src/pages/Projects.jsx`

**Purpose:** Project management page

**Features:**
- Display all projects as cards
- Create new project modal
- Form for project name and description

**State:**
- `projects`: Array of project objects
- `showModal`: Boolean for modal visibility
- `newProject`: { name, description }

**No props needed**

---

### 5. KanbanBoard
**Location:** `src/pages/KanbanBoard.jsx`

**Purpose:** Task management with Kanban board

**Features:**
- 3 columns: To Do, In Progress, Done
- Move tasks between columns
- Add new tasks
- Project-specific view

**State:**
- `projects`: Array of project objects
- `showAddTask`: Boolean for modal visibility
- `newTask`: { title, description, priority, dueDate }

**Uses URL params:** `?project=1` to determine which project to display

**No props needed**

---

### 6. AIAssistant
**Location:** `src/pages/AIAssistant.jsx`

**Purpose:** AI assistant chat interface

**Features:**
- Chat message display
- Quick action buttons
- Text input for custom messages
- Predefined AI responses

**State:**
- `messages`: Array of message objects { id, type, content, time }
- `inputMessage`: String for current input

**No props needed**

---

### 7. Insights
**Location:** `src/pages/Insights.jsx`

**Purpose:** Analytics and insights page

**Features:**
- Tasks by status chart
- Tasks by priority chart
- Project completion bar chart
- AI suggestions list

**State:**
- Uses chart data from `data/mockData.js`

**No props needed**

---

### 8. Settings
**Location:** `src/pages/Settings.jsx`

**Purpose:** User settings and preferences

**Features:**
- Profile information form
- Change password form
- Notification toggles
- Appearance settings

**State:**
- `profile`: { name, email, role }
- `notifications`: { emailNotifications, taskUpdates, projectUpdates, weeklyDigest }

**No props needed**

---

## 🗂️ Data Structure

### Mock Data Location
`src/data/mockData.js`

### Available Data Exports:

#### 1. projects
Array of project objects:
```javascript
{
  id: number,
  name: string,
  description: string,
  progress: number,
  totalTasks: number,
  completedTasks: number,
  startDate: string,
  tasks: Array<Task>
}
```

#### 2. recentActivities
Array of activity objects:
```javascript
{
  id: number,
  type: 'completed' | 'updated' | 'created',
  action: string,
  title: string,
  project: string,
  time: string
}
```

#### 3. aiResponses
Object with AI response templates:
```javascript
{
  'generate-tasks': { title, content: Array<string> },
  'sprint-plan': { title, content: Array<string> },
  'summarize-status': { title, content: Array<string> },
  'identify-blockers': { title, content: Array<string> }
}
```

#### 4. user
User profile object:
```javascript
{
  name: string,
  email: string,
  avatar: string,
  role: string
}
```

#### 5. chartData
Chart data for Insights page:
```javascript
{
  tasksByStatus: Array<{ label, value, color }>,
  tasksByPriority: Array<{ label, value, color }>
}
```

---

## 🎨 Styling Conventions

### CSS Variables
Defined in `src/index.css`:

**Colors:**
- `--primary-color`: Main brand color
- `--primary-dark`: Darker variant for hovers
- `--primary-light`: Light background variant

**Backgrounds:**
- `--bg-primary`: Main background color
- `--bg-secondary`: Card/panel background
- `--bg-hover`: Hover state background

**Text:**
- `--text-primary`: Main text color
- `--text-secondary`: Secondary/muted text

**Effects:**
- `--border-color`: Border and divider color
- `--shadow-sm/md/lg`: Box shadow variants

### Component CSS Files
Each component has its own CSS file with the same name:
- `Sidebar.jsx` → `Sidebar.css`
- `Navbar.jsx` → `Navbar.css`
- etc.

---

## 🔄 State Management Pattern

### Local State
Use `useState` for component-specific data:
```jsx
const [isOpen, setIsOpen] = useState(false);
```

### Lifted State
Pass state from parent to children via props:
```jsx
// Parent
const [tasks, setTasks] = useState([]);
<TaskList tasks={tasks} />

// Child
function TaskList({ tasks }) {
  return tasks.map(task => <TaskCard task={task} />);
}
```

### Form State
Keep form data in component state:
```jsx
const [formData, setFormData] = useState({ name: '', email: '' });

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```

---

## 🛠️ Component Best Practices

### 1. Props Destructuring
```jsx
// Good
function StatCard({ icon, title, value, color }) {
  return <div>...</div>;
}

// Avoid
function StatCard(props) {
  return <div>{props.title}</div>;
}
```

### 2. Conditional Rendering
```jsx
{showModal && <Modal />}
{tasks.length === 0 && <EmptyState />}
{isLoading ? <Spinner /> : <Content />}
```

### 3. Event Handlers
```jsx
// For inline handlers
onClick={() => handleClick(id)}

// For direct handlers
onChange={handleChange}

// For preventing default
onSubmit={(e) => {
  e.preventDefault();
  handleSubmit();
}}
```

### 4. CSS Classes
```jsx
// Dynamic classes
className={`sidebar-item ${isActive ? 'active' : ''}`}

// Conditional classes
className={isOpen ? 'modal-open' : 'modal-closed'}
```

---

## 📚 Import Patterns

### Components
```jsx
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
```

### Hooks
```jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
```

### Data
```jsx
import { projects, user, aiResponses } from '../data/mockData';
```

### Styles
```jsx
import './ComponentName.css';
```

---

## 🚀 Extending Components

### Adding New Props
1. Update component function signature
2. Use prop with sensible default
3. Update component documentation

### Creating New Components
1. Create `.jsx` file in `components/`
2. Create matching `.css` file
3. Export component
4. Import where needed
5. Document in this file

### Modifying Existing Components
1. Understand current props and behavior
2. Make backward-compatible changes when possible
3. Update all usages if breaking changes
4. Test thoroughly

---

This documentation should help you understand and extend the components in TaskFlow AI. Happy coding! 🎉
