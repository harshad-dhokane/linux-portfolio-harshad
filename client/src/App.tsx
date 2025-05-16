import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { DesktopContext } from "./context/DesktopContext";
import Desktop from "./components/Desktop";

function App() {
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [windowZIndexes, setWindowZIndexes] = useState<Record<string, number>>({});
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [maximizedWindows, setMaximizedWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [selectedWallpaper, setSelectedWallpaper] = useState<number>(0);

  const bringWindowToFront = (windowId: string) => {
    if (!windowId) return;
    
    setActiveWindowId(windowId);
    
    // Update z-indexes to bring this window to front
    const highestZ = Math.max(...Object.values(windowZIndexes), 10);
    setWindowZIndexes(prev => ({
      ...prev,
      [windowId]: highestZ + 1
    }));
  };

  const openWindow = (windowId: string) => {
    if (!openWindows.includes(windowId)) {
      setOpenWindows(prev => [...prev, windowId]);
    }
    
    if (minimizedWindows.includes(windowId)) {
      setMinimizedWindows(prev => prev.filter(id => id !== windowId));
    }
    
    bringWindowToFront(windowId);
  };

  const closeWindow = (windowId: string) => {
    setOpenWindows(prev => prev.filter(id => id !== windowId));
    
    if (minimizedWindows.includes(windowId)) {
      setMinimizedWindows(prev => prev.filter(id => id !== windowId));
    }
    
    if (maximizedWindows.includes(windowId)) {
      setMaximizedWindows(prev => prev.filter(id => id !== windowId));
    }
    
    if (activeWindowId === windowId) {
      setActiveWindowId(null);
    }
  };

  const minimizeWindow = (windowId: string) => {
    if (!minimizedWindows.includes(windowId)) {
      setMinimizedWindows(prev => [...prev, windowId]);
    }
  };

  const maximizeWindow = (windowId: string) => {
    if (maximizedWindows.includes(windowId)) {
      setMaximizedWindows(prev => prev.filter(id => id !== windowId));
    } else {
      setMaximizedWindows(prev => [...prev, windowId]);
    }
  };

  const isWindowOpen = (windowId: string) => openWindows.includes(windowId);
  const isWindowMinimized = (windowId: string) => minimizedWindows.includes(windowId);
  const isWindowMaximized = (windowId: string) => maximizedWindows.includes(windowId);
  
  const changeWallpaper = (index: number) => {
    setSelectedWallpaper(index);
  };

  return (
    <DesktopContext.Provider value={{
      activeWindowId,
      windowZIndexes,
      openWindows,
      maximizedWindows,
      minimizedWindows,
      selectedWallpaper,
      bringWindowToFront,
      openWindow,
      closeWindow,
      minimizeWindow,
      maximizeWindow,
      isWindowOpen,
      isWindowMinimized,
      isWindowMaximized,
      changeWallpaper
    }}>
      <TooltipProvider>
        <Desktop />
        <Toaster />
      </TooltipProvider>
    </DesktopContext.Provider>
  );
}

export default App;
