import { useEffect, useState } from "react";
import { useTasks } from "../../hooks/useTasks";
import { SectionId, Task } from "../../types/tasks";
import Button from "../ui/Button";
import { Modal } from "../ui/Modal";

interface EditTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToUpdate: Task | null;
  sectionId: SectionId;
}

export const EditTaskModal = ({
  isOpen,
  onClose,
  taskToUpdate,
  sectionId
}: EditTaskModalProps) => {
  const [task, setTask] = useState("");
  const { updateTask } = useTasks();

  // Reset state when modal closes
  useEffect(() => {
    if (isOpen && taskToUpdate?.title) {
      setTask(taskToUpdate.title);
    }

    if (!isOpen) {
      setTask("");
    }
  }, [isOpen, taskToUpdate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task && !task.trim()) return;
    const updates = { title: task };

    if (taskToUpdate) {
      updateTask(taskToUpdate.id, sectionId, updates);
    }
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit task">
      <form onSubmit={handleSubmit} className="space-y-12">
        <div>
          <label htmlFor="task" className="block font-medium text-foreground">
            Task
          </label>
          <input
            type="text"
            id="task"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            className="mt-1 block w-full rounded-md bg-transparent border border-black dark:border-white p-4 text-foreground shadow-sm focus:border-black focus:ring-2"
            placeholder="Add your super task"
            autoFocus
          />
        </div>
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold uppercase text-red-600"
          >
            Close
          </button>
          <Button
            label="Update"
            color="bg-super-yellow hover:bg-super-yellow/90"
            disabled={!task.trim()}
            loading={false}
          />
        </div>
      </form>
    </Modal>
  );
};
