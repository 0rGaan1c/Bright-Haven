import { Plus } from "lucide-react";
import { SECTIONS } from "../../constants/sections";
import TaskList from "../tasks/TaskList";

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="grid grid-cols-2 h-screen border-t border-border relative">
        <button
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
                     bg-button-bg rounded-full p-3 hover:scale-110 transition-all"
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
            <h2 className="text-lg font-semibold mb-4">{section.title}</h2>
            <TaskList sectionId={section.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
