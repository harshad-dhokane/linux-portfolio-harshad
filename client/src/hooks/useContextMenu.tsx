import { useState, useEffect } from "react";

interface ContextMenuState {
  visible: boolean;
  x: number;
  y: number;
}

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState<ContextMenuState>({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const handleClick = () => {
    if (contextMenu.visible) {
      hideContextMenu();
    }
  };

  const hideContextMenu = () => {
    setContextMenu({
      ...contextMenu,
      visible: false,
    });
  };

  useEffect(() => {
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("click", handleClick);
    document.addEventListener("scroll", hideContextMenu);
    
    return () => {
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      document.removeEventListener("scroll", hideContextMenu);
    };
  }, [contextMenu.visible]);

  return {
    contextMenu,
    hideContextMenu,
  };
};
