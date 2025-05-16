import { useEffect, useState } from "react";
import { useDesktop } from "@/context/DesktopContext";
import DesktopIcons from "./DesktopIcons";
import AppDock from "./AppDock";
import ContextMenu from "./ContextMenu";
import DateTimeDisplay from "./DateTimeDisplay";
import Terminal from "./Terminal";
import BrowserWindow from "./BrowserWindow";
import ResumeWindow from "./ResumeWindow";
import ProjectsWindow from "./ProjectsWindow";
import CertificationsWindow from "./CertificationsWindow";
import AppDrawer from "./AppDrawer";
import ThemeSwitcher from "./ThemeSwitcher";
import { wallpapers } from "@/lib/wallpapers";

const Desktop = () => {
  const { selectedWallpaper } = useDesktop();
  const [showAppDrawer, setShowAppDrawer] = useState(false);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
  });

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  // Hide context menu when clicking elsewhere
  const handleClick = () => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  // Toggle app drawer
  const toggleAppDrawer = () => {
    setShowAppDrawer(!showAppDrawer);
  };

  // Close app drawer when clicking on desktop
  useEffect(() => {
    const handleGlobalClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        showAppDrawer &&
        !target.closest(".app-drawer") &&
        !target.closest(".app-drawer-btn")
      ) {
        setShowAppDrawer(false);
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, [showAppDrawer]);

  return (
    <div
      className="desktop h-screen w-screen bg-ubuntu-gray relative"
      style={{
        backgroundImage: `url(${wallpapers[selectedWallpaper]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
    >
      {/* Desktop Icons */}
      <DesktopIcons />

      {/* Terminal Window */}
      <Terminal />

      {/* Browser Window */}
      <BrowserWindow />

      {/* Resume Window */}
      <ResumeWindow />

      {/* Projects Window */}
      <ProjectsWindow />

      {/* Certifications Window */}
      <CertificationsWindow />

      {/* Ubuntu Dock */}
      <AppDock />

      {/* App Drawer Button */}
      <div
        className="app-drawer-btn fixed top-4 left-4 w-10 h-10 rounded-full bg-white bg-opacity-20 flex items-center justify-center cursor-pointer z-20 hover:bg-opacity-30"
        onClick={toggleAppDrawer}
      >
        <i className="fas fa-th text-white"></i>
      </div>

      {/* Theme Switcher */}
      <ThemeSwitcher />

      {/* App Drawer */}
      {showAppDrawer && <AppDrawer onClose={toggleAppDrawer} />}

      {/* Context Menu */}
      {contextMenu.visible && (
        <ContextMenu x={contextMenu.x} y={contextMenu.y} />
      )}

      {/* Date and Time Display */}
      <DateTimeDisplay />
    </div>
  );
};

export default Desktop;
