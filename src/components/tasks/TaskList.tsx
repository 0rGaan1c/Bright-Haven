import { Circle, Edit, Trash2 } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
// @ts-expect-error, This checkmark library doesn't provide types but it's only a checkmark and seems safe to use without any types
import { Checkmark } from "react-checkmark";
import Draggable, { DraggableData, DraggableEvent } from "react-draggable";
import { useDeleteConfirmation } from "../../hooks/useDeleteConfirmation";
import { useTasks } from "../../hooks/useTasks";
import { SectionId, Task } from "../../types/tasks";
import { DeleteTaskModal } from "./DeleteTaskModal";
import { EditTaskModal } from "./EditTaskModal";

interface TaskListProps {
  sectionId: SectionId;
}

function getNewSectionId(elementID: string) {
  const sectionRects = {
    DO_FIRST: document.querySelector("#DO_FIRST")?.getBoundingClientRect(),
    DO_LATER: document.querySelector("#DO_LATER")?.getBoundingClientRect(),
    DELEGATE: document.querySelector("#DELEGATE")?.getBoundingClientRect(),
    ELIMINATE: document.querySelector("#ELIMINATE")?.getBoundingClientRect()
  };

  const taskElement = document.getElementById(elementID);
  if (!taskElement) return null;

  const taskRects = taskElement.getBoundingClientRect();
  if (!taskRects) return null;

  for (const [sectionId, sectionRect] of Object.entries(sectionRects)) {
    if (!sectionRect) continue;

    const halfWidth = taskRects.width / 2;
    const halfHeight = taskRects.height / 2;

    const verticallyInside =
      taskRects.top + halfHeight >= sectionRect.top &&
      taskRects.bottom - halfHeight <= sectionRect.bottom;

    const movingToRight =
      taskRects.left + halfWidth >= sectionRect.left && verticallyInside;
    const movingToLeft =
      taskRects.right - halfWidth <= sectionRect.right && verticallyInside;

    if (
      (sectionId === "DO_LATER" || sectionId === "ELIMINATE") &&
      movingToRight
    ) {
      return sectionId as SectionId;
    }

    if (
      (sectionId === "DO_FIRST" || sectionId === "DELEGATE") &&
      movingToLeft
    ) {
      return sectionId as SectionId;
    }
  }

  return null;
}

export default function TaskList({ sectionId }: TaskListProps) {
  const { tasks, deleteTask } = useTasks();
  const sectionTasks = tasks[sectionId];
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<Task | null>(null);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);
  const { doNotShowAgain } = useDeleteConfirmation();

  const handleDeleteClick = (task: Task, sectionId: SectionId) => {
    if (doNotShowAgain) {
      deleteTask(task.id, sectionId);
    } else {
      setTaskToDelete(task);
      setIsDeleteModalOpen(true);
    }
  };

  return (
    <div className="space-y-4 mt-4">
      <EditTaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        taskToUpdate={taskToUpdate}
        sectionId={sectionId}
      />
      <DeleteTaskModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        taskToDelete={taskToDelete}
        sectionId={sectionId}
      />
      {sectionTasks.map((task) => (
        <DraggableTask
          sectionId={sectionId}
          task={task}
          setIsEditModalOpen={setIsEditModalOpen}
          setTaskToUpdate={setTaskToUpdate}
          handleDeleteClick={handleDeleteClick}
        />
      ))}
    </div>
  );
}

function DraggableTask({
  sectionId,
  task,
  setIsEditModalOpen,
  setTaskToUpdate,
  handleDeleteClick
}: {
  sectionId: SectionId;
  task: Task;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
  setTaskToUpdate: Dispatch<SetStateAction<Task | null>>;
  handleDeleteClick: (task: Task, sectionId: SectionId) => void;
}) {
  const { updateTask, moveTask } = useTasks();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleDrag = (_: DraggableEvent, data: DraggableData) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleStop = (task: Task) => {
    const newSectionId = getNewSectionId(`${sectionId}_${task.id}`);
    if (newSectionId && newSectionId !== sectionId) {
      moveTask(task.id, sectionId, newSectionId);
    }
    setPosition({ x: 0, y: 0 });
  };

  return (
    <Draggable
      position={position}
      key={task.id}
      onDrag={handleDrag}
      onStop={() => {
        handleStop(task);
      }}
    >
      <div
        id={`${sectionId}_${task.id}`}
        className={`p-3 rounded-lg flex items-center justify-between cursor-grab
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
          <Trash2
            className="w-6 h-6 text-red-500 cursor-pointer"
            onClick={() => {
              handleDeleteClick(task, sectionId);
            }}
          />
        </div>
      </div>
    </Draggable>
  );
}
