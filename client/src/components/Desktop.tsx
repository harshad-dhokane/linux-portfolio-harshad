import { useEffect, useState, lazy, Suspense } from "react";
import { useDesktop } from "@/context/DesktopContext";
import DesktopIcons from "./DesktopIcons";
import AppDock from "./AppDock";
import ContextMenu from "./ContextMenu";
import DateTimeDisplay from "./DateTimeDisplay";
import Terminal from "./Terminal";
const AboutWindow = lazy(() => import("./AboutWindow"));
const BrowserWindow = lazy(() => import("./BrowserWindow"));
const ResumeWindow = lazy(() => import("./ResumeWindow"));
const ProjectsWindow = lazy(() => import("./ProjectsWindow"));
const CertificationsWindow = lazy(() => import("./CertificationsWindow"));
const SkillsWindow = lazy(() => import("./SkillsWindow"));
const ExperienceWindow = lazy(() => import("./ExperienceWindow"));
const EducationWindow = lazy(() => import("./EducationWindow"));
const FileManager = lazy(() => import("./FileManager"));
const SettingsWindow = lazy(() => import("./SettingsWindow"));
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
          <h1 className="text-2xl font-bold text-white mb-4">Loading Harshad Dhokane Portfolio</h1>
          <div className="w-64">
            <Progress value={progress} className="h-1 bg-opacity-20 [&>div]:bg-green-500" />
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
      <Suspense fallback={<p>Loading...</p>}>
        <BrowserWindow />
      </Suspense>

      {/* Resume Window */}
      <Suspense fallback={<p>Loading...</p>}>
        <ResumeWindow />
      </Suspense>

      {/* Projects Window */}
      <Suspense fallback={<p>Loading...</p>}>
        <ProjectsWindow />
      </Suspense>

      {/* Certifications Window */}
      <Suspense fallback={<p>Loading...</p>}>
        <CertificationsWindow />
      </Suspense>

      {/* Skills Window */}
      <Suspense fallback={<p>Loading...</p>}>
        <SkillsWindow />
      </Suspense>

      {/* Experience Window */}
      <Suspense fallback={<p>Loading...</p>}>
        <ExperienceWindow />
      </Suspense>

      {/* Education Window */}
      <Suspense fallback={<p>Loading...</p>}>
        <EducationWindow />
      </Suspense>

      {/* File Manager Window */}
      <Suspense fallback={<p>Loading...</p>}>
        <FileManager />
      </Suspense>

      {/* Settings Window */}
      <Suspense fallback={<p>Loading...</p>}>
        <SettingsWindow />
      </Suspense>

      {/* About Window */}
      <Suspense fallback={<p>Loading...</p>}>
        <AboutWindow />
      </Suspense>

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