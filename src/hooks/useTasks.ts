import { SectionId, Task, TasksBySections } from "../types/tasks";
import { useLocalStorage } from "./useLocalStorage";

const INITIAL_TASKS: TasksBySections = {
  DO_FIRST: [],
  DO_LATER: [],
  DELEGATE: [],
  ELIMINATE: []
};

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<TasksBySections>(
    "tasks",
    INITIAL_TASKS
  );

  const addTask = (title: string, sectionId: SectionId) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      isCompleted: false,
      createdAt: Date.now()
    };

    setTasks((prev) => ({
      ...prev,
      [sectionId]: [...prev[sectionId], newTask]
    }));
  };

  const deleteTask = (taskId: string, sectionId: SectionId) => {
    setTasks((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].filter((task) => task.id !== taskId)
    }));
  };

  const moveTask = (
    taskId: string,
    fromSection: SectionId,
    toSection: SectionId
  ) => {
    setTasks((prev) => {
      const task = prev[fromSection].find((t) => t.id === taskId);
      if (!task) return prev;

      return {
        ...prev,
        [fromSection]: prev[fromSection].filter((t) => t.id !== taskId),
        [toSection]: [...prev[toSection], task]
      };
    });
  };

  const updateTask = (
    taskId: string,
    sectionId: SectionId,
    updates: Partial<Task>
  ) => {
    setTasks((prev) => ({
      ...prev,
      [sectionId]: prev[sectionId].map((task) =>
        task.id === taskId ? { ...task, ...updates } : task
      )
    }));
  };

  // Helper to get all tasks if needed
  const getAllTasks = () => {
    return Object.values(tasks).flat();
  };

  return {
    tasks,
    addTask,
    deleteTask,
    moveTask,
    updateTask,
    getAllTasks
  };
}
