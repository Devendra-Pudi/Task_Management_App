import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import api from '../api';
import KanbanBoard from '../components/KanbanBoard';
import { toast } from 'react-hot-toast';

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const response = await api.get('/tasks');
      console.log('Tasks response:', response.data); // Debug log
      if (response.data.success) {
        setTasks(response.data.data || []);
        setError(null);
      } else {
        setError('Failed to load tasks. Please try again later.');
        toast.error('Failed to load tasks');
      }
    } catch (err) {
      console.error('Error fetching tasks:', err.response || err);
      setError('Failed to load tasks. Please try again later.');
      toast.error('Failed to load tasks');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskId, updates) => {
    try {
      const response = await api.put(`/tasks/${taskId}`, updates);
      if (response.data.success) {
        setTasks(tasks.map(task => 
          task._id === taskId ? response.data.data : task
        ));
        toast.success('Task updated successfully');
      }
    } catch (err) {
      console.error('Error updating task:', err);
      toast.error('Failed to update task');
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await api.delete(`/tasks/${taskId}`);
      if (response.data.success) {
        setTasks(tasks.filter(task => task._id !== taskId));
        toast.success('Task deleted successfully');
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      toast.error('Failed to delete task');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, {user?.username || 'User'}!</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">Your Tasks</h2>
          {tasks.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No tasks found. Start by adding a new task!
            </div>
          ) : (
            <KanbanBoard
              tasks={tasks}
              onUpdateTask={handleUpdateTask}
              onDeleteTask={handleDeleteTask}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
