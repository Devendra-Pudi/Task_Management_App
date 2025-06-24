import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance with default config
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add request interceptor for authentication
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    // Enhanced error logging
    console.error('API Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      endpoint: error.config?.url
    });
    return Promise.reject(error);
  }
);

const api = {
  getTasks: async () => {
    try {
      const res = await axiosInstance.get('/tasks');
      return res.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  createTask: async (task) => {
    try {
      const res = await axiosInstance.post('/tasks', task);
      return res.data;
    } catch (error) {
      console.error('Error creating task:', error);
      throw error;
    }
  },

  updateTask: async (id, updates) => {
    try {
      const res = await axiosInstance.put(`/tasks/${id}`, updates);
      return res.data;
    } catch (error) {
      console.error('Error updating task:', error);
      throw error;
    }
  },

  deleteTask: async (id) => {
    try {
      const res = await axiosInstance.delete(`/tasks/${id}`);
      return res.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },

  sendFeedback: async (feedbackData) => {
    try {
      const res = await axiosInstance.post('/feedback', feedbackData);
      return res.data;
    } catch (error) {
      console.error('Error sending feedback:', error);
      throw error.response?.data || error;
    }
  }
};

export default api;
