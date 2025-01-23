import { Edit, Plus } from "lucide-react";
import { useState } from "react";
import { SECTIONS } from "../../constants/sections";
import { AddTaskModal } from "../tasks/AddTaskModal";
import TaskList from "../tasks/TaskList";

export default function Layout() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <div className="bg-background text-foreground flex-grow overflow-hidden">
      <AddTaskModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
      <div className="grid grid-cols-2 border-t border-border relative h-full">
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
            id={section.id}
            className={`p-4 
              ${index % 2 === 1 ? "border-l" : ""} 
              ${index > 1 ? "border-t" : ""} 
              border-border`}
            style={{ height: "calc(50vh - 40px)" }} // Fixed height, adjust according to header size
          >
            <div className="flex items-center justify-center gap-1">
              <h2
                className={`px-3 py-2 font-bold text-center ${section.color} ${section.bgColor} rounded-lg `}
              >
                {section.title}
              </h2>
              <div className="group relative">
                <Edit className="w-4 h-4 cursor-pointer group" />
                <span className="absolute top-4 scale-0 rounded bg-modal-background p-2 text-xs text-foreground group-hover:scale-100 w-64 shadow-sm">
                  Subscribe to premium to rename sections
                </span>
              </div>
            </div>
            <TaskList sectionId={section.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
