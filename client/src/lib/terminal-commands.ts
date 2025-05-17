import { fileSystem } from '../components/FileManager';

export let currentDirectory = fileSystem;
export let currentPath = ["Home"];

export const getTerminalResponse = (command: string): string => {
  const commands = command.split(" ");
  const cmd = commands[0];

  switch (cmd) {
    case "ls":
      const files = currentDirectory.children?.map(item => 
        item.type === "folder" ? `${item.name}/` : item.name
      ) || [];
      const hasFlag = commands.includes("-la") || commands.includes("-a") || commands.includes("-l");

      if (hasFlag) {
        // Detailed list format with icons
        return files.map(file => {
          const isDir = file.endsWith('/');
          const icon = isDir ? "📁" : "📄";
          return `<div class="mb-1"><span class="text-blue-400">${icon} ${file}</span></div>`;
        }).join('');
      } else {
        // Grid format
        return `<div class="grid grid-cols-4 gap-2">
          ${files.map(file => {
            const isDir = file.endsWith('/');
            const icon = isDir ? "📁" : "📄";
            return `<div class="truncate"><span class="text-blue-400">${icon} ${file}</span></div>`;
          }).join('')}
        </div>`;
      }

    case "cd":
      if (!commands[1]) {
        return "Error: Please specify a directory";
      }

      if (commands[1] === "..") {
        if (currentPath.length > 1) {
          currentPath.pop();
          let temp = fileSystem;
          for (const dir of currentPath.slice(1)) {
            temp = temp.children?.find(item => item.name === dir && item.type === "folder") || temp;
          }
          currentDirectory = temp;
          return `Changed directory to ${currentPath.join("/")}`;
        }
        return "Already at root directory";
      }

      const targetDir = commands[1].replace("/", "");
      const newDir = currentDirectory.children?.find(item => 
        item.name.toLowerCase() === targetDir.toLowerCase() && item.type === "folder"
      );

      if (newDir) {
        let temp = {...newDir};
        currentDirectory = temp;
        currentPath.push(newDir.name);
        return `Changed directory to ${currentPath.join("/")}`;
      }

      return `Error: Directory ${commands[1]} not found`;

    case "cat":
      if (!commands[1]) {
        return "Error: Please specify a file";
      }

      const targetFile = currentDirectory.children?.find(item =>
        item.name.toLowerCase() === commands[1].toLowerCase() && item.type === "file"
      );

      if (targetFile) {
        return targetFile.content || "No content available";
      }

      return `Error: File ${commands[1]} not found`;

    case "clear":
      return "";

    case "help":
      return `
        <div class="mt-2">
          Available commands:
          <ul class="text-gray-300 ml-4">
            <li>ls - List files</li>
            <li>ls -la - List files with details</li>
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
      </pre>
      `;

    case "exit":
      return "__CLOSE_TERMINAL__";

    default:
      return `Error: ${cmd}: command not found`;
  }
};