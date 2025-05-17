import Window from "./Window";

const ExperienceWindow = () => {
  return (
    <Window
      id="experience"
      title="Experience - Harshad Dhokane"
      defaultWidth={800}
      defaultHeight={600}
      defaultX={350}
      defaultY={120}
    >
      <div className="bg-gray-800 text-white p-6 overflow-y-auto h-full">
        <h1 className="text-2xl font-bold mb-8 text-center">Professional Experience</h1>
        
        <div className="relative border-l-2 border-gray-600 ml-6 pl-8 pb-8">
          {/* Internship 1 */}
          <div className="mb-12 relative">
            <div className="absolute -left-14 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-gray-800"></div>
            <div className="absolute -left-14 top-6 h-full w-0.5 bg-gray-600"></div>
            
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h2 className="text-xl font-bold text-blue-400">Software Development Intern</h2>
              <div className="text-gray-400 font-medium">April 2025 – June 2025</div>
            </div>
            
            <div className="text-lg text-gray-300 mb-2">Canspirit.ai</div>
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-gray-200">Responsibilities & Achievements:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Worked on a live QR code-based Asset Management System, contributing to both front-end and back-end development.</li>
                <li>Implemented automated deployments with GitHub Actions, improving CI/CD efficiency by 40% and reducing deployment errors by 75%.</li>
                <li>Integrated Supabase as the backend-as-a-service, optimizing PostgreSQL database performance with 30% faster query response times.</li>
                <li>Worked with React and TypeScript to build dynamic front-end components.</li>
              </ul>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2 text-gray-200">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-blue-800 text-blue-100 rounded-md text-xs">React</span>
                  <span className="px-2 py-1 bg-blue-800 text-blue-100 rounded-md text-xs">TypeScript</span>
                  <span className="px-2 py-1 bg-blue-800 text-blue-100 rounded-md text-xs">GitHub Actions</span>
                  <span className="px-2 py-1 bg-blue-800 text-blue-100 rounded-md text-xs">Supabase</span>
                  <span className="px-2 py-1 bg-blue-800 text-blue-100 rounded-md text-xs">PostgreSQL</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Internship 2 */}
          <div className="relative">
            <div className="absolute -left-14 top-0 w-6 h-6 bg-purple-600 rounded-full border-4 border-gray-800"></div>
            
            <div className="flex flex-col md:flex-row justify-between mb-2">
              <h2 className="text-xl font-bold text-purple-400">AI & Software Development Intern</h2>
              <div className="text-gray-400 font-medium">Aug 2024 - Sept 2024</div>
            </div>
            
            <div className="text-lg text-gray-300 mb-2">CodeSoft</div>
            <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3 text-gray-200">Responsibilities & Achievements:</h3>
              <ul className="list-disc pl-5 space-y-2 text-gray-300">
                <li>Developed AI models for machine learning applications like chatbots, recommendation systems, and image recognition systems with user-friendly interfaces.</li>
                <li>Worked on Natural Language Processing (NLP)-based projects, including data pre-processing, model training, deep learning techniques, and model evaluation.</li>
                <li>Collaborated with a team of 5 developers to implement and optimize machine learning algorithms.</li>
                <li>Created interactive dashboards to visualize model performance and analytics.</li>
              </ul>
              
              <div className="mt-4">
                <h4 className="font-medium mb-2 text-gray-200">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-purple-800 text-purple-100 rounded-md text-xs">Python</span>
                  <span className="px-2 py-1 bg-purple-800 text-purple-100 rounded-md text-xs">TensorFlow</span>
                  <span className="px-2 py-1 bg-purple-800 text-purple-100 rounded-md text-xs">scikit-learn</span>
                  <span className="px-2 py-1 bg-purple-800 text-purple-100 rounded-md text-xs">NLP</span>
                  <span className="px-2 py-1 bg-purple-800 text-purple-100 rounded-md text-xs">Deep Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-700 bg-opacity-40 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-center">Skills & Competencies Developed</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <i className="fas fa-code text-2xl text-blue-400 mb-2"></i>
              <p>Full-Stack Development</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <i className="fas fa-database text-2xl text-green-400 mb-2"></i>
              <p>Database Optimization</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <i className="fas fa-brain text-2xl text-purple-400 mb-2"></i>
              <p>Machine Learning</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <i className="fas fa-cogs text-2xl text-yellow-400 mb-2"></i>
              <p>CI/CD Pipelines</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <i className="fas fa-users text-2xl text-red-400 mb-2"></i>
              <p>Team Collaboration</p>
            </div>
            <div className="bg-gray-800 p-3 rounded-lg text-center">
              <i className="fas fa-chart-line text-2xl text-indigo-400 mb-2"></i>
              <p>Project Management</p>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default ExperienceWindow;