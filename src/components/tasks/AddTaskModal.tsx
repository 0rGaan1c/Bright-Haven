import { useEffect, useState } from "react";
import { SECTIONS } from "../../constants/sections";
import { useTasks } from "../../hooks/useTasks";
import Button from "../ui/Button";
import { Modal } from "../ui/Modal";

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddTaskModal = ({ isOpen, onClose }: AddTaskModalProps) => {
  const [task, setTask] = useState("");
  const [step, setStep] = useState<"input" | "section">("input");
  const { addTask } = useTasks();

  // Reset state when modal closes
  useEffect(() => {
    if (!isOpen) {
      setTask("");
      setStep("input");
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!task.trim()) return;
    setStep("section");
  };

  // Keyboard handler for section selection
  useEffect(() => {
    if (step !== "section") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.shiftKey) return;

      let section: keyof typeof SECTIONS | null = null;

      switch (e.key) {
        case "ArrowUp":
          section = "DO_FIRST";
          break;
        case "ArrowRight":
          section = "DO_LATER";
          break;
        case "ArrowLeft":
          section = "DELEGATE";
          break;
        case "ArrowDown":
          section = "ELIMINATE";
          break;
      }

      if (section) {
        e.preventDefault();
        addTask(task, section);
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [step, task, addTask, onClose]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add task">
      {step === "input" ? (
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
              label="Submit"
              color="bg-super-yellow hover:bg-super-yellow/90"
              disabled={!task.trim()}
              loading={false}
            />
          </div>
        </form>
      ) : (
        <div className="space-y-6">
          <p className="text-foreground">
            Press Shift + Arrow key to select section:
          </p>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(SECTIONS).map(([key, section]) => (
              <div
                key={key}
                className={`
                  p-4 rounded-md ${section.bgColor}
                  flex items-center justify-between font-semibold cursor-pointer
                `}
                onClick={() => {
                  addTask(task, section.id);
                  onClose();
                }}
              >
                <span className={section.color}>{section.title}</span>
                <span className="text-sm text-gray-500">
                  {key === "DO_FIRST" && "Shift + ↑"}
                  {key === "DO_LATER" && "Shift + →"}
                  {key === "DELEGATE" && "Shift + ←"}
                  {key === "ELIMINATE" && "Shift + ↓"}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-bold uppercase text-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};
