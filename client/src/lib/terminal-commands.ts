
export const fileSystem = {
  name: "Home",
  type: "folder",
  children: [
    {
      name: "Projects",
      type: "folder",
      children: [
        {
          name: "Internly",
          type: "file",
          icon: "fas fa-file-code",
          content: "Internship tracking platform..."
        },
        {
          name: "College Suggestion Bot",
          type: "file",
          icon: "fas fa-file-code",
          content: "AI-powered chatbot..."
        },
        {
          name: "AI Image Recognition",
          type: "file",
          icon: "fas fa-file-code",
          content: "Image recognition system..."
        },
        {
          name: "NLP-Based Chatbot",
          type: "file",
          icon: "fas fa-file-code",
          content: "Natural language processing chatbot..."
        }
      ]
    },
    {
      name: "Education",
      type: "folder",
      children: [
        {
          name: "MSc Computer Science",
          type: "file",
          content: "Master's degree details..."
        },
        {
          name: "BSc Computer Science",
          type: "file",
          content: "Bachelor's degree details..."
        },
        {
          name: "HSC Science",
          type: "file",
          content: "Higher secondary education..."
        }
      ]
    },
    {
      name: "Experience",
      type: "folder",
      children: [
        {
          name: "Canspirit.ai",
          type: "file",
          content: "Software Development Intern..."
        },
        {
          name: "CodeSoft",
          type: "file",
          content: "AI & Software Development Intern..."
        }
      ]
    },
    {
      name: "Skills",
      type: "folder",
      children: [
        {
          name: "Programming",
          type: "file",
          content: "Programming skills..."
        },
        {
          name: "Web Development",
          type: "file",
          content: "Web development skills..."
        },
        {
          name: "AI & ML",
          type: "file",
          content: "AI and ML skills..."
        },
        {
          name: "DevOps & Databases",
          type: "file",
          content: "DevOps and Database skills..."
        }
      ]
    },
    {
      name: "Certificates",
      type: "folder",
      children: [
        {
          name: "AI Fundamentals",
          type: "file",
          content: "AI certification..."
        },
        {
          name: "Full Stack Web Development",
          type: "file",
          content: "Web development certification..."
        },
        {
          name: "Database Management & SQL",
          type: "file",
          content: "Database certification..."
        }
      ]
    }
  ]
};

export let currentDirectory = fileSystem;
export let currentPath = ["Home"];

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
      const children = currentDirectory.children || [];
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
        currentDirectory = fileSystem;
        currentPath = ["Home"];
        return "Changed to home directory";
      }

      if (commands[1] === "..") {
        if (currentPath.length > 1) {
          currentPath.pop();
          let temp = fileSystem;
          for (const dir of currentPath.slice(1)) {
            const found = temp.children?.find(item => item.name === dir && item.type === "folder");
            if (found) {
              temp = found;
            }
          }
          currentDirectory = temp;
          return `Changed directory to ${currentPath.join("/")}`;
        }
        return "Already at root directory";
      }

      const targetDir = currentDirectory.children?.find(
        item => item.name === commands[1] && item.type === "folder"
      );

      if (!targetDir) {
        return `bash: cd: ${commands[1]}: No such directory`;
      }

      currentDirectory = targetDir;
      currentPath.push(targetDir.name);
      return `Changed directory to ${currentPath.join("/")}`;

    case "pwd":
      return currentPath.join("/");

    case "cat":
      if (!commands[1]) {
        return "Usage: cat <filename>";
      }

      const file = currentDirectory.children?.find(
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
