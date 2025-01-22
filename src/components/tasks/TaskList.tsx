import { Circle, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Checkmark } from "react-checkmark";
import { useTasks } from "../../hooks/useTasks";
import { SectionId, Task } from "../../types/tasks";
import { EditTaskModal } from "./EditTaskModal";

interface TaskListProps {
  sectionId: SectionId;
}

export default function TaskList({ sectionId }: TaskListProps) {
  const { tasks, updateTask } = useTasks();
  const sectionTasks = tasks[sectionId];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);

  return (
    <div className="space-y-4 mt-4">
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        taskToUpdate={taskToUpdate}
        sectionId={sectionId}
      />
      {sectionTasks.map((task) => (
        <div
          key={task.id}
          className={`p-3 rounded-lg flex items-center justify-between
            ${sectionId === "DO_FIRST" && "bg-super-green-bg"} 
            ${sectionId === "DO_LATER" && "bg-super-blue-bg"} 
            ${sectionId === "DELEGATE" && "bg-super-yellow-bg"} 
            ${sectionId === "ELIMINATE" && "bg-super-red-bg"} 
        `}
        >
          <div className="flex items-center gap-8">
            {task.isCompleted ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  updateTask(task.id, sectionId, { isCompleted: false });
                }}
              >
                <Checkmark size="small" />
              </div>
            ) : (
              <Circle
                className="w-4 h-4 cursor-pointer"
                onClick={() => {
                  updateTask(task.id, sectionId, { isCompleted: true });
                }}
              />
            )}
            <p className="text-foreground font-semibold">{task.title}</p>
          </div>
          <div className="flex items-center gap-2">
            <Edit
              className="w-6 h-6 cursor-pointer"
              onClick={() => {
                setIsEditModalOpen(true);
                setTaskToUpdate(task);
              }}
            />
            <Trash2 className="w-6 h-6 text-red-500 cursor-pointer" />
          </div>
        </div>
      ))}
    </div>
  );
}
