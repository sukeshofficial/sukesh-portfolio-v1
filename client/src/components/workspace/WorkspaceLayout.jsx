import React, { useState } from "react";
import WorkspaceHeader from "./WorkspaceHeader.jsx";
import ComponentTray from "./ComponentTray.jsx";
import WorkspaceCanvas from "./WorkspaceCanvas.jsx";
import ExplorationView from "./ExplorationView.jsx";
import { useWorkspace } from "../../context/WorkspaceContext.jsx";

export default function WorkspaceLayout() {
  const { isExplorationMode } = useWorkspace();
  const [selectedModuleId, setSelectedModuleId] = useState(null);

  if (isExplorationMode) {
    return <ExplorationView />;
  }

  return (
    <div className="min-h-screen w-full bg-[var(--pp-background)] text-[var(--pp-text-primary)] flex flex-col transition-colors duration-300">
      {/* Slim Header */}
      <WorkspaceHeader />

      {/* Main Workspace Body (Responsive flex container) */}
      <div className="flex-1 flex flex-col xl:flex-row relative min-h-0">
        {/* Component Tray */}
        <ComponentTray
          selectedModuleId={selectedModuleId}
          onSelectModule={(id) => setSelectedModuleId(id)}
        />

        {/* Central Canvas */}
        <WorkspaceCanvas
          selectedModuleId={selectedModuleId}
          onSelectModule={(id) => setSelectedModuleId(id)}
        />
      </div>
    </div>
  );
}
