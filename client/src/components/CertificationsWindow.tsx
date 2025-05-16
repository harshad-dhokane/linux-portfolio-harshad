import Window from "./Window";

const CertificationsWindow = () => {
  return (
    <Window
      id="certifications"
      title="Certifications - Harshad Dhokane"
      defaultWidth={700}
      defaultHeight={500}
      defaultX={400}
      defaultY={150}
    >
      <div className="bg-gray-800 text-white p-6 overflow-y-auto h-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Professional Certifications</h1>

        <div className="glass rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-blue-900 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <i className="fab fa-ibm text-3xl text-white"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">Artificial Intelligence Fundamentals</h3>
              <p className="text-gray-300">IBM</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4">
            This certification covers essential AI concepts, machine learning fundamentals, neural networks, and practical applications of AI technologies.
          </p>
          <div className="flex justify-between items-center">
            <div className="text-gray-400">Issued: January 2024</div>
            <a href="#" className="bg-blue-700 text-white px-4 py-2 rounded-md hover:bg-blue-800 transition">
              View Certificate
            </a>
          </div>
        </div>

        <div className="glass rounded-lg p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <i className="fas fa-code text-3xl text-white"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">Full Stack Web Development</h3>
              <p className="text-gray-300">Udemy</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4">
            Comprehensive training in modern web development, covering front-end frameworks, back-end technologies, and database integration.
          </p>
          <div className="flex justify-between items-center">
            <div className="text-gray-400">Issued: October 2023</div>
            <a href="#" className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition">
              View Certificate
            </a>
          </div>
        </div>

        <div className="glass rounded-lg p-6">
          <div className="flex items-center mb-4">
            <div className="w-16 h-16 bg-yellow-700 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <i className="fas fa-database text-3xl text-white"></i>
            </div>
            <div>
              <h3 className="text-xl font-bold">Database Management & SQL</h3>
              <p className="text-gray-300">Coursera</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4">
            Specialized training in database design, SQL queries, optimization techniques, and modern database systems.
          </p>
          <div className="flex justify-between items-center">
            <div className="text-gray-400">Issued: May 2023</div>
            <a href="#" className="bg-yellow-700 text-white px-4 py-2 rounded-md hover:bg-yellow-800 transition">
              View Certificate
            </a>
          </div>
        </div>
      </div>
    </Window>
  );
};

export default CertificationsWindow;
