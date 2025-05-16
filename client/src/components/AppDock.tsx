import { useDesktop } from "@/context/DesktopContext";

const AppDock = () => {
  const { openWindow } = useDesktop();

  const dockIcons = [
    {
      id: "terminal",
      name: "Terminal",
      icon: "fas fa-terminal",
      color: "text-white",
      bgColor: "bg-[hsl(var(--ubuntu-orange))]",
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
  ];

  return (
    <div className="dock fixed bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-2 px-3 py-2 z-20">
      {dockIcons.map((icon) => (
        <div
          key={icon.id}
          className={`dock-icon w-12 h-12 rounded-lg ${icon.bgColor} flex items-center justify-center cursor-pointer`}
          onClick={() => openWindow(icon.id)}
        >
          <i className={`${icon.icon} ${icon.color} text-2xl`}></i>
        </div>
      ))}
    </div>
  );
};

export default AppDock;
