import axios from "axios";
const API_URL = "https://task-management-app-ildg.onrender.com";
const token = () => localStorage.getItem("token");

const api = {
  getTasks: async () => {
    const res = await axios.get(`${API_URL}/tasks`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
    return res.data;
  },
  createTask: async (task) => {
    return axios.post(`${API_URL}/tasks`, task, {
      headers: { Authorization: `Bearer ${token()}` },
    });
  },
  updateTask: async (id, updates) => {
    return axios.put(`${API_URL}/tasks/${id}`, updates, {
      headers: { Authorization: `Bearer ${token()}` },
    });
  },
  deleteTask: async (id) => {
    return axios.delete(`${API_URL}/tasks/${id}`, {
      headers: { Authorization: `Bearer ${token()}` },
    });
  },
};

export default api;
