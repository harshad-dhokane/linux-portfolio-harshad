import { useDesktop } from "@/context/DesktopContext";

interface ContextMenuProps {
  x: number;
  y: number;
  onClose: () => void;
  selectedIconId?: string | null;
}

const ContextMenu = ({ x, y, onClose, selectedIconId }: ContextMenuProps) => {
  const { openWindow, changeWallpaper, selectedWallpaper } = useDesktop();

  // Different menu items depending on context
  const getMenuItems = () => {
    if (selectedIconId) {
      // Icon-specific context menu
      return [
        { icon: "fas fa-folder-open", label: "Open", action: () => openWindow(selectedIconId) },
        { icon: "fas fa-copy", label: "Copy", action: () => {/* Copy functionality */ } },
        { icon: "fas fa-paste", label: "Paste", action: () => {/* Paste functionality */} },
        { icon: "fas fa-trash-alt", label: "Delete", action: () => {/* Delete functionality */} },
        { icon: "fas fa-cog", label: "Properties", action: () => {/* Properties functionality */} },
      ];
    }
    
    // Desktop context menu
    return [
      { icon: "fas fa-terminal", label: "Open Terminal", action: () => openWindow("terminal") },
      { icon: "fas fa-folder", label: "Open File Manager", action: () => openWindow("filemanager") },
      { icon: "fas fa-folder-open", label: "New Folder", action: () => {/* New folder functionality */} },
      { 
        icon: "fas fa-image", 
        label: "Change Wallpaper", 
        action: () => {
          const nextWallpaperIndex = (selectedWallpaper + 1) % 5;
          changeWallpaper(nextWallpaperIndex);
        } 
      },
      { icon: "fas fa-th-large", label: "View", submenu: true },
      { icon: "fas fa-cog", label: "Settings", action: () => openWindow("settings") },
    ];
  };

  // Position the menu ensuring it doesn't go off screen
  const calculatePosition = () => {
    const menuWidth = 200;
    const menuHeight = menuItems.length * 36; // rough height calculation
    
    const right = x + menuWidth > window.innerWidth ? window.innerWidth - menuWidth : x;
    const bottom = y + menuHeight > window.innerHeight ? window.innerHeight - menuHeight : y;
    
    return {
      left: `${right}px`,
      top: `${bottom}px`,
    };
  };

  const items = getMenuItems();

  return (
    <div
      id="context-menu"
      className="context-menu absolute rounded-md overflow-hidden z-50 bg-gray-800/90 backdrop-blur-sm border border-gray-700 shadow-lg"
      style={{
        ...calculatePosition(),
        minWidth: "200px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {items.map((item, index) => (
        <div
          key={index}
          className="menu-item px-4 py-2 text-white hover:bg-[hsl(var(--linux-blue))] cursor-pointer flex items-center"
          onClick={() => {
            if (item.action) {
              item.action();
              onClose();
            }
          }}
        >
          <i className={`${item.icon} mr-3 w-5 text-center`}></i> {item.label}
          {item.submenu && <i className="fas fa-chevron-right ml-auto"></i>}
        </div>
      ))}
      <div className="border-t border-gray-700 my-1"></div>
      <div
        className="menu-item px-4 py-2 text-white hover:bg-red-800 cursor-pointer flex items-center"
        onClick={onClose}
      >
        <i className="fas fa-times mr-3 w-5 text-center"></i> Close
      </div>
    </div>
  );
};

export default ContextMenu;
