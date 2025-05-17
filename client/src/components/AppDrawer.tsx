import { useState } from "react";
import { useDesktop } from "@/context/DesktopContext";

interface AppDrawerProps {
  onClose: () => void;
}

export default function AppDrawer({ onClose }: AppDrawerProps) {
  const { openWindow } = useDesktop();
  const [activeCategory, setActiveCategory] = useState<string>("Main");

  const drawerIcons = [
    {
      id: "terminal",
      name: "Terminal",
      icon: "fas fa-terminal",
      color: "text-green-400",
      bgColor: "bg-black",
      category: "Main"
    },
    {
      id: "browser",
      name: "Browser",
      icon: "fas fa-globe",
      color: "text-white",
      bgColor: "bg-blue-500",
      category: "Main"
    },
    {
      id: "filemanager",
      name: "File Manager",
      icon: "fas fa-folder",
      color: "text-yellow-400",
      bgColor: "bg-gray-800",
      category: "Main"
    },
    {
      id: "resume",
      name: "Resume",
      icon: "fas fa-file-alt",
      color: "text-blue-600",
      bgColor: "bg-white",
      category: "Portfolio"
    },
    {
      id: "projects",
      name: "Projects",
      icon: "fas fa-code",
      color: "text-white",
      bgColor: "bg-green-500",
      category: "Portfolio"
    },
    {
      id: "skills",
      name: "Skills",
      icon: "fas fa-chart-bar",
      color: "text-white",
      bgColor: "bg-indigo-500",
      category: "Portfolio"
    },
    {
      id: "experience",
      name: "Experience",
      icon: "fas fa-briefcase",
      color: "text-white",
      bgColor: "bg-blue-600",
      category: "Portfolio"
    },
    {
      id: "education",
      name: "Education",
      icon: "fas fa-graduation-cap",
      color: "text-white",
      bgColor: "bg-red-500",
      category: "Portfolio"
    },
    {
      id: "certifications",
      name: "Certificates",
      icon: "fas fa-certificate",
      color: "text-white",
      bgColor: "bg-purple-600",
      category: "Portfolio"
    },
    {
      id: "github",
      name: "GitHub",
      icon: "fab fa-github",
      color: "text-white",
      bgColor: "bg-gray-800",
      link: "https://github.com/harshad-dhokane",
      category: "Links"
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      color: "text-white",
      bgColor: "bg-blue-700",
      link: "https://www.linkedin.com/in/harshad-dhokane/",
      category: "Links"
    },
    {
      id: "settings",
      name: "Settings",
      icon: "fas fa-cog",
      color: "text-white",
      bgColor: "bg-gray-600",
      category: "System"
    },
    {
      id: "about",
      name: "About",
      icon: "fas fa-info-circle",
      color: "text-white",
      bgColor: "bg-[hsl(var(--ubuntu-orange))]",
      category: "System"
    }
  ];

  const handleIconClick = (id: string, link?: string) => {
    if (id === "linkedin" || id === "github") {
      openWindow("browser");
      sessionStorage.setItem("browserContent", id);
      sessionStorage.setItem("browserUrl", link || "");
    } else if (link) {
      openWindow("browser");
      sessionStorage.setItem("browserContent", "external");
      sessionStorage.setItem("browserUrl", link);
    } else {
      // Open application window
      openWindow(id);
    }
    onClose();
  };

  return (
    <div className="app-drawer fixed inset-0 bg-black/75 backdrop-blur-md z-50 flex flex-col animate-in fade-in duration-300">
      {/* Search bar at top like Ubuntu */}
      <div className="w-full flex justify-center mt-2">
        <div className="relative w-72 mb-6">
          <input 
            type="text" 
            placeholder="Type to search..." 
            className="w-full px-4 py-2 rounded-full bg-gray-800/80 text-white border-none focus:outline-none focus:ring-2 focus:ring-gray-600"
          />
          <div className="absolute right-3 top-2.5">
            <i className="fas fa-search text-gray-400"></i>
          </div>
        </div>
      </div>

      {/* Close button - top right */}
      <div 
        className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-800 hover:bg-gray-700 flex items-center justify-center cursor-pointer transition-colors"
        onClick={onClose}
      >
        <i className="fas fa-times text-white text-sm"></i>
      </div>

      {/* Main app grid - fullscreen layout */}
      <div className="flex-1 flex flex-col items-center justify-center px-10 py-5">
        {/* All icons in grid regardless of category - like the screenshot */}
        <div className="grid grid-cols-6 gap-x-10 gap-y-12 max-w-5xl mx-auto">
          {drawerIcons.map((icon) => (
            <div
              key={icon.id}
              className="drawer-icon flex flex-col items-center cursor-pointer transition-all hover:scale-110"
              onClick={() => handleIconClick(icon.id, icon.link)}
            >
              <div
                className={`w-12 h-12 rounded-md shadow-md flex items-center justify-center mb-2 ${icon.bgColor}`}
                style={{ 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                <i className={`${icon.icon} text-2xl ${icon.color}`}></i>
              </div>
              <span className="text-white text-center font-ubuntu text-xs mt-1">{icon.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination dots at bottom like screenshot */}
      <div className="flex justify-center space-x-1 mb-5">
        <div className="w-2.5 h-2.5 rounded-full bg-white"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div>
        <div className="w-2.5 h-2.5 rounded-full bg-gray-500"></div>
      </div>
    </div>
  );
}