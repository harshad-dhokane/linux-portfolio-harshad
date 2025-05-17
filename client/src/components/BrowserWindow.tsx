import { useState, useEffect, useRef } from "react";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";

const BrowserWindow = () => {
  const { openWindow } = useDesktop();

  const [activeTab, setActiveTab] = useState("New Tab");
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const storedUrl = sessionStorage.getItem("browserUrl");
    if (storedUrl) {
      navigateTo(storedUrl);
      sessionStorage.removeItem("browserUrl");
    }
  }, []);

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value);
  };

  const handleUrlKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      navigateTo(url);
    }
  };

  const processUrl = (inputUrl: string) => {
    if (!inputUrl) return '';

    // Handle search queries
    if (!inputUrl.includes('.') || inputUrl.includes(' ')) {
      return `https://www.google.com/search?igu=1&q=${encodeURIComponent(inputUrl)}`;
    }

    // Add https if no protocol specified
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }

    return inputUrl;
  };

  const navigateTo = (targetUrl: string) => {
    const processedUrl = processUrl(targetUrl);
    setUrl(processedUrl);
    setIsLoading(true);

    // Update history
    if (historyIndex < history.length - 1) {
      setHistory(prev => [...prev.slice(0, historyIndex + 1), processedUrl]);
    } else {
      setHistory(prev => [...prev, processedUrl]);
    }
    setHistoryIndex(prev => prev + 1);

    // Update tab title
    try {
      const domain = new URL(processedUrl).hostname.replace('www.', '');
      setActiveTab(domain);
    } catch (e) {
      setActiveTab("New Tab");
    }

    setTimeout(() => setIsLoading(false), 1000);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setUrl(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setUrl(history[historyIndex + 1]);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  return (
    <Window
      id="browser"
      title="Firefox - Web Browser"
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
              <i className="fas fa-search text-gray-400 text-xs mr-2"></i>
              <input
                type="text"
                className="bg-transparent text-white outline-none w-full"
                value={url}
                onChange={handleUrlChange}
                onKeyDown={handleUrlKeyDown}
                placeholder="Search or enter address"
              />
            </div>
          </div>
        </div>

        <div className="bg-white h-full overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <i className="fas fa-circle-notch fa-spin text-[hsl(var(--linux-blue))] text-4xl"></i>
                <p className="mt-4 text-gray-600">Loading {activeTab}...</p>
              </div>
            </div>
          )}

          {!url && (
            <div className="flex flex-col items-center h-full pt-16 overflow-y-auto">
              <div className="w-32 h-32 mb-8">
                <i className="fab fa-firefox text-8xl text-orange-500"></i>
              </div>
              <div className="flex space-x-6 mb-8">
                <div 
                  className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-700 transition-colors"
                  onClick={() => navigateTo("https://github.com/harshad-dhokane/")}
                >
                  <i className="fab fa-github text-white text-3xl"></i>
                </div>
                <div 
                  className="w-16 h-16 bg-blue-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors"
                  onClick={() => navigateTo("https://www.linkedin.com/in/harshad-dhokane/")}
                >
                  <i className="fab fa-linkedin-in text-white text-3xl"></i>
                </div>
              </div>
              <div className="search-bar w-2/3 flex rounded-full overflow-hidden shadow-lg border border-gray-300 focus-within:border-[hsl(var(--linux-blue))]">
                <input
                  type="text"
                  placeholder="Search or enter address"
                  className="flex-1 px-5 py-3 outline-none"
                  onChange={handleUrlChange}
                  onKeyDown={handleUrlKeyDown}
                />
                <div 
                  className="bg-[hsl(var(--linux-blue))] text-white px-6 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors"
                  onClick={() => navigateTo(url)}
                >
                  <i className="fas fa-search"></i>
                </div>
              </div>
            </div>
          )}

          {url && (
            <iframe
              ref={iframeRef}
              src={url}
              className="w-full h-full border-none"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
              onLoad={() => setIsLoading(false)}
            />
          )}
        </div>
      </div>
    </Window>
  );
};

export default BrowserWindow;