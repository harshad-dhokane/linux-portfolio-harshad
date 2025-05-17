import { useState, useEffect } from "react";
import Window from "./Window";
import { useDesktop } from "@/context/DesktopContext";
import { fsState, fileSystem } from "@/lib/terminal-commands";

// Define file types and their data
interface FileData {
  name: string;
  type: "folder" | "file";
  icon: string;
  color: string;
  content?: string;
  children?: FileData[];
  size?: string;
  modified?: string;
}

export const fileSystem: FileData = {
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
          content: `
              <h2 class="text-xl font-bold mb-4">Internly - Internship Tracking Application</h2>
              <p class="mb-4">A full-stack internship tracking platform for logging activities, tracking progress and documenting skills.</p>

              <h3 class="text-lg font-bold mt-6 mb-2">Technologies Used:</h3>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">React</span>
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">TypeScript</span>
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">Tailwind CSS</span>
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">shadcn-ui</span>
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">Vite</span>
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">React Router</span>
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">Context API</span>
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">Recharts</span>
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">Supabase</span>
              </div>

              <h3 class="text-lg font-bold mt-6 mb-2">Features:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>User authentication and profile management</li>
                <li>Daily activity logging system with rich text editor</li>
                <li>Time tracking and status reporting</li>
                <li>Skills and tools documentation</li>
                <li>Interactive dashboards with progress visualization</li>
                <li>Reporting and export functionality</li>
              </ul>

              <h3 class="text-lg font-bold mt-6 mb-2">Development Highlights:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Implemented responsive design using Tailwind CSS and shadcn-ui components</li>
                <li>Built reusable components with TypeScript for type safety</li>
                <li>Used React Context API for state management</li>
                <li>Integrated Supabase for backend services including authentication and database</li>
                <li>Implemented data visualization using Recharts library</li>
              </ul>

              <div class="mt-6 p-4 bg-gray-800 rounded-lg">
                <div class="flex justify-between">
                  <div>
                    <span class="text-gray-400">GitHub: </span>
                    <a href="#" class="text-blue-400 hover:underline">github.com/harshad-dhokane/internly</a>
                  </div>
                  <div>
                    <span class="text-gray-400">Demo: </span>
                    <span class="text-green-400">Available</span>
                  </div>
                </div>
              </div>
            `
        },
        {
          name: "College Suggestion Bot",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "850 KB",
          modified: "October 2024",
          content: `
              <h2 class="text-xl font-bold mb-4">College Suggestion Bot</h2>
              <p class="mb-4">An AI-powered chatbot that extracts user preferences via NLP to recommend suitable colleges.</p>

              <h3 class="text-lg font-bold mt-6 mb-2">Technologies Used:</h3>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 bg-green-600 text-white rounded text-xs">Node.js</span>
                <span class="px-2 py-1 bg-yellow-600 text-white rounded text-xs">Express</span>
                <span class="px-2 py-1 bg-gray-600 text-white rounded text-xs">MongoDB</span>
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">NLP</span>
                <span class="px-2 py-1 bg-purple-600 text-white rounded text-xs">AI Models</span>
              </div>

              <h3 class="text-lg font-bold mt-6 mb-2">Features:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>AI-powered chatbot interface</li>
                <li>Natural language preference extraction</li>
                <li>College database with detailed information</li>
                <li>Smart matching algorithm</li>
                <li>User preference saving system</li>
              </ul>

              <h3 class="text-lg font-bold mt-6 mb-2">Development Highlights:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Built a full-stack college recommendation system using Node.js and Express</li>
                <li>Implemented an AI-powered chatbot for extracting user preferences via NLP</li>
                <li>Designed a responsive UI with JavaScript</li>
                <li>Created a structured college database covering courses, fees, placements, and accreditations</li>
                <li>Added authentication and user profile saving functionality</li>
              </ul>

              <div class="mt-6 p-4 bg-gray-800 rounded-lg">
                <div class="flex justify-between">
                  <div>
                    <span class="text-gray-400">GitHub: </span>
                    <a href="#" class="text-blue-400 hover:underline">github.com/harshad-dhokane/college-suggestion-bot</a>
                  </div>
                  <div>
                    <span class="text-gray-400">Status: </span>
                    <span class="text-yellow-400">Private Repository</span>
                  </div>
                </div>
              </div>
            `
        },
        {
          name: "AI Image Recognition",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "1.5 MB",
          modified: "September 2024",
          content: `
              <h2 class="text-xl font-bold mb-4">AI Image Recognition System</h2>
              <p class="mb-4">An image recognition system leveraging deep learning for accurate object detection.</p>

              <h3 class="text-lg font-bold mt-6 mb-2">Technologies Used:</h3>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">Python</span>
                <span class="px-2 py-1 bg-yellow-600 text-white rounded text-xs">TensorFlow</span>
                <span class="px-2 py-1 bg-purple-600 text-white rounded text-xs">Computer Vision</span>
                <span class="px-2 py-1 bg-red-600 text-white rounded text-xs">CNN</span>
              </div>

              <h3 class="text-lg font-bold mt-6 mb-2">Features:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Real-time object detection</li>
                <li>Multiple object classification</li>
                <li>High accuracy recognition system</li>
                <li>User-friendly interface</li>
                <li>Performance optimization</li>
              </ul>

              <h3 class="text-lg font-bold mt-6 mb-2">Development Highlights:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Built a convolutional neural network (CNN) model using TensorFlow</li>
                <li>Trained model on a large dataset of images</li>
                <li>Implemented pre-processing techniques to improve accuracy</li>
                <li>Created a user-friendly interface for easy interaction</li>
                <li>Optimized the model for better performance</li>
              </ul>

              <div class="mt-6 p-4 bg-gray-800 rounded-lg">
                <div class="flex justify-between">
                  <div>
                    <span class="text-gray-400">Project Type: </span>
                    <span class="text-blue-400">Academic Research</span>
                  </div>
                  <div>
                    <span class="text-gray-400">Status: </span>
                    <span class="text-green-400">Completed</span>
                  </div>
                </div>
              </div>
            `
        },
        {
          name: "NLP-Based Chatbot",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "980 KB",
          modified: "August 2024",
          content: `
              <h2 class="text-xl font-bold mb-4">NLP-Based Chatbot</h2>
              <p class="mb-4">A natural language processing chatbot with advanced text understanding capabilities.</p>

              <h3 class="text-lg font-bold mt-6 mb-2">Technologies Used:</h3>
              <div class="flex flex-wrap gap-2 mb-4">
                <span class="px-2 py-1 bg-blue-600 text-white rounded text-xs">Python</span>
                <span class="px-2 py-1 bg-purple-600 text-white rounded text-xs">NLP</span>
                <span class="px-2 py-1 bg-orange-600 text-white rounded text-xs">NLTK</span>
                <span class="px-2 py-1 bg-green-600 text-white rounded text-xs">Flask</span>
              </div>

              <h3 class="text-lg font-bold mt-6 mb-2">Features:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Natural language understanding</li>
                <li>Contextual conversation handling</li>
                <li>Entity recognition</li>
                <li>Sentiment analysis</li>
                <li>Integration with external APIs</li>
              </ul>

              <h3 class="text-lg font-bold mt-6 mb-2">Development Highlights:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Built a chatbot using Python and NLTK for natural language processing</li>
                <li>Implemented context management to maintain conversation flow</li>
                <li>Created entity recognition system for extracting key information</li>
                <li>Added sentiment analysis to understand user emotions</li>
                <li>Developed a Flask-based API for easy integration</li>
              </ul>

              <div class="mt-6 p-4 bg-gray-800 rounded-lg">
                <div class="flex justify-between">
                  <div>
                    <span class="text-gray-400">Project Type: </span>
                    <span class="text-blue-400">Internship Project</span>
                  </div>
                  <div>
                    <span class="text-gray-400">Status: </span>
                    <span class="text-green-400">Completed</span>
                  </div>
                </div>
              </div>
            `
        }
      ]
    },
    {
      name: "Resume",
      type: "file",
      icon: "fas fa-file-alt",
      color: "text-blue-500",
      size: "254 KB",
      modified: "May 2025",
      content: ""  // This will open the Resume window
    },
    {
      name: "Education",
      type: "folder",
      icon: "fas fa-folder",
      color: "text-yellow-500",
      children: [
        {
          name: "MSc Computer Science",
          type: "file",
          icon: "fas fa-file-alt",
          color: "text-blue-500",
          size: "128 KB",
          modified: "2024",
          content: `
              <h2 class="text-xl font-bold mb-4">Master of Science in Computer Science</h2>
              <div class="mb-4">
                <p><span class="font-bold">Institution:</span> Nowrosjee Wadia College, Pune</p>
                <p><span class="font-bold">Period:</span> 2024 - 2026</p>
                <p><span class="font-bold">CGPA:</span> 8.1</p>
              </div>

              <h3 class="text-lg font-bold mt-6 mb-2">Key Subjects:</h3>
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-gray-700 p-2 rounded text-sm">Advanced Algorithms</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Machine Learning</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Computer Networks</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Advanced Databases</div>
                <div class="bg-gray-700 p-2 rounded text-sm">AI & Deep Learning</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Cloud Computing</div>
              </div>
            `
        },
        {
          name: "BSc Computer Science",
          type: "file",
          icon: "fas fa-file-alt",
          color: "text-blue-500",
          size: "145 KB",
          modified: "2024",
          content: `
              <h2 class="text-xl font-bold mb-4">Bachelor of Computer Science</h2>
              <div class="mb-4">
                <p><span class="font-bold">Institution:</span> Nowrosjee Wadia College, Pune</p>
                <p><span class="font-bold">University:</span> Savitribai Phule Pune University</p>
                <p><span class="font-bold">Period:</span> 2021 - 2024</p>
                <p><span class="font-bold">CGPA:</span> 8.84</p>
              </div>

              <h3 class="text-lg font-bold mt-6 mb-2">Key Subjects:</h3>
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-gray-700 p-2 rounded text-sm">Data Structures</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Operating Systems</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Database Systems</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Web Development</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Software Engineering</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Computer Networks</div>
              </div>
            `
        },
        {
          name: "HSC Science",
          type: "file",
          icon: "fas fa-file-alt",
          color: "text-blue-500",
          size: "98 KB",
          modified: "2021",
          content: `
              <h2 class="text-xl font-bold mb-4">H.S.C (Science)</h2>
              <div class="mb-4">
                <p><span class="font-bold">Institution:</span> Fergusson College, Pune</p>
                <p><span class="font-bold">Board:</span> Maharashtra State Board</p>
                <p><span class="font-bold">Period:</span> 2020 - 2021</p>
                <p><span class="font-bold">Percentage:</span> 83.50%</p>
              </div>

              <h3 class="text-lg font-bold mt-6 mb-2">Key Subjects:</h3>
              <div class="grid grid-cols-2 gap-2">
                <div class="bg-gray-700 p-2 rounded text-sm">Physics</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Chemistry</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Mathematics</div>
                <div class="bg-gray-700 p-2 rounded text-sm">English</div>
                <div class="bg-gray-700 p-2 rounded text-sm">Computer Science</div>
              </div>
            `
        }
      ]
    },
    {
      name: "Experience",
      type: "folder",
      icon: "fas fa-folder",
      color: "text-yellow-500",
      children: [
        {
          name: "Canspirit.ai",
          type: "file",
          icon: "fas fa-file-alt",
          color: "text-blue-500",
          size: "210 KB",
          modified: "June 2025",
          content: `
              <h2 class="text-xl font-bold mb-4">Software Development Intern – Canspirit.ai</h2>
              <p class="text-gray-400 mb-4">April 2025 – June 2025</p>

              <h3 class="text-lg font-bold mt-4 mb-2">Responsibilities & Achievements:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Worked on a live QR code-based Asset Management System, contributing to both front-end and back-end development.</li>
                <li>Implemented automated deployments with GitHub Actions, improving CI/CD efficiency by 40% and reducing deployment errors by 75%.</li>
                <li>Integrated Supabase as the backend-as-a-service, optimizing PostgreSQL database performance with 30% faster query response times.</li>
                <li>Worked with React and TypeScript to build dynamic front-end components.</li>
              </ul>

              <h3 class="text-lg font-bold mt-6 mb-2">Technologies Used:</h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-blue-800 text-blue-100 rounded-md text-xs">React</span>
                <span class="px-2 py-1 bg-blue-800 text-blue-100 rounded-md text-xs">TypeScript</span>
                <span class="px-2 py-1 bg-blue-800 text-blue-100 rounded-md text-xs">GitHub Actions</span>
                <span class="px-2 py-1 bg-blue-800 text-blue-100 rounded-md text-xs">Supabase</span>
                <span class="px-2 py-1 bg-blue-800 text-blue-100 rounded-md text-xs">PostgreSQL</span>
              </div>
            `
        },
        {
          name: "CodeSoft",
          type: "file",
          icon: "fas fa-file-alt",
          color: "text-blue-500",
          size: "185 KB",
          modified: "September 2024",
          content: `
              <h2 class="text-xl font-bold mb-4">AI & Software Development Intern – CodeSoft</h2>
              <p class="text-gray-400 mb-4">Aug 2024 - Sept 2024</p>

              <h3 class="text-lg font-bold mt-4 mb-2">Responsibilities & Achievements:</h3>
              <ul class="list-disc pl-5 space-y-2">
                <li>Developed AI models for machine learning applications like chatbots, recommendation systems, and image recognition systems with user-friendly interfaces.</li>
                <li>Worked on Natural Language Processing (NLP)-based projects, including data pre-processing, model training, deep learning techniques, and model evaluation.</li>
                <li>Collaborated with a team of 5 developers to implement and optimize machine learning algorithms.</li>
                <li>Created interactive dashboards to visualize model performance and analytics.</li>
              </ul>

              <h3 class="text-lg font-bold mt-6 mb-2">Technologies Used:</h3>
              <div class="flex flex-wrap gap-2">
                <span class="px-2 py-1 bg-purple-800 text-purple-100 rounded-md text-xs">Python</span>
                <span class="px-2 py-1 bg-purple-800 text-purple-100 rounded-md text-xs">TensorFlow</span>
                <span class="px-2 py-1 bg-purple-800 text-purple-100 rounded-md text-xs">scikit-learn</span>
                <span class="px-2 py-1 bg-purple-800 text-purple-100 rounded-md text-xs">NLP</span>
                <span class="px-2 py-1 bg-purple-800 text-purple-100 rounded-md text-xs">Deep Learning</span>
              </div>
            `
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
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "145 KB",
          modified: "May 2025",
          content: `
              <h2 class="text-xl font-bold mb-4">Programming Skills</h2>

              <div class="space-y-4">
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <span>Python</span>
                    <span>90%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: 90%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <span>Java</span>
                    <span>85%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: 85%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <span>C</span>
                    <span>80%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: 80%"></div>
                  </div>
                </div>
                <div>
                  <div class="flex justify-between items-center mb-1">
                    <span>JavaScript</span>
                    <span>85%</span>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-2.5">
                    <div class="bg-blue-600 h-2.5 rounded-full" style="width: 85%"></div>
                  </div>
                </div>
              </div>
            `
        },
        {
          name: "Web Development",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "135 KB",
          modified: "May 2025",
          content: `
              <h2 class="text-xl font-bold mb-4">Web Development Skills</h2>

              <h3 class="text-lg font-bold mt-2 mb-3">Frontend</h3>
              <div class="grid grid-cols-3 gap-3 mb-6">
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fab fa-react text-xl"></i></div>
                  <div>React.js</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fab fa-html5 text-xl"></i></div>
                  <div>HTML5</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fab fa-css3-alt text-xl"></i></div>
                  <div>CSS3</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fab fa-js text-xl"></i></div>
                  <div>JavaScript</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fas fa-code text-xl"></i></div>
                  <div>TypeScript</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fas fa-wind text-xl"></i></div>
                  <div>Tailwind</div>
                </div>
              </div>

              <h3 class="text-lg font-bold mt-4 mb-3">Backend</h3>
              <div class="grid grid-cols-3 gap-3">
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-green-400 mb-1"><i class="fab fa-node-js text-xl"></i></div>
                  <div>Node.js</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-green-400 mb-1"><i class="fas fa-server text-xl"></i></div>
                  <div>Express.js</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-green-400 mb-1"><i class="fab fa-php text-xl"></i></div>
                  <div>PHP</div>
                </div>
              </div>
            `
        },
        {
          name: "AI & ML",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "168 KB",
          modified: "May 2025",
          content: `
              <h2 class="text-xl font-bold mb-4">AI & Machine Learning Skills</h2>

              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-gray-700 p-3 rounded">
                  <h3 class="font-bold mb-2 text-purple-400">Frameworks & Libraries</h3>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>TensorFlow</li>
                    <li>Scikit-Learn</li>
                    <li>Pandas</li>
                    <li>NumPy</li>
                    <li>PyTorch</li>
                  </ul>
                </div>
                <div class="bg-gray-700 p-3 rounded">
                  <h3 class="font-bold mb-2 text-blue-400">Techniques</h3>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>Deep Learning</li>
                    <li>Neural Networks</li>
                    <li>Natural Language Processing</li>
                    <li>Computer Vision</li>
                    <li>Reinforcement Learning</li>
                  </ul>
                </div>
              </div>

              <h3 class="text-lg font-bold mb-3">Applications</h3>
              <div class="grid grid-cols-2 gap-3">
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-yellow-400 mb-1"><i class="fas fa-robot text-xl"></i></div>
                  <div>Chatbots</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-yellow-400 mb-1"><i class="fas fa-eye text-xl"></i></div>
                  <div>Image Recognition</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-yellow-400 mb-1"><i class="fas fa-comments text-xl"></i></div>
                  <div>NLP Systems</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-yellow-400 mb-1"><i class="fas fa-chart-line text-xl"></i></div>
                  <div>Predictive Analytics</div>
                </div>
              </div>
            `
        },
        {
          name: "DevOps & Databases",
          type: "file",
          icon: "fas fa-file-code",
          color: "text-green-500",
          size: "120 KB",
          modified: "May 2025",
          content: `
              <h2 class="text-xl font-bold mb-4">DevOps & Database Skills</h2>

              <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-gray-700 p-3 rounded">
                  <h3 class="font-bold mb-2 text-red-400">DevOps</h3>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>Git & GitHub</li>
                    <li>CI/CD Pipelines</li>
                    <li>Docker</li>
                    <li>Vercel</li>
                    <li>GitHub Actions</li>
                  </ul>
                </div>
                <div class="bg-gray-700 p-3 rounded">
                  <h3 class="font-bold mb-2 text-green-400">Databases</h3>
                  <ul class="list-disc pl-5 space-y-1">
                    <li>PostgreSQL</li>
                    <li>MongoDB</li>
                    <li>MySQL</li>
                    <li>Redis</li>
                    <li>Vector DB (Basic)</li>
                  </ul>
                </div>
              </div>

              <h3 class="text-lg font-bold mb-3">Tools & Services</h3>
              <div class="grid grid-cols-3 gap-3">
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fab fa-github text-xl"></i></div>
                  <div>GitHub</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fab fa-docker text-xl"></i></div>
                  <div>Docker</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fas fa-server text-xl"></i></div>
                  <div>AWS</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fas fa-database text-xl"></i></div>
                  <div>MongoDB</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fas fa-database text-xl"></i></div>
                  <div>PostgreSQL</div>
                </div>
                <div class="bg-gray-700 p-2 rounded text-center">
                  <div class="text-blue-400 mb-1"><i class="fas fa-code-branch text-xl"></i></div>
                  <div>Vercel</div>
                </div>
              </div>
            `
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
          icon: "fas fa-file-certificate",
          color: "text-purple-500",
          size: "115 KB",modified: "January 2024",
          content: `
              <h2 class="text-xl font-bold mb-4">Artificial Intelligence Fundamentals</h2>
              <p class="mb-2"><span class="font-bold">Issuer:</span> IBM</p>
              <p class="mb-4"><span class="font-bold">Date:</span> January 2024</p>

              <p class="mb-4">
                This certification covers essential AI concepts, machine learning fundamentals, neural networks, and practical applications of AI technologies.
              </p>

              <h3 class="text-lg font-bold mt-6 mb-2">Topics Covered:</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Introduction to Artificial Intelligence</li>
                <li>Machine Learning Fundamentals</li>
                <li>Neural Networks and Deep Learning</li>
                <li>Natural Language Processing</li>
                <li>Computer Vision</li>
                <li>AI Ethics and Governance</li>
                <li>Practical Applications of AI</li>
              </ul>

              <div class="mt-6 p-4 bg-gray-800 rounded-lg text-center">
                <span class="text-gray-400">Certificate ID: </span>
                <span>IBM-AI-2024-HD-78391</span>
              </div>
            `
        },
        {
          name: "Full Stack Web Development",
          type: "file",
          icon: "fas fa-file-certificate",
          color: "text-purple-500",
          size: "125 KB",
          modified: "October 2023",
          content: `
              <h2 class="text-xl font-bold mb-4">Full Stack Web Development</h2>
              <p class="mb-2"><span class="font-bold">Issuer:</span> Udemy</p>
              <p class="mb-4"><span class="font-bold">Date:</span> October 2023</p>

              <p class="mb-4">
                Comprehensive training in modern web development, covering front-end frameworks, back-end technologies, and database integration.
              </p>

              <h3 class="text-lg font-bold mt-6 mb-2">Topics Covered:</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>HTML5, CSS3, and JavaScript</li>
                <li>React.js and Next.js</li>
                <li>Node.js and Express</li>
                <li>RESTful API Design</li>
                <li>MongoDB, PostgreSQL and SQL</li>
                <li>Authentication and Authorization</li>
                <li>Deployment and CI/CD</li>
                <li>Performance Optimization</li>
              </ul>

              <div class="mt-6 p-4 bg-gray-800 rounded-lg text-center">
                <span class="text-gray-400">Certificate ID: </span>
                <span>UDEMY-FSWD-2023-HD-45672</span>
              </div>
            `
        },
        {
          name: "Database Management & SQL",
          type: "file",
          icon: "fas fa-file-certificate",
          color: "text-purple-500",
          size: "108 KB",
          modified: "May 2023",
          content: `
              <h2 class="text-xl font-bold mb-4">Database Management & SQL</h2>
              <p class="mb-2"><span class="font-bold">Issuer:</span> Coursera</p>
              <p class="mb-4"><span class="font-bold">Date:</span> May 2023</p>

              <p class="mb-4">
                Specialized training in database design, SQL queries, optimization techniques, and modern database systems.
              </p>

              <h3 class="text-lg font-bold mt-6 mb-2">Topics Covered:</h3>
              <ul class="list-disc pl-5 space-y-1">
                <li>Database Design Principles</li>
                <li>SQL Query Writing and Optimization</li>
                <li>Indexing and Performance Tuning</li>
                <li>Stored Procedures and Triggers</li>
                <li>Database Security</li>
                <li>Transactions and Concurrency</li>
                <li>NoSQL and Modern Database Systems</li>
              </ul>

              <div class="mt-6 p-4 bg-gray-800 rounded-lg text-center">
                <span class="text-gray-400">Certificate ID: </span>
                <span>COURSERA-SQL-2023-HD-34521</span>
              </div>
            `
        }
      ]
    }
  ]
};

