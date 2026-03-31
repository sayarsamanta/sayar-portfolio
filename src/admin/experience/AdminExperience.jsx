import { Edit2, Trash2 } from "lucide-react";
import { useState } from "react";
import DeleteModal from "../../components/admin/DeleteModal";
import AdminAddExperienceModal from "./AdminAddExperienceModal";
import { useSelector } from "react-redux";
import EmptySection from "../../components/admin/experience/EmptySection";
import useExperienceAPI from "../../hooks/useExperienceAPI";
import Button from "../../components/common/Button";

export default function AdminExperience() {
  const { exp } = useSelector((state) => state.experience || {});
  const { addExperienceCall, deleteExperienceAction, loading } = useExperienceAPI();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);

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
    <div className="space-y-8 text-[var(--text-primary)]">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 w-full">
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-center sm:text-left">Experience</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1 text-center sm:text-left">
            Manage and edit your professional experience.
          </p>
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Button
            onClick={handleAddNew}
            variant="primary"
            className="
              flex items-center justify-center gap-2
              px-4 py-2
              w-full sm:w-auto
              bg-[var(--primary)]
              text-[var(--text-button)]
              text-sm
              transition-all duration-200
              hover:opacity-90
            "
          >
            Add Experience
          </Button>
        </div>
      </div>

      {exp?.length === 0 ? (
        <div className="p-10 text-center text-[var(--text-secondary)] rounded-2xl border border-[var(--border)]">
          No experience added yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {exp?.map((exp) => (
            <div
              key={exp._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-2xl shadow-sm md:shadow-md border border-[var(--border)] gap-4"
            >
              <div className="flex-1 w-full">
                <h3 className="text-lg md:text-xl font-semibold">
                  {exp.role} @ {exp.company}
                </h3>

                <p className="text-sm text-[var(--text-secondary)] mt-1">
                  {exp.duration} {exp.location ? `| ${exp.location}` : ""}
                </p>

                <p className="text-sm mt-2 text-[var(--text-secondary)]">{exp.description}</p>

                {exp.tech?.some((item) => item.trim() !== "") && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {exp.tech.filter(Boolean).map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full border border-[var(--border)] text-[var(--text-secondary)]"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-shrink-0 gap-2 mt-2 md:mt-0">
                <Button
                  onClick={() => handleEdit(exp)}
                  variant="edit"
                  className="p-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors"
                  icon={<Edit2 size={16} />}
                />

                <Button
                  onClick={() => handleDelete(exp)}
                  variant="secondarydelete"
                  className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  icon={<Trash2 size={16} />}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminAddExperienceModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSubmit}
        item={selectedExperience}
        loading={loading}
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
