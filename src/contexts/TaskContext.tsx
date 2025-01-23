import { createContext, ReactNode } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { SectionId, Task, TasksBySections } from "../types/tasks";

interface TaskContextType {
  tasks: TasksBySections;
  addTask: (title: string, sectionId: SectionId) => void;
  deleteTask: (taskId: string, sectionId: SectionId) => void;
  moveTask: (
    taskId: string,
    fromSection: SectionId,
    toSection: SectionId
  ) => void;
  updateTask: (
    taskId: string,
    sectionId: SectionId,
    updates: Partial<Task>
  ) => void;
}

export const TaskContext = createContext<TaskContextType | undefined>(
  undefined
);

const INITIAL_TASKS: TasksBySections = {
  DO_FIRST: [],
  DO_LATER: [],
  DELEGATE: [],
  ELIMINATE: []
};

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<TasksBySections>(
    "tasks",
    INITIAL_TASKS
  );

  const addTask = (title: string, sectionId: SectionId) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      createdAt: Date.now(),
      isCompleted: false
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

  return (
    <TaskContext.Provider
      value={{ tasks, addTask, deleteTask, moveTask, updateTask }}
    >
      {children}
    </TaskContext.Provider>
  );
}
