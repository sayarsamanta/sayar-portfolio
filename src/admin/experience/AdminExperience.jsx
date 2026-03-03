import { useContext, useEffect, useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";
import AdminAddExperienceModal from "./AdminAddExperienceModal";
import DeleteModal from "../../components/admin/DeleteModal";
// import DeleteModal from "../../components/DeleteModal"; // if you already have a delete modal

export default function AdminExperience() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }, [darkMode]);
  const [experiences, setExperiences] = useState([
    // sample data
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
  ]);

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  // ------------------ Handlers ------------------
  const handleAddNew = () => {
    setSelectedExperience(null);
    setModalOpen(true);
  };

  const handleEdit = (exp) => {
    setSelectedExperience(exp);
    setModalOpen(true);
  };

  const handleDelete = (exp) => {
    setToDelete(exp);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setExperiences((prev) => prev.filter((e) => e.id !== toDelete.id));
    setDeleteModalOpen(false);
    setToDelete(null);
  };

  const handleSave = (data, isEdit) => {
    if (isEdit) {
      setExperiences((prev) => prev.map((e) => (e.id === data.id ? data : e)));
    } else {
      setExperiences((prev) => [...prev, { ...data, id: Date.now() }]);
    }
  };

  return (
    <div className="p-8 space-y-6 font-sans">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Experience</h1>
        <button
          onClick={handleAddNew}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded"
        >
          <Plus size={16} />
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div
            key={exp.id}
            className="p-4 bg-[var(--card)] border border-[var(--border)] rounded flex justify-between items-start"
          >
            <div>
              {/* Role + Company */}
              <h3 className="text-lg font-semibold">
                {exp.role} @ {exp.company}
              </h3>

              {/* Duration + Location */}
              <p className="text-sm text-gray-500 mt-1">
                {exp.duration} | {exp.location}
              </p>

              {/* Description */}
              <p className="text-sm mt-2 text-[var(--text-muted)]">
                {exp.description}
              </p>

              {/* Technologies */}
              <p className="text-sm mt-1 text-[var(--text-muted)]">
                <strong>Technologies:</strong> {exp.tech.join(", ")}
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(exp)}
                className="p-2 bg-yellow-400 rounded"
                title="Edit"
              >
                <Edit2 size={16} />
              </button>
              <button
                onClick={() => handleDelete(exp)}
                className="p-2 bg-red-500 rounded text-white"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modals */}
      <AdminAddExperienceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        item={selectedExperience}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={toDelete?.role + " @ " + toDelete?.company}
      />
    </div>
  );
}
