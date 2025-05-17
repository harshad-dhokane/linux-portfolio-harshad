
import Window from "./Window";

interface ProfileWindowProps {
  type: 'github' | 'linkedin';
}

const ProfileWindow = ({ type }: ProfileWindowProps) => {
  const isGithub = type === 'github';
  
  return (
    <Window
      id={`${type}-profile`}
      title={`${isGithub ? 'GitHub' : 'LinkedIn'} Profile`}
      defaultWidth={800}
      defaultHeight={600}
      defaultX={200}
      defaultY={50}
    >
      <div className="h-full bg-[#1E1E1E] text-white p-6 overflow-y-auto">
        {isGithub ? (
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-6 mb-8">
              <img
                src="https://avatars.githubusercontent.com/harshad-dhokane"
                alt="Profile"
                className="w-24 h-24 rounded-full"
              />
              <div>
                <h1 className="text-2xl font-bold mb-2">Harshad Dhokane</h1>
                <p className="text-gray-400">Full Stack Developer | Software Engineer</p>
                <div className="flex gap-4 mt-4">
                  <a href="https://github.com/harshad-dhokane" target="_blank" rel="noopener noreferrer" className="bg-[#238636] text-white px-4 py-2 rounded-md hover:bg-[#2ea043] transition-colors">
                    View Profile
                  </a>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#2D2D2D] p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Featured Projects</h2>
                <ul className="space-y-4">
                  <li>
                    <h3 className="font-bold">Internly</h3>
                    <p className="text-gray-400">Full-stack internship tracking platform</p>
                  </li>
                  <li>
                    <h3 className="font-bold">College Suggestion Bot</h3>
                    <p className="text-gray-400">AI-powered college recommendation system</p>
                  </li>
                </ul>
              </div>
              <div className="bg-[#2D2D2D] p-6 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Technologies</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 bg-[#1f6feb] rounded text-sm">React</span>
                  <span className="px-2 py-1 bg-[#1f6feb] rounded text-sm">TypeScript</span>
                  <span className="px-2 py-1 bg-[#1f6feb] rounded text-sm">Node.js</span>
                  <span className="px-2 py-1 bg-[#1f6feb] rounded text-sm">Python</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <div className="bg-white text-black p-6 rounded-lg">
              <div className="flex items-center gap-6 mb-8">
                <img
                  src="https://media.licdn.com/dms/image/your-image"
                  alt="Profile"
                  className="w-24 h-24 rounded-full bg-gray-200"
                />
                <div>
                  <h1 className="text-2xl font-bold mb-2">Harshad Dhokane</h1>
                  <p className="text-gray-600">Full Stack Developer | Software Engineer</p>
                  <p className="text-gray-600">Pune, Maharashtra, India</p>
                </div>
              </div>
              
              <div className="space-y-6">
                <section>
                  <h2 className="text-xl font-bold mb-4">About</h2>
                  <p className="text-gray-600">
                    Passionate Full Stack Developer with experience in building web applications
                    using modern technologies. Skilled in React, TypeScript, Node.js, and Python.
                  </p>
                </section>
                
                <section>
                  <h2 className="text-xl font-bold mb-4">Experience</h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-bold">Full Stack Developer</h3>
                      <p className="text-gray-600">Worked on various web applications and implemented
                      new features using React, TypeScript, and Node.js.</p>
                    </div>
                  </div>
                </section>
                
                <div className="mt-6">
                  <a
                    href="https://www.linkedin.com/in/harshad-dhokane"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#0A66C2] text-white px-4 py-2 rounded-md hover:bg-[#004182] transition-colors"
                  >
                    View Full Profile
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </Window>
  );
};

export default ProfileWindow;
