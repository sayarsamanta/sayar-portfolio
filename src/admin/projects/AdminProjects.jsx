import { useState } from "react";
import { Pencil, Trash2, Plus } from "lucide-react";
import AdminAddProjectModal from "./AdminAddProjectModal";
import useProjectAPI from "../../hooks/useProjectAPI";
import { useSelector } from "react-redux";
import DeleteModal from "../../components/admin/DeleteModal";
import Button from "../../components/common/Button";

export default function AdminProjects() {
  const { projects } = useSelector((state) => state.projects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { fetchProjects, addProjectCall, deleteProjectAction, loading } = useProjectAPI();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCreate = async (form, rawFiles, slug, isEdit) => {
    const res = await addProjectCall(form, isEdit, slug, "", rawFiles);
    if (res) {
      await fetchProjects();
      setIsModalOpen(false);
    }
  };
  const handleDelete = (proj) => {
    setToDelete(proj);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    const { slug } = toDelete || "";
    await deleteProjectAction(slug);
    setDeleteModalOpen(false);
    setToDelete(null);
  };

  return (
    <div className="space-y-8 text-[var(--text-primary)]">
      <div className="flex flex-col sm:flex-row justify-between items-center sm:items-start gap-4 w-full">
        <div className="w-full">
          <h2 className="text-2xl font-semibold text-center sm:text-left">Projects</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1 text-center sm:text-left">
            Manage and edit your portfolio projects.
          </p>
        </div>

        <div className="w-full sm:w-auto flex justify-center sm:justify-end">
          <Button
            onClick={() => handleEdit(null)}
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
            Add Project
          </Button>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="p-10 text-center text-[var(--text-secondary)] rounded-2xl border border-[var(--border)]">
          No projects added yet.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {projects.map((project) => (
            <div
              key={project._id}
              className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 rounded-2xl shadow-sm md:shadow-md border border-[var(--border)] gap-4"
            >
              <div className="flex-1 w-full">
                <h3 className="text-lg md:text-xl font-semibold">
                  {project.name || project.title}
                </h3>

                <p className="text-sm mt-2 text-[var(--text-secondary)]">{project.description}</p>

                {project.tech?.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs rounded-full border border-[var(--border)] text-[var(--text-secondary)]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-3">
                  <span className="px-3 py-1 rounded-full text-xs bg-[var(--background)] border border-[var(--border)]">
                    {project.status}
                  </span>
                </div>
              </div>

              <div className="flex flex-shrink-0 gap-2 mt-2 md:mt-0">
                <Button
                  variant="edit"
                  onClick={() => handleEdit(project)}
                  className="p-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors"
                  icon={<Pencil size={16} />}
                />

                <Button
                  onClick={() => handleDelete(project)}
                  variant="secondarydelete"
                  className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                  icon={<Trash2 size={16} />}
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <AdminAddProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreate}
        item={selectedProject}
        loading={loading}
      />

      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        itemName={toDelete?.title || toDelete?.name}
      />
    </div>
  );
}
