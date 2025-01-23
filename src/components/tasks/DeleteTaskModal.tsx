import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import { useTasks } from "../../hooks/useTasks";
import { SectionId, Task } from "../../types/tasks";
import Button from "../ui/Button";
import { Modal } from "../ui/Modal";

interface DeleteTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  taskToDelete: Task | null;
  sectionId: SectionId;
}

export const DeleteTaskModal = ({
  isOpen,
  onClose,
  taskToDelete,
  sectionId
}: DeleteTaskModalProps) => {
  const { deleteTask } = useTasks();
  const { doNotShowAgain, toggleDoNotShowAgain } = useDeleteConfirmation();

  const handleDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id, sectionId);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete Task">
      <div className="space-y-6">
        <p className="text-foreground">
          Are you sure you want to delete the task "{taskToDelete?.title}"?
        </p>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="do-not-show-again"
            checked={doNotShowAgain}
            onChange={toggleDoNotShowAgain}
            className="mr-2 rounded text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="do-not-show-again"
            className="text-gray-700 dark:text-gray-300"
          >
            Do not show this again.
          </label>
        </div>
        <div className="flex justify-end space-x-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-bold uppercase text-red-600"
          >
            Close
          </button>
          <Button
            label="Delete"
            color="bg-super-yellow hover:bg-super-yellow/90"
            onClick={handleDelete}
          />
        </div>
      </div>
    </Modal>
  );
};
