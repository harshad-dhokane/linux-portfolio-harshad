import { useState, useRef, useEffect } from "react";
import { useDesktop } from "@/context/DesktopContext";
import Window from "./Window";
import { getTerminalResponse } from "@/lib/terminal-commands";

interface TerminalProps {
  id?: string;
  defaultPosition?: {
    x: number;
    y: number;
  };
}

const Terminal = ({ id = "terminal", defaultPosition }: TerminalProps) => {
  const { isWindowOpen, openWindow, closeWindow } = useDesktop();
  const [commandHistory, setCommandHistory] = useState<{ command: string; response: string }[]>([
    {
      command: "neofetch",
      response: `
          .-/+oossssoo+/-.               harshad@ubuntu
       \`:+ssssssssssssssssss+:\`           ----------------
     -+ssssssssssssssssssyyssss+-         OS: Ubuntu 22.04 LTS
   .ossssssssssssssssss dMMMNysssso.      Host: Developer Machine
  /ssssssssssshdmmNNmmyNMMMMhssssss/      Kernel: 5.15.0-58-generic
 +ssssssssshmydMMMMMMMNddddyssssssss+     Uptime: 3 hours, 42 mins
/sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Packages: 1843
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Shell: bash 5.1.16
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Resolution: 1920x1080
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   DE: GNOME 42.0
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   WM: Mutter
+sssshhhyNMMNyssssssssssssyNMMMysssssss+   WM Theme: Adwaita
.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Theme: Yaru [GTK2/3]
/sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    Icons: Yaru [GTK2/3]
 +sssssssssdmydMMMMMMMMddddyssssssss+     Terminal: gnome-terminal
  /ssssssssssshdmNNNNmyNMMMMhssssss/      CPU: Intel i7-10700K @ 3.80GHz
   .ossssssssssssssssss dMMMNysssso.      GPU: NVIDIA GeForce RTX 3070
     -+sssssssssssssssssyyyssss+-         Memory: 5012MiB / 16000MiB
       \`:+ssssssssssssssssss+:\`
          .-/+oossssoo+/-.
      `,
    },
    {
      command: "ls -la",
      response: `<div class="text-blue-300">Projects/  Resume/  Certificates/  Skills.txt  Experience.txt  GitHub/  LinkedIn/</div>`,
    },
    {
      command: "help",
      response: `
        <div class="mt-2">
          Available commands:
          <ul class="text-gray-300 ml-4">
            <li>ls - List files</li>
            <li>cd - Change directory (cd directory_name opens the corresponding window)</li>
            <li>cat - Display file contents</li>
            <li>clear - Clear terminal</li>
            <li>neofetch - Display system info</li>
            <li>open - Open a window (e.g., open resume)</li>
            <li>help - Show this help</li>
            <li>exit - Close terminal</li>
          </ul>
        </div>
      `,
    },
  ]);
  
  const [currentInput, setCurrentInput] = useState("");
  const terminalOutputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Enhanced auto-scroll to keep latest commands always visible
  useEffect(() => {
    const scrollToBottom = () => {
      if (terminalOutputRef.current) {
        // Force scroll to bottom to ensure latest command is visible
        terminalOutputRef.current.scrollTo({
          top: terminalOutputRef.current.scrollHeight,
          behavior: 'auto'
        });
        
        // Additional scroll after render to ensure complete visibility
        setTimeout(() => {
          if (terminalOutputRef.current) {
            terminalOutputRef.current.scrollTo({
              top: terminalOutputRef.current.scrollHeight,
              behavior: 'auto'
            });
          }
        }, 0);
        
        // One more check after all animations and renders complete
        setTimeout(() => {
          if (terminalOutputRef.current) {
            terminalOutputRef.current.scrollTo({
              top: terminalOutputRef.current.scrollHeight,
              behavior: 'auto'
            });
          }
        }, 100);
      }
    };
    
    // Run scroll to bottom whenever command history changes
    scrollToBottom();
    
    // Add a mutation observer to watch for content changes in the terminal output
    const observer = new MutationObserver(scrollToBottom);
    
    if (terminalOutputRef.current) {
      observer.observe(terminalOutputRef.current, {
        childList: true,
        subtree: true,
        characterData: true
      });
    }
    
    // Also handle when terminal window is resized
    const resizeObserver = new ResizeObserver(scrollToBottom);
    
    if (terminalOutputRef.current) {
      resizeObserver.observe(terminalOutputRef.current);
    }
    
    return () => {
      if (terminalOutputRef.current) {
        observer.disconnect();
        resizeObserver.unobserve(terminalOutputRef.current);
      }
    };
  }, [commandHistory]);

  // Focus input when terminal is clicked
  useEffect(() => {
    const handleTerminalClick = () => {
      if (isWindowOpen(id) && inputRef.current) {
        inputRef.current.focus();
      }
    };

    // Use the dynamic id to find the correct terminal element
    const terminalElement = document.querySelector(`#${id} .terminal`);
    if (terminalElement) {
      terminalElement.addEventListener("click", handleTerminalClick);
      return () => {
        terminalElement.removeEventListener("click", handleTerminalClick);
      };
    }
  }, [isWindowOpen, id]);
  
  // Check if this is a new terminal instance that should use stored position
  useEffect(() => {
    if (id !== 'terminal' && !defaultPosition) {
      try {
        const positionData = sessionStorage.getItem('newTerminalPosition');
        if (positionData) {
          const position = JSON.parse(positionData);
          // We're applying the position directly to the terminal window
          const terminalWindow = document.getElementById(id);
          if (terminalWindow && position && position.x && position.y) {
            // Apply position with a transform to ensure it's visible
            terminalWindow.style.transform = `translate(${position.x}px, ${position.y}px)`;
            // Since we've used the position data, clear it from sessionStorage
            sessionStorage.removeItem('newTerminalPosition');
          }
        }
      } catch (err) {
        console.error('Error reading terminal position data', err);
      }
    }
  }, [id, defaultPosition]);

  // Helper function to handle special commands
  const handleSpecialCommands = (response: string): string => {
    // Check for window opening command
    if (response.startsWith("__OPEN_WINDOW__")) {
      const windowId = response.replace("__OPEN_WINDOW__", "").trim();
      
      // External links
      if (windowId === "github") {
        openWindow("browser");
        sessionStorage.setItem("browserUrl", "https://github.com/harshad-dhokane/");
        return "Opening GitHub in browser...";
      }
      if (windowId === "linkedin") {
        openWindow("browser");
        sessionStorage.setItem("browserUrl", "https://www.linkedin.com/in/harshad-dhokane/");
        return "Opening LinkedIn in browser...";
      }
      
      // Internal windows
      if (windowId) {
        setTimeout(() => openWindow(windowId), 100);
        return `Opening ${windowId}...`;
      }
      return "No window specified";
    }
    
    // Check for new terminal command
    if (response === "__NEW_TERMINAL__") {
      // Create a new terminal instance at an offset position from the current one
      const randomId = Math.floor(Math.random() * 1000);
      const newTerminalId = `terminal-${randomId}`;
      
      // Get current terminal position to offset the new one
      const currentPos = document.getElementById(id)?.getBoundingClientRect();
      
      setTimeout(() => {
        // Open a new terminal with a unique ID and slightly offset position
        const newX = (currentPos?.left || 50) + 50;
        const newY = (currentPos?.top || 50) + 50;
        
        // Use sessionStorage to pass position data to the new terminal
        sessionStorage.setItem('newTerminalPosition', JSON.stringify({x: newX, y: newY}));
        
        // Dispatch custom event to notify Desktop component about the new terminal
        const newTerminalEvent = new CustomEvent('new-terminal-created', {
          detail: { id: newTerminalId }
        });
        window.dispatchEvent(newTerminalEvent);
        
        // Open the new terminal window
        openWindow(newTerminalId);
      }, 100);
      
      return "Opening new terminal...";
    }
    
    // Check for terminal close command
    if (response === "__CLOSE_TERMINAL__") {
      setTimeout(() => closeWindow(id), 100);
      return "Closing terminal...";
    }
    
    // If no special command, return the original response
    return response;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      
      const command = currentInput.trim();
      if (!command) return;
      
      // Special handling for 'clear' command
      if (command.toLowerCase() === "clear") {
        setCommandHistory([]);
        setCurrentInput("");
        return;
      }
      
      // Get response to command
      let response = getTerminalResponse(command);
      
      // Process special commands
      response = handleSpecialCommands(response);
      
      // Add command to history
      setCommandHistory((prev) => [
        ...prev,
        { command, response },
      ]);
      
      // Clear input
      setCurrentInput("");
    }
  };

  return (
    <Window
      id={id}
      title={`harshad@ubuntu: ~/${id}`}
      defaultWidth={700}
      defaultHeight={400}
      defaultX={defaultPosition?.x}
      defaultY={defaultPosition?.y}
    >
      <div 
        className="terminal p-3 overflow-y-auto h-full text-sm bg-black/60 backdrop-blur-md"
        style={{
          backgroundImage: 'linear-gradient(45deg, rgba(30, 30, 30, 0.6), rgba(15, 15, 15, 0.7))',
          boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.2)'
        }}
      >
        <div ref={terminalOutputRef}>
          {commandHistory.map((entry, index) => (
            <div key={index} className="mb-2">
              <div>
                <span className="text-green-400 font-mono">harshad@ubuntu:~$</span> <span className="text-white">{entry.command}</span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: entry.response }}></div>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <span className="text-green-400 font-mono">harshad@ubuntu:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent text-white outline-none ml-2 w-full font-mono"
            value={currentInput}
            onChange={(e) => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
      </div>
    </Window>
  );
};

export default Terminal;
