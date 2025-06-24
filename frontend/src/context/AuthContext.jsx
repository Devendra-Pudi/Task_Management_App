import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Create and export the context
const AuthContext = createContext(null);
export { AuthContext };

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Export the provider as a named export
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This helper function sets the token for all future axios requests
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['Authorization'];
      localStorage.removeItem('token');
    }
  };

  // Check if a user is already logged in when the app starts
  const loadUser = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        setAuthToken(token);
        const res = await axios.get(`${API_URL}/auth/me`);
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
      const res = await axios.post(`${API_URL}/auth/login`, { email, password });
      const { token, user: userData } = res.data;
      setAuthToken(token);
      setUser(userData);
      toast.success('Login successful!');
      return userData;
    } catch (err) {
      console.error('Login error:', err);
      const errorMessage = err.response?.data?.error || 'Login failed. Please check your credentials.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
    }
  };

  const register = async (username, email, password) => {
    try {
      const res = await axios.post(`${API_URL}/auth/signup`, { username, email, password });
      toast.success('Registration successful! Please login.');
      return res.data;
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.error || 'Registration failed. Please try again.';
      toast.error(errorMessage);
      throw new Error(errorMessage);
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