const FileManager = () => {
  const { openWindow } = useDesktop();
  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [viewMode, setViewMode] = useState<"icons" | "list">("icons");
  const [sortBy, setSortBy] = useState<"name" | "type" | "size" | "date">("name");
  const [showFileInfo, setShowFileInfo] = useState(false);
  const [localCurrentPath, setLocalCurrentPath] = useState<string[]>(fsState.getCurrentPath());
  const [currentDir, setCurrentDir] = useState<FileData>(fileSystem);

  useEffect(() => {
    setLocalCurrentPath(fsState.getCurrentPath());
  }, [fsState.getCurrentPath()]);

  // Navigate to a directory
  const navigateToDirectory = (folder: FileData) => {
    if (folder.type === "folder") {
      fsState.getCurrentPath().push(folder.name);
      setLocalCurrentPath([...fsState.getCurrentPath()]);
      setCurrentDir(folder);
      setSelectedFile(null);
    }
  };

  // Navigate up one level
  const navigateUp = () => {
    if (fsState.getCurrentPath().length > 1) {
      fsState.getCurrentPath().pop();
      setLocalCurrentPath([...fsState.getCurrentPath()]);
      const newDir = fsState.getCurrentDirectory();
      setCurrentDir(newDir);
      setSelectedFile(null);
    }
  };

  // Handle file click
  const handleFileClick = (file: FileData) => {
    if (file.type === "folder") {
      navigateToDirectory(file);
    } else {
      setSelectedFile(file);
      setShowFileInfo(true);
    }
  };

  // Get current directory files
  const currentFiles = currentDir.children || [];

  // Sort files based on the selected criteria
  const sortedFiles = [...currentFiles].sort((a, b) => {
    if (sortBy === "type") {
      if (a.type === "folder" && b.type !== "folder") return -1;
      if (a.type !== "folder" && b.type === "folder") return 1;
      return a.name.localeCompare(b.name);
    } else if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    } else if (sortBy === "size" && a.size && b.size) {
      return parseFloat(a.size) - parseFloat(b.size);
    } else if (sortBy === "date" && a.modified && b.modified) {
      return a.modified.localeCompare(b.modified);
    }
    return 0;
  });

  return (
    <Window
      id="filemanager"
      title="File Manager"
      defaultWidth={900}
      defaultHeight={600}
      defaultX={150}
      defaultY={100}
    >
      <div className="flex flex-col h-full bg-gray-900 text-white">
        {/* Toolbar */}
        <div className="bg-gray-800 p-2 flex items-center justify-between border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <button 
              onClick={navigateUp}
              className="p-2 rounded hover:bg-gray-700 transition-colors"
              disabled={localCurrentPath.length <= 1}
            >
              <i className="fas fa-arrow-up"></i>
            </button>
            <div className="flex items-center bg-gray-700 rounded px-3 py-1 space-x-1">
              {localCurrentPath.map((part, index) => (
                <div key={part} className="flex items-center">
                  {index > 0 && <span className="mx-1 text-gray-500">/</span>}
                  <span className="text-gray-300 hover:text-white cursor-pointer">
                    {part}
                  </span>
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.location.reload()}
              className="p-2 rounded hover:bg-gray-700 transition-colors"
            >
              <i className="fas fa-sync-alt"></i>
            </button>
          </div>
          <div className="flex items-center space-x-2">
            <div className="flex">
              <button 
                className={`px-3 py-1 ${viewMode === 'icons' ? 'bg-blue-600' : 'bg-gray-700'} rounded-l`}
                onClick={() => setViewMode('icons')}
              >
                <i className="fas fa-th"></i>
              </button>
              <button 
                className={`px-3 py-1 ${viewMode === 'list' ? 'bg-blue-600' : 'bg-gray-700'} rounded-r`}
                onClick={() => setViewMode('list')}
              >
                <i className="fas fa-list"></i>
              </button>
            </div>
            <select 
              className="bg-gray-700 rounded px-2 py-1"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
            >
              <option value="name">Sort by Name</option>
              <option value="type">Sort by Type</option>
              <option value="size">Sort by Size</option>
              <option value="date">Sort by Date</option>
            </select>
          </div>
        </div>

        {/* Main container */}
        <div className="flex flex-1 overflow-hidden">
          {/* File browser */}
          <div className={`flex-1 p-4 ${viewMode === 'list' ? 'overflow-y-auto' : 'overflow-y-auto'}`}>
            {viewMode === 'icons' ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {sortedFiles.map((file) => (
                  <div
                    key={file.name}
                    className="flex flex-col items-center p-2 rounded hover:bg-gray-800 transition-colors cursor-pointer"
                    onClick={() => handleFileClick(file)}
                    onDoubleClick={() => file.type === 'folder' ? navigateToDirectory(file) : {}}
                  >
                    <div className={`w-16 h-16 flex items-center justify-center text-4xl ${file.color}`}>
                      <i className={file.icon}></i>
                    </div>
                    <div className="mt-2 text-center text-sm">{file.name}</div>
                  </div>
                ))}
              </div>
            ) : (
              <table className="w-full">
                <thead>
                  <tr className="text-left border-b border-gray-700">
                    <th className="p-2">Name</th>
                    <th className="p-2">Type</th>
                    <th className="p-2">Size</th>
                    <th className="p-2">Modified</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedFiles.map((file) => (
                    <tr 
                      key={file.name} 
                      className="hover:bg-gray-800 cursor-pointer"
                      onClick={() => handleFileClick(file)}
                    >
                      <td className="p-2 flex items-center">
                        <i className={`${file.icon} ${file.color} mr-2`}></i>
                        {file.name}
                      </td>
                      <td className="p-2">{file.type === 'folder' ? 'Folder' : 'File'}</td>
                      <td className="p-2">{file.size || '-'}</td>
                      <td className="p-2">{file.modified || '-'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>

          {/* File preview */}
          {selectedFile && (
            <div className="w-1/2 bg-gray-800 border-l border-gray-700 overflow-y-auto flex flex-col">
              <div className="flex justify-between items-center px-4 py-3 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center">
                  <i className={`${selectedFile.icon} ${selectedFile.color} text-2xl mr-3`}></i>
                  <div>
                    <h3 className="text-md font-bold">{selectedFile.name}</h3>
                    <p className="text-xs text-gray-400">
                      {selectedFile.type === 'folder' ? 'Folder' : 'File'} • {selectedFile.size || '-'} • Modified {selectedFile.modified || '-'}
                    </p>
                  </div>
                </div>
                <button
                  className="w-7 h-7 rounded-full bg-gray-700 hover:bg-gray-600 flex items-center justify-center text-white text-sm"
                  title="Close preview"
                  onClick={() => setSelectedFile(null)}
                >
                  <i className="fas fa-times"></i>
                </button>
              </div>

              <div className="flex-1 p-4">
                <div className="glass rounded-lg p-4 shadow-inner">
                  {selectedFile.content ? (
                    <div 
                      className="text-sm text-gray-200 preview-content overflow-y-auto max-h-[70vh]"
                      dangerouslySetInnerHTML={{ __html: selectedFile.content }}
                    ></div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-8 text-gray-500">
                      <i className="fas fa-file-alt text-5xl mb-4"></i>
                      <p>No preview available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Status bar */}
        <div className="bg-gray-800 px-4 py-1 text-sm text-gray-400 border-t border-gray-700">
          {currentFiles.length} items • {currentFiles.filter(f => f.type === 'folder').length} folders, {currentFiles.filter(f => f.type === 'file').length} files
        </div>
      </div>
    </Window>
  );
};

export default FileManager;