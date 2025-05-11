import React from "react";

const Skills = ({ darkMode }) => {
  // Skills data
  const skills = [
    { name: "React", level: 65 },
    { name: "JavaScript", level: 85 },
    { name: "HTML/CSS", level: 95 },
    { name: "Node.js", level: 60 },
    { name: "TypeScript", level: 50 },
    { name: "UI/UX Design", level: 80 },
    { name: "JAVA", level: 60 },
    { name: "C,C++", level: 95 },
    { name: "C#", level: 80 },
  ];

  return (
    <section id="skills" className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center">My Skills</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-6">Technical Skills</h3>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span>{skill.level}%</span>
                  </div>
                  <div
                    className={`w-full h-2 rounded-full ${
                      darkMode ? "bg-gray-700" : "bg-gray-200"
                    }`}
                  >
                    <div
                      className="h-full rounded-full bg-blue-500 transition-all duration-1000"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold mb-6">Education & Experience</h3>
            <div
              className={`border-l-2 border-blue-500 pl-4 space-y-6 ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              <div>
                <div className="flex items-center">
                  <div className="absolute -ml-6 w-3 h-3 rounded-full bg-blue-500"></div>
                  <h4 className="text-lg font-bold">
                    Advanced Frontend Developer
                  </h4>
                </div>
                <p className="text-sm opacity-75">2023 - Present</p>
                <p className="mt-2">Freelance</p>
              </div>

              <div>
                <div className="flex items-center">
                  <div className="absolute -ml-6 w-3 h-3 rounded-full bg-blue-500"></div>
                  <h4 className="text-lg font-bold">UI Developer</h4>
                </div>
                <p className="text-sm opacity-75">2023 - Present</p>
                <p className="mt-2">Freelance</p>
              </div>

              <div>
                <div className="flex items-center">
                  <div className="absolute -ml-6 w-3 h-3 rounded-full bg-blue-500"></div>
                  <h4 className="text-lg font-bold"> Computer Science</h4>
                </div>
                <p className="text-sm opacity-75">2023 - 2025</p>
                <p className="mt-2">MIAGE ksar el kebir</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;