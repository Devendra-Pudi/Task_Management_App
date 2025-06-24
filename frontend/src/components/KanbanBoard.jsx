import React from 'react';
import TaskCard from "./TaskCard";

const columns = ["To Do", "In Progress", "Done"];

const KanbanBoard = ({ tasks, onUpdateTask, onDeleteTask }) => {
  // Debug log to check tasks
  console.log('KanbanBoard tasks:', tasks);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((col) => (
        <div key={col} className="bg-gray-50 rounded-xl p-4">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">{col}</h2>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.status === col)
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={onUpdateTask}
                  onDelete={onDeleteTask}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;
