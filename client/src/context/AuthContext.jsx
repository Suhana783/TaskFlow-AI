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
    // Check if user already exists
    const userKey = `taskflow_user_${email}`;
    if (localStorage.getItem(userKey)) {
      throw new Error('User already exists');
    }

    // Create new user object with credentials
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In real app, this should be hashed on backend
      createdAt: new Date().toISOString()
    };

    // Store user credentials separately
    localStorage.setItem(userKey, JSON.stringify(newUser));

    // Initialize empty user data
    const userData = {
      projects: [],
      tasks: [],
      activityLog: []
    };
    localStorage.setItem(`taskflow_data_${email}`, JSON.stringify(userData));

    // Set session
    const sessionUser = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email
    };
    localStorage.setItem('taskflow_auth', JSON.stringify(sessionUser));
    setCurrentUser(sessionUser);
    setIsAuthenticated(true);

    return sessionUser;
  };

  const login = (email, password) => {
    // Check if user exists and retrieve their stored credentials
    const userKey = `taskflow_user_${email}`;
    const storedUserData = localStorage.getItem(userKey);

    if (!storedUserData) {
      throw new Error('User not found. Please register first.');
    }

    try {
      const userData = JSON.parse(storedUserData);
      
      // Validate password
      if (userData.password !== password) {
        throw new Error('Invalid password');
      }

      // Create user object for session
      const user = {
        id: userData.id,
        name: userData.name,
        email: userData.email
      };

      localStorage.setItem('taskflow_auth', JSON.stringify(user));
      setCurrentUser(user);
      setIsAuthenticated(true);

      return user;
    } catch (error) {
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('taskflow_auth');
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const getUserData = () => {
    if (!currentUser) return null;
    const dataKey = `taskflow_data_${currentUser.email}`;
    const data = localStorage.getItem(dataKey);
    return data ? JSON.parse(data) : { projects: [], tasks: [], activityLog: [] };
  };

  const saveUserData = (data) => {
    if (!currentUser) return false;
    const dataKey = `taskflow_data_${currentUser.email}`;
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
