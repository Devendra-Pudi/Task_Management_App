import { useState } from "react";

const TaskCard = ({ task, onUpdate, onDelete }) => {
  const [edit, setEdit] = useState(false);
  const [form, setForm] = useState({ ...task });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(task._id, form);
    setEdit(false);
  };

  if (edit) {
    return (
      <form className="bg-gray-50 rounded-lg p-4 mb-3 border" onSubmit={handleSubmit}>
        <input
          className="w-full mb-2 p-2 border rounded"
          name="title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          className="w-full mb-2 p-2 border rounded"
          name="description"
          value={form.description}
          onChange={handleChange}
        />
        <select
          className="w-full mb-2 p-2 border rounded"
          name="priority"
          value={form.priority}
          onChange={handleChange}
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
        <select
          className="w-full mb-2 p-2 border rounded"
          name="status"
          value={form.status}
          onChange={handleChange}
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>
        <div className="flex gap-2">
          <button className="btn-primary flex-1" type="submit">
            Save
          </button>
          <button
            className="flex-1 py-2 px-4 border rounded"
            type="button"
            onClick={() => setEdit(false)}
          >
            Cancel
          </button>
        </div>
      </form>
    );
  }

  return (
    <div className="bg-gray-50 rounded-lg p-4 mb-3 border border-gray-200 shadow hover:shadow-lg transition">
      <div className="flex justify-between items-center mb-2">
        <span className={`px-2 py-1 rounded text-xs font-semibold ${task.priority === 'High' ? 'bg-red-100 text-red-700' : task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
          {task.priority}
        </span>
        <span className="text-xs text-gray-400">{task.status}</span>
      </div>
      <h3 className="font-bold text-lg mb-1">{task.title}</h3>
      <p className="text-gray-600 text-sm">{task.description}</p>
      <div className="flex gap-2 mt-3">
        <button className="btn-primary flex-1" onClick={() => setEdit(true)}>
          Edit
        </button>
        <button
          className="flex-1 py-2 px-4 border rounded text-red-600"
          onClick={() => onDelete(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
