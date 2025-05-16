interface ContextMenuProps {
  x: number;
  y: number;
}

const ContextMenu = ({ x, y }: ContextMenuProps) => {
  const menuItems = [
    { icon: "fas fa-folder-open", label: "Open" },
    { icon: "fas fa-copy", label: "Copy" },
    { icon: "fas fa-paste", label: "Paste" },
    { icon: "fas fa-trash-alt", label: "Delete" },
    { icon: "fas fa-cog", label: "Properties" },
  ];

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

  return (
    <div
      id="context-menu"
      className="context-menu absolute rounded-md overflow-hidden z-50"
      style={{
        ...calculatePosition(),
        minWidth: "200px",
      }}
    >
      {menuItems.map((item, index) => (
        <div
          key={index}
          className="menu-item px-4 py-2 text-white hover:bg-[hsl(var(--linux-blue))] cursor-pointer flex items-center"
        >
          <i className={`${item.icon} mr-2`}></i> {item.label}
        </div>
      ))}
    </div>
  );
};

export default ContextMenu;
