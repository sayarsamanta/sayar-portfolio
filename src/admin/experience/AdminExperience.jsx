import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../../components/admin/DeleteModal";
import AdminAddExperienceModal from "./AdminAddExperienceModal";
import { useSelector } from "react-redux";
import EmptySection from "../../components/admin/experience/EmptySection";
import useExperienceAPI from "../../hooks/useExperienceAPI";

export default function AdminExperience() {
  const { exp } = useSelector((state) => state.experience || {});
  console.log(exp);
  const { addExperienceCall, deleteExperienceAction } = useExperienceAPI();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  // Handlers
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

  const confirmDelete = async () => {
    const { slug } = toDelete || "";
    await deleteExperienceAction(slug);
    setDeleteModalOpen(false);
    setToDelete(null);
  };

  const handleSubmit = async (form, isEdit, slug, id) => {
    if (isEdit) {
      await addExperienceCall(form, isEdit, slug, id);
      setModalOpen(false);
    } else {
      await addExperienceCall(form);
      setModalOpen(false);
    }
  };

  return (
    <div className="p-6 md:p-8 space-y-6 font-sans min-h-screen bg-[var(--background)]">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 w-full">
        {/* Heading */}
        <h1 className="text-4xl sm:text-4xl md:text-4xl font-heading font-bold text-center sm:text-left w-full sm:w-auto">
          Experience
        </h1>

        {/* Add Experience button */}
        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <button
            className="px-6 py-3 bg-[var(--primary)] text-[var(--text-button)] rounded-md shadow-md"
            onClick={handleAddNew}
          >
            Add Experience
          </button>
        </div>
      </div>
      {exp?.length === 0 && <EmptySection isAdmin={true} type={"Experience"} />}

      {/* Experience List */}
      {exp?.length > 0 && (
        <div className="flex flex-col w-full gap-4">
          {exp?.map((exp) => (
            <div
              key={exp._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 bg-[var(--card)] rounded-2xl shadow-sm md:shadow-md border border-[var(--border)] gap-4"
            >
              {/* Content */}
              <div className="flex-1 w-full">
                <h3 className="text-lg md:text-xl font-semibold">
                  {exp.role} @ {exp.company}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {exp.duration} {exp.location ? `| ${exp.location}` : ""}
                </p>

                <p className="text-sm mt-2 text-[var(--text-muted)]">{exp.description}</p>

                {exp.tech?.some((item) => item.trim() !== "") && (
                  <p className="text-sm mt-2 text-[var(--text-muted)]">
                    <strong>Technologies:</strong>{" "}
                    <span className="flex flex-wrap gap-2 mt-1">
                      {exp.tech.filter(Boolean).map((t, i) => (
                        <span
                          key={i}
                          className="px-2 py-1 text-xs rounded-full border border-[var(--border)] text-[var(--text-secondary)]"
                        >
                          {t}
                        </span>
                      ))}
                    </span>
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-shrink-0 gap-2 mt-2 md:mt-0">
                <button
                  onClick={() => handleEdit(exp)}
                  className="p-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors"
                  title="Edit"
                >
                  <Edit2 size={16} />
                </button>
                <button
                  onClick={() => handleDelete(exp)}
                  className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  title="Delete"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modals */}
      <AdminAddExperienceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSubmit}
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
