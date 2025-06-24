import React, { createContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import API from '../api';

// Create and export the context
const AuthContext = createContext(null);
export { AuthContext };

// Export the provider as a named export
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This helper function sets the token for all future API requests
  const setAuthToken = (token) => {
    if (token) {
      API.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete API.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Check if a user is already logged in when the app starts
  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        const res = await API.get('/auth/me');
        setUser(res.data);
      }
    } catch (err) {
      console.error('Error loading user:', err);
      setAuthToken(null);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await API.post('/auth/login', { email, password });
      const { token, user: userData } = res.data;
      setAuthToken(token);
      setUser(userData);
      toast.success('Login successful!');
      return userData;
    } catch (err) {
      console.error('Login error:', {
        message: err.response?.data?.error || err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await API.post('/auth/signup', { username, email, password });
      toast.success('Registration successful! Please login.');
      return res.data;
    } catch (err) {
      console.error('Registration error:', {
        message: err.response?.data?.error || err.message,
        status: err.response?.status,
        data: err.response?.data
      });
      const errorMessage = err.response?.data?.error || err.response?.data?.message || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      throw err;
    }
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
    toast.success('Logged out successfully');
  };

  const authContextValue = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}
