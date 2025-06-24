import React, { memo } from 'react';
import TaskCard from "./TaskCard";

const columns = ["To Do", "In Progress", "Done"];

const KanbanBoard = memo(({ tasks, onUpdateTask, onDeleteTask }) => {
  // Log tasks for debugging
  console.log('KanbanBoard rendering with tasks:', tasks);

  const handleDragStart = (e, taskId) => {
    e.dataTransfer.setData('taskId', taskId);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, newStatus) => {
    e.preventDefault();
    const taskId = e.dataTransfer.getData('taskId');
    if (taskId) {
      onUpdateTask(taskId, { status: newStatus });
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {columns.map((column) => (
        <div
          key={column}
          className="bg-gray-50 rounded-xl p-4"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column)}
        >
          <h2 className="text-lg font-semibold mb-4 text-gray-700 flex items-center justify-between">
            {column}
            <span className="text-sm font-normal text-gray-500">
              {tasks.filter(task => task.status === column).length} tasks
            </span>
          </h2>
          <div className="space-y-4">
            {tasks
              .filter((task) => task.status === column)
              .map((task) => (
                <TaskCard
                  key={task._id}
                  task={task}
                  onUpdate={onUpdateTask}
                  onDelete={onDeleteTask}
                  draggable
                  onDragStart={(e) => handleDragStart(e, task._id)}
                />
              ))}
          </div>
        </div>
      ))}
    </div>
  );
});

KanbanBoard.displayName = 'KanbanBoard';

export default KanbanBoard;
