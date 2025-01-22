import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import { SECTIONS } from "../../constants/sections";
import { AddTaskModal } from "../tasks/AddTaskModal";
import TaskList from "../tasks/TaskList";

export default function Layout() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <div className="grid grid-cols-2 h-screen border-t border-border relative">
        <button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     bg-button-bg rounded-full p-3 hover:scale-110 transition-all"
          onClick={() => {
            setIsAddModalOpen(true);
          }}
        >
          <Plus className="w-5 h-5 text-background" />
        </button>

        {Object.values(SECTIONS).map((section, index) => (
          <div
            key={section.id}
            className={`p-4 
              ${index % 2 === 1 ? "border-l" : ""} 
              ${index > 1 ? "border-t" : ""} 
              border-border`}
          >
            <div className="flex items-center justify-center gap-1">
              <h2
                className={`px-3 py-2 font-bold text-center ${section.color} ${section.bgColor} rounded-lg `}
              >
                {section.title}
              </h2>
              <Edit className="w-4 h-4 cursor-pointer" />
            </div>
            <TaskList sectionId={section.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
