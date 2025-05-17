import { useDesktop } from "@/context/DesktopContext";

interface AppDrawerProps {
  onClose: () => void;
}

const AppDrawer = ({ onClose }: AppDrawerProps) => {
  const { openWindow } = useDesktop();

  const drawerIcons = [
    {
      id: "terminal",
      name: "Terminal",
      icon: "fas fa-terminal",
      color: "text-green-400",
      bgColor: "bg-black",
    },
    {
      id: "browser",
      name: "Browser",
      icon: "fas fa-globe",
      color: "text-white",
      bgColor: "bg-blue-500",
    },
    {
      id: "resume",
      name: "Resume",
      icon: "fas fa-file-alt",
      color: "text-blue-600",
      bgColor: "bg-white",
    },
    {
      id: "projects",
      name: "Projects",
      icon: "fas fa-code",
      color: "text-white",
      bgColor: "bg-green-500",
    },
    {
      id: "certifications",
      name: "Certificates",
      icon: "fas fa-certificate",
      color: "text-white",
      bgColor: "bg-purple-600",
    },
    {
      id: "github",
      name: "GitHub",
      icon: "fab fa-github",
      color: "text-white",
      bgColor: "bg-gray-800",
      link: "https://github.com/harshad-dhokane/",
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      color: "text-white",
      bgColor: "bg-blue-700",
      link: "https://www.linkedin.com/in/harshad-dhokane/",
    },
    {
      id: "settings",
      name: "Settings",
      icon: "fas fa-cog",
      color: "text-white",
      bgColor: "bg-gray-600",
    },
    {
      id: "about",
      name: "About",
      icon: "fas fa-info-circle",
      color: "text-white",
      bgColor: "bg-[hsl(var(--ubuntu-orange))]",
    },
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
        className="drawer border border-gray-600 rounded-lg w-4/5 max-w-5xl max-h-[80vh] p-6 shadow-2xl animate-in zoom-in duration-300"
        style={{
          background: 'rgba(45, 45, 45, 0.7)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.3)'
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

        <div className="overflow-x-auto pb-4">
          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-6 min-w-[800px]">
          {drawerIcons.map((icon) => (
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
              <span className="text-white text-center font-ubuntu">{icon.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppDrawer;
