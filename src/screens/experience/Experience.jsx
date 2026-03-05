import { useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Experience.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useSelector } from "react-redux";

export default function Experience() {
  const experienceData = useSelector((state) => state.experience.exp);
  const [expandedId, setExpandedId] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen w-full py-24 px-6"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* Section Title */}
      <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mb-20">
        Experience
      </h1>

      <div className="relative max-w-4xl mx-auto">
        {/* Center Line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full opacity-30"
          style={{
            background:
              "linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))",
          }}
        />

        <div className="flex flex-col gap-16 relative">
          {experienceData.map((exp, index) => {
            const isExpanded = expandedId === exp.id;

            return (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative flex justify-center"
              >
                {/* Dot */}
                <div
                  className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-20"
                  style={{ backgroundColor: "var(--primary)" }}
                />

                {/* Card */}
                <motion.div
                  onClick={() => setExpandedId(isExpanded ? null : exp.id)}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-full md:w-[80%] backdrop-blur-xl border rounded-2xl p-8 shadow-xl cursor-pointer transition-all"
                  style={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <h3 className="text-xl md:text-2xl font-heading font-semibold">
                    {exp.role}
                  </h3>

                  <p className="text-sm mt-1 text-[var(--text-secondary)]">
                    {exp.company}
                  </p>

                  <p className="text-xs mt-1 text-[var(--text-tertiary)]">
                    {exp.duration}
                  </p>

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {exp.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{
                          borderColor: "var(--border)",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Expandable */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.4 }}
                        className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]"
                      >
                        {exp.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
