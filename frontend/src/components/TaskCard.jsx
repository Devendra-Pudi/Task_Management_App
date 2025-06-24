import React, { useState, memo } from 'react';
import { toast } from 'react-hot-toast';

const TaskCard = memo(({ task, onUpdate, onDelete, draggable, onDragStart }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(task.title);
  const [editedDescription, setEditedDescription] = useState(task.description || '');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleUpdate = async (updates) => {
    try {
      await onUpdate(task._id, updates);
    } catch (error) {
      toast.error('Failed to update task');
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await onDelete(task._id);
    } catch (error) {
      toast.error('Failed to delete task');
      setIsDeleting(false);
    }
  };

  const handleEditSave = async () => {
    if (!editedTitle.trim()) {
      toast.error('Title cannot be empty');
      return;
    }

    try {
      await handleUpdate({
        title: editedTitle.trim(),
        description: editedDescription.trim()
      });
      setIsEditing(false);
    } catch (error) {
      // Error is handled in handleUpdate
    }
  };

  const priorityColors = {
    Low: {
      bg: 'bg-green-100',
      text: 'text-green-700',
      border: 'border-green-200',
      hover: 'hover:border-green-300 hover:bg-green-50'
    },
    Medium: {
      bg: 'bg-yellow-100',
      text: 'text-yellow-700',
      border: 'border-yellow-200',
      hover: 'hover:border-yellow-300 hover:bg-yellow-50'
    },
    High: {
      bg: 'bg-red-100',
      text: 'text-red-700',
      border: 'border-red-200',
      hover: 'hover:border-red-300 hover:bg-red-50'
    }
  };

  const colors = priorityColors[task.priority];

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-xl shadow-md border border-gray-200">
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Task title"
          autoFocus
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full mb-3 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Task description"
          rows="2"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={() => setIsEditing(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleEditSave}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`bg-white p-4 rounded-xl shadow-sm border ${colors.border} ${colors.hover} transform hover:-translate-y-1 transition-all duration-200 ${
        isDeleting ? 'opacity-50' : ''
      }`}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(true)}
            className="text-gray-400 hover:text-blue-500 transition-colors"
            disabled={isDeleting}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button
            onClick={handleDelete}
            className="text-gray-400 hover:text-red-500 transition-colors"
            disabled={isDeleting}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      {task.description && (
        <p className="text-sm text-gray-600 mb-3">{task.description}</p>
      )}
      <div className="flex justify-between items-center">
        <span
          className={`text-xs font-medium px-3 py-1 rounded-full ${colors.bg} ${colors.text}`}
        >
          {task.priority}
        </span>
        <span className="text-xs text-gray-500">
          {new Date(task.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
});

TaskCard.displayName = 'TaskCard';

export default TaskCard;
