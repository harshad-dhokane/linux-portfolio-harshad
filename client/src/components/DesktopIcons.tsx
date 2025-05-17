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

// Helper function to convert Tailwind bgColor classes to actual CSS color values
const getBackgroundColor = (bgClass: string): string => {
  const colorMap: Record<string, string> = {
    'bg-black': '#000000',
    'bg-white': '#FFFFFF',
    'bg-gray-800': '#1F2937',
    'bg-gray-700': '#374151',
    'bg-gray-600': '#4B5563',
    'bg-blue-500': '#3B82F6',
    'bg-blue-600': '#2563EB',
    'bg-blue-700': '#1D4ED8',
    'bg-green-500': '#10B981',
    'bg-green-600': '#059669',
    'bg-red-500': '#EF4444',
    'bg-red-600': '#DC2626',
    'bg-yellow-500': '#F59E0B',
    'bg-yellow-400': '#FBBF24',
    'bg-purple-600': '#9333EA',
    'bg-indigo-500': '#6366F1',
    'bg-indigo-600': '#4F46E5',
    'bg-orange-500': '#F97316',
  };

  return colorMap[bgClass] || '#333333'; // Default dark gray if color not found
};

const DesktopIcons = () => {
  const { openWindow } = useDesktop();
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number; y: number }>>({});
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  
  // Set default positions for icons in a grid layout
  const getDefaultPositions = () => {
    const defaultPositions: Record<string, { x: number; y: number }> = {};
    
    // Calculate positions for first column - grid layout with proper spacing
    iconsColumns[0].forEach((icon, index) => {
      defaultPositions[icon.id] = { 
        x: 25, 
        y: 25 + (index * 100) 
      };
    });
    
    // Calculate positions for second column (further right)
    iconsColumns[1].forEach((icon, index) => {
      defaultPositions[icon.id] = { 
        x: 130, 
        y: 25 + (index * 100) 
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
        id: "filemanager",
        name: "File Manager",
        icon: "fas fa-folder",
        color: "text-yellow-400",
        bgColor: "bg-gray-800",
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
        icon: "fas fa-chart-bar",
        color: "text-white",
        bgColor: "bg-indigo-500",
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
              onClick={(e) => {
  if (icon.externalLink) {
    openWindow("browser");
    sessionStorage.setItem("browserUrl", icon.externalLink);
  } else {
    handleIconClick(icon, e);
  }
}}
              onContextMenu={(e) => {
                e.preventDefault();
                setSelectedIcon(icon.id);
              }}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-md shadow-md hover:shadow-lg transition-transform ${icon.bgColor} ${
                  !isDragging ? 'hover:scale-105' : ''
                }`}
                style={{ 
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)'
                }}
              >
                <i className={`${icon.icon} text-2xl ${icon.color}`}></i>
              </div>
              <span className="text-white text-[11px] mt-1 text-center font-medium bg-black/40 px-1.5 py-0.5 rounded-sm backdrop-blur-sm">
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
