import { useState } from "react";

export default function AddTaskModal({ onClose, onAdd }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(form);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form
        className="bg-white rounded-xl p-8 w-full max-w-md shadow-2xl"
        onSubmit={handleSubmit}
      >
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <input
          className="w-full mb-3 p-3 border rounded"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <textarea
          className="w-full mb-3 p-3 border rounded"
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
        />
        <select
          className="w-full mb-3 p-3 border rounded"
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          className="w-full mb-3 p-3 border rounded"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <div className="flex gap-2 mt-4">
          <button className="btn-primary flex-1" type="submit">
            Add Task
          </button>
          <button
            className="flex-1 py-2 px-4 border rounded"
            type="button"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
