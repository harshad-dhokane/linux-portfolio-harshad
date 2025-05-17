
import { useState, useEffect, useRef } from "react";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";

interface Tab {
  id: string;
  title: string;
  url: string;
}

const BrowserWindow = () => {
  const { openWindow } = useDesktop();
  const [tabs, setTabs] = useState<Tab[]>([{ id: '1', title: 'New Tab', url: '' }]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const quickLinks = [
    { name: 'GitHub', url: 'https://github.com', icon: 'fab fa-github' },
    { name: 'LinkedIn', url: 'https://linkedin.com', icon: 'fab fa-linkedin' },
    { name: 'Google', url: 'https://google.com', icon: 'fab fa-google' },
    { name: 'YouTube', url: 'https://youtube.com', icon: 'fab fa-youtube' },
  ];

  useEffect(() => {
    const storedUrl = sessionStorage.getItem("browserUrl");
    if (storedUrl) {
      navigateTo(storedUrl);
      sessionStorage.removeItem("browserUrl");
    }
  }, []);

  const addNewTab = () => {
    const newId = String(Date.now());
    setTabs([...tabs, { id: newId, title: 'New Tab', url: '' }]);
    setActiveTabId(newId);
    setUrl('');
  };

  const closeTab = (tabId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (tabs.length === 1) return;
    
    const newTabs = tabs.filter(tab => tab.id !== tabId);
    setTabs(newTabs);
    
    if (tabId === activeTabId) {
      const idx = tabs.findIndex(tab => tab.id === tabId);
      const newActiveId = tabs[idx - 1]?.id || tabs[idx + 1]?.id;
      setActiveTabId(newActiveId);
      const newActiveTab = newTabs.find(tab => tab.id === newActiveId);
      setUrl(newActiveTab?.url || '');
    }
  };

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
    if (!inputUrl.includes('.') || inputUrl.includes(' ')) {
      return `https://www.google.com/search?igu=1&q=${encodeURIComponent(inputUrl)}`;
    }
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }
    return inputUrl;
  };

  const navigateTo = (targetUrl: string) => {
    const processedUrl = processUrl(targetUrl);
    setUrl(processedUrl);
    setIsLoading(true);

    setTabs(tabs.map(tab => 
      tab.id === activeTabId 
        ? { ...tab, url: processedUrl } 
        : tab
    ));

    if (historyIndex < history.length - 1) {
      setHistory(prev => [...prev.slice(0, historyIndex + 1), processedUrl]);
    } else {
      setHistory(prev => [...prev, processedUrl]);
    }
    setHistoryIndex(prev => prev + 1);

    try {
      const domain = new URL(processedUrl).hostname.replace('www.', '');
      setTabs(tabs.map(tab =>
        tab.id === activeTabId
          ? { ...tab, title: domain }
          : tab
      ));
    } catch (e) {
      // Keep existing title if URL parsing fails
    }

    setTimeout(() => setIsLoading(false), 1000);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(prev => prev - 1);
      setUrl(history[historyIndex - 1]);
      navigateTo(history[historyIndex - 1]);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(prev => prev + 1);
      setUrl(history[historyIndex + 1]);
      navigateTo(history[historyIndex + 1]);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = iframeRef.current.src;
    }
    setTimeout(() => setIsLoading(false), 1000);
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);

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
          <div className="flex space-x-2 text-sm mb-2 overflow-x-auto">
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`browser-tab px-3 py-1 rounded-t flex items-center cursor-pointer min-w-[120px] max-w-[200px] ${
                  tab.id === activeTabId ? 'bg-[#42414D] text-white' : 'text-gray-300 hover:bg-[#4A4A4F]'
                }`}
                onClick={() => {
                  setActiveTabId(tab.id);
                  setUrl(tab.url);
                }}
              >
                <span className="truncate flex-1">{tab.title}</span>
                <i
                  className="fas fa-times ml-2 text-xs opacity-60 hover:opacity-100"
                  onClick={(e) => closeTab(tab.id, e)}
                ></i>
              </div>
            ))}
            <div
              className="w-6 h-6 rounded-full bg-[#4A4A4F] hover:bg-[#5C5C61] flex items-center justify-center cursor-pointer transition-colors flex-shrink-0"
              onClick={addNewTab}
            >
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
                <p className="mt-4 text-gray-600">Loading {activeTab?.title}...</p>
              </div>
            </div>
          )}

          {!activeTab?.url && (
            <div className="flex flex-col items-center h-full pt-16 overflow-y-auto">
              <div className="w-32 h-32 mb-8">
                <i className="fab fa-firefox text-8xl text-orange-500"></i>
              </div>
              <div className="search-bar w-2/3 flex rounded-full overflow-hidden shadow-lg border border-gray-300 focus-within:border-[hsl(var(--linux-blue))] mb-8">
                <input
                  type="text"
                  placeholder="Search or enter address"
                  className="flex-1 px-5 py-3 outline-none"
                  value={url}
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
              <div className="grid grid-cols-4 gap-6">
                {quickLinks.map((link, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                    onClick={() => navigateTo(link.url)}
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-2">
                      <i className={`${link.icon} text-2xl`}></i>
                    </div>
                    <span className="text-sm text-gray-600">{link.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab?.url && (
            <iframe
              ref={iframeRef}
              src={activeTab.url}
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
