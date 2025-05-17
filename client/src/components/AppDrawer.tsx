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
      link: "https://github.com/harshad-dhokane/",
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
    if (link) {
      // Use internal browser for external links
      openWindow("browser");
      sessionStorage.setItem("browserUrl", link);
    } else {
      // Open application window
      openWindow(id);
    }
    onClose();
  };

  return (
    <div className="app-drawer fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-30 flex items-center justify-center animate-in fade-in duration-300">
      <div 
        className="terminal border border-gray-600 rounded-lg w-[700px] h-[400px] p-4 shadow-2xl animate-in zoom-in duration-300 overflow-y-auto"
        style={{
          background: 'rgba(15, 15, 15, 0.6)',
          backdropFilter: 'blur(15px)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)',
          backgroundImage: 'linear-gradient(45deg, rgba(30, 30, 30, 0.6), rgba(15, 15, 15, 0.7))'
        }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-ubuntu font-bold text-white">Applications</h2>
          <div
            className="w-10 h-10 rounded-full bg-gray-700/80 hover:bg-gray-600 flex items-center justify-center cursor-pointer transition-colors"
            onClick={onClose}
          >
            <i className="fas fa-times text-white"></i>
          </div>
        </div>

        <div className="pb-4">
          {/* Category tabs */}
          <div className="flex border-b border-gray-700 mb-4 px-2">
            {["Main", "Portfolio", "Links", "System"].map((category) => (
              <div 
                key={category}
                className={`px-4 py-2 text-white font-medium cursor-pointer border-b-2 
                  ${activeCategory === category ? 'border-green-500' : 'border-transparent hover:border-gray-500'}`}
                onClick={() => setActiveCategory(category)}
              >
                {category}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4 justify-center max-w-fit mx-auto">
            {drawerIcons
              .filter(icon => icon.category === activeCategory)
              .map((icon) => (
                <div
                  key={icon.id}
                  className="drawer-icon flex flex-col items-center cursor-pointer transition-all hover:scale-110"
                  onClick={() => handleIconClick(icon.id, icon.link)}
                >
                  <div
                    className={`w-16 h-16 rounded-lg ${icon.bgColor} flex items-center justify-center mb-2 shadow-lg hover:shadow-xl`}
                  >
                    <i className={`${icon.icon} text-3xl ${icon.color}`}></i>
                  </div>
                  <span className="text-white text-center font-ubuntu text-sm">{icon.name}</span>
                </div>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}