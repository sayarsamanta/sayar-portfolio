import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Experience.css";
import { ThemeContext } from "../context/ThemeContext";

const experienceData = [
  {
    id: 1,
    role: "Full Stack Developer",
    company: "TechCorp Inc.",
    duration: "Jan 2023 - Present",
    description:
      "Built end-to-end web applications using React, Node.js, and MongoDB. Led a team of 3 developers.",
    tech: ["React", "Node.js", "MongoDB", "Tailwind", "Framer Motion"],
  },
  {
    id: 2,
    role: "Frontend Developer",
    company: "Designify Labs",
    duration: "Jun 2021 - Dec 2022",
    description:
      "Developed interactive UI components, animations, and responsive layouts using React and Tailwind.",
    tech: ["React", "Tailwind", "Framer Motion", "GSAP"],
  },
  {
    id: 3,
    role: "Intern - Web Developer",
    company: "Startup Hub",
    duration: "Jan 2021 - May 2021",
    description:
      "Worked on landing pages and small full-stack features with React and Node.js.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
  },
];

export default function Experience() {
  const [expandedId, setExpandedId] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen px-6 md:px-20 py-20"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <h1
        className="text-4xl md:text-5xl font-bold mb-16"
        style={{ color: "var(--text-primary)" }}
      >
        Experience
      </h1>

      <div className="relative">
        {/* Main Vertical Timeline Line */}
        <div
          className="absolute left-5 top-0 w-[4px] h-full rounded-full opacity-40 z-0"
          style={{
            background:
              "linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))",
          }}
        ></div>

        {/* Global Shimmer Line */}
        <div className="absolute left-5 top-0 w-1 h-full z-0 overflow-hidden rounded-full">
          <div
            className="absolute top-0 w-full h-full opacity-40 blur-md shimmer-tracer"
            style={{
              background:
                "linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))",
            }}
          />
        </div>

        <div className="flex flex-col gap-10 relative">
          {experienceData.map((exp, index) => {
            const isExpanded = expandedId === exp.id;
            const side = index % 2 === 0 ? "left" : "right";

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: side === "left" ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className={`relative flex items-start md:items-center justify-${
                  side === "left" ? "start" : "end"
                } gap-6`}
              >
                {/* Experience Card */}
                <motion.div
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className="relative rounded-2xl p-6 shadow-lg cursor-pointer md:w-3/4 w-full transition-all duration-500 hover:shadow-2xl z-10"
                  style={{
                    backgroundColor: "var(--card)",
                    color: "var(--text-primary)",
                  }}
                >
                  <h3 className="text-xl font-semibold">{exp.role}</h3>
                  <span style={{ color: "var(--text-secondary)" }}>
                    {exp.company}
                  </span>
                  <span
                    className="block mt-1"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {exp.duration}
                  </span>

                  {/* Tech Stack Badges */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{
                          backgroundColor: "var(--card)",
                          borderColor: "var(--border)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Description */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.5 }}
                        className="mt-4 leading-relaxed"
                        style={{ color: "var(--text-secondary)" }}
                      >
                        {exp.description}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  {/* Duration Bar */}
                  <div
                    className="h-1 w-full rounded-full mt-4"
                    style={{ backgroundColor: "var(--border)" }}
                  >
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="h-1 rounded-full"
                      style={{
                        background:
                          "linear-gradient(to right, var(--primary), var(--secondary), var(--accent))",
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
