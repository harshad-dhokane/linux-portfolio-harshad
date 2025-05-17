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
import FileManager from "./FileManager";
import SettingsWindow from "./SettingsWindow";
import AboutWindow from "./AboutWindow";
import { wallpapers } from "@/lib/wallpapers";

const Progress = ({ value, className }: { value: number; className?: string }) => {
  return (
    <div className={`relative h-2 rounded-full overflow-hidden ${className}`}>
      <div className="absolute top-0 left-0 w-full h-full bg-gray-300"></div>
      <div
        className="absolute top-0 left-0 h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${value}%` }}
      ></div>
    </div>
  );
};

const Desktop = () => {
  const { selectedWallpaper, isWindowOpen, closeWindow } = useDesktop();
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [contextMenu, setContextMenu] = useState<{
    visible: boolean;
    x: number;
    y: number;
    selectedIconId?: string | null;
  }>({
    visible: false,
    x: 0,
    y: 0,
    selectedIconId: null,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        const newProgress = oldProgress + 2;
        if (newProgress >= 100) {
          clearInterval(timer);
          setTimeout(() => setLoading(false), 200);
          return 100;
        }
        return newProgress;
      });
    }, 20);

    return () => clearInterval(timer);
  }, []);

  // Handle context menu
  const handleContextMenu = (e: React.MouseEvent, selectedIconId?: string | null) => {
    e.preventDefault();
    setContextMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
      selectedIconId: selectedIconId || null,
    });
  };

  // Hide context menu when clicking elsewhere
  const handleClick = () => {
    if (contextMenu.visible) {
      setContextMenu({ ...contextMenu, visible: false });
    }
  };

  // Track terminal instances for multi-terminal support
  const [terminalInstances, setTerminalInstances] = useState<string[]>([]);

  // Effect to check for new terminal windows
  useEffect(() => {
    const checkForNewTerminals = () => {
      // Listen for a custom event that will be triggered when a new terminal is created
      const handleNewTerminal = (e: CustomEvent) => {
        const terminalId = e.detail?.id;
        if (terminalId && !terminalInstances.includes(terminalId)) {
          setTerminalInstances(prev => [...prev, terminalId]);
        }
      };

      window.addEventListener('new-terminal-created', handleNewTerminal as EventListener);
      return () => {
        window.removeEventListener('new-terminal-created', handleNewTerminal as EventListener);
      };
    };

    return checkForNewTerminals();
  }, [terminalInstances]);

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
      {loading && (
        <div className="absolute inset-0 bg-black bg-opacity-90 flex flex-col items-center justify-center z-50">
          <h1 className="text-3xl font-bold text-white mb-8">Harshad Dhokane OS Loading</h1>
          <div className="w-1/3">
            <Progress value={progress} className="h-2" />
          </div>
        </div>
      )}

      {/* Desktop Icons */}
      <DesktopIcons />

      {/* Terminal Windows - Main terminal */}
      <Terminal id="terminal" />

      {/* Dynamic Terminal Windows - these will be created when users run "new-terminal" command */}
      {terminalInstances.map((termId) => (
        <Terminal key={termId} id={termId} />
      ))}

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

      {/* File Manager Window */}
      <FileManager />

      {/* Settings Window */}
      <SettingsWindow />

      {/* About Window */}
      <AboutWindow />

      {/* Ubuntu Dock with App Drawer */}
      <AppDock />

      {/* Context Menu */}
      {contextMenu.visible && (
        <ContextMenu 
          x={contextMenu.x} 
          y={contextMenu.y} 
          selectedIconId={contextMenu.selectedIconId}
          onClose={() => setContextMenu(prev => ({ ...prev, visible: false }))}
        />
      )}

      {/* Date and Time Display */}
      <DateTimeDisplay />
    </div>
  );
};

export default Desktop;