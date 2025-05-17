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
  initialContent?: string;
  title?: string;
}

const Terminal = ({ id = "terminal", defaultPosition, initialContent, title }: TerminalProps) => {
  const { isWindowOpen, openWindow, closeWindow } = useDesktop();

  // Listen for new terminal window events
  useEffect(() => {
    const handleNewTerminal = (event: CustomEvent) => {
      const { id, initialContent, title } = event.detail;
      openWindow(id);
    };

    window.addEventListener('new-terminal-created', handleNewTerminal as EventListener);
    return () => {
      window.removeEventListener('new-terminal-created', handleNewTerminal as EventListener);
    };
  }, [openWindow]);
  const [commandHistory, setCommandHistory] = useState<{ command: string; response: string }[]>(initialContent ? [
    { command: "", response: initialContent }
  ] : [
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
  const [currentPath, setCurrentPath] = useState<string[]>([]);

  // Completely overhauled terminal scrolling to guarantee the latest commands and output are visible
  useEffect(() => {
    // This function forces the scroll to the bottom, no matter what
    const forceScrollToBottom = () => {
      if (terminalOutputRef.current) {
        // Get the parent container (terminal content container)
        const container = terminalOutputRef.current.parentElement;
        if (container) {
          // Force scroll to absolute bottom
          container.scrollTop = container.scrollHeight;

          // Double-check immediate scroll
          setTimeout(() => {
            if (container) {
              container.scrollTop = container.scrollHeight;
            }
          }, 10);

          // Final check after all rendering is complete
          setTimeout(() => {
            if (container) {
              container.scrollTop = container.scrollHeight;
            }
          }, 100);
        }
      }
    };

    // Run scroll whenever command history changes
    forceScrollToBottom();

    // Track any changes to the DOM inside the terminal
    const observer = new MutationObserver((mutations) => {
      // If there are changes to the DOM, force scroll
      if (mutations.length > 0) {
        forceScrollToBottom();
      }
    });

    // Observe the terminal output for any changes
    if (terminalOutputRef.current) {
      observer.observe(terminalOutputRef.current, {
        childList: true,      // Watch for added/removed elements
        subtree: true,        // Watch the entire subtree
        characterData: true,  // Watch for changes to text content
        attributes: true      // Watch attributes too
      });
    }

    // Also track any resizing of the terminal window
    const resizeObserver = new ResizeObserver(() => {
      forceScrollToBottom();
    });

    // Find the parent window element and observe it
    const terminalWindow = document.getElementById(id)?.parentElement;
    if (terminalWindow) {
      resizeObserver.observe(terminalWindow);
    }

    // Cleanup all observers on unmount
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [commandHistory, id]);

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
                <span className="text-green-400 font-mono">harshad@ubuntu:~/{currentPath.join('/')}$</span> <span className="text-white">{entry.command}</span>
              </div>
              <div 
  className="terminal-response" 
  dangerouslySetInnerHTML={{ 
    __html: entry.response.startsWith('<h2') || entry.response.startsWith('<div') 
      ? `<div class="bg-gray-800 rounded-lg p-4 mt-2">${entry.response}</div>`
      : entry.response 
  }}
></div>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <span className="text-green-400 font-mono">harshad@ubuntu:~/{currentPath.join('/')}$</span>
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