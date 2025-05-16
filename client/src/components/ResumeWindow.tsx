import Window from "./Window";
import { resumeData } from "@/lib/resume-data";

const ResumeWindow = () => {
  const openExternalUrl = (url: string) => {
    window.open(url, "_blank");
  };

  return (
    <Window
      id="resume"
      title="Resume - Harshad Dhokane"
      defaultWidth={800}
      defaultHeight={600}
      defaultX={200}
      defaultY={80}
    >
      <div className="p-6 text-white overflow-y-auto h-full bg-gray-800">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-4">
            {resumeData.name}
          </h1>
          <p className="text-center mb-4 text-gray-300">
            {resumeData.location} | {resumeData.email} | 
            <span className="text-[hsl(var(--linux-blue))] cursor-pointer ml-1">
              Portfolio
            </span> | 
            <span
              className="text-[hsl(var(--linux-blue))] cursor-pointer ml-1"
              onClick={() => openExternalUrl(resumeData.linkedin)}
            >
              LinkedIn
            </span> | 
            <span
              className="text-[hsl(var(--linux-blue))] cursor-pointer ml-1"
              onClick={() => openExternalUrl(resumeData.github)}
            >
              GitHub
            </span>
          </p>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-600">
              PROFESSIONAL SUMMARY
            </h2>
            <p className="text-gray-300">{resumeData.summary}</p>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-600">
              EDUCATION
            </h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="mb-3">
                <div className="flex justify-between">
                  <div>
                    <p className="font-bold">{edu.institution}</p>
                    <p className="text-gray-300">{edu.degree}</p>
                  </div>
                  <p className="text-gray-300">{edu.period}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-600">
              SKILLS
            </h2>
            <ul className="list-disc pl-6 text-gray-300">
              {resumeData.skills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-600">
              EXPERIENCE
            </h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between">
                  <p className="font-bold">{exp.title}</p>
                  <p className="text-gray-300">{exp.period}</p>
                </div>
                <ul className="list-disc pl-6 text-gray-300">
                  {exp.responsibilities.map((resp, rIndex) => (
                    <li key={rIndex}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-600">
              PROJECTS
            </h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="mb-3">
                <p className="font-bold">
                  {project.name} - 
                  <span
                    className="text-[hsl(var(--linux-blue))] cursor-pointer ml-1"
                    onClick={() => openExternalUrl(project.github)}
                  >
                    GitHub
                  </span>
                  {project.demo && (
                    <>
                      {" | "}
                      <span className="text-[hsl(var(--linux-blue))] cursor-pointer">
                        App
                      </span>
                    </>
                  )}
                </p>
                <ul className="list-disc pl-6 text-gray-300">
                  <li>{project.description}</li>
                </ul>
              </div>
            ))}
          </div>

          <div className="mb-6">
            <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-600">
              CERTIFICATIONS
            </h2>
            {resumeData.certifications.map((cert, index) => (
              <p key={index} className="text-gray-300">
                {cert}
              </p>
            ))}
          </div>

          <div>
            <h2 className="text-xl font-bold mb-2 pb-1 border-b border-gray-600">
              VOLUNTEERING
            </h2>
            {resumeData.volunteering.map((vol, index) => (
              <p key={index} className="text-gray-300">
                {vol}
              </p>
            ))}
          </div>
        </div>
      </div>
    </Window>
  );
};

export default ResumeWindow;
