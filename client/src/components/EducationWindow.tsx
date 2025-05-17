import Window from "./Window";

const EducationWindow = () => {
  return (
    <Window
      id="education"
      title="Education - Harshad Dhokane"
      defaultWidth={800}
      defaultHeight={600}
      defaultX={300}
      defaultY={150}
    >
      <div className="bg-gray-800 text-white p-6 overflow-y-auto h-full">
        <h1 className="text-2xl font-bold mb-8 text-center">Academic Background</h1>
        
        <div className="relative border-l-2 border-gray-600 ml-6 pl-8 pb-8">
          {/* Master's Degree */}
          <div className="mb-12 relative">
            <div className="absolute -left-14 top-0 w-6 h-6 bg-blue-600 rounded-full border-4 border-gray-800"></div>
            <div className="absolute -left-14 top-6 h-full w-0.5 bg-gray-600"></div>
            
            <div className="glass p-6 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h2 className="text-xl font-bold text-blue-400">Master of Science in Computer Science</h2>
                <div className="text-gray-400 font-medium">2024 - 2026</div>
              </div>
              
              <div className="flex items-center mb-4">
                <i className="fas fa-university text-gray-400 mr-2"></i>
                <span className="text-lg text-gray-300">Nowrosjee Wadia College, Pune</span>
              </div>
              
              <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="font-semibold">CGPA</div>
                  <div>8.1 / 10</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: "81%" }}></div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Key Subjects:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-800 p-2 rounded text-sm">Advanced Algorithms</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Machine Learning</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Computer Networks</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Advanced Databases</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">AI & Deep Learning</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Cloud Computing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bachelor's Degree */}
          <div className="mb-12 relative">
            <div className="absolute -left-14 top-0 w-6 h-6 bg-green-600 rounded-full border-4 border-gray-800"></div>
            <div className="absolute -left-14 top-6 h-full w-0.5 bg-gray-600"></div>
            
            <div className="glass p-6 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h2 className="text-xl font-bold text-green-400">Bachelor of Computer Science</h2>
                <div className="text-gray-400 font-medium">2021 - 2024</div>
              </div>
              
              <div className="flex items-center mb-4">
                <i className="fas fa-university text-gray-400 mr-2"></i>
                <span className="text-lg text-gray-300">Nowrosjee Wadia College, Pune</span>
                <span className="text-gray-400 text-sm ml-2">| Savitribai Phule Pune University</span>
              </div>
              
              <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="font-semibold">CGPA</div>
                  <div>8.84 / 10</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: "88.4%" }}></div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Key Subjects:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-800 p-2 rounded text-sm">Data Structures</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Operating Systems</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Database Systems</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Web Development</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Software Engineering</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Computer Networks</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* H.S.C. */}
          <div className="relative">
            <div className="absolute -left-14 top-0 w-6 h-6 bg-orange-600 rounded-full border-4 border-gray-800"></div>
            
            <div className="glass p-6 rounded-lg">
              <div className="flex flex-col md:flex-row justify-between mb-2">
                <h2 className="text-xl font-bold text-orange-400">H.S.C (Science)</h2>
                <div className="text-gray-400 font-medium">2020 - 2021</div>
              </div>
              
              <div className="flex items-center mb-4">
                <i className="fas fa-university text-gray-400 mr-2"></i>
                <span className="text-lg text-gray-300">Fergusson College, Pune</span>
                <span className="text-gray-400 text-sm ml-2">| Maharashtra State Board</span>
              </div>
              
              <div className="bg-gray-700 bg-opacity-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="font-semibold">Percentage</div>
                  <div>83.50%</div>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div className="bg-orange-600 h-2 rounded-full" style={{ width: "83.5%" }}></div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Key Subjects:</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-gray-800 p-2 rounded text-sm">Physics</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Chemistry</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Mathematics</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">English</div>
                    <div className="bg-gray-800 p-2 rounded text-sm">Computer Science</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 bg-gray-700 bg-opacity-40 p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-center">Academic Achievements</h3>
          <ul className="list-disc pl-6 space-y-3">
            <li>Consistently maintained high academic performance throughout educational journey</li>
            <li>Participated in university-level coding competitions</li>
            <li>Completed additional online certifications to supplement formal education</li>
            <li>Active member of computer science department activities and events</li>
          </ul>
        </div>
      </div>
    </Window>
  );
};

export default EducationWindow;