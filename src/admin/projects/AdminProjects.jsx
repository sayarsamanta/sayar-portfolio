import { useContext, useEffect, useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import AdminAddProjectModal from "./AdminAddProjectModal";
import sample1 from "../../assets/sample1.jpg";
import sample2 from "../../assets/sample2.jpg";

const dummyProjects = [
  {
    id: 1,
    name: "DevTinder",
    type: "Fullstack",
    description: "A developer networking platform...",
    role: "Full Stack Developer",
    duration: "Jan 2025 – Mar 2025",
    team: "Solo",
    year: "2025",
    github: "https://github.com/yourusername/devtinder",
    live: "https://devtinder.live",
    problem: "Developers struggle to find collaboration partners...",
    solution: "Built a swipe-based matching platform...",
    features: [
      "Authentication with JWT",
      "Real-time notifications",
      "Premium subscription via Razorpay",
    ],
    tech: ["React", "Node.js", "MongoDB"],
    screenshots: [sample1, sample2],
    status: "Published",
  },
  {
    id: 2,
    name: "Portfolio Website",
    type: "Fullstack",
    description: "A developer networking platform...",
    role: "Full Stack Developer",
    duration: "Jan 2025 – Mar 2025",
    team: "Solo",
    year: "2025",
    github: "https://github.com/yourusername/devtinder",
    live: "https://devtinder.live",
    problem: "Developers struggle to find collaboration partners...",
    solution: "Built a swipe-based matching platform...",
    features: [
      "Authentication with JWT",
      "Real-time notifications",
      "Premium subscription via Razorpay",
    ],
    tech: ["React", "Node.js", "MongoDB"],
    screenshots: [sample1, sample2],
    status: "Draft",
  },
];

export default function AdminProjects() {
  const [projects, setProjects] = useState(dummyProjects);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const handleEdit = (project) => {
    setSelectedProject(project); // pass the project to modal
    setIsModalOpen(true); // open modal
  };

  return (
    <div className="space-y-8 text-[var(--text-primary)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage and edit your portfolio projects.
          </p>
        </div>

        <button
          className="
            flex items-center gap-2
            px-4 py-2
            rounded-xl
            bg-[var(--primary)]
            text-[var(--text-button)]
            text-sm
            transition-all duration-200
            hover:opacity-90
          "
          onClick={
            () =>
              handleEdit(null) /* pass null to indicate adding new project */
          }
        >
          <Plus size={16} />
          Add Project
        </button>
      </div>

      {/* Projects Table */}
      <div
        className="
          rounded-2xl
          border border-[var(--border)]
          bg-[var(--card)]
          overflow-hidden
        "
      >
        {projects.length === 0 ? (
          <div className="p-10 text-center text-[var(--text-secondary)]">
            No projects added yet.
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-[var(--background)]">
              <tr>
                <th className="text-left p-4 border-b border-[var(--border)]">
                  Title
                </th>
                <th className="text-left p-4 border-b border-[var(--border)]">
                  Tech Stack
                </th>
                <th className="text-left p-4 border-b border-[var(--border)]">
                  Status
                </th>
                <th className="text-right p-4 border-b border-[var(--border)]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr
                  key={project.id}
                  className="
                    border-b border-[var(--border)]
                    hover:bg-[var(--background)]
                    transition-all duration-150
                  "
                >
                  <td className="p-4 font-medium">{project.name}</td>

                  <td className="p-4 text-[var(--text-secondary)]">
                    {project.tech.join(", ")}
                  </td>

                  <td className="p-4">
                    <span
                      className="
                        px-3 py-1
                        rounded-full
                        text-xs
                        bg-[var(--background)]
                        border border-[var(--border)]
                      "
                    >
                      {project.status}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-end gap-3">
                      <button
                        className="
                          p-2
                          rounded-lg
                          border border-[var(--border)]
                          hover:border-[var(--primary)]
                          transition
                        "
                        onClick={() => handleEdit(project)}
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        className="
                          p-2
                          rounded-lg
                          border border-[var(--border)]
                          hover:border-red-500
                          transition
                        "
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <AdminAddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(newProject) =>
          setProjects([...projects, { ...newProject, id: Date.now() }])
        }
        item={selectedProject} // pass selected project for editing
      />
    </div>
  );
}
