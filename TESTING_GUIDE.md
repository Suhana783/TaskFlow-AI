# TaskFlow AI - Testing Guide

## 🧪 How to Test the Implementation

### Prerequisites
- Node.js installed
- npm packages installed (`npm install` in both client and server folders)

### Running the App

```bash
# Terminal 1 - Start the development server
cd client
npm run dev

# Terminal 2 (optional) - Start backend server
cd server
npm start
```

The app will be available at `http://localhost:5173` (or the port shown in terminal)

---

## ✅ Test Cases

### Test 1: Register New User (Empty State)
**Steps**:
1. Open `http://localhost:5173`
2. You should be redirected to `/login`
3. Click "Register" link
4. Fill in form:
   - Name: "John Doe"
   - Email: "john@example.com"
   - Password: "password123"
   - Confirm: "password123"
5. Click "Register"

**Expected Results**:
- ✅ User redirected to `/dashboard`
- ✅ Dashboard shows: "📭 No projects yet"
- ✅ Sidebar shows "John Doe" and "john@example.com"
- ✅ All stats show 0
- ✅ Projects page shows empty state
- ✅ Insights page shows empty state

**Data Check** (Open Browser DevTools > Application > Local Storage):
```
taskflow_auth = {"id":..., "name":"John Doe", "email":"john@example.com", ...}
taskflow_john@example.com = {"projects":[], "tasks":[], "activityLog":[]}
```

---

### Test 2: Create Project & Task (Data Persistence)
**Steps**:
1. On Dashboard, go to "Projects" page
2. Click "➕ Create New Project"
3. Fill in:
   - Project Name: "My First Project"
   - Description: "Testing data isolation"
4. Click "Create Project"

**Expected Results**:
- ✅ Project appears in Projects grid
- ✅ Project card shows in Dashboard's "Active Projects"
- ✅ Kanban board link works
- ✅ Data is saved to localStorage

**Add a Task**:
1. Click on project or go to Kanban
2. Click "➕ Add Task"
3. Fill in:
   - Title: "Complete setup"
   - Priority: "high"
4. Click "Add Task"

**Expected Results**:
- ✅ Task appears in "TO DO" column
- ✅ Stats update on Dashboard
- ✅ Task count shows in Kanban column header
- ✅ Data is saved to user's localStorage

---

### Test 3: Logout & Login (Data Persistence)
**Steps**:
1. Click logout in sidebar (🚪 Logout)
2. You should be redirected to `/login`
3. Login with:
   - Email: "john@example.com"
   - Password: "password123"
4. Click "Login"

**Expected Results**:
- ✅ Redirected to `/dashboard`
- ✅ **All projects and tasks are restored** ← This proves persistence!
- ✅ Sidebar shows correct user info
- ✅ Stats match what you created
- ✅ No mock data appears

---

### Test 4: AI Assistant Intelligence
**Steps**:
1. Navigate to AI Assistant page
2. Type different messages to test responses:

**Test Messages**:
```
a) "What's my progress?"
b) "I'm stuck on something"
c) "What should I do next?"
d) "How does this work?"
e) "Hello!"
f) "Random message xyz"
```

**Expected Results**:
- ✅ **Test a**: Shows project/task statistics with encouraging message
- ✅ **Test b**: Lists overdue tasks OR high-priority tasks with advice
- ✅ **Test c**: Suggests specific next actions based on your tasks
- ✅ **Test d**: Explains app features and guides you
- ✅ **Test e**: Friendly greeting with your current stats
- ✅ **Test f**: Smart fallback response, helpful and friendly
- ✅ **NO "AI not implemented" messages**
- ✅ All responses use actual user data
- ✅ Responses include emojis and friendly tone

**Empty State Test**:
1. Log in as a new user with no projects
2. Ask AI Assistant anything
3. Should respond: "You don't have any projects yet. Start by creating one, and I'll help you plan it step by step. 😊"

**Overdue Task Test**:
1. Create a task with due date in the past (e.g., "10/01/2026")
2. Ask: "Any blockers?"
3. AI should detect and list the overdue task automatically

---

### Test 4: Multiple Users (Data Isolation)
**Steps**:
1. Logout (click 🚪 Logout)
2. Register new user:
   - Name: "Jane Smith"
   - Email: "jane@example.com"
   - Password: "password123"
3. Verify Dashboard is empty

**Expected Results**:
- ✅ Jane's dashboard is completely empty
- ✅ No projects from John's account
- ✅ Sidebar shows "Jane Smith"

**Switch Users**:
1. Logout
2. Login as john@example.com
3. Verify all John's projects are there
4. Logout
5. Login as jane@example.com
6. Verify Jane's dashboard is empty

**Expected Results**:
- ✅ Each user sees only their own data
- ✅ Data is completely isolated
- ✅ No data leakage between accounts

