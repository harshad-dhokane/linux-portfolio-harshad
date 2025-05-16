import { useState } from "react";
import { useDesktop } from "@/context/DesktopContext";
import { wallpapers } from "@/lib/wallpapers";

const ThemeSwitcher = () => {
  const { selectedWallpaper, changeWallpaper } = useDesktop();
  const [showWallpapers, setShowWallpapers] = useState(false);

  return (
    <div className="fixed top-4 right-20 z-20">
      <div 
        className="w-10 h-10 rounded-full bg-black bg-opacity-50 flex items-center justify-center cursor-pointer hover:bg-opacity-70"
        onClick={() => setShowWallpapers(!showWallpapers)}
      >
        <i className="fas fa-image text-white"></i>
      </div>
      
      {showWallpapers && (
        <div className="absolute right-0 mt-2 p-3 bg-gray-800 bg-opacity-90 backdrop-blur-lg rounded-lg shadow-lg">
          <div className="grid grid-cols-2 gap-2">
            {wallpapers.map((wallpaper, index) => (
              <div 
                key={index}
                className={`w-16 h-12 rounded overflow-hidden border-2 ${selectedWallpaper === index ? 'border-white' : 'border-transparent'} cursor-pointer hover:opacity-80`}
                style={{ backgroundImage: `url(${wallpaper})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
                onClick={() => {
                  changeWallpaper(index);
                  setShowWallpapers(false);
                }}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ThemeSwitcher;
