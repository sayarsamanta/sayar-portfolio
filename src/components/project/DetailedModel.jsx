import { motion } from "framer-motion";
import { FaTimes, FaGithub } from "react-icons/fa";
import { FaReact } from "react-icons/fa";
import { FaNodeJs } from "react-icons/fa";
const DetailedModal = ({ selectedProject, setSelectedProject }) => {
  // Replace with actual selected project data
  if (!selectedProject) return null;

  return (
    <motion.div
      className="
        fixed inset-0 
        z-[9999] 
        bg-black/60 
        backdrop-blur-md 
        flex 
        items-center 
        justify-center 
        p-6
        overflow-hidden
      "
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.25 }}
        className="
          relative
          w-full
          h-full
          max-w-5xl
          max-h-[90vh]
          overflow-y-auto
          rounded-[20px]
          bg-[var(--card)]
          shadow-2xl
          p-8
          pr-6 
          hide-scrollbar
        "
      >
        {/* Close Button */}
        <button
          onClick={() => setSelectedProject(null)}
          className="
    absolute 
    top-4 
    right-5 
    z-20
    w-10 h-10
    flex items-center justify-center
    rounded-full
    border
    backdrop-blur-md
    transition-all duration-200
    hover:scale-110
    active:scale-95
  "
          style={{
            borderColor: "var(--border)",
            background: "rgba(255,255,255,0.05)",
            color: "var(--text-secondary)",
          }}
        >
          <FaTimes color="red" size={16} strokeWidth={2.5} />
        </button>

        {/* ===== HERO SECTION ===== */}
        <div className="relative h-72 md:h-96 w-full overflow-hidden rounded-t-3xl">
          <img
            src={selectedProject.screenshots[0]}
            alt="project preview"
            className="w-full h-full object-cover"
          />

          {/* Dark Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

          {/* Tech Badge */}
          <div className="absolute top-5 right-5 bg-black/40 backdrop-blur-md p-3 rounded-full">
            {selectedProject.type === "Frontend" ? (
              <FaReact size={26} style={{ color: "#61DBFB" }} />
            ) : (
              <FaNodeJs size={26} style={{ color: "#68A063" }} />
            )}
          </div>

          {/* Title Overlay */}
          <div className="absolute bottom-6 left-6">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white">
              {selectedProject.name}
            </h2>
            <p className="text-sm text-gray-300 mt-2 max-w-xl">{selectedProject.description}</p>
          </div>
        </div>

        {/* ===== CONTENT SECTION ===== */}
        <div className="p-6 md:p-10 flex flex-col gap-10">
          {/* Metadata Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
            <div>
              <p className="text-[var(--text-secondary)]">Role</p>
              <p className="font-medium">{selectedProject.role}</p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)]">Duration</p>
              <p className="font-medium">{selectedProject.duration}</p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)]">Status</p>
              <p className="font-medium">{selectedProject.status}</p>
            </div>
            <div>
              <p className="text-[var(--text-secondary)]">Team</p>
              <p className="font-medium">{selectedProject.team}</p>
            </div>
          </div>

          {/* Divider */}
          <div className="h-px w-full bg-[var(--border)]" />

          {/* Problem */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Problem</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {selectedProject.problem}
            </p>
          </div>

          {/* Solution */}
          <div>
            <h3 className="text-xl font-semibold mb-2">Solution</h3>
            <p className="text-[var(--text-secondary)] leading-relaxed">
              {selectedProject.solution}
            </p>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Key Features</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {selectedProject.features.map((feat, i) => (
                <div
                  key={i}
                  className="p-4 rounded-xl border backdrop-blur-sm"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--card)",
                  }}
                >
                  {feat}
                </div>
              ))}
            </div>
          </div>

          {/* Screenshots */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Screenshots</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {selectedProject.screenshots.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt="screenshot"
                  className="rounded-xl shadow-lg object-cover w-full"
                />
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="flex flex-wrap gap-4 pt-6">
            {selectedProject.github && (
              <a
                href={selectedProject.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 rounded-full font-medium border transition hover:scale-105"
                style={{
                  borderColor: "var(--primary)",
                  color: "var(--primary)",
                }}
              >
                <FaGithub />
                View Code
              </a>
            )}

            {selectedProject.live && (
              <a
                href={selectedProject.live}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-medium transition hover:scale-105"
                style={{
                  backgroundColor: "var(--primary)",
                  color: "var(--text-light)",
                }}
              >
                Live Demo
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DetailedModal;