---

### Test 5: Route Protection
**Steps**:
1. Open DevTools > Application > Local Storage
2. Delete `taskflow_auth` (simulate logout)
3. Manually go to `http://localhost:5173/dashboard`

**Expected Results**:
- ✅ You are redirected to `/login`
- ✅ Cannot access protected routes without auth

**Test Other Routes**:
- `/projects` → redirects to `/login`
- `/kanban` → redirects to `/login`
- `/ai-assistant` → redirects to `/login`
- `/insights` → redirects to `/login`
- `/settings` → redirects to `/login`

---

### Test 6: Empty State Messages
**Steps**:
1. Create a new user account
2. Check each page

**Expected Empty States**:
- ✅ **Dashboard**: "📭 No projects yet - Create your first project to get started"
- ✅ **Projects**: "📭 No projects yet - Create your first project by clicking the button above"
- ✅ **Insights**: "📊 No data yet - Create projects and tasks to see insights"
- ✅ **AI Assistant**: Shows helpful message for quick actions

---

### Test 7: AI Assistant with Data
**Steps**:
1. Create a project with some tasks
2. Go to AI Assistant page
3. Try quick actions:
   - "Generate tasks for my project"
   - "Create sprint plan"
   - "Summarize project status"

**Expected Results**:
- ✅ AI responses are personalized with your data
- ✅ Shows actual project/task counts
- ✅ Provides relevant suggestions

---

### Test 8: Activity Log (Optional)
**Create Multiple Projects & Tasks**:
1. Create 3 projects
2. Create tasks in each
3. Move tasks between columns
4. Go to Dashboard

**Expected Results**:
- ✅ Recent Activity shows your actions
- ✅ Activity log is saved per user

---

### Test 9: Form Validation
**Steps**:
1. Try to register with:
   - Missing fields
   - Invalid email (no @)
   - Mismatched passwords
   - Short password (< 6 chars)
2. Try to login with wrong email format

**Expected Results**:
- ✅ Clear error messages appear
- ✅ Form doesn't submit
- ✅ User guidance is helpful

---

### Test 10: Browser Refresh Persistence
**Steps**:
1. Create some projects and tasks
2. Press `F5` to refresh the page
3. Verify you're still logged in and see your data
4. Close the entire browser tab
5. Close and reopen the browser
6. Navigate to the app again
7. Login with your email

**Expected Results**:
- ✅ After F5: Still logged in, all data visible
- ✅ After browser close: Can login and see all data again
- ✅ Data persists indefinitely until logout

---

## 🐛 Troubleshooting

### Issue: "useAuth must be used within AuthProvider"
**Solution**: Ensure App.jsx wraps content with `AuthProvider`

### Issue: Data not persisting after refresh
**Solution**: Check browser's localStorage is enabled
- DevTools > Application > Storage > Cookies > Allow

### Issue: Can't login after registering
**Solution**: 
- Check localStorage has both `taskflow_auth` and `taskflow_email@domain`
- Clear all localStorage and try again
- Check browser console for errors

### Issue: "Project not found" on Kanban
**Solution**: 
- Don't navigate directly to `/kanban` without project ID
- Go to Projects page and click a project card

---

## 📊 Data Structure Verification

**In Browser DevTools > Application > Local Storage**, you should see:

```
Key: taskflow_auth
Value: {
  "id": 1704067200000,
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "createdAt": "2026-01-12T14:30:00.000Z"
}

Key: taskflow_john@example.com
Value: {
  "projects": [
    {
      "id": 1704067234567,
      "name": "My Project",
      "description": "...",
      "progress": 0,
      "totalTasks": 2,
      "completedTasks": 0,
      "startDate": "12/01/2026",
      "tasks": [...]
    }
  ],
  "tasks": [],
  "activityLog": [...]
}
```

---

## ✨ Success Indicators

After implementing all changes, you should see:

- ✅ New users start with completely empty state
- ✅ All data is stored per user (not shared)
- ✅ No mock data appears after auth
- ✅ Data persists across page refresh
- ✅ Data persists across browser close
- ✅ Logout clears auth but keeps data
- ✅ Different users see only their data
- ✅ Empty state messages guide new users
- ✅ AI Assistant adapts to user's data
- ✅ All forms have validation

---

## 🚀 Next: Backend Integration

When you're ready to connect a backend:

1. Replace localStorage calls with API calls
2. Update AuthContext to use `/api/auth/register` and `/api/auth/login`
3. Store JWT tokens instead of plaintext passwords
4. Update `getUserData()` to fetch from `/api/user/data`
5. Update `saveUserData()` to POST to `/api/user/data`
6. Add proper error handling for API failures

See `IMPLEMENTATION_COMPLETE.md` for more details.
