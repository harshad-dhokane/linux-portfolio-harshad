
import { useState, useEffect, useRef } from "react";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";

const BrowserWindow = () => {
  const { openWindow } = useDesktop();
  const [tabs, setTabs] = useState([{ id: '1', title: 'New Tab', url: '' }]);
  const [activeTabId, setActiveTabId] = useState('1');
  const [isLoading, setIsLoading] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const activeTab = tabs.find(tab => tab.id === activeTabId) || tabs[0];

  useEffect(() => {
    const storedUrl = sessionStorage.getItem("browserUrl");
    if (storedUrl) {
      navigateTo(storedUrl);
      sessionStorage.removeItem("browserUrl");
    }
  }, []);

  const addNewTab = () => {
    const newTab = {
      id: String(tabs.length + 1),
      title: 'New Tab',
      url: ''
    };
    setTabs([...tabs, newTab]);
    setActiveTabId(newTab.id);
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
    }
  };

  const navigateToSocialProfile = (type: 'github' | 'linkedin') => {
    const { openWindow } = useDesktop();
    openWindow(type === 'github' ? 'GithubProfile' : 'LinkedinProfile');
  };

  const processUrl = (inputUrl: string) => {
    if (!inputUrl) return '';
    
    // Check if it's a search query (contains spaces or no dots)
    if (!inputUrl.includes('.') || inputUrl.includes(' ')) {
      return `https://www.google.com/search?q=${encodeURIComponent(inputUrl)}`;
    }
    
    // Handle URLs without protocol
    if (!inputUrl.startsWith('http://') && !inputUrl.startsWith('https://')) {
      return `https://${inputUrl}`;
    }
    
    return inputUrl;
  };

  const navigateTo = (url: string) => {
    const processedUrl = processUrl(url);
    const updatedTabs = tabs.map(tab =>
      tab.id === activeTabId
        ? { ...tab, url: processedUrl, title: url }
        : tab
    );
    setTabs(updatedTabs);
    setIsLoading(true);
  };

  const handleUrlSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements.namedItem('url') as HTMLInputElement;
    navigateTo(input.value);
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
            {tabs.map(tab => (
              <div
                key={tab.id}
                className={`browser-tab px-3 py-1 rounded-t text-white flex items-center cursor-pointer ${
                  tab.id === activeTabId ? 'active-tab' : 'bg-[#42414D]'
                }`}
                onClick={() => setActiveTabId(tab.id)}
              >
                <span className="tab-title">{tab.title || 'New Tab'}</span>
                <i
                  className="fas fa-times ml-2 text-xs opacity-60 hover:opacity-100"
                  onClick={(e) => closeTab(tab.id, e)}
                ></i>
              </div>
            ))}
            <div
              className="w-6 h-6 rounded-full bg-[#4A4A4F] hover:bg-[#5C5C61] flex items-center justify-center cursor-pointer transition-colors"
              onClick={addNewTab}
            >
              <i className="fas fa-plus text-white text-xs"></i>
            </div>
          </div>
          <form onSubmit={handleUrlSubmit} className="flex bg-[#42414D] rounded-md p-1 mb-2 items-center">
            <div className="flex-1 bg-[#1C1B22] hover:bg-[#2A2A2E] rounded px-3 py-1 flex items-center transition-colors">
              <i className="fas fa-search text-gray-400 text-xs mr-2"></i>
              <input
                type="text"
                name="url"
                className="bg-transparent text-white outline-none w-full"
                defaultValue={activeTab.url}
                placeholder="Search or enter address"
              />
            </div>
          </form>
        </div>

        <div className="bg-white h-full overflow-hidden relative">
          {isLoading && (
            <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center z-10">
              <div className="flex flex-col items-center">
                <i className="fas fa-circle-notch fa-spin text-[hsl(var(--linux-blue))] text-4xl"></i>
                <p className="mt-4 text-gray-600">Loading {activeTab.title}...</p>
              </div>
            </div>
          )}

          {!activeTab.url && (
            <div className="flex flex-col items-center h-full pt-16 overflow-y-auto">
              <div className="w-32 h-32 mb-8">
                <i className="fab fa-firefox text-8xl text-orange-500"></i>
              </div>
              <div className="search-bar w-2/3 flex rounded-full overflow-hidden shadow-lg border border-gray-300 focus-within:border-[hsl(var(--linux-blue))]">
                <input
                  type="text"
                  placeholder="Search or enter address"
                  className="flex-1 px-5 py-3 outline-none"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      navigateTo(e.currentTarget.value);
                    }
                  }}
                />
                <div className="bg-[hsl(var(--linux-blue))] text-white px-6 flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
                  <i className="fas fa-search"></i>
                </div>
              </div>

              <div className="mt-12 grid grid-cols-2 gap-8">
                <div
                  className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => navigateToSocialProfile('github')}
                >
                  <div className="w-16 h-16 bg-gray-800 rounded-lg flex items-center justify-center mb-2">
                    <i className="fab fa-github text-white text-3xl"></i>
                  </div>
                  <span className="text-gray-600">GitHub</span>
                </div>
                <div
                  className="flex flex-col items-center cursor-pointer hover:opacity-80 transition-opacity"
                  onClick={() => navigateToSocialProfile('linkedin')}
                >
                  <div className="w-16 h-16 bg-blue-600 rounded-lg flex items-center justify-center mb-2">
                    <i className="fab fa-linkedin-in text-white text-3xl"></i>
                  </div>
                  <span className="text-gray-600">LinkedIn</span>
                </div>
              </div>
            </div>
          )}

          {activeTab.url && (
            <iframe
              ref={iframeRef}
              src={activeTab.url}
              className="w-full h-full border-none"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-top-navigation"
              onLoad={() => setIsLoading(false)}
            />
          )}
        </div>
      </div>
    </Window>
  );
};

export default BrowserWindow;
