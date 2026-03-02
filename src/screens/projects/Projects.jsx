import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import sample1 from "../../assets/sample1.jpg";
import sample2 from "../../assets/sample2.jpg";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const projectData = [
  {
    id: 1,
    name: "Fullstack Portfolio",
    type: "Fullstack",
    tech: ["React", "Node.js", "Tailwind"],
    description:
      "A fully animated portfolio using React and Node.js with dynamic content from DB.",
    screenshots: [sample1, sample2],
  },
  {
    id: 2,
    name: "E-commerce Platform",
    type: "Fullstack",
    tech: ["React", "Express", "MongoDB"],
    description:
      "End-to-end e-commerce platform with cart, payment, and admin panel.",
    screenshots: [sample1],
  },
  {
    id: 3,
    name: "Landing Page UI",
    type: "Frontend",
    tech: ["React", "Tailwind"],
    description:
      "Responsive landing page with animations and interactive components.",
    screenshots: [sample2],
  },
];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  const filteredProjects =
    filter === "All"
      ? projectData
      : projectData.filter((proj) => proj.type === filter);

  return (
    <div
      className="min-h-screen px-6 md:px-20 py-20 flex flex-col gap-20 font-body"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* Section Title */}
      <h1
        className="text-5xl font-heading font-bold text-center mb-8"
        style={{ color: "var(--text-primary)" }}
      >
        Projects
      </h1>

      {/* Filter Toggle */}
      <div className="flex justify-center gap-4 mb-10">
        {["All", "Fullstack", "Frontend"].map((cat) => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className="px-5 py-2 rounded-full text-sm font-heading font-medium border transition-colors duration-300"
            style={{
              backgroundColor:
                filter === cat ? "var(--primary)" : "var(--card)",
              color:
                filter === cat ? "var(--text-light)" : "var(--text-secondary)",
              borderColor: filter === cat ? "var(--primary)" : "var(--border)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {filteredProjects.map((proj, idx) => (
          <motion.div
            key={proj.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.2 }}
            whileHover={{ scale: 1.03 }}
            className="relative rounded-2xl p-6 shadow-lg cursor-pointer overflow-hidden group transition-all duration-500"
            style={{
              backgroundColor: "var(--card)",
              color: "var(--text-primary)",
            }}
            onClick={() => setSelectedProject(proj)}
          >
            {/* Fullstack Badge */}
            {proj.type === "Fullstack" && (
              <span
                className="absolute top-3 right-3 text-xs font-heading font-semibold px-3 py-1 rounded-full z-20"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--text-light)",
                }}
              >
                Full Stack
              </span>
            )}

            {/* Project Name */}
            <h3 className="text-xl font-heading font-semibold mb-3">
              {proj.name}
            </h3>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 font-body">
              {proj.tech.map((tech, i) => (
                <span
                  key={i}
                  className="text-xs px-2 py-1 rounded-full border"
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

            {/* Hover Gradient & Glow */}
            <div
              className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-20 transition duration-500 z-0"
              style={{
                background:
                  "linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))",
              }}
            ></div>
          </motion.div>
        ))}
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-5"
            style={{ backgroundColor: "var(--modal-bg)" }}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="relative rounded-3xl max-w-3xl w-full shadow-2xl flex flex-col gap-6 overflow-y-auto p-8 font-body"
              style={{
                backgroundColor: "var(--card)",
                color: "var(--text-primary)",
              }}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-5 right-5 transition"
                style={{ color: "var(--text-secondary)" }}
              >
                <FaTimes size={20} />
              </button>

              {/* Project Title */}
              <h2 className="text-3xl font-heading font-bold">
                {selectedProject.name}
              </h2>

              {/* Description */}
              <p className="text-[var(--text-secondary)]">
                {selectedProject.description}
              </p>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2 font-body">
                {selectedProject.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full border"
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

              {/* Screenshots */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {selectedProject.screenshots.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`${selectedProject.name} screenshot`}
                    className="rounded-xl shadow-lg"
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
