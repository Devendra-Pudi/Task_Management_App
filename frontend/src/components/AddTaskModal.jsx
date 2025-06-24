import { useState } from "react";
import { toast } from "react-hot-toast";

export default function AddTaskModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    try {
      setIsSubmitting(true);
      await onAdd(form);
    } catch (error) {
      console.error('Error in AddTaskModal:', error);
      toast.error('Failed to add task. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black/40" onClick={onClose}></div>
      <form
        className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl relative z-10"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              name="title"
              placeholder="Enter task title"
              value={form.title}
              onChange={handleChange}
              required
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              name="description"
              placeholder="Enter task description"
              value={form.description}
              onChange={handleChange}
              rows="3"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              name="priority"
              value={form.priority}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <select
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              name="status"
              value={form.status}
              onChange={handleChange}
              disabled={isSubmitting}
            >
              <option value="To Do">To Do</option>
              <option value="In Progress">In Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
        </div>

        <div className="flex gap-3 mt-6">
          <button
            className={`flex-1 bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding...' : 'Add Task'}
          </button>
          <button
            className="flex-1 bg-gray-100 text-gray-800 font-semibold py-2 px-4 rounded-lg hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
            type="button"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
