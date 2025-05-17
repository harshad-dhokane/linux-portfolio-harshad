import { useState, useRef, useEffect } from "react";
import { useDesktop } from "@/context/DesktopContext";
import Window from "./Window";
import { getTerminalResponse } from "@/lib/terminal-commands";

const Terminal = () => {
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

  // Auto-scroll to bottom when new commands are added
  useEffect(() => {
    if (terminalOutputRef.current) {
      terminalOutputRef.current.scrollTop = terminalOutputRef.current.scrollHeight;
    }
  }, [commandHistory]);

  // Focus input when terminal is clicked
  useEffect(() => {
    const handleTerminalClick = () => {
      if (isWindowOpen("terminal") && inputRef.current) {
        inputRef.current.focus();
      }
    };

    const terminalElement = document.getElementById("terminal-content");
    if (terminalElement) {
      terminalElement.addEventListener("click", handleTerminalClick);
      return () => {
        terminalElement.removeEventListener("click", handleTerminalClick);
      };
    }
  }, [isWindowOpen]);

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
    
    // Check for terminal close command
    if (response === "__CLOSE_TERMINAL__") {
      setTimeout(() => closeWindow("terminal"), 100);
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
      id="terminal"
      title="harshad@ubuntu: ~/terminal"
      defaultWidth={700}
      defaultHeight={400}
      defaultX={250}
      defaultY={100}
    >
      <div id="terminal-content" className="terminal p-3 overflow-y-auto h-full text-sm">
        <div ref={terminalOutputRef}>
          {commandHistory.map((entry, index) => (
            <div key={index}>
              <div>
                <span className="prompt">harshad@ubuntu:~$</span> {entry.command}
              </div>
              <div dangerouslySetInnerHTML={{ __html: entry.response }}></div>
            </div>
          ))}
        </div>
        <div className="flex items-center mt-2">
          <span className="prompt">harshad@ubuntu:~$</span>
          <input
            ref={inputRef}
            type="text"
            className="bg-transparent text-white outline-none ml-2 w-full"
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
