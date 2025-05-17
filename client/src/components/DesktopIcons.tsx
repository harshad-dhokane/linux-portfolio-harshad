import { useDesktop } from "@/context/DesktopContext";

interface IconProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  externalLink?: string;
}

const DesktopIcons = () => {
  const { openWindow } = useDesktop();

  const handleExternalLink = (url: string) => {
    // Open the browser window and update it to show the specified URL
    openWindow("browser");
    // We'll use sessionStorage to pass the URL to the browser component
    sessionStorage.setItem("browserUrl", url);
  };

  const iconsColumns: IconProps[][] = [
    [
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
    ],
    [
      {
        id: "github",
        name: "GitHub",
        icon: "fab fa-github",
        color: "text-white",
        bgColor: "bg-gray-800",
        externalLink: "https://github.com/harshad-dhokane/",
      },
      {
        id: "linkedin",
        name: "LinkedIn",
        icon: "fab fa-linkedin-in",
        color: "text-white",
        bgColor: "bg-blue-700",
        externalLink: "https://www.linkedin.com/in/harshad-dhokane/",
      },
      {
        id: "skills",
        name: "Skills",
        icon: "fas fa-cogs",
        color: "text-white",
        bgColor: "bg-yellow-600",
      },
      {
        id: "experience",
        name: "Experience",
        icon: "fas fa-briefcase",
        color: "text-white",
        bgColor: "bg-red-600",
      },
      {
        id: "education",
        name: "Education",
        icon: "fas fa-graduation-cap",
        color: "text-white",
        bgColor: "bg-indigo-600",
      },
    ]
  ];

  return (
    <div className="desktop-icons flex">
      {iconsColumns.map((column, colIndex) => (
        <div key={colIndex} className="desktop-icons-column grid grid-cols-1 gap-6 p-4 ml-4">
          {column.map((icon: IconProps) => (
            <div
              key={icon.id}
              className="desktop-icon flex flex-col items-center rounded-md p-2 cursor-pointer"
              onClick={() => {
                if ('externalLink' in icon && icon.externalLink) {
                  handleExternalLink(icon.externalLink);
                } else {
                  openWindow(icon.id);
                }
              }}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center ${icon.bgColor} rounded-md shadow-md hover:shadow-lg transition-transform transform hover:scale-105`}
              >
                <i className={`${icon.icon} text-2xl ${icon.color}`}></i>
              </div>
              <span className="text-white text-xs mt-1 text-center font-medium shadow-sm">
                {icon.name}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default DesktopIcons;
