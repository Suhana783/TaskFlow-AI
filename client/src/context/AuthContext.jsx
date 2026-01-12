import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize auth state from localStorage on mount
  useEffect(() => {
    const storedAuth = localStorage.getItem('taskflow_auth');
    if (storedAuth) {
      try {
        const authData = JSON.parse(storedAuth);
        setCurrentUser(authData);
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Failed to parse auth data:', error);
        localStorage.removeItem('taskflow_auth');
      }
    }
    setLoading(false);
  }, []);

  const register = (name, email, password) => {
    // Create new user object with empty data
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In real app, never store plain passwords
      createdAt: new Date().toISOString()
    };

    // Store user credentials
    localStorage.setItem('taskflow_auth', JSON.stringify(newUser));

    // Initialize empty user data
    const userData = {
      projects: [],
      tasks: [],
      activityLog: []
    };
    localStorage.setItem(`taskflow_${email}`, JSON.stringify(userData));

    setCurrentUser(newUser);
    setIsAuthenticated(true);

    return newUser;
  };

  const login = (email, password) => {
    // In real app, verify with backend
    // For now, check if user data exists in localStorage
    const userDataKey = `taskflow_${email}`;
    const userExists = localStorage.getItem(userDataKey);

    if (!userExists) {
      // User doesn't have any stored data - they can still "login" as a new user
      // Initialize their empty data structure
      const userData = {
        projects: [],
        tasks: [],
        activityLog: []
      };
      localStorage.setItem(userDataKey, JSON.stringify(userData));
    }

    // Create user object (in real app, this would come from backend)
    const user = {
      id: Date.now(),
      name: email.split('@')[0],
      email,
      password // In real app, never handle passwords on client
    };

    localStorage.setItem('taskflow_auth', JSON.stringify(user));
    setCurrentUser(user);
    setIsAuthenticated(true);

    return user;
  };

  const logout = () => {
    localStorage.removeItem('taskflow_auth');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const getUserData = () => {
    if (!currentUser) return null;
    const dataKey = `taskflow_${currentUser.email}`;
    const data = localStorage.getItem(dataKey);
    return data ? JSON.parse(data) : { projects: [], tasks: [], activityLog: [] };
  };

  const saveUserData = (data) => {
    if (!currentUser) return false;
    const dataKey = `taskflow_${currentUser.email}`;
    localStorage.setItem(dataKey, JSON.stringify(data));
    return true;
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        loading,
        register,
        login,
        logout,
        getUserData,
        saveUserData
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
