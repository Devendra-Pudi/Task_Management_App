import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // This helper function sets the token for all future axios requests
  const setAuthToken = (token) => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
      localStorage.setItem('token', token);
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
      localStorage.removeItem('token');
    }
  };

  // Check if a user is already logged in when the app starts
  const loadUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthToken(token);
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/auth`);
        setUser(res.data);
      } catch (err) {
        setAuthToken(null)|| err.response?.data?.err;
      }
    }
    setLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, { email, password });
    setAuthToken(res.data.token);
    await loadUser();
  };

  const register = async (username, email, password) => {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, { username, email, password });
    setAuthToken(res.data.token);
    await loadUser();
  };

  const logout = () => {
    setAuthToken(null);
    setUser(null);
  };

  const authContextValue = { user, loading, login, register, logout };

  return (
    <AuthContext.Provider value={authContextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
