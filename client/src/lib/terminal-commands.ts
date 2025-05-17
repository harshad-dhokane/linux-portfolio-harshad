
import { fileSystem } from '../components/FileManager';

export let currentDirectory = fileSystem;
export let currentPath = ["Home"];

const formatPermissions = (type: string) => {
  return type === "folder" ? "drwxr-xr-x" : "-rw-r--r--";
};

const formatFileSize = (size: string | undefined) => {
  return size || "-";
};

const formatDate = (date: string | undefined) => {
  return date || new Date().toLocaleString();
};

const getFormattedListing = (files: any[], detailed: boolean) => {
  if (detailed) {
    return files.map(file => {
      const type = file.type === "folder" ? "d" : "-";
      const perms = "rwxr-xr-x";
      const size = formatFileSize(file.size);
      const date = formatDate(file.modified);
      return `<div class="mb-1">${type}${perms} harshad harshad ${size.padEnd(8)} ${date.padEnd(12)} <span class="text-${file.type === 'folder' ? 'blue' : 'green'}-400">${file.name}</span></div>`;
    }).join('\n');
  }
  
  return files.map(file => (
    `<span class="mr-4 text-${file.type === 'folder' ? 'blue' : 'green'}-400">${file.type === 'folder' ? '📁' : '📄'} ${file.name}</span>`
  )).join(' ');
};

export const getTerminalResponse = (command: string): string => {
  const commands = command.trim().split(/\s+/);
  const cmd = commands[0].toLowerCase();

  switch (cmd) {
    case "ls":
      if (!currentDirectory.children) {
        return "Directory is empty";
      }
      
      const hasDetailFlag = commands.includes("-l") || commands.includes("-la") || commands.includes("-al");
      if (hasDetailFlag) {
        return currentDirectory.children.map(file => {
          const perms = formatPermissions(file.type);
          const size = formatFileSize(file.size);
          const date = formatDate(file.modified);
          return `${perms} harshad harshad ${size.padEnd(8)} ${date} ${file.name}${file.type === 'folder' ? '/' : ''}`;
        }).join('\n');
      }
      
      return currentDirectory.children.map(file => 
        `${file.type === 'folder' ? '📁' : '📄'} ${file.name}${file.type === 'folder' ? '/' : ''}`
      ).join('  ');

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

      const targetPath = commands[1].split("/").filter(Boolean);
      let newDirectory = currentDirectory;
      let newPath = [...currentPath];
      
      for (const part of targetPath) {
        if (part === "..") {
          if (newPath.length > 1) {
            newPath.pop();
            newDirectory = fileSystem;
            for (const dir of newPath.slice(1)) {
              const found = newDirectory.children?.find(item => item.name === dir && item.type === "folder");
              if (found) {
                newDirectory = found;
              }
            }
          }
        } else {
          const found = newDirectory.children?.find(item => 
            item.name === part && item.type === "folder"
          );
          if (!found) {
            return `bash: cd: ${commands[1]}: No such directory`;
          }
          newDirectory = found;
          newPath.push(part);
        }
      }
      
      currentDirectory = newDirectory;
      currentPath = newPath;
      return `Changed directory to ${currentPath.join("/")}`;

    case "pwd":
      return currentPath.join("/");

    case "cat":
      if (!commands[1]) {
        return "Usage: cat <filename>";
      }

      const file = currentDirectory.children?.find(item =>
        item.name.toLowerCase() === commands[1].toLowerCase() && item.type === "file"
      );

      if (file) {
        return file.content || "File is empty";
      }

      return `cat: ${commands[1]}: No such file`;

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

    case "neofetch":
      return `
      <pre class="text-[hsl(var(--linux-green))] mt-2">
          .-/+oossssoo+/-.               harshad@ubuntu
       \`:+ssssssssssssssssss+:\`           ----------------
     -+ssssssssssssssssssyyssss+-         OS: Ubuntu 22.04 LTS
   .ossssssssssssssssss dMMMNysssso.      Host: Developer Machine
  /ssssssssssshdmmNNmmyNMMMMhssssss/      Kernel: 5.15.0-58-generic
 +ssssssssshmydMMMMMMMNddddyssssssss+     Uptime: 3 hours, 42 mins
/sssssssshNMMMyhhyyyyhmNMMMNhssssssss/    PWD: ${currentPath.join("/")}
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
      </pre>
      `;

    case "exit":
      return "__CLOSE_TERMINAL__";

    default:
      return `bash: ${cmd}: command not found`;
  }
};
