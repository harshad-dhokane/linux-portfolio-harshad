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
import SkillsWindow from "./SkillsWindow";
import ExperienceWindow from "./ExperienceWindow";
import EducationWindow from "./EducationWindow";
import { wallpapers } from "@/lib/wallpapers";

const Desktop = () => {
  const { selectedWallpaper } = useDesktop();
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
      
      {/* Skills Window */}
      <SkillsWindow />
      
      {/* Experience Window */}
      <ExperienceWindow />
      
      {/* Education Window */}
      <EducationWindow />

      {/* Ubuntu Dock with App Drawer */}
      <AppDock />

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
