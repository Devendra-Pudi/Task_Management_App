import TaskCard from "./TaskCard";

const columns = ["To Do", "In Progress", "Done"];

const KanbanBoard = ({ tasks, onUpdate, onDelete }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {columns.map((col) => (
      <div key={col} className="bg-white rounded-xl p-4 shadow-md">
        <h2 className="text-xl font-bold mb-4">{col}</h2>
        {tasks
          .filter((task) => task.status === col)
          .map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onUpdate={onUpdate}
              onDelete={onDelete}
            />
          ))}
      </div>
    ))}
  </div>
);

export default KanbanBoard;
