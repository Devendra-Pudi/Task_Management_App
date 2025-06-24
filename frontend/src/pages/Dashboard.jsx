import React, { useEffect, useState } from "react";
import KanbanBoard from "../components/KanbanBoard";
import api from "../services/api";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const data = await api.getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdateTask = async (id, updates) => {
    await api.updateTask(id, updates);
    fetchTasks();
  };

  const handleDeleteTask = async (id) => {
    await api.deleteTask(id);
    fetchTasks();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Task Board</h1>
      </div>
      <KanbanBoard
        tasks={tasks}
        onUpdate={handleUpdateTask}
        onDelete={handleDeleteTask}
      />
    </div>
  );
};

export default Dashboard;
