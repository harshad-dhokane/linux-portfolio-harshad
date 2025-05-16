import Window from "./Window";

const ProjectsWindow = () => {
  return (
    <Window
      id="projects"
      title="Projects - Harshad Dhokane"
      defaultWidth={800}
      defaultHeight={500}
      defaultX={250}
      defaultY={120}
    >
      <div className="bg-gray-800 text-white p-6 overflow-y-auto h-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Projects Portfolio</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-lg overflow-hidden">
            <div className="h-40 bg-[hsl(var(--linux-blue))] flex items-center justify-center">
              <i className="fas fa-laptop-code text-5xl text-white"></i>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">Internly - Internship Tracking Application</h3>
              <div className="flex space-x-2 mt-2 mb-3">
                <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">React</span>
                <span className="text-xs bg-gray-600 px-2 py-1 rounded-full">TypeScript</span>
                <span className="text-xs bg-cyan-600 px-2 py-1 rounded-full">Tailwind</span>
              </div>
              <p className="text-sm text-gray-300">
                A full-stack internship tracking platform for logging activities, tracking progress and documenting skills.
              </p>
              <div className="mt-4 flex space-x-3">
                <a
                  href="https://github.com/harshad-dhokane/internly"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--linux-blue))] hover:underline flex items-center"
                >
                  <i className="fab fa-github mr-1"></i> GitHub
                </a>
                <a
                  href="#"
                  className="text-[hsl(var(--linux-blue))] hover:underline flex items-center"
                >
                  <i className="fas fa-external-link-alt mr-1"></i> Live Demo
                </a>
              </div>
            </div>
          </div>

          <div className="glass rounded-lg overflow-hidden">
            <div className="h-40 bg-purple-600 flex items-center justify-center">
              <i className="fas fa-robot text-5xl text-white"></i>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">College Suggestion Bot</h3>
              <div className="flex space-x-2 mt-2 mb-3">
                <span className="text-xs bg-green-600 px-2 py-1 rounded-full">Node.js</span>
                <span className="text-xs bg-yellow-600 px-2 py-1 rounded-full">Express</span>
                <span className="text-xs bg-gray-600 px-2 py-1 rounded-full">MongoDB</span>
              </div>
              <p className="text-sm text-gray-300">
                An AI-powered chatbot that extracts user preferences via NLP to recommend suitable colleges.
              </p>
              <div className="mt-4 flex space-x-3">
                <a
                  href="https://github.com/harshad-dhokane/college-suggestion-bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[hsl(var(--linux-blue))] hover:underline flex items-center"
                >
                  <i className="fab fa-github mr-1"></i> GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="glass rounded-lg overflow-hidden">
            <div className="h-40 bg-green-600 flex items-center justify-center">
              <i className="fas fa-brain text-5xl text-white"></i>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">AI Image Recognition System</h3>
              <div className="flex space-x-2 mt-2 mb-3">
                <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">Python</span>
                <span className="text-xs bg-yellow-600 px-2 py-1 rounded-full">TensorFlow</span>
                <span className="text-xs bg-purple-600 px-2 py-1 rounded-full">CV</span>
              </div>
              <p className="text-sm text-gray-300">
                An image recognition system leveraging deep learning for accurate object detection.
              </p>
              <div className="mt-4 flex space-x-3">
                <a
                  href="#"
                  className="text-[hsl(var(--linux-blue))] hover:underline flex items-center"
                >
                  <i className="fab fa-github mr-1"></i> GitHub
                </a>
              </div>
            </div>
          </div>

          <div className="glass rounded-lg overflow-hidden">
            <div className="h-40 bg-red-600 flex items-center justify-center">
              <i className="fas fa-comment-dots text-5xl text-white"></i>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold">NLP-Based Chatbot</h3>
              <div className="flex space-x-2 mt-2 mb-3">
                <span className="text-xs bg-blue-600 px-2 py-1 rounded-full">Python</span>
                <span className="text-xs bg-purple-600 px-2 py-1 rounded-full">NLP</span>
                <span className="text-xs bg-orange-600 px-2 py-1 rounded-full">NLTK</span>
              </div>
              <p className="text-sm text-gray-300">
                A natural language processing chatbot with advanced text understanding capabilities.
              </p>
              <div className="mt-4 flex space-x-3">
                <a
                  href="#"
                  className="text-[hsl(var(--linux-blue))] hover:underline flex items-center"
                >
                  <i className="fab fa-github mr-1"></i> GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default ProjectsWindow;
