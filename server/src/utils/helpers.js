// Example utility functions
// Utilities will contain helper functions

export const formatResponse = (status, message, data = null) => {
  return {
    status,
    message,
    data,
    timestamp: new Date()
  };
};

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};
