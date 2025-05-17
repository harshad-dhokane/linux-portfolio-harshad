import { useState, useEffect, useRef } from "react";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";

const BrowserWindow = () => {
  const { openWindow } = useDesktop();

  const [tabs, setTabs] = useState([
    {
      id: 0,
      title: "Home",
      url: "https://harshad-dhokane.github.io/",
      content: "home",
      history: ["https://harshad-dhokane.github.io/"],
      historyIndex: 0,
      isLoading: false,
      iframeRef: useRef<HTMLIFrameElement>(null),
    },
  ]);
  const [activeTabId, setActiveTabId] = useState(0);

  const activeTab = tabs.find((tab) => tab.id === activeTabId);

  const [url, setUrl] = useState("https://harshad-dhokane.github.io/");
  const [content, setContent] = useState("home");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Check if a URL was passed via sessionStorage from another component
  useEffect(() => {
    const storedUrl = sessionStorage.getItem("browserUrl");
    const storedContent = sessionStorage.getItem("browserContent");
    if (storedUrl) {
      if (storedContent === "github" || storedContent === "linkedin") {
        const newTab = {
          id: tabs.length,
          title: storedContent === "github" ? "GitHub" : "LinkedIn",
          url: storedUrl,
          content: storedContent,
          history: [storedUrl],
          historyIndex: 0,
          isLoading: false,
          iframeRef: { current: null }
        };
        setTabs([newTab]);
        setActiveTabId(newTab.id);
      } else {
        navigateTo(storedUrl);
      }
      sessionStorage.removeItem("browserUrl");
      sessionStorage.removeItem("browserContent");
    }
  }, []);

  // Update tab title based on content
  useEffect(() => {
    if (!activeTab) return;

    if (activeTab.content === "github") {
      updateTab(activeTab.id, { title: "GitHub" });
    } else if (activeTab.content === "linkedin") {
      updateTab(activeTab.id, { title: "LinkedIn" });
    } else if (activeTab.content === "external") {
      // Extract domain name for tab
      try {
        const domain = new URL(activeTab.url).hostname.replace("www.", "");
        updateTab(activeTab.id, { title: domain });
      } catch (e) {
        updateTab(activeTab.id, { title: "External Site" });
      }
    } else {
      updateTab(activeTab.id, { title: "Home" });
    }
  }, [activeTab?.content, activeTab?.url]);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!activeTab) return;
    updateTab(activeTab.id, { url: e.target.value });
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (!activeTab) return;
      navigateTo(activeTab.url);
    }
  };

  const updateTab = (
    tabId: number,
    changes: Partial<{
      title: string;
      url: string;
      content: string;
      history: string[];
      historyIndex: number;
      isLoading: boolean;
    }>
  ) => {
    setTabs((prevTabs) =>
      prevTabs.map((tab) => (tab.id === tabId ? { ...tab, ...changes } : tab))
    );
  };

  // Process the URL and decide how to display it
  const navigateTo = (targetUrl: string) => {
    if (!activeTab) return;

    // Ensure URL has protocol
    let processedUrl = targetUrl;
    if (
      !targetUrl.startsWith("http://") &&
      !targetUrl.startsWith("https://")
    ) {
      processedUrl = "https://" + targetUrl;
    }

    updateTab(activeTab.id, { url: processedUrl, isLoading: true });

    // Add to history
    let newHistory = [...activeTab.history];
    let newHistoryIndex = activeTab.historyIndex;

    if (activeTab.historyIndex < activeTab.history.length - 1) {
      // If we navigated back and then to a new page, truncate history
      newHistory = [...activeTab.history.slice(0, activeTab.historyIndex + 1), processedUrl];
    } else {
      newHistory = [...activeTab.history, processedUrl];
    }
    newHistoryIndex = activeTab.historyIndex + 1;

    updateTab(activeTab.id, { history: newHistory, historyIndex: newHistoryIndex, url: processedUrl });

    // Determine content type based on URL
    let newContent = "external";
    if (processedUrl.includes("github.com/harshad-dhokane")) {
      newContent = "github";
    } else if (processedUrl.includes("linkedin.com/in/harshad-dhokane")) {
      newContent = "linkedin";
    } else if (
      processedUrl === "https://harshad-dhokane.github.io/" ||
      processedUrl === "about:blank"
    ) {
      newContent = "home";
    }

    updateTab(activeTab.id, { content: newContent });

    setTimeout(() => updateTab(activeTab.id, { isLoading: false }), 1500);
  };

  const goBack = () => {
    if (!activeTab) return;

    if (activeTab.historyIndex > 0) {
      const prevIndex = activeTab.historyIndex - 1;
      const prevUrl = activeTab.history[prevIndex];
      updateTab(activeTab.id, { historyIndex: prevIndex, url: prevUrl });

      let newContent = "external";
      if (prevUrl.includes("github.com/harshad-dhokane")) {
        newContent = "github";
      } else if (prevUrl.includes("linkedin.com/in/harshad-dhokane")) {
        newContent = "linkedin";
      } else if (
        prevUrl === "https://harshad-dhokane.github.io/" ||
        prevUrl === "about:blank"
      ) {
        newContent = "home";
      }
      updateTab(activeTab.id, { content: newContent });
    }
  };

  const goForward = () => {
    if (!activeTab) return;

    if (activeTab.historyIndex < activeTab.history.length - 1) {
      const nextIndex = activeTab.historyIndex + 1;
      const nextUrl = activeTab.history[nextIndex];
      updateTab(activeTab.id, { historyIndex: nextIndex, url: nextUrl });

      let newContent = "external";
      if (nextUrl.includes("github.com/harshad-dhokane")) {
        newContent = "github";
      } else if (nextUrl.includes("linkedin.com/in/harshad-dhokane")) {
        newContent = "linkedin";
      } else if (
        nextUrl === "https://harshad-dhokane.github.io/" ||
        nextUrl === "about:blank"
      ) {
        newContent = "home";
      }
      updateTab(activeTab.id, { content: newContent });
    }
  };

  const refresh = () => {
    if (!activeTab) return;
    updateTab(activeTab.id, { isLoading: true });
    setTimeout(() => updateTab(activeTab.id, { isLoading: false }), 1000);

    if (activeTab.content === "external" && activeTab.iframeRef.current) {
      activeTab.iframeRef.current.src = activeTab.url;
    }
  };

  const closeTab = (tabId: number) => {
    if (tabs.length === 1) return; // Prevent closing the last tab
    setTabs((prevTabs) => prevTabs.filter((tab) => tab.id !== tabId));
    if (activeTabId === tabId) {
      // If closing the active tab, switch to the first tab
      setActiveTabId(tabs[0].id);
    }
  };

  const addTab = () => {
    const newTabId =
      tabs.reduce((maxId, tab) => Math.max(maxId, tab.id), 0) + 1;
    const newTab = {
      id: newTabId,
      title: "New Tab",
      url: "about:blank",
      content: "home",
      history: ["about:blank"],
      historyIndex: 0,
      isLoading: false,
      iframeRef: { current: null }
    };
    setTabs((prevTabs) => [...prevTabs, newTab]);
    setActiveTabId(newTabId);
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
            {tabs.map((tab) => (
              <div
                key={tab.id}
                className={`browser-tab px-3 py-1 rounded-t text-white flex items-center ${
                  activeTabId === tab.id ? "active-tab" : ""
                }`}
                onClick={() => setActiveTabId(tab.id)}
              >
                <span className="tab-title">{tab.title}</span>
                {tabs.length > 1 && (
                  <i
                    className="fas fa-times ml-2 text-xs opacity-60 hover:opacity-100 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent tab switch when closing
                      closeTab(tab.id);
                    }}
                  ></i>
                )}
              </div>
            ))}
            <div
              className="w-6 h-6 rounded-full bg-[#4A4A4F] hover:bg-[#5C5C61] flex items-center justify-center cursor-pointer transition-colors"
              onClick={addTab}
            >
              <i className="fas fa-plus text-white text-xs"></i>
            </div>
          </div>
          <div className="flex bg-[#42414D] rounded-md p-1 mb-2 items-center">
            <div className="flex items-center space-x-2 mr-2">
              <div
                className={`w-8 h-8 rounded-full ${
                  activeTab?.historyIndex > 0
                    ? "bg-[#5C5C61] hover:bg-[#737373] cursor-pointer"
                    : "bg-[#4A4A4F] cursor-not-allowed opacity-50"
                } flex items-center justify-center transition-colors`}
                onClick={goBack}
              >
                <i className="fas fa-arrow-left text-white text-sm"></i>
              </div>
              <div
                className={`w-8 h-8 rounded-full ${
                  activeTab?.historyIndex < activeTab?.history.length - 1
                    ? "bg-[#5C5C61] hover:bg-[#737373] cursor-pointer"
                    : "bg-[#4A4A4F] cursor-not-allowed opacity-50"
                } flex items-center justify-center transition-colors`}
                onClick={goForward}
              >
                <i className="fas fa-arrow-right text-white text-sm"></i>
              </div>
              <div
                className="w-8 h-8 rounded-full bg-[#5C5C61] hover:bg-[#737373] flex items-center justify-center cursor-pointer transition-colors"
                onClick={refresh}
              >
                <i
                  className={`fas fa-${
                    activeTab?.isLoading ? "circle-notch fa-spin" : "redo"
                  } text-white text-sm`}
                ></i>
              </div>
            </div>
            <div className="flex-1 bg-[#1C1B22] hover:bg-[#2A2A2E] rounded px-3 py-1 flex items-center transition-colors">
              <i className="fas fa-lock text-green-500 text-xs mr-2"></i>
              <input
                type="text"
                className="bg-transparent text-white outline-none w-full"
                value={activeTab?.url}
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
          {activeTab?.isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <i className="fas fa-circle-notch fa-spin text-[hsl(var(--linux-blue))] text-4xl"></i>
                <p className="mt-4 text-gray-600">
                  Loading {activeTab?.title}...
                </p>
              </div>
            </div>
          )}

          {activeTab?.content === "home" && (
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
                      <i
                        className={`${shortcut.icon} text-3xl ${shortcut.textColor}`}
                      ></i>
                    </div>
                    <span className="text-gray-700">{shortcut.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab?.content === "github" && (
            <div className="h-full flex flex-col">
              <div className="h-12 bg-black flex items-center px-4">
                <i className="fab fa-github text-white text-2xl mr-2"></i>
                <div className="text-white">GitHub</div>
              </div>
              <div className="flex-1 bg-white overflow-y-auto">
                <iframe 
                  src="https://github.com/harshad-dhokane"
                  className="w-full h-full border-none"
                  title="GitHub Profile"
                />
              </div>
                        <h2 className="text-2xl font-bold">Harshad Dhokane</h2>
                        <p className="text-gray-600 mt-1">@harshad-dhokane</p>
                        <a 
                          href="https://github.com/harshad-dhokane"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-4"
                        >
                          <button className="w-full bg-green-600 hover:bg-green-700 text-white py-1 px-4 rounded-md transition-colors">
                            Follow
                          </button>
                        </a>
                      </div>

                      <div className="bg-gray-100 rounded-lg p-4 mt-4">
                        <h3 className="font-bold text-lg mb-2">About</h3>
                        <p className="text-gray-700 text-sm">
                          Computer Science professional with expertise in AI/ML
                          and full-stack development.
                        </p>
                        <div className="mt-3 text-sm">
                          <div className="flex items-center mb-2">
                            <i className="fas fa-map-marker-alt text-gray-500 mr-2"></i>
                            <span>Pune, Maharashtra</span>
                          </div>
                          <div className="flex items-center">
                            <i className="fas fa-link text-gray-500 mr-2"></i>
                            <a
                              href="#"
                              className="text-blue-600 hover:underline"
                            >
                              work.harshad@gmail.com
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="w-full md:w-2/3">
                      <div className="mb-6">
                        <div className="flex border-b">
                          <div className="px-4 py-2 font-medium border-b-2 border-orange-500 text-gray-900">
                            Repositories
                          </div>
                          <div className="px-4 py-2 text-gray-600">
                            Projects
                          </div>
                          <div className="px-4 py-2 text-gray-600">
                            Activity
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex justify-between">
                            <h3 className="font-medium text-blue-600 hover:underline">
                              <a href="#">internly</a>
                            </h3>
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              Public
                            </span>
                          </div>
                          <p className="text-gray-600 text-sm mt-2">
                            A full-stack internship tracking platform built with
                            React, TypeScript, Tailwind CSS
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
                            <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full">
                              Public
                            </span>
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

          {activeTab?.content === "linkedin" && (
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
                          <img
                            src="https://media.licdn.com/dms/image/D5603AQHaRvI9yUJeXg/"
                            alt="Harshad Dhokane"
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src =
                                "https://media.licdn.com/dms/image/C560BAQHaVYd13rRz3A/company-logo_100_100/0/1638831589865?e=1708560000&v=beta&t=PJQG1k1NGJs2KcEP-EYg3Jh7B--NuiE-85FmSHkK2_w";
                            }}
                          />
                        </div>
                        <div className="ml-36 pt-2">
                          <h1 className="text-2xl font-bold">Harshad Dhokane</h1>
                          <p className="text-gray-600">
                            Computer Science Professional | AI/ML | Full-Stack
                            Development
                          </p>
                          <p className="text-gray-500 text-sm">
                            Pune, Maharashtra, India ·{" "}
                            <span className="text-blue-600">Contact info</span>
                          </p>
                          <div className="flex space-x-2 mt-3">
                            <a href="https://www.linkedin.com/in/harshad-dhokane" target="_blank" rel="noopener noreferrer" className="flex-1">
                              <button className="w-full bg-[#0A66C2] hover:bg-[#004182] text-white py-1.5 px-4 rounded transition-colors font-semibold flex items-center justify-center">
                                <i className="fab fa-linkedin mr-2"></i>
                                Connect
                              </button>
                            </a>
                            <button className="flex-1 bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 font-semibold px-4 py-1.5 rounded transition-colors flex items-center justify-center">
                              <i className="far fa-envelope mr-2"></i>
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
                        Results-driven Computer Science professional with
                        expertise in AI/ML and full-stack development. Skilled
                        in building intelligent applications and scalable web
                        solutions. An extraordinary learner with proven ability
                        to quickly master new technologies and implement
                        efficient solutions.
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
                            <h3 className="font-medium">
                              Software Development Intern
                            </h3>
                            <div className="text-gray-600">Canspirit.ai</div>
                            <div className="text-gray-500 text-sm">
                              Apr 2025 - Jun 2025 · 3 mos
                            </div>
                            <div className="text-gray-500 text-sm">
                              Pune, Maharashtra
                            </div>
                            <p className="text-gray-700 mt-2">
                              Working on a live QR code-based Asset Management
                              System, contributing to both front-end and
                              back-end development.
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
                            <h3 className="font-medium">
                              AI & Software Development Intern
                            </h3>
                            <div className="text-gray-600">CodeSoft</div>
                            <div className="text-gray-500 text-sm">
                              Aug 2024 - Sept 2024 · 2 mos
                            </div>
                            <div className="text-gray-500 text-sm">
                              Pune, Maharashtra
                            </div>
                            <p className="text-gray-700 mt-2">
                              Developed AI models for machine learning
                              applications like chatbots, recommendation
                              systems, and image recognition systems with user
                              friendly interfaces.
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
                          <h3 className="font-medium">
                            Nowrosjee Wadia College, Pune
                          </h3>
                          <div className="text-gray-600">
                            Master of Science in Computer Science
                          </div>
                          <div className="text-gray-500 text-sm">
                            2024 - 2026
                          </div>
                          <div className="text-gray-700 text-sm">CGPA: 8.1</div>
                        </div>
                      </div>

                      <div className="flex">
                        <div className="w-12 h-12 bg-gray-200 rounded mr-4 flex-shrink-0 flex items-center justify-center">
                          <i className="fas fa-university text-gray-500"></i>
                        </div>
                        <div>
                          <h3 className="font-medium">
                            Nowrosjee Wadia College, Pune
                          </h3>
                          <div className="text-gray-600">
                            Bachelor of Computer Science
                          </div>
                          <div className="text-gray-500 text-sm">
                            2021 - 2024
                          </div>
                          <div className="text-gray-700 text-sm">CGPA: 8.84</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab?.content === "external" && (
            <div className="h-full w-full">
              <iframe
                ref={activeTab.iframeRef}
                src={activeTab?.url}
                className="w-full h-full"
                title="External content"
                sandbox="allow-scripts allow-same-origin allow-forms"
                onLoad={() => updateTab(activeTab.id, { isLoading: false })}
                onError={() => updateTab(activeTab.id, { isLoading: false })}
              />
            </div>
          )}
        </div>
      </div>
    </Window>
  );
};

export default BrowserWindow;