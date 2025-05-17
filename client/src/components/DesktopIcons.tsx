import { useState, useEffect, useRef } from "react";
import { useDesktop } from "@/context/DesktopContext";
import Draggable from "react-draggable";

interface IconProps {
  id: string;
  name: string;
  icon: string;
  color: string;
  bgColor: string;
  externalLink?: string;
  position?: { x: number; y: number };
}

const DesktopIcons = () => {
  const { openWindow } = useDesktop();
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  
  // Set default positions for icons in a grid layout
  const getDefaultPositions = () => {
    const defaultPositions: Record<string, { x: number; y: number }> = {};
    
    // Calculate positions for first column
    iconsColumns[0].forEach((icon, index) => {
      defaultPositions[icon.id] = { 
        x: 20, 
        y: 20 + (index * 90) 
      };
    });
    
    // Calculate positions for second column (further right)
    iconsColumns[1].forEach((icon, index) => {
      defaultPositions[icon.id] = { 
        x: 120, 
        y: 20 + (index * 90) 
      };
    });
    
    return defaultPositions;
  };

  // Load saved positions from localStorage on component mount
  useEffect(() => {
    const savedPositions = localStorage.getItem('desktopIconPositions');
    if (savedPositions) {
      try {
        setIconPositions(JSON.parse(savedPositions));
      } catch (e) {
        console.error("Failed to parse saved icon positions", e);
        setIconPositions(getDefaultPositions());
      }
    } else {
      // No saved positions, use defaults
      setIconPositions(getDefaultPositions());
    }
  }, []);

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

  // Handle drag stop event to save position
  const handleDragStop = (id: string, e: any, data: { x: number; y: number }) => {
    const newPositions = {
      ...iconPositions,
      [id]: { x: data.x, y: data.y }
    };
    setIconPositions(newPositions);
    localStorage.setItem('desktopIconPositions', JSON.stringify(newPositions));
  };

  // Handle icon selection
  const handleIconClick = (icon: IconProps, e: React.MouseEvent) => {
    e.stopPropagation();
    
    // Only process as a click if not dragging
    if (!isDragging) {
      setSelectedIcon(icon.id);
      
      // Double click behavior
      if (e.detail === 2) {
        if (icon.externalLink) {
          handleExternalLink(icon.externalLink);
        } else {
          openWindow(icon.id);
        }
      }
    }
  };
  
  // Track if currently dragging
  const [isDragging, setIsDragging] = useState(false);
  
  // Handle click on desktop to clear selection
  const handleDesktopClick = () => {
    setSelectedIcon(null);
  };
  
  // Create a flattened array of icons from all columns for easier management
  const allIcons = iconsColumns.flat();

  return (
    <div className="desktop-icons absolute inset-0" onClick={handleDesktopClick}>
      {allIcons.map((icon: IconProps) => {
        const position = iconPositions[icon.id] || { x: 0, y: 0 };
        const isSelected = selectedIcon === icon.id;
        
        return (
          <Draggable
            key={icon.id}
            position={position}
            onStart={() => setIsDragging(true)}
            onStop={(e, data) => {
              setIsDragging(false);
              handleDragStop(icon.id, e, data);
            }}
            bounds="parent"
          >
            <div
              className={`desktop-icon absolute flex flex-col items-center p-2 cursor-pointer select-none ${
                isSelected ? 'bg-blue-500/30 rounded-md' : ''
              }`}
              onClick={(e) => handleIconClick(icon, e)}
              onContextMenu={(e) => {
                e.preventDefault();
                setSelectedIcon(icon.id);
              }}
            >
              <div
                className={`w-14 h-14 flex items-center justify-center ${icon.bgColor} rounded-md shadow-md hover:shadow-lg transition-transform ${
                  !isDragging ? 'hover:scale-105' : ''
                }`}
              >
                <i className={`${icon.icon} text-2xl ${icon.color}`}></i>
              </div>
              <span className="text-white text-sm mt-1 text-center font-medium bg-black/40 px-2 py-0.5 rounded backdrop-blur-sm">
                {icon.name}
              </span>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default DesktopIcons;
