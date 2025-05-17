// File system state
const currentPath: string[] = ["Home"];

export const fsState = {
  getCurrentPath: () => currentPath,
  getCurrentDirectory: () => {
    let current = fileSystem;
    for (let i = 1; i < currentPath.length; i++) {
      const dir = current.children?.find(d => d.name === currentPath[i]);
      if (dir && dir.type === "folder") {
        current = dir;
      }
    }
    return current;
  }
};

export const fileSystem = {
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
          content: `Your existing Internly content`
        },
        {
          name: "College Suggestion Bot",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "850 KB",
          modified: "October 2024",
          content: `Your existing College Bot content`
        }
      ]
    },
    {
      name: "Skills",
      type: "folder",
      icon: "fas fa-folder",
      color: "text-yellow-500",
      children: [
        {
          name: "Programming",
          type: "file",
          icon: "fas fa-code",
          color: "text-purple-500",
          size: "145 KB",
          modified: "May 2025",
          content: `Your existing Programming skills content`
        },
        {
          name: "Web Development",
          type: "file",
          icon: "fas fa-globe",
          color: "text-blue-500",
          size: "135 KB",
          modified: "May 2025",
          content: `Your existing Web Dev content`
        }
      ]
    },
    {
      name: "Certificates",
      type: "folder",
      icon: "fas fa-folder",
      color: "text-yellow-500",
      children: [
        {
          name: "AI Fundamentals",
          type: "file",
          icon: "fas fa-certificate",
          color: "text-yellow-500",
          size: "115 KB",
          modified: "January 2024",
          content: `Your existing AI cert content`
        },
        {
          name: "Full Stack Development",
          type: "file",
          icon: "fas fa-certificate", 
          color: "text-yellow-500",
          size: "125 KB",
          modified: "October 2023",
          content: `Your existing Full Stack cert content`
        }
      ]
    }
  ]
};

const formatDate = (date: string | undefined) => {
  return date || new Date().toLocaleString();
};

export const getTerminalResponse = (command: string): string => {
  const commands = command.trim().split(/\s+/);
  const cmd = commands[0].toLowerCase();

  switch (cmd) {
    case "open":
      if (!commands[1]) {
        return "Usage: open <window_name>";
      }
      const windowName = commands[1].toLowerCase();
      window.dispatchEvent(new CustomEvent('openWindow', { detail: windowName }));
      return `Opening ${windowName}...`;

    case "ls":
      const children = fsState.getCurrentDirectory().children || [];
      const hasDetailFlag = commands.includes("-l") || commands.includes("-la") || commands.includes("-al");
      
      if (!children.length) {
        return "Directory is empty";
      }

      if (hasDetailFlag) {
        return `<div class="font-mono">${children.map(file => {
          const perms = file.type === "folder" ? "drwxr-xr-x" : "-rw-r--r--";
          const size = file.size || "-";
          const date = formatDate(file.modified);
          return `<div>${perms} user user ${size.padEnd(8)} ${date} <span class="text-${file.type === 'folder' ? 'blue' : 'green'}-400">${file.name}</span></div>`;
        }).join('\n')}</div>`;
      }
      
      return `<div class="flex flex-wrap gap-4">${children.map(file => 
        `<span class="text-${file.type === 'folder' ? 'blue' : 'green'}-400">${file.type === 'folder' ? '📁' : '📄'} ${file.name}</span>`
      ).join(' ')}</div>`;

    case "cd":
      if (!commands[1] || commands[1] === "~") {
        const currentPath: string[] = ["Home"];
        return "Changed to home directory";
      }

      if (commands[1] === "..") {
        const currentPath = fsState.getCurrentPath();
        if (currentPath.length > 1) {
          currentPath.pop();
          return `Changed directory to ${currentPath.join("/")}`;
        }
        return "Already at root directory";
      }

      const targetDir = fsState.getCurrentDirectory().children?.find(
        item => item.name === commands[1] && item.type === "folder"
      );

      if (!targetDir) {
        return `bash: cd: ${commands[1]}: No such directory`;
      }

      currentPath.push(commands[1]);
      return `Changed directory to ${currentPath.join("/")}`;

    case "pwd":
      return currentPath.join("/");

    case "cat":
      if (!commands[1]) {
        return "Usage: cat <filename>";
      }

      const file = fsState.getCurrentDirectory().children?.find(
        item => item.name === commands[1] && item.type === "file"
      );

      if (!file) {
        return `cat: ${commands[1]}: No such file`;
      }

      return file.content || "File is empty";

    case "clear":
      return "";

    case "help":
      return `
        <div class="mt-2">
          Available commands:
          <ul class="text-gray-300 ml-4">
            <li>pwd - Print working directory</li>
            <li>ls - List directory contents</li>
            <li>ls -l - List detailed directory contents</li>
            <li>cd [directory] - Change directory</li>
            <li>cd .. - Go up one directory</li>
            <li>cat [file] - Display file contents</li>
            <li>clear - Clear terminal</li>
            <li>neofetch - Display system info</li>
            <li>help - Show this help</li>
            <li>exit - Close terminal</li>
          </ul>
        </div>
      `;

    case "exit":
      return "__CLOSE_TERMINAL__";

    default:
      return `bash: ${cmd}: command not found`;
  }
};