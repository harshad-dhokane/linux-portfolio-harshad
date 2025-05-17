import Window from "./Window";

const SkillsWindow = () => {
  return (
    <Window
      id="skills"
      title="Skills - Harshad Dhokane"
      defaultWidth={800}
      defaultHeight={600}
      defaultX={400}
      defaultY={100}
    >
      <div className="bg-gray-800 text-white p-6 overflow-y-auto h-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Professional Skills</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-code text-[hsl(var(--linux-blue))] mr-3"></i>
              Programming Languages
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Python</span>
                  <span>90%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "90%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>Java</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>C</span>
                  <span>80%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "80%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span>JavaScript</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "85%" }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-globe text-green-500 mr-3"></i>
              Web Development
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Node.js</li>
              <li>React.js</li>
              <li>Express.js</li>
              <li>HTML5</li>
              <li>CSS3</li>
              <li>PHP</li>
              <li>TypeScript</li>
            </ul>
          </div>
          
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-brain text-purple-500 mr-3"></i>
              AI & Machine Learning
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>TensorFlow</li>
              <li>Scikit-Learn</li>
              <li>Pandas</li>
              <li>NumPy</li>
              <li>Django</li>
              <li>Node.js</li>
              <li>Google Colab</li>
            </ul>
          </div>
          
          <div className="glass rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-server text-red-500 mr-3"></i>
              DevOps & Databases
            </h2>
            <div className="mb-4">
              <h3 className="font-medium mb-2">DevOps:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>Git</li>
                <li>GitHub</li>
                <li>CI/CD Pipelines</li>
                <li>Vercel</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Databases:</h3>
              <ul className="list-disc pl-6 space-y-1">
                <li>PostgreSQL</li>
                <li>MongoDB</li>
                <li>Vector DB (Basic)</li>
              </ul>
            </div>
          </div>
          
          <div className="glass rounded-lg p-6 col-span-1 md:col-span-2">
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <i className="fas fa-users text-yellow-500 mr-3"></i>
              Soft Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-lightbulb text-2xl text-yellow-400 mb-2"></i>
                <p>Problem-Solving</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-sync-alt text-2xl text-green-400 mb-2"></i>
                <p>Adaptability</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-crown text-2xl text-purple-400 mb-2"></i>
                <p>Leadership</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-comments text-2xl text-blue-400 mb-2"></i>
                <p>Technical Communication</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default SkillsWindow;