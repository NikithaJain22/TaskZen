import TaskItem from "./TaskItem";

export default function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onEdit,
}) {
  if (tasks.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow text-center">
        <p className="text-gray-500 dark:text-gray-400">
          No tasks found. Add a new task to get started!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
