import { useState, useContext } from "react";
import { useLocalStorage } from "./hooks/useLocalStorgae";
import { ThemeContext } from "./contexts/ThemeContext";
import TaskForm from "./components/TaskFrom";
import TaskList from "./components/TaskList";
import CategoryFilter from "./components/CategoryFilter";
import PriorityFilter from "./components/PriorityFilter";
import ThemeToggle from "./components/ThemeToggle";

export default function App() {
  const { darkMode } = useContext(ThemeContext);
  const [tasks, setTasks] = useLocalStorage("tasks", []);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [showCompleted, setShowCompleted] = useState(true);

  const addTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  const updateTask = (updatedTask) => {
    setTasks(
      tasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
    setEditingTask(null);
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const editTask = (task) => {
    setEditingTask(task);
    // Scroll to form
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      selectedCategory === "All" || task.category === selectedCategory;
    const priorityMatch =
      selectedPriority === "All" || task.priority === selectedPriority;
    const completionMatch = showCompleted || !task.completed;
    return categoryMatch && priorityMatch && completionMatch;
  });

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"
      }`}
    >
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-blue-900 dark:text-white">
              Task Manager
            </h1>
            <ThemeToggle />
          </div>
          <TaskForm
            onAddTask={addTask}
            editTask={editingTask}
            onUpdateTask={updateTask}
            onCancel={() => setEditingTask(null)}
          />
        </header>

        <main className="text-gray-800 dark:text-gray-200">
          <div className="flex flex-col md:flex-row md:space-x-6 mb-6">
            <div className="md:w-1/2 mb-4 md:mb-0">
              <CategoryFilter
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
              />
            </div>
            <div className="md:w-1/2">
              <PriorityFilter
                selectedPriority={selectedPriority}
                onSelectPriority={setSelectedPriority}
              />
            </div>
          </div>

          <div className="mb-6 flex items-center">
            <input
              id="showCompleted"
              type="checkbox"
              checked={showCompleted}
              onChange={() => setShowCompleted(!showCompleted)}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
            />
            <label
              htmlFor="showCompleted"
              className="ml-2 text-sm text-blue-700 dark:text-gray-300"
            >
              Show completed tasks
            </label>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {selectedCategory === "All"
                  ? "All Tasks"
                  : `${selectedCategory} Tasks`}
                {selectedPriority !== "All" &&
                  ` (${selectedPriority} Priority)`}
              </h2>
              <span className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {filteredTasks.length}{" "}
                {filteredTasks.length === 1 ? "task" : "tasks"}
              </span>
            </div>
            <TaskList
              tasks={filteredTasks}
              onToggleComplete={toggleComplete}
              onDelete={deleteTask}
              onEdit={editTask}
            />
          </div>
        </main>

        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            © {new Date().getFullYear()} Task Manager App. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
