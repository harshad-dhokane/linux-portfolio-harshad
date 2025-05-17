import Window from "./Window";

const AboutWindow = () => {
  return (
    <Window
      id="about"
      title="About Harshad Dhokane"
      defaultWidth={800}
      defaultHeight={600}
      defaultX={350}
      defaultY={120}
    >
      <div className="bg-gray-800 text-white p-6 overflow-y-auto h-full">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col items-center mb-10">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center mb-4">
              <span className="text-4xl font-bold text-white">HD</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Harshad Dhokane</h1>
            <p className="text-lg text-gray-300 mb-4">Computer Science Professional | AI/ML Specialist | Full-Stack Developer</p>
            <div className="flex space-x-3">
              <a href="https://github.com/harshad-dhokane/" target="_blank" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/harshad-dhokane/" target="_blank" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                <i className="fab fa-linkedin-in text-xl"></i>
              </a>
              <a href="mailto:work.harshad@gmail.com" className="p-2 bg-gray-700 rounded-full hover:bg-gray-600 transition-colors">
                <i className="fas fa-envelope text-xl"></i>
              </a>
            </div>
          </div>

          <div className="glass rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <i className="fas fa-user text-blue-400 mr-3"></i>
              About Me
            </h2>
            <p className="mb-4 text-gray-300 leading-relaxed">
              I am a results-driven Computer Science professional with expertise in AI/ML and full-stack development.
              Skilled in building intelligent applications and scalable web solutions, I bring creativity and technical excellence to every project.
            </p>
            <p className="text-gray-300 leading-relaxed">
              As an extraordinary learner with proven ability to quickly master new technologies, I'm constantly expanding my skillset
              and implementing efficient solutions to complex problems. My passion lies in creating innovative software
              that combines cutting-edge technology with intuitive user experiences.
            </p>
          </div>

          <div className="glass rounded-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <i className="fas fa-bullseye text-green-400 mr-3"></i>
              Professional Philosophy
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-xl font-bold text-center mb-2 text-green-400">Innovation</div>
                <p className="text-sm text-center text-gray-300">
                  I believe in pushing boundaries and exploring new technologies to create solutions that stand out.
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-xl font-bold text-center mb-2 text-blue-400">Quality</div>
                <p className="text-sm text-center text-gray-300">
                  Every line of code I write reflects my commitment to excellence and attention to detail.
                </p>
              </div>
              <div className="bg-gray-700 p-4 rounded-lg">
                <div className="text-xl font-bold text-center mb-2 text-purple-400">Growth</div>
                <p className="text-sm text-center text-gray-300">
                  I embrace challenges as opportunities to learn and continuously improve my craft.
                </p>
              </div>
            </div>
          </div>

          <div className="glass rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <i className="fas fa-laptop-code text-purple-400 mr-3"></i>
              Technical Interests
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-brain text-2xl text-purple-400 mb-2"></i>
                <p>AI & Machine Learning</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-globe text-2xl text-blue-400 mb-2"></i>
                <p>Web Development</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-database text-2xl text-green-400 mb-2"></i>
                <p>Database Systems</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-cloud text-2xl text-cyan-400 mb-2"></i>
                <p>Cloud Computing</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-robot text-2xl text-orange-400 mb-2"></i>
                <p>Automation</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-mobile-alt text-2xl text-yellow-400 mb-2"></i>
                <p>Mobile App Development</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-shield-alt text-2xl text-red-400 mb-2"></i>
                <p>Cybersecurity</p>
              </div>
              <div className="bg-gray-700 p-3 rounded-lg text-center">
                <i className="fas fa-microchip text-2xl text-indigo-400 mb-2"></i>
                <p>Internet of Things</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default AboutWindow;