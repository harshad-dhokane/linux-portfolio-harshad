export const getTerminalResponse = (command: string): string => {
  const commands = command.split(" ");
  const cmd = commands[0];

  // Special command for opening windows
  if (cmd === "open-window") {
    return `__OPEN_WINDOW__${commands[1] || ""}`;
  }

  switch (cmd) {
    case "ls":
      // Simulate Linux-style terminal output with fixed width, monospace formatting
      const files = ["Projects/", "Resume/", "Certificates/", "Skills.txt", "Experience.txt", "Education/", "GitHub/", "LinkedIn/", "file-manager/"];
      const hasFlag = commands.includes("-la") || commands.includes("-a") || commands.includes("-l");

      if (hasFlag) {
        // If ls -la or similar flag, format as a detailed list
        return `<div class="font-mono text-blue-300">
          ${files.join(" ")}
        </div>`;
      } else {
        // Standard ls command - column display
        return `<div class="font-mono text-blue-300 grid grid-cols-3 gap-x-6">
          ${files.map(file => `<div class="truncate">${file}</div>`).join('')}
        </div>`;
      }
    case "cd":
      if (!commands[1]) {
        return "Error: Please specify a directory";
      }

      // Check if the directory name is one of our windows
      const windowMappings: Record<string, string> = {
        "resume": "resume",
        "projects": "projects",
        "certificates": "certifications",
        "skills": "skills",
        "experience": "experience",
        "education": "education",
        "github": "github",
        "linkedin": "linkedin",
        "browser": "browser",
        "file-manager": "filemanager",
        "filemanager": "filemanager",
        "settings": "settings",
        "about": "about",
      };

      if (commands[1] === "..") {
        if (currentPath.length > 1) {
          currentPath.pop();
          currentDirectory = fileSystem;
          for (const dir of currentPath.slice(1)) {
            currentDirectory = currentDirectory.children?.find(item => item.name === dir) || currentDirectory;
          }
          return `Changed directory to ${currentPath.join("/")}`;
        }
        return "Already at root directory";
      }

      const targetDir = commands[1].replace("/", "");
      const newDir = currentDirectory.children?.find(item => 
        item.name.toLowerCase() === targetDir.toLowerCase() && item.type === "folder"
      );

      if (newDir) {
        currentDirectory = newDir;
        currentPath.push(newDir.name);
        return `Changed directory to ${currentPath.join("/")}`;
      }

      return `Error: Directory ${commands[1]} not found`;
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

      const targetFile = currentDirectory.children?.find(item =>
        item.name.toLowerCase() === commands[1].toLowerCase() && item.type === "file"
      );

      if (targetFile) {
        return `File contents of ${targetFile.name}:\n${targetFile.content || "No content available"}`;
      }

      return `Error: File ${commands[1]} not found in current directory`;

    case "new-terminal":
      return "__NEW_TERMINAL__";
    case "cat":
      if (commands[1] === "Projects.txt") {
        return `
          <div class="mt-2">
            1. Internly - Internship Tracking Application<br>
            2. College Suggestion Bot<br>
            3. AI Image Recognition System<br>
            4. NLP-Based Chatbot
          </div>
        `;
      } else if (commands[1] === "Resume.txt") {
        return `
          <div class="mt-2">
            Name: Harshad Dhokane<br>
            Email: work.harshad@gmail.com<br>
            GitHub: github.com/harshad-dhokane<br>
            LinkedIn: linkedin.com/in/harshad-dhokane/
          </div>
        `;
      } else if (commands[1] === "Skills.txt") {
        return `
          <div class="mt-2">
            • Programming: Python, Java, C, JavaScript<br>
            • Web Development: Node.js, React.js, Express.js, HTML5, CSS3, PHP, TypeScript<br>
            • AI & Machine Learning: TensorFlow, Scikit-Learn, Pandas, NumPy, Django, Node.js, Google Colab<br>
            • DevOps: Git, GitHub, CI/CD Pipelines, Vercel<br>
            • Databases: PostgreSQL, MongoDB, Vector DB (Basic)<br>
            • Soft Skills: Problem-Solving, Adaptability, Leadership, Technical Communication
          </div>
        `;
      } else if (commands[1] === "Experience.txt") {
        return `
          <div class="mt-2">
            1. Software Development Intern – Canspirit.ai (April 2025 – June 2025)<br>
            2. AI & Software Development Intern – CodeSoft (Aug 2024 - Sept 2024)
          </div>
        `;
      } else if (commands[1] === "Certificates.txt") {
        return `
          <div class="mt-2">
            1. Artificial Intelligence Fundamentals – IBM<br>
            2. Full Stack Web Development – Udemy<br>
            3. Database Management & SQL – Coursera
          </div>
        `;
      } else {
        return `Error: File ${commands[1]} not found.`;
      }
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
    default:
      return `Error: ${cmd}: command not found`;
  }
};