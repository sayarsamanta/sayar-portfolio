import { motion } from "framer-motion";
import { FaTimes, FaGithub } from "react-icons/fa";
import ImageSlider from "./ImageSlider";

const ProjectDetailModal = ({ selectedProject, setSelectedProject }) => {
  if (!selectedProject) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-md flex items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    ><motion.div
        initial={{ opacity: 0, y: 35 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 35 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-[var(--card)] rounded-3xl shadow-2xl flex flex-col"
      ><button
          onClick={() => setSelectedProject(null)}
          className="absolute top-4 right-4 z-50 w-10 h-10 rounded-full flex items-center justify-center border transition hover:scale-110"
          style={{
            borderColor: "rgba(255,255,255,0.08)",
            background: "rgba(0,0,0,0.35)",
            backdropFilter: "blur(10px)",
          }}
        >
          <FaTimes size={14} color="white" />
        </button><div className="flex-1 overflow-y-auto pt-5 px-5 md:px-6">
          <ImageSlider
            images={selectedProject.screenshots}
            autoplay
            interval={4000}
            showDots
            showArrows
            height="h-56 md:h-[22rem] lg:h-[26rem]"
            rounded="rounded-3xl"
          />

          <div className="p-6 md:p-10 space-y-8">
            <h2 className="text-2xl md:text-3xl font-semibold mb-3">{selectedProject.title}</h2>
            <p className="text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              {selectedProject.description}
            </p><div className="grid grid-cols-2 lg:grid-cols-4 gap-5 text-sm">
              {[
                ["Role", selectedProject.role],
                ["Duration", selectedProject.duration],
                ["Status", selectedProject.status],
                ["Team", selectedProject.team],
              ].map(([label, value], i) => (
                <div
                  key={i}
                  className="rounded-2xl border p-4"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "rgba(255,255,255,0.02)",
                  }}
                >
                  <p className="text-[var(--text-secondary)]">{label}</p>
                  <p className="font-medium mt-1">{value}</p>
                </div>
              ))}
            </div><section
              className="rounded-2xl border p-6"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <h3 className="text-xl font-semibold mb-3">Problem</h3>
              <div
                className="[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                dangerouslySetInnerHTML={{ __html: selectedProject.problem }}
              />
            </section><section
              className="rounded-2xl border p-6"
              style={{
                borderColor: "var(--border)",
                backgroundColor: "rgba(255,255,255,0.02)",
              }}
            >
              <h3 className="text-xl font-semibold mb-3">Solution</h3>
              <div
                className="[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
                dangerouslySetInnerHTML={{ __html: selectedProject.solution }}
              />
            </section><section>
              <h3 className="text-xl font-semibold mb-4">Key Features</h3>
              <div className="grid md:grid-cols-2 gap-4">
                {selectedProject.features.map((feat, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-2xl border"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "rgba(255,255,255,0.02)",
                    }}
                  >
                    {feat}
                  </div>
                ))}
              </div>
            </section><section>
              <h3 className="text-xl font-semibold mb-4">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {selectedProject.tech.map((skill, i) => (
                  <span
                    key={i}
                    className="px-4 py-1.5 rounded-full text-sm font-medium border"
                    style={{
                      borderColor: "var(--border)",
                      backgroundColor: "rgba(255,255,255,0.05)",
                      color: "var(--primary)",
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </section><div className="flex flex-wrap gap-4 pt-2">
              {selectedProject.github && (
                <a
                  href={selectedProject.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 rounded-full font-medium border transition hover:scale-105"
                  style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
                >
                  <FaGithub /> View Code
                </a>
              )}
              {selectedProject.live && (
                <a
                  href={selectedProject.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full font-medium transition hover:scale-105"
                  style={{ backgroundColor: "var(--primary)", color: "var(--text-light)" }}
                >
                  Live Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ProjectDetailModal;
