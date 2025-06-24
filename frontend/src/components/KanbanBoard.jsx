import React, { memo } from 'react';
import TaskCard from "./TaskCard";

const columns = [
  { id: "To Do", color: "from-blue-500 to-blue-600" },
  { id: "In Progress", color: "from-yellow-500 to-orange-500" },
  { id: "Done", color: "from-green-500 to-emerald-600" }
];

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
          key={column.id}
          className="bg-white rounded-xl shadow-lg overflow-hidden"
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, column.id)}
        >
          <div className={`bg-gradient-to-r ${column.color} p-4`}>
            <h2 className="text-lg font-semibold text-white flex items-center justify-between">
              {column.id}
              <span className="text-sm font-normal bg-white/20 px-2 py-1 rounded">
                {tasks.filter(task => task.status === column.id).length} tasks
              </span>
            </h2>
          </div>
          <div className="p-4 bg-gray-50/80">
            <div className="space-y-4">
              {tasks
                .filter((task) => task.status === column.id)
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
              {tasks.filter(task => task.status === column.id).length === 0 && (
                <div className="text-center py-4 text-gray-400 text-sm">
                  No tasks in {column.id}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
});

KanbanBoard.displayName = 'KanbanBoard';

export default KanbanBoard;
