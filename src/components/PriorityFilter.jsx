const PRIORITIES = ["All", "High", "Medium", "Low"];

export default function PriorityFilter({ selectedPriority, onSelectPriority }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-2">
        Filter by Priority
      </label>
      <div className="flex flex-wrap gap-2">
        {PRIORITIES.map((priority) => (
          <button
            key={priority}
            onClick={() => onSelectPriority(priority)}
            className={`px-3 py-1 text-sm rounded-full ${
              selectedPriority === priority
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {priority}
          </button>
        ))}
      </div>
    </div>
  );
}
