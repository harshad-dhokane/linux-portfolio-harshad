import { useState } from "react";

export interface WindowState {
  id: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  width: number;
  height: number;
  x: number;
  y: number;
  prevWidth?: number;
  prevHeight?: number;
  prevX?: number;
  prevY?: number;
}

export interface WindowManagerState {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
}

export const useWindowManager = () => {
  const [state, setState] = useState<WindowManagerState>({
    windows: {},
    activeWindowId: null,
  });

  const registerWindow = (
    id: string, 
    defaultWidth: number = 800, 
    defaultHeight: number = 600,
    defaultX: number = 100,
    defaultY: number = 100
  ) => {
    setState(prev => {
      if (prev.windows[id]) return prev;
      
      return {
        ...prev,
        windows: {
          ...prev.windows,
          [id]: {
            id,
            isOpen: false,
            isMinimized: false,
            isMaximized: false,
            zIndex: 10,
            width: defaultWidth,
            height: defaultHeight,
            x: defaultX,
            y: defaultY,
          }
        }
      };
    });
  };

  const openWindow = (id: string) => {
    setState(prev => {
      const highestZ = Math.max(0, ...Object.values(prev.windows).map(w => w.zIndex));
      
      return {
        ...prev,
        activeWindowId: id,
        windows: {
          ...prev.windows,
          [id]: {
            ...prev.windows[id],
            isOpen: true,
            isMinimized: false,
            zIndex: highestZ + 1,
          }
        }
      };
    });
  };

  const closeWindow = (id: string) => {
    setState(prev => {
      return {
        ...prev,
        activeWindowId: prev.activeWindowId === id ? null : prev.activeWindowId,
        windows: {
          ...prev.windows,
          [id]: {
            ...prev.windows[id],
            isOpen: false,
          }
        }
      };
    });
  };

  const minimizeWindow = (id: string) => {
    setState(prev => {
      return {
        ...prev,
        activeWindowId: prev.activeWindowId === id ? null : prev.activeWindowId,
        windows: {
          ...prev.windows,
          [id]: {
            ...prev.windows[id],
            isMinimized: true,
          }
        }
      };
    });
  };

  const maximizeWindow = (id: string) => {
    setState(prev => {
      const window = prev.windows[id];
      const isCurrentlyMaximized = window.isMaximized;
      
      return {
        ...prev,
        windows: {
          ...prev.windows,
          [id]: {
            ...window,
            isMaximized: !isCurrentlyMaximized,
            prevWidth: !isCurrentlyMaximized ? window.width : window.prevWidth,
            prevHeight: !isCurrentlyMaximized ? window.height : window.prevHeight,
            prevX: !isCurrentlyMaximized ? window.x : window.prevX,
            prevY: !isCurrentlyMaximized ? window.y : window.prevY,
            width: !isCurrentlyMaximized ? window.innerWidth : (window.prevWidth || window.width),
            height: !isCurrentlyMaximized ? window.innerHeight - 40 : (window.prevHeight || window.height),
            x: !isCurrentlyMaximized ? 0 : (window.prevX || window.x),
            y: !isCurrentlyMaximized ? 0 : (window.prevY || window.y),
          }
        }
      };
    });
  };

  const bringToFront = (id: string) => {
    setState(prev => {
      const highestZ = Math.max(0, ...Object.values(prev.windows).map(w => w.zIndex));
      
      return {
        ...prev,
        activeWindowId: id,
        windows: {
          ...prev.windows,
          [id]: {
            ...prev.windows[id],
            zIndex: highestZ + 1,
          }
        }
      };
    });
  };

  const updateWindowPosition = (id: string, x: number, y: number) => {
    setState(prev => {
      return {
        ...prev,
        windows: {
          ...prev.windows,
          [id]: {
            ...prev.windows[id],
            x,
            y,
          }
        }
      };
    });
  };

  const updateWindowSize = (id: string, width: number, height: number) => {
    setState(prev => {
      return {
        ...prev,
        windows: {
          ...prev.windows,
          [id]: {
            ...prev.windows[id],
            width,
            height,
          }
        }
      };
    });
  };

  return {
    windows: state.windows,
    activeWindowId: state.activeWindowId,
    registerWindow,
    openWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    bringToFront,
    updateWindowPosition,
    updateWindowSize,
  };
};
