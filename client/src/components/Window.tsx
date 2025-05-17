import { useRef, useEffect, useState } from "react";
import { useDesktop } from "@/context/DesktopContext";
import { Rnd } from "react-rnd";

interface WindowProps {
  id: string;
  title: string;
  children: React.ReactNode;
  defaultWidth?: number;
  defaultHeight?: number;
  defaultX?: number;
  defaultY?: number;
  minWidth?: number;
  minHeight?: number;
  resizable?: boolean;
}

const Window = ({
  id,
  title,
  children,
  defaultWidth = 800,
  defaultHeight = 600,
  defaultX,
  defaultY,
  minWidth = 400,
  minHeight = 300,
  resizable = true,
}: WindowProps) => {
  const {
    activeWindowId,
    windowZIndexes,
    bringWindowToFront,
    isWindowOpen,
    isWindowMinimized,
    isWindowMaximized,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
  } = useDesktop();
  
  const rndRef = useRef<Rnd>(null);
  
  // Calculate default center position if not provided, ensure windows stay within viewport
  const centerX = typeof defaultX === 'number' ? defaultX : Math.max(0, Math.floor((window.innerWidth - defaultWidth) / 2));
  // Ensure windows stay above the dock (40px from bottom) when positioned
  const centerY = typeof defaultY === 'number' ? defaultY : Math.max(0, Math.min(window.innerHeight - defaultHeight - 60, Math.floor((window.innerHeight - defaultHeight) / 2)));
  
  const [position, setPosition] = useState({ x: centerX, y: centerY });
  const [size, setSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [prevSize, setPrevSize] = useState({ width: defaultWidth, height: defaultHeight });
  const [prevPosition, setPrevPosition] = useState({ x: centerX, y: centerY });

  const isActive = activeWindowId === id;
  const isOpen = isWindowOpen(id);
  const isMinimized = isWindowMinimized(id);
  const isMaximized = isWindowMaximized(id);
  
  // Store previous size and position when maximizing
  useEffect(() => {
    if (isMaximized) {
      setPrevSize(size);
      setPrevPosition(position);
      setSize({ width: window.innerWidth, height: window.innerHeight - 40 });
      setPosition({ x: 0, y: 0 });
    } else {
      // Restore previous size and position when un-maximizing
      if (prevSize.width > 0) {
        setSize(prevSize);
        setPosition(prevPosition);
      }
    }
  }, [isMaximized]);

  if (!isOpen || isMinimized) {
    return null;
  }

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    closeWindow(id);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeWindow(id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    maximizeWindow(id);
  };

  const handleWindowClick = () => {
    bringWindowToFront(id);
  };

  return (
    <Rnd
      ref={rndRef}
      className="window"
      style={{ 
        zIndex: windowZIndexes[id] || 10,
        backdropFilter: title.includes('terminal') ? 'blur(8px)' : 'none',
        maxWidth: '90vw',
        maxHeight: '85vh',
      }}
      size={isMaximized ? { width: "100%", height: "calc(100% - 40px)" } : size}
      position={isMaximized ? { x: 0, y: 0 } : {
        x: Math.max(0, Math.min(window.innerWidth - size.width, position.x)),
        y: Math.max(0, Math.min(window.innerHeight - size.height - 60, position.y))
      }}
      onDragStop={(e, d) => {
        if (!isMaximized) {
          setPosition({ x: d.x, y: d.y });
        }
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        if (!isMaximized) {
          setSize({
            width: parseInt(ref.style.width),
            height: parseInt(ref.style.height),
          });
          setPosition(position);
        }
      }}
      minWidth={minWidth}
      minHeight={minHeight}
      bounds="window"
      enableResizing={resizable && !isMaximized}
      disableDragging={isMaximized}
      dragHandleClassName="window-header"
      onMouseDown={handleWindowClick}
    >
      <div className="flex flex-col h-full">
        <div className="window-header flex items-center p-2 draggable bg-gray-800 rounded-t-lg">
          <div className="flex space-x-2">
            <div
              className="window-btn bg-red-500 cursor-pointer"
              onClick={handleClose}
            ></div>
            <div
              className="window-btn bg-yellow-500 cursor-pointer"
              onClick={handleMinimize}
            ></div>
            <div
              className="window-btn bg-green-500 cursor-pointer"
              onClick={handleMaximize}
            ></div>
          </div>
          <div className="ml-4 text-white text-sm select-none">{title}</div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden min-h-0 bg-opacity-90">{children}</div>
      </div>
    </Rnd>
  );
};

export default Window;
