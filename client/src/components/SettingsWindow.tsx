import { useState } from "react";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import { wallpapers } from "@/lib/wallpapers";

const SettingsWindow = () => {
  const { selectedWallpaper, changeWallpaper } = useDesktop();
  const [activeTab, setActiveTab] = useState<string>("appearance");

  return (
    <Window
      id="settings"
      title="Settings"
      defaultWidth={800}
      defaultHeight={600}
      defaultX={300}
      defaultY={100}
    >
      <div className="flex h-full">
        {/* Sidebar */}
        <div className="w-56 bg-gray-800 border-r border-gray-700 p-4">
          <div className="text-lg font-bold text-white mb-6">Settings</div>
          <ul className="space-y-1">
            <li
              className={`p-2 rounded cursor-pointer ${
                activeTab === "appearance" 
                  ? "bg-gray-700 text-blue-400" 
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("appearance")}
            >
              <div className="flex items-center">
                <i className="fas fa-paint-brush mr-2"></i>
                <span>Appearance</span>
              </div>
            </li>
            <li
              className={`p-2 rounded cursor-pointer ${
                activeTab === "desktop" 
                  ? "bg-gray-700 text-blue-400" 
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("desktop")}
            >
              <div className="flex items-center">
                <i className="fas fa-desktop mr-2"></i>
                <span>Desktop</span>
              </div>
            </li>
            <li
              className={`p-2 rounded cursor-pointer ${
                activeTab === "privacy" 
                  ? "bg-gray-700 text-blue-400" 
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("privacy")}
            >
              <div className="flex items-center">
                <i className="fas fa-shield-alt mr-2"></i>
                <span>Privacy</span>
              </div>
            </li>
            <li
              className={`p-2 rounded cursor-pointer ${
                activeTab === "about" 
                  ? "bg-gray-700 text-blue-400" 
                  : "text-gray-300 hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab("about")}
            >
              <div className="flex items-center">
                <i className="fas fa-info-circle mr-2"></i>
                <span>About</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-gray-900 overflow-y-auto p-6">
          {activeTab === "appearance" && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Appearance</h2>
              
              <div className="mb-8">
                <h3 className="text-lg font-medium text-white mb-3">Wallpaper</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {wallpapers.map((wallpaper, index) => (
                    <div 
                      key={index}
                      className={`relative rounded-lg overflow-hidden cursor-pointer border-2 ${
                        selectedWallpaper === index ? 'border-blue-500' : 'border-transparent'
                      }`}
                      onClick={() => changeWallpaper(index)}
                    >
                      <div className="aspect-video">
                        <img 
                          src={wallpaper} 
                          alt={`Wallpaper ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {selectedWallpaper === index && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-white mb-3">Theme</h3>
                <div className="flex space-x-4">
                  <div className="bg-gray-800 rounded-lg p-4 border-2 border-blue-500 cursor-pointer">
                    <div className="text-center mb-2">Dark</div>
                    <div className="h-20 bg-gray-900 rounded"></div>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border border-gray-700 cursor-pointer opacity-50">
                    <div className="text-center mb-2">Light</div>
                    <div className="h-20 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "desktop" && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Desktop Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="showIcons" 
                    className="mr-2" 
                    defaultChecked 
                  />
                  <label htmlFor="showIcons">Show desktop icons</label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="showDock" 
                    className="mr-2" 
                    defaultChecked 
                  />
                  <label htmlFor="showDock">Show dock</label>
                </div>
                
                <div>
                  <label className="block mb-2">Dock position</label>
                  <select className="bg-gray-700 text-white rounded p-2 w-full">
                    <option value="bottom">Bottom</option>
                    <option value="left">Left</option>
                    <option value="right">Right</option>
                  </select>
                </div>
                
                <div>
                  <label className="block mb-2">Icon size</label>
                  <div className="flex items-center">
                    <span className="mr-2">Small</span>
                    <input type="range" min="1" max="3" defaultValue="2" className="w-full" />
                    <span className="ml-2">Large</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "privacy" && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">Privacy Settings</h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="collectData" 
                    className="mr-2" 
                  />
                  <label htmlFor="collectData">Allow data collection for analytics</label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="cookies" 
                    className="mr-2" 
                    defaultChecked 
                  />
                  <label htmlFor="cookies">Accept cookies</label>
                </div>
                
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    id="locationAccess" 
                    className="mr-2" 
                  />
                  <label htmlFor="locationAccess">Share location</label>
                </div>
                
                <div className="mt-6 p-4 bg-gray-800 rounded">
                  <p className="text-sm text-gray-300">
                    Your privacy is important. This portfolio app does not collect any personal data.
                    The settings above are for demonstration purposes only.
                  </p>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "about" && (
            <div>
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                    <i className="fab fa-linux text-white text-4xl"></i>
                  </div>
                </div>
                <h3 className="text-center text-xl font-bold mb-2">Linux Portfolio OS</h3>
                <p className="text-center text-gray-400">Version 1.0.0</p>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-4">
                <h3 className="font-medium mb-3">System Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Developer:</span>
                    <span>Harshad Dhokane</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Framework:</span>
                    <span>React + TypeScript</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">UI Components:</span>
                    <span>Tailwind CSS</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">License:</span>
                    <span>MIT</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};

export default SettingsWindow;