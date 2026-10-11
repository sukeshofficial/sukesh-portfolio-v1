import React, { createContext, useContext, useMemo, useState } from "react";
import { MODULE_IDS, WORKSPACE_MODULES } from "../config/portfolioData.js";

const WorkspaceContext = createContext(null);

const TOTAL_MODULE_COUNT = WORKSPACE_MODULES.length;

export function WorkspaceProvider({ children }) {
  // Map of module ID -> { isPlaced: boolean, position: { x, y } | null }
  const [placements, setPlacements] = useState(() => {
    const initial = {};
    WORKSPACE_MODULES.forEach((mod) => {
      initial[mod.id] = {
        isPlaced: false,
        position: null,
      };
    });
    return initial;
  });

  // Direct exploration mode flag
  const [isExplorationMode, setIsExplorationMode] = useState(false);

  // Auto Fit mode flag
  const [isAutoFitActive, setIsAutoFitActive] = useState(false);

  // Derived state: Placed module IDs array
  const placedModuleIds = useMemo(() => {
    return Object.keys(placements).filter((id) => placements[id]?.isPlaced);
  }, [placements]);

  // Derived state: Number of placed modules
  const placedCount = placedModuleIds.length;

  // Derived state: Completion boolean (true only when all 6 modules placed)
  const isComplete = placedCount === TOTAL_MODULE_COUNT;

  // Action: Place a module with optional coordinates
  const placeModule = (id, position = null) => {
    if (!MODULE_IDS[id.toUpperCase()] && !Object.values(MODULE_IDS).includes(id)) {
      console.warn(`[WorkspaceContext] Attempted to place invalid module ID: "${id}"`);
      return;
    }

    setPlacements((prev) => {
      if (prev[id]?.isPlaced && prev[id]?.position === position) return prev;
      return {
        ...prev,
        [id]: {
          isPlaced: true,
          position: position || prev[id]?.position || null,
        },
      };
    });
  };

  // Action: Remove a module from canvas
  const removeModule = (id) => {
    if (!placements[id]) {
      console.warn(`[WorkspaceContext] Attempted to remove invalid module ID: "${id}"`);
      return;
    }

    setPlacements((prev) => {
      if (!prev[id]?.isPlaced) return prev;
      return {
        ...prev,
        [id]: {
          isPlaced: false,
          position: null,
        },
      };
    });
  };

  // Action: Reset all module placements to initial empty state
  const resetWorkspace = () => {
    setIsAutoFitActive(false);
    setPlacements(() => {
      const resetState = {};
      WORKSPACE_MODULES.forEach((mod) => {
        resetState[mod.id] = {
          isPlaced: false,
          position: null,
        };
      });
      return resetState;
    });
  };

  // Action: Toggle / Activate Auto Fit layout mode
  const autoFitWorkspace = () => {
    if (placedCount === 0) return;
    setIsAutoFitActive(true);
  };

  const disableAutoFit = () => {
    setIsAutoFitActive(false);
  };

  // Action: Enter direct portfolio exploration mode
  const enterExplorationMode = () => {
    setIsExplorationMode(true);
  };

  // Action: Exit direct exploration mode back to assembly workspace
  const exitExplorationMode = () => {
    setIsExplorationMode(false);
  };

  const value = useMemo(
    () => ({
      modules: WORKSPACE_MODULES,
      placements,
      placedModuleIds,
      placedCount,
      totalCount: TOTAL_MODULE_COUNT,
      isComplete,
      isExplorationMode,
      isAutoFitActive,
      placeModule,
      removeModule,
      resetWorkspace,
      autoFitWorkspace,
      disableAutoFit,
      enterExplorationMode,
      exitExplorationMode,
    }),
    [placements, placedModuleIds, placedCount, isComplete, isExplorationMode, isAutoFitActive]
  );

  return (
    <WorkspaceContext.Provider value={value}>
      {children}
    </WorkspaceContext.Provider>
  );
}

export function useWorkspace() {
  const context = useContext(WorkspaceContext);
  if (!context) {
    throw new Error("useWorkspace must be used within a WorkspaceProvider");
  }
  return context;
}
