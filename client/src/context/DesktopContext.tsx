import { createContext, useContext } from "react";

interface DesktopContextType {
  activeWindowId: string | null;
  windowZIndexes: Record<string, number>;
  openWindows: string[];
  maximizedWindows: string[];
  minimizedWindows: string[];
  selectedWallpaper: number;
  bringWindowToFront: (windowId: string) => void;
  openWindow: (windowId: string) => void;
  closeWindow: (windowId: string) => void;
  minimizeWindow: (windowId: string) => void;
  maximizeWindow: (windowId: string) => void;
  isWindowOpen: (windowId: string) => boolean;
  isWindowMinimized: (windowId: string) => boolean;
  isWindowMaximized: (windowId: string) => boolean;
  changeWallpaper: (index: number) => void;
}

export const DesktopContext = createContext<DesktopContextType>({
  activeWindowId: null,
  windowZIndexes: {},
  openWindows: [],
  maximizedWindows: [],
  minimizedWindows: [],
  selectedWallpaper: 0,
  bringWindowToFront: () => {},
  openWindow: () => {},
  closeWindow: () => {},
  minimizeWindow: () => {},
  maximizeWindow: () => {},
  isWindowOpen: () => false,
  isWindowMinimized: () => false,
  isWindowMaximized: () => false,
  changeWallpaper: () => {},
});

export const useDesktop = () => useContext(DesktopContext);
