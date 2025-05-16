import { useDesktop } from "@/context/DesktopContext";

const DesktopIcons = () => {
  const { openWindow } = useDesktop();

  const icons = [
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
      id: "certifications",
      name: "Certificates",
      icon: "fas fa-certificate",
      color: "text-white",
      bgColor: "bg-purple-600",
    },
  ];

  return (
    <div className="desktop-icons absolute grid grid-cols-1 gap-6 p-4 left-0 top-0">
      {icons.map((icon) => (
        <div
          key={icon.id}
          className="desktop-icon flex flex-col items-center rounded-md p-2 cursor-pointer"
          onClick={() => openWindow(icon.id)}
        >
          <div
            className={`w-12 h-12 flex items-center justify-center ${icon.bgColor} rounded-md`}
          >
            <i className={`${icon.icon} text-2xl ${icon.color}`}></i>
          </div>
          <span className="text-white text-xs mt-1 text-center font-medium shadow-sm">
            {icon.name}
          </span>
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons;
