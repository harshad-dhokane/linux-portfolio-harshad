import { useState, useRef, useEffect } from "react";
import { useDesktop } from "@/context/DesktopContext";
import Window from "./Window";
import { getTerminalResponse } from "@/lib/terminal-commands";

const Terminal = () => {
  const { isWindowOpen } = useDesktop();
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
      response: `<div class="text-blue-300">Projects  Resume  Certificates  Skills  Experience</div>`,
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      
      const command = currentInput.trim();
      if (!command) return;
      
      // Get response to command
      const response = getTerminalResponse(command);
      
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
