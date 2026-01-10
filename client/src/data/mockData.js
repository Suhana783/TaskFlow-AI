// Mock data for TaskFlow AI project management tool

export const projects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website with modern UI/UX",
    progress: 65,
    totalTasks: 3,
    completedTasks: 1,
    startDate: "01/01/2026",
    tasks: [
      {
        id: 1,
        title: "Setup authentication",
        description: "Implement user login and registration",
        status: "todo",
        priority: "medium",
        dueDate: "25/01/2026"
      },
      {
        id: 2,
        title: "Implement homepage",
        description: "Build the new homepage component",
        status: "in-progress",
        priority: "high",
        dueDate: "20/01/2026"
      },
      {
        id: 3,
        title: "Design mockups",
        description: "Create high-fidelity mockups in Figma",
        status: "done",
        priority: "high",
        dueDate: "15/01/2026"
      }
    ]
  },
  {
    id: 2,
    name: "Mobile App Development",
    description: "Build cross-platform mobile app",
    progress: 30,
    totalTasks: 2,
    completedTasks: 1,
    startDate: "05/01/2026",
    tasks: [
      {
        id: 4,
        title: "Setup React Native",
        description: "Initialize project and dependencies",
        status: "todo",
        priority: "high",
        dueDate: "18/01/2026"
      },
      {
        id: 5,
        title: "Design app screens",
        description: "Design app screens",
        status: "done",
        priority: "medium",
        dueDate: "12/01/2026"
      }
    ]
  }
];

export const recentActivities = [
  {
    id: 1,
    type: "completed",
    action: "Task completed:",
    title: "Design mockups",
    project: "Website Redesign",
    time: "2 hours ago"
  },
  {
    id: 2,
    type: "updated",
    action: "Task updated:",
    title: "Implement homepage",
    project: "Website Redesign",
    time: "4 hours ago"
  },
  {
    id: 3,
    type: "created",
    action: "New task created:",
    title: "Design app screens",
    project: "Mobile App Development",
    time: "Yesterday"
  }
];

export const aiResponses = {
  "generate-tasks": {
    title: "Generated Tasks for Your Project",
    content: [
      "Based on your project requirements, here are suggested tasks:",
      "",
      "1. **Setup Development Environment**",
      "   - Priority: High",
      "   - Estimated time: 2 days",
      "   - Dependencies: None",
      "",
      "2. **Design Database Schema**",
      "   - Priority: High",
      "   - Estimated time: 1 day",
      "   - Dependencies: None",
      "",
      "3. **Implement Core Features**",
      "   - Priority: Medium",
      "   - Estimated time: 5 days",
      "   - Dependencies: Tasks 1, 2",
      "",
      "4. **Write Unit Tests**",
      "   - Priority: Medium",
      "   - Estimated time: 2 days",
      "   - Dependencies: Task 3",
      "",
      "5. **Deploy to Staging**",
      "   - Priority: Low",
      "   - Estimated time: 1 day",
      "   - Dependencies: All above"
    ]
  },
  "sprint-plan": {
    title: "Sprint Plan Generated",
    content: [
      "Here's your recommended 2-week sprint plan:",
      "",
      "**Week 1 (Days 1-5):**",
      "- Setup authentication system",
      "- Design and implement homepage",
      "- Create user dashboard",
      "",
      "**Week 2 (Days 6-10):**",
      "- Build project management features",
      "- Implement task tracking",
      "- Write documentation and tests",
      "",
      "**Sprint Goals:**",
      "✓ Complete all high-priority tasks",
      "✓ Reach 60% project completion",
      "✓ Deploy to staging environment",
      "",
      "**Team Capacity:** 40 hours/week",
      "**Estimated Completion:** 95%"
    ]
  },
  "summarize-status": {
    title: "Project Status Summary",
    content: [
      "**Overall Project Health: Good ✓**",
      "",
      "**Current Status:**",
      "- Total Tasks: 5",
      "- Completed: 2 (40%)",
      "- In Progress: 2 (40%)",
      "- To Do: 1 (20%)",
      "- Overdue: 0",
      "",
      "**Active Projects:**",
      "1. Website Redesign - 65% complete",
      "2. Mobile App Development - 30% complete",
      "",
      "**Recent Achievements:**",
      "✓ Completed design mockups ahead of schedule",
      "✓ Homepage implementation progressing well",
      "",
      "**Upcoming Milestones:**",
      "→ Authentication system due in 10 days",
      "→ Mobile app setup due in 8 days",
      "",
      "**Recommendation:** Keep current pace to meet deadlines"
    ]
  },
  "identify-blockers": {
    title: "Identified Blockers & Risks",
    content: [
      "**Current Blockers:**",
      "",
      "⚠️ **High Priority Issues:**",
      "• No blockers detected at this time",
      "",
      "⚠️ **Medium Priority Warnings:**",
      "• In Progress tasks are at 30% - consider moving items to active status to maintain momentum",
      "• Balance workload - you have 5 overdue tasks that need attention",
      "",
      "**Recommendations:**",
      "1. Break down large tasks (>100 chars) into smaller, actionable items",
      "2. Address overdue tasks to get back on track",
      "3. Consider moving more tasks from 'To Do' to 'In Progress' to maintain team velocity",
      "",
      "**Risk Assessment:** Low to Medium",
      "Overall, your project is healthy but requires attention to task distribution."
    ]
  }
};

export const user = {
  name: "Suhana",
  email: "suhana@taskflow.com",
  avatar: "S",
  role: "Project Manager"
};

export const chartData = {
  tasksByStatus: [
    { label: "To Do", value: 1, color: "#6366f1" },
    { label: "In Progress", value: 2, color: "#fbbf24" },
    { label: "Done", value: 2, color: "#10b981" }
  ],
  tasksByPriority: [
    { label: "High", value: 3, color: "#ef4444" },
    { label: "Medium", value: 2, color: "#fbbf24" },
    { label: "Low", value: 0, color: "#6366f1" }
  ]
};
