import { useState } from "react";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";

const BrowserWindow = () => {
  const { openWindow } = useDesktop();
  
  const [activeTab, setActiveTab] = useState("Home");
  const [url, setUrl] = useState("https://harshad-dhokane.github.io/");
  const [content, setContent] = useState("home");

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigateTo(url);
    }
  };

  const navigateTo = (targetUrl: string) => {
    setUrl(targetUrl);
    
    if (targetUrl.includes("github.com/harshad-dhokane")) {
      setContent("github");
      setActiveTab("GitHub");
    } else if (targetUrl.includes("linkedin.com/in/harshad-dhokane")) {
      setContent("linkedin");
      setActiveTab("LinkedIn");
    } else {
      setContent("home");
      setActiveTab("Home");
    }
  };

  const openExternalUrl = (url: string) => {
    window.open(url, "_blank");
  };

  const shortcuts = [
    {
      name: "GitHub",
      icon: "fab fa-github",
      bgColor: "bg-gray-200",
      textColor: "text-gray-800",
      url: "https://github.com/harshad-dhokane/",
    },
    {
      name: "LinkedIn",
      icon: "fab fa-linkedin-in",
      bgColor: "bg-blue-500",
      textColor: "text-white",
      url: "https://www.linkedin.com/in/harshad-dhokane/",
    },
    {
      name: "Projects",
      icon: "fas fa-code",
      bgColor: "bg-red-500",
      textColor: "text-white",
      windowId: "projects",
    },
    {
      name: "Resume",
      icon: "fas fa-user-graduate",
      bgColor: "bg-green-500",
      textColor: "text-white",
      windowId: "resume",
    },
  ];

  return (
    <Window
      id="browser"
      title="Web Browser"
      defaultWidth={900}
      defaultHeight={600}
      defaultX={300}
      defaultY={50}
    >
      <div className="flex flex-col h-full">
        <div className="bg-gray-800 p-2">
          <div className="flex space-x-2 text-sm mb-2">
            <div className="browser-tab active-tab px-3 py-1 rounded-t text-white flex items-center">
              <span className="tab-title">{activeTab}</span>
              <i className="fas fa-times ml-2 text-xs cursor-pointer"></i>
            </div>
            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center cursor-pointer">
              <i className="fas fa-plus text-white text-xs"></i>
            </div>
          </div>
          <div className="flex bg-gray-700 rounded-md p-1 mb-2 items-center">
            <div className="flex items-center space-x-2 mr-2">
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
                <i className="fas fa-arrow-left text-gray-400 text-sm"></i>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
                <i className="fas fa-arrow-right text-gray-400 text-sm"></i>
              </div>
              <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center cursor-pointer">
                <i className="fas fa-redo text-white text-sm"></i>
              </div>
            </div>
            <div className="flex-1 bg-gray-600 rounded px-3 py-1 flex items-center">
              <input
                type="text"
                className="bg-transparent text-white outline-none w-full"
                value={url}
                onChange={handleUrlChange}
                onKeyDown={handleUrlKeyDown}
              />
            </div>
            <div className="ml-2 space-x-1">
              <i className="fas fa-star text-gray-400 cursor-pointer"></i>
              <i className="fas fa-shield-alt text-green-500 cursor-pointer"></i>
            </div>
          </div>
        </div>

        <div className="bg-white h-full overflow-y-auto p-4">
          {content === "home" && (
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 mb-8">
                <i className="fab fa-linux text-8xl text-gray-700"></i>
              </div>
              <div className="search-bar w-2/3 flex rounded-full overflow-hidden shadow-lg border border-gray-300 focus-within:border-[hsl(var(--linux-blue))]">
                <input
                  type="text"
                  placeholder="Search or type URL"
                  className="flex-1 px-5 py-3 outline-none"
                  onChange={handleUrlChange}
                  onKeyDown={handleUrlKeyDown}
                />
                <div className="bg-[hsl(var(--linux-blue))] text-white px-6 flex items-center justify-center cursor-pointer">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6 mt-10">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.name}
                    className="shortcut flex flex-col items-center cursor-pointer"
                    onClick={() => {
                      if (shortcut.url) {
                        navigateTo(shortcut.url);
                      } else if (shortcut.windowId) {
                        openWindow(shortcut.windowId);
                      }
                    }}
                  >
                    <div
                      className={`w-16 h-16 rounded-full ${shortcut.bgColor} flex items-center justify-center mb-2`}
                    >
                      <i className={`${shortcut.icon} text-3xl ${shortcut.textColor}`}></i>
                    </div>
                    <span className="text-gray-700">{shortcut.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {content === "github" && (
            <div className="p-4 bg-gray-100 text-center">
              <p className="text-xl">This would load Harshad's GitHub profile from:</p>
              <p className="text-blue-600 mt-2">https://github.com/harshad-dhokane/</p>
              <p className="mt-4">
                For security and technical limitations, external content cannot be
                directly embedded.
              </p>
              <div
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded inline-block cursor-pointer"
                onClick={() => openExternalUrl("https://github.com/harshad-dhokane/")}
              >
                Open in new tab
              </div>
            </div>
          )}

          {content === "linkedin" && (
            <div className="p-4 bg-gray-100 text-center">
              <p className="text-xl">
                This would load Harshad's LinkedIn profile from:
              </p>
              <p className="text-blue-600 mt-2">
                https://www.linkedin.com/in/harshad-dhokane/
              </p>
              <p className="mt-4">
                For security and technical limitations, external content cannot be
                directly embedded.
              </p>
              <div
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded inline-block cursor-pointer"
                onClick={() => openExternalUrl("https://www.linkedin.com/in/harshad-dhokane/")}
              >
                Open in new tab
              </div>
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};

export default BrowserWindow;
