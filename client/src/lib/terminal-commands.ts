import { FileData } from "@/components/FileManager";

// Import the file system structure from FileManager
const fileSystem: FileData = {
  name: "Home",
  type: "folder",
  icon: "fas fa-home",
  color: "text-blue-500",
  children: [
    {
      name: "Projects",
      type: "folder",
      icon: "fas fa-folder",
      color: "text-yellow-500",
      children: [
        {
          name: "Internly",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "1.2 MB",
          modified: "April 2025",
          content: `<h2 class="text-xl font-bold mb-4">Internly - Internship Tracking Application</h2>...`
        },
        {
          name: "College Suggestion Bot",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "850 KB",
          modified: "October 2024",
          content: `<h2 class="text-xl font-bold mb-4">College Suggestion Bot</h2>...`
        },
        {
          name: "AI Image Recognition",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "1.5 MB",
          modified: "September 2024",
          content: `<h2 class="text-xl font-bold mb-4">AI Image Recognition System</h2>...`
        },
        {
          name: "NLP-Based Chatbot",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "980 KB",
          modified: "August 2024",
          content: `<h2 class="text-xl font-bold mb-4">NLP-Based Chatbot</h2>...`
        }
      ]
    }
  ]
};

let currentDirectory = fileSystem;
let currentPath = ["Home"];

const findDirectory = (path: string[]): FileData | null => {
  let current = fileSystem;
  for (const dir of path.slice(1)) {
    const next = current.children?.find(c => c.name === dir);
    if (!next || next.type !== "folder") return null;
    current = next;
  }
  return current;
};

export const getTerminalResponse = (command: string): string => {
  const commands = command.split(" ");
  const cmd = commands[0];
  const currentPathStr = currentPath.join('/');

  switch (cmd) {
    case "ls":
      const files = currentDirectory.children || [];
      const hasFlag = commands.includes("-la") || commands.includes("-a") || commands.includes("-l");

      if (hasFlag) {
        return `<div class="font-mono">
          ${files.map(file => `${file.type === 'folder' ? 'd' : '-'}rwxr-xr-x 1 harshad users ${file.size || '4.0K'} ${file.modified || 'Jan 1'} ${file.name}`).join('\n')}
        </div>`;
      }

      return `<div class="font-mono text-blue-300 grid grid-cols-3 gap-x-6">
        ${files.map(file => `<div class="truncate ${file.color}"><i class="${file.icon} mr-2"></i>${file.name}</div>`).join('')}
      </div>`;

    case "cd":
      if (!commands[1] || commands[1] === "..") {
        if (currentPath.length > 1) {
          currentPath.pop();
          const newDir = findDirectory(currentPath);
          if (newDir) {
            currentDirectory = newDir;
            return `Changed directory to ${currentPath.join('/')}`;
          }
        }
        return "Already at root";
      }

      const targetDir = currentDirectory.children?.find(
        c => c.name.toLowerCase() === commands[1].toLowerCase() && c.type === "folder"
      );

      if (targetDir) {
        currentDirectory = targetDir;
        currentPath.push(targetDir.name);
        return `Changed directory to ${currentPath.join('/')}`;
      }
      return `Directory ${commands[1]} not found`;

    case "cat":
      const file = currentDirectory.children?.find(
        f => f.name.toLowerCase() === commands[1].toLowerCase() && f.type === "file"
      );

      if (file?.content) {
        return file.content;
      }
      return `File ${commands[1]} not found`;

    case "pwd":
      return currentPath.join('/');

    case "open-window":
      return `__OPEN_WINDOW__${commands[1] || ""}`;
    case "clear":
      return ""; // The terminal component will handle this specially
    case "help":
      return `
        <div class="mt-2">
          Available commands:
          <ul class="text-gray-300 ml-4">
            <li>ls - List files</li>
            <li>cd - Change directory (cd directory_name opens the corresponding window)</li>
            <li>cat - Display file contents</li>
            <li>clear - Clear terminal</li>
            <li>neofetch - Display system info</li>
            <li>open - Open a window (e.g., open resume)</li>
            <li>new-terminal - Open a new terminal instance</li>
            <li>help - Show this help</li>
            <li>exit - Close terminal</li>
          </ul>
        </div>
      `;
    case "open":
      if (!commands[1]) {
        return "Error: Please specify what to open";
      }

      const validWindows = ["resume", "projects", "certifications", "terminal", "browser", "github", "linkedin", "skills", "experience", "education", "about", "settings", "filemanager"];
      const windowToOpen = commands[1].toLowerCase();

      if (validWindows.includes(windowToOpen)) {
        return `__OPEN_WINDOW__${windowToOpen}`;
      } else {
        return `Error: Cannot open ${commands[1]}, not a valid application.`;
      }

    case "new-terminal":
      return "__NEW_TERMINAL__";
    case "exit":
      return "__CLOSE_TERMINAL__"; // Special command to close the terminal
    case "neofetch":
      return `
      <pre class="text-[hsl(var(--linux-green))] mt-2">
          .-/+oossssoo+/-.               harshad@ubuntu
       \`:+ssssssssssssssssss+:\`           ----------------
     -+ssssssssssssssssssyyssss+-         OS: Ubuntu 22.04 LTS
   .ossssssssssssssssss dMMMNysssso.      Host: Developer Machine
  /ssssssssssshdmmNNmmyNMMMMhssssss/      Kernel: 5.15.0-58-generic
 +ssssssssshmydMMMMMMMNddddyssssssss+     Uptime: 3 hours, 42 mins
/sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    Packages: 1843
:.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Shell: bash 5.1.16
:+sssshhhyNMMNyssssssssssssyNMMMysssssss+   Resolution: 1920x1080
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   DE: GNOME 42.0
ossyNMMMNyMMhsssssssssssssshmmmhssssssso   WM: Mutter
:+sssshhhyNMMNyssssssssssssyNMMMysssssss+   WM Theme: Adwaita
:.ssssssssdMMMNhsssssssssshNMMMdssssssss.   Theme: Yaru [GTK2/3]
/sssssssshNMMMyhhyyyyhdNMMMNhssssssss/    Icons: Yaru [GTK2/3]
 +sssssssssdmydMMMMMMMMddddyssssssss+     Terminal: gnome-terminal
  /ssssssssssshdmNNNNmyNMMMMhssssss/      CPU: Intel i7-10700K @ 3.80GHz
   .ossssssssssssssssss dMMMNysssso.      GPU: NVIDIA GeForce RTX 3070
     -+sssssssssssssssssyyyssss+-         Memory: 5012MiB / 16000MiB
       \`:+ssssssssssssssssss+:\`
          .-/+oossssoo+/-.
      </pre>
      `;
    default:
      return `Error: ${cmd}: command not found`;
  }
};