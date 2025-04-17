const CATEGORIES = ["All", "Work", "Personal", "Shopping", "Study"];

export default function CategoryFilter({ selectedCategory, onSelectCategory }) {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-blue-700 dark:text-gray-300 mb-2">
        Filter by Category
      </label>
      <div className="flex flex-wrap gap-2">
        {CATEGORIES.map((category) => (
          <button
            key={category}
            onClick={() => onSelectCategory(category)}
            className={`px-3 py-1 text-sm rounded-full ${
              selectedCategory === category
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
