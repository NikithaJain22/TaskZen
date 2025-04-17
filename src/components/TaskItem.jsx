import { useState } from "react";

export default function TaskItem({ task, onToggleComplete, onDelete, onEdit }) {
  const [showDetails, setShowDetails] = useState(false);

  const priorityColors = {
    High: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    Medium:
      "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
    Low: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  };

  const categoryColors = {
    Work: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    Personal: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    Shopping: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
    Study:
      "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
  };

  const formattedDate = new Date(task.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div
      className={`mb-3 bg-white dark:bg-gray-800 rounded-lg shadow p-4 border-l-4 ${
        task.completed ? "border-green-500" : "border-blue-500"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="mt-1 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
          />
          <div className="ml-3 flex-1">
            <div
              className={`font-medium text-gray-900 dark:text-gray-100 ${
                task.completed
                  ? "line-through text-gray-500 dark:text-gray-400"
                  : ""
              }`}
              onClick={() => setShowDetails(!showDetails)}
            >
              {task.title}
            </div>
            <div className="flex flex-wrap gap-2 mt-1">
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  categoryColors[task.category]
                }`}
              >
                {task.category}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  priorityColors[task.priority]
                }`}
              >
                {task.priority}
              </span>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200">
                {formattedDate}
              </span>
            </div>
          </div>
        </div>

        <div className="flex space-x-1">
          <button
            onClick={() => onEdit(task)}
            className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            aria-label="Edit task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="text-gray-500 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-400"
            aria-label="Delete task"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            aria-label={showDetails ? "Hide details" : "Show details"}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-5 w-5 transform ${showDetails ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
        </div>
      </div>

      {showDetails && task.description && (
        <div className="mt-3 pl-7 text-gray-600 dark:text-gray-300 text-sm">
          {task.description}
        </div>
      )}
    </div>
  );
}
