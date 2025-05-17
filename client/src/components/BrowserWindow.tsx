import { useState, useEffect, useRef } from "react";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";

const BrowserWindow = () => {
  const { openWindow } = useDesktop();
  
  const [activeTab, setActiveTab] = useState("Home");
  const [url, setUrl] = useState("https://harshad-dhokane.github.io/");
  const [content, setContent] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  // Check if a URL was passed via sessionStorage from another component
  useEffect(() => {
    const storedUrl = sessionStorage.getItem("browserUrl");
    if (storedUrl) {
      navigateTo(storedUrl);
      sessionStorage.removeItem("browserUrl"); // Clear it after use
    }
  }, []);

  // Update tab title based on content
  useEffect(() => {
    if (content === "github") {
      setActiveTab("GitHub");
    } else if (content === "linkedin") {
      setActiveTab("LinkedIn");
    } else if (content === "external") {
      // Extract domain name for tab
      try {
        const domain = new URL(url).hostname.replace('www.', '');
        setActiveTab(domain);
      } catch (e) {
        setActiveTab("External Site");
      }
    } else {
      setActiveTab("Home");
    }
  }, [content, url]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigateTo(url);
    }
  };

  // Process the URL and decide how to display it
  const navigateTo = (targetUrl: string) => {
    // Ensure URL has protocol
    let processedUrl = targetUrl;
    if (!targetUrl.startsWith('http://') && !targetUrl.startsWith('https://')) {
      processedUrl = 'https://' + targetUrl;
    }
    
    setUrl(processedUrl);
    setIsLoading(true);
    
    // Add to history
    if (historyIndex < history.length - 1) {
      // If we navigated back and then to a new page, truncate history
      setHistory(prev => [...prev.slice(0, historyIndex + 1), processedUrl]);
    } else {
      setHistory(prev => [...prev, processedUrl]);
    }
    setHistoryIndex(prev => prev + 1);
    
    // Determine content type based on URL
    if (processedUrl.includes("github.com/harshad-dhokane")) {
      setContent("github");
    } else if (processedUrl.includes("linkedin.com/in/harshad-dhokane")) {
      setContent("linkedin");
    } else if (processedUrl === "https://harshad-dhokane.github.io/" || processedUrl === "about:blank") {
      setContent("home");
    } else {
      setContent("external");
    }
    
    setTimeout(() => setIsLoading(false), 1500);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      setHistoryIndex(prevIndex);
      setUrl(history[prevIndex]);
      
      if (history[prevIndex].includes("github.com/harshad-dhokane")) {
        setContent("github");
      } else if (history[prevIndex].includes("linkedin.com/in/harshad-dhokane")) {
        setContent("linkedin");
      } else if (history[prevIndex] === "https://harshad-dhokane.github.io/" || history[prevIndex] === "about:blank") {
        setContent("home");
      } else {
        setContent("external");
      }
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      setHistoryIndex(nextIndex);
      setUrl(history[nextIndex]);
      
      if (history[nextIndex].includes("github.com/harshad-dhokane")) {
        setContent("github");
      } else if (history[nextIndex].includes("linkedin.com/in/harshad-dhokane")) {
        setContent("linkedin");
      } else if (history[nextIndex] === "https://harshad-dhokane.github.io/" || history[nextIndex] === "about:blank") {
        setContent("home");
      } else {
        setContent("external");
      }
    }
  };

  const refresh = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 1000);
    
    if (content === "external" && iframeRef.current) {
      iframeRef.current.src = url;
    }
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
      title="Firefox - Harshad Dhokane"
      defaultWidth={900}
      defaultHeight={600}
      defaultX={300}
      defaultY={50}
    >
      <div className="flex flex-col h-full">
        <div className="bg-[#38383D] p-2">
          <div className="flex space-x-2 text-sm mb-2">
            <div className="browser-tab active-tab px-3 py-1 rounded-t text-white flex items-center">
              <span className="tab-title">{activeTab}</span>
              <i className="fas fa-times ml-2 text-xs opacity-60 hover:opacity-100 cursor-pointer"></i>
            </div>
            <div className="w-6 h-6 rounded-full bg-[#4A4A4F] hover:bg-[#5C5C61] flex items-center justify-center cursor-pointer transition-colors">
              <i className="fas fa-plus text-white text-xs"></i>
            </div>
          </div>
          <div className="flex bg-[#42414D] rounded-md p-1 mb-2 items-center">
            <div className="flex items-center space-x-2 mr-2">
              <div 
                className={`w-8 h-8 rounded-full ${historyIndex > 0 ? 'bg-[#5C5C61] hover:bg-[#737373] cursor-pointer' : 'bg-[#4A4A4F] cursor-not-allowed opacity-50'} flex items-center justify-center transition-colors`}
                onClick={goBack}
              >
                <i className="fas fa-arrow-left text-white text-sm"></i>
              </div>
              <div 
                className={`w-8 h-8 rounded-full ${historyIndex < history.length - 1 ? 'bg-[#5C5C61] hover:bg-[#737373] cursor-pointer' : 'bg-[#4A4A4F] cursor-not-allowed opacity-50'} flex items-center justify-center transition-colors`}
                onClick={goForward}
              >
                <i className="fas fa-arrow-right text-white text-sm"></i>
              </div>
              <div 
                className="w-8 h-8 rounded-full bg-[#5C5C61] hover:bg-[#737373] flex items-center justify-center cursor-pointer transition-colors"
                onClick={refresh}
              >
                <i className={`fas fa-${isLoading ? 'circle-notch fa-spin' : 'redo'} text-white text-sm`}></i>
              </div>
            </div>
            <div className="flex-1 bg-[#1C1B22] hover:bg-[#2A2A2E] rounded px-3 py-1 flex items-center transition-colors">
              <i className="fas fa-lock text-green-500 text-xs mr-2"></i>
              <input
                type="text"
                className="bg-transparent text-white outline-none w-full"
                value={url}
                onChange={handleUrlChange}
                onKeyDown={handleUrlKeyDown}
              />
            </div>
            <div className="ml-2 space-x-1">
              <i className="fas fa-star text-gray-400 cursor-pointer hover:text-yellow-400 transition-colors"></i>
              <i className="fas fa-shield-alt text-green-500 cursor-pointer"></i>
            </div>
          </div>
        </div>

        <div className="bg-white h-full overflow-hidden">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <i className="fas fa-circle-notch fa-spin text-[hsl(var(--linux-blue))] text-4xl"></i>
                <p className="mt-4 text-gray-600">Loading {activeTab}...</p>
              </div>
            </div>
          )}
          
          {content === "home" && (
            <div className="flex flex-col items-center h-full pt-16 overflow-y-auto">
              <div className="w-32 h-32 mb-8">
                <i className="fab fa-firefox text-8xl text-orange-500"></i>
              </div>
              <div className="search-bar w-2/3 flex rounded-full overflow-hidden shadow-lg border border-gray-300 focus-within:border-[hsl(var(--linux-blue))]">
                <input
                  type="text"
                  placeholder="Search or type URL"
                  className="flex-1 px-5 py-3 outline-none"
                  onChange={handleUrlChange}
                  onKeyDown={handleUrlKeyDown}
                />
                <div className="bg-[hsl(var(--linux-blue))] text-white px-6 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <i className="fas fa-search"></i>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-6 mt-10">
                {shortcuts.map((shortcut) => (
                  <div
                    key={shortcut.name}
                    className="shortcut flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => {
                      if (shortcut.url) {
                        navigateTo(shortcut.url);
                      } else if (shortcut.windowId) {
                        openWindow(shortcut.windowId);
                      }
                    }}
                  >
                    <div
                      className={`w-16 h-16 rounded-full ${shortcut.bgColor} flex items-center justify-center mb-2 shadow-md`}
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
            <div className="h-full flex flex-col">
              <div className="h-12 bg-black flex items-center px-4">
                <i className="fab fa-github text-white text-2xl mr-2"></i>
                <div className="text-white">GitHub</div>
              </div>
              <div className="flex-1 p-4 bg-white overflow-y-auto">
                <div className="max-w-4xl mx-auto">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="w-full md:w-1/3">
                      <div className="bg-gray-100 rounded-lg p-6 text-center">
                        <div className="w-32 h-32 mx-auto bg-gray-300 rounded-full overflow-hidden mb-4">
                          <img src="https://avatars.githubusercontent.com/u/harshad-dhokane" alt="Harshad Dhokane" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png' }} />
                        </div>
                        <h2 className="text-2xl font-bold">Harshad Dhokane</h2>
                        <p className="text-gray-600 mt-1">@harshad-dhokane</p>
                        <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-md transition-colors">
                          Follow
                        </button>
                      </div>
                      
                      <div className="bg-gray-100 rounded-lg p-4 mt-4">
                        <h3 className="font-bold text-lg mb-2">About</h3>
                        <p className="text-gray-700 text-sm">
                          Computer Science professional with expertise in AI/ML and full-stack development.
                        </p>
                        <div className="mt-3 text-sm">
                          <div className="flex items-center mb-2">
                            <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                            <span>Pune, Maharashtra</span>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-link text-gray-500 mr-2"></i>
                            <a href="#" className="text-blue-600 hover:underline">work.harshad@gmail.com</a>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="w-full md:w-2/3">
                      <div className="mb-6">
                        <div className="flex border-b">
                          <div className="px-4 py-2 font-medium border-b-2 border-orange-500 text-gray-900">Repositories</div>
                          <div className="px-4 py-2 text-gray-600">Projects</div>
                          <div className="px-4 py-2 text-gray-600">Activity</div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-blue-600 hover:underline">
                              <a href="#">internly</a>
                            </h3>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Public</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-2">
                            A full-stack internship tracking platform built with React, TypeScript, Tailwind CSS
                          </p>
                          <div className="flex mt-3">
                            <div className="flex items-center mr-4 text-xs">
                              <span className="w-3 h-3 bg-yellow-500 rounded-full mr-1"></span>
                              <span>JavaScript</span>
                            </div>
                            <div className="flex items-center mr-4 text-xs text-gray-600">
                              <i className="far fa-star mr-1"></i>
                              <span>14</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <i className="fas fa-code-branch mr-1"></i>
                              <span>3</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-blue-600 hover:underline">
                              <a href="#">college-suggestion-bot</a>
                            </h3>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">Public</span>
                          </div>
                          <p className="text-gray-600 text-sm mt-2">
                            AI-powered college recommendation system using NLP
                          </p>
                          <div className="flex mt-3">
                            <div className="flex items-center mr-4 text-xs">
                              <span className="w-3 h-3 bg-blue-500 rounded-full mr-1"></span>
                              <span>Python</span>
                            </div>
                            <div className="flex items-center mr-4 text-xs text-gray-600">
                              <i className="far fa-star mr-1"></i>
                              <span>8</span>
                            </div>
                            <div className="flex items-center text-xs text-gray-600">
                              <i className="fas fa-code-branch mr-1"></i>
                              <span>2</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {content === "linkedin" && (
            <div className="h-full flex flex-col">
              <div className="h-12 bg-[#0077B5] flex items-center px-4">
                <i className="fab fa-linkedin-in text-white text-2xl mr-2"></i>
                <div className="text-white">LinkedIn</div>
              </div>
              <div className="flex-1 overflow-y-auto bg-[#F3F2EF]">
                <div className="max-w-4xl mx-auto pt-6 px-4">
                  <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
                    <div className="h-32 bg-gradient-to-r from-blue-700 to-blue-500"></div>
                    <div className="px-6 pb-6">
                      <div className="relative">
                        <div className="w-32 h-32 absolute -top-16 left-0 border-4 border-white rounded-full overflow-hidden bg-white">
                          <img src="https://media.licdn.com/dms/image/D5603AQHaRvI9yUJeXg/" alt="Harshad Dhokane" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://media.licdn.com/dms/image/C560BAQHaVYd13rRz3A/company-logo_100_100/0/1638831589865?e=1708560000&v=beta&t=PJQG1k1NGJs2KcEP-EYg3Jh7B--NuiE-85FmSHkK2_w' }} />
                        </div>
                        <div className="ml-36 pt-2">
                          <h1 className="text-2xl font-bold">Harshad Dhokane</h1>
                          <p className="text-gray-600">Computer Science Professional | AI/ML | Full-Stack Development</p>
                          <p className="text-gray-500 text-sm">Pune, Maharashtra, India · <span className="text-blue-600">Contact info</span></p>
                          <div className="flex mt-3">
                            <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-1 rounded-full transition-colors mr-2">
                              Connect
                            </button>
                            <button className="bg-white hover:bg-gray-100 text-blue-600 border border-blue-600 font-medium px-4 py-1 rounded-full transition-colors">
                              Message
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4">About</h2>
                      <p className="text-gray-700">
                        Results-driven Computer Science professional with expertise in AI/ML and full-stack development. Skilled in building intelligent applications and scalable web solutions. An extraordinary learner with proven ability to quickly master new technologies and implement efficient solutions.
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4">Experience</h2>
                      
                      <div className="mb-6">
                        <div className="flex">
                          <div className="w-12 h-12 bg-gray-200 rounded mr-4 flex-shrink-0 flex items-center justify-center">
                            <i className="fas fa-building text-gray-500"></i>
                          </div>
                          <div>
                            <h3 className="font-medium">Software Development Intern</h3>
                            <div className="text-gray-600">Canspirit.ai</div>
                            <div className="text-gray-500 text-sm">Apr 2025 - Jun 2025 · 3 mos</div>
                            <div className="text-gray-500 text-sm">Pune, Maharashtra</div>
                            <p className="text-gray-700 mt-2">
                              Working on a live QR code-based Asset Management System, contributing to both front-end and back-end development.
                            </p>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex">
                          <div className="w-12 h-12 bg-gray-200 rounded mr-4 flex-shrink-0 flex items-center justify-center">
                            <i className="fas fa-laptop-code text-gray-500"></i>
                          </div>
                          <div>
                            <h3 className="font-medium">AI & Software Development Intern</h3>
                            <div className="text-gray-600">CodeSoft</div>
                            <div className="text-gray-500 text-sm">Aug 2024 - Sept 2024 · 2 mos</div>
                            <div className="text-gray-500 text-sm">Pune, Maharashtra</div>
                            <p className="text-gray-700 mt-2">
                              Developed AI models for machine learning applications like chatbots, recommendation systems, and image recognition systems with user friendly interfaces.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white rounded-lg shadow overflow-hidden mb-4">
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4">Education</h2>
                      
                      <div className="flex mb-6">
                        <div className="w-12 h-12 bg-gray-200 rounded mr-4 flex-shrink-0 flex items-center justify-center">
                          <i className="fas fa-university text-gray-500"></i>
                        </div>
                        <div>
                          <h3 className="font-medium">Nowrosjee Wadia College, Pune</h3>
                          <div className="text-gray-600">Master of Science in Computer Science</div>
                          <div className="text-gray-500 text-sm">2024 - 2026</div>
                          <div className="text-gray-700 text-sm">CGPA: 8.1</div>
                        </div>
                      </div>
                      
                      <div className="flex">
                        <div className="w-12 h-12 bg-gray-200 rounded mr-4 flex-shrink-0 flex items-center justify-center">
                          <i className="fas fa-university text-gray-500"></i>
                        </div>
                        <div>
                          <h3 className="font-medium">Nowrosjee Wadia College, Pune</h3>
                          <div className="text-gray-600">Bachelor of Computer Science</div>
                          <div className="text-gray-500 text-sm">2021 - 2024</div>
                          <div className="text-gray-700 text-sm">CGPA: 8.84</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {content === "external" && (
            <div className="h-full w-full">
              <iframe 
                ref={iframeRef}
                src={url} 
                className="w-full h-full"
                title="External content"
                sandbox="allow-scripts allow-same-origin allow-forms"
                onLoad={() => setIsLoading(false)}
                onError={() => setIsLoading(false)}
              />
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};

export default BrowserWindow;
