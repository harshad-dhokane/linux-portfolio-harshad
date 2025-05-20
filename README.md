# 🐧 Linux Portfolio Design

A modern, interactive portfolio website designed with a Linux desktop environment theme. This project offers a unique and engaging way to showcase your skills, projects, and experience through a familiar desktop interface.

---

## ✨ Features

- 🖥️ **Interactive Linux Desktop Environment** – Complete with windows, taskbar, and desktop icons  
- 🪟 **Window Management** – Drag, resize, minimize, maximize, and close windows  
- 🧩 **Multiple Portfolio Sections** – About, Projects, Skills, Experience, and Resume  
- 💻 **Terminal Emulator** – Functional terminal with custom commands  
- 🗂️ **File Manager** – Browse through project files and documents  
- 🎨 **Settings Panel** – Customize wallpapers and theme colors  
- 🖱️ **Context Menus** – Right-click functionality on desktop and icons  
- 📱 **Responsive Design** – Adapts seamlessly to all screen sizes  

---

## 🚀 Demo

🔗 [View Live Demo](#) <!-- Replace with your live URL -->

---

## 🧰 Technologies Used

### Frontend
- React with TypeScript
- Tailwind CSS
- Radix UI Components
- React-Rnd (for window resizing)
- Framer Motion (for animations)

### Backend
- Node.js with Express
- TypeScript
- Drizzle ORM

---

## ⚙️ Getting Started

### ✅ Prerequisites

- Node.js (v16 or higher)
- npm or yarn


## 🚀 Installation

Clone the repository:

```bash
git clone https://github.com/harshad-dhokane/linux-portfolio-harshad.git
cd linux-portfolio-harshad
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to:  
[http://localhost:5173](http://localhost:5173)

---

## 📦 Building for Production

```bash
cd linux-portfolio-harshad
npm run build
```

The build files will be located in the `dist/` directory.

---

## 📁 Project Structure

```plaintext
linux-portfolio-harshad/
├── client/                # Frontend React application
│   ├── src/
│   │   ├── components/    # UI components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Utility functions
│   │   ├── pages/         # Page components
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Entry point
│   └── index.html         # HTML template
├── server/                # Backend Express server
│   ├── index.ts           # Server entry point
│   ├── routes.ts          # API routes
│   └── storage.ts         # Data storage utilities
├── shared/                # Shared code between client and server
│   └── schema.ts          # Database schema
└── package.json           # Project dependencies and scripts
```

---

## 🧩 UI Components

- **Desktop**: Main container for desktop elements  
- **Window**: Draggable and resizable window component  
- **AppDock**: Taskbar with application shortcuts  
- **DesktopIcons**: Interactive desktop icons  
- **ContextMenu**: Right-click actions  
- **Terminal**: Interactive CLI emulator  
- **FileManager**: Visual file browser  
- **SettingsWindow**: Customize themes and appearance  

---

## 🎨 Customization

### Personal Info

Update your personal details in the `client/src/data/` directory:

- `about.ts` – Bio and personal information  
- `projects.ts` – Portfolio projects  
- `skills.ts` – Technical skills  
- `experience.ts` – Work experience  

### Wallpapers

Add custom images to:

```
client/src/assets/wallpapers/
```

Then update the `wallpapers.ts` file.

### Theme Colors

Modify `tailwind.config.ts` to change the theme colors.

---

## 🚢 Deployment

### 📄 GitHub Pages

Update `vite.config.ts`:

```ts
export default defineConfig({
  base: '/linux-portfolio-harshad/', // Replace with your repo name
})
```

Add a deploy script to `package.json`:

```json
"scripts": {
  "deploy": "npm run build && gh-pages -d dist"
}
```

Install `gh-pages`:

```bash
npm install --save-dev gh-pages
```

Deploy:

```bash
npm run deploy
```

---

### ▲ Vercel

Install CLI:

```bash
npm install -g vercel
```

Deploy:

```bash
vercel
```

---

### 🌍 Netlify

Install CLI:

```bash
npm install -g netlify-cli
```

Deploy:

```bash
netlify deploy
```

---

## 🤝 Contributing

1. Fork the repository  
2. Create your feature branch:  
   ```bash
   git checkout -b feature/amazing-feature
   ```  
3. Commit your changes:  
   ```bash
   git commit -m 'Add some amazing feature'
   ```  
4. Push to the branch:  
   ```bash
   git push origin feature/amazing-feature
   ```  
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 🙏 Acknowledgments

- Inspired by real Linux desktop environments  
- Built with ❤️ using React and modern web technologies  
- Special thanks to all contributors!
