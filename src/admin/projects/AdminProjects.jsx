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
  const { addProjectCall, deleteProjectAction, loading } = useProjectAPI();
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [toDelete, setToDelete] = useState(null);
  const handleEdit = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCreate = async (form, rawFiles, slug, isEdit) => {
    const res = await addProjectCall(form, isEdit, slug, "", rawFiles);
    if (res) {
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
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">Projects</h2>
          <p className="text-sm text-[var(--text-secondary)] mt-1">
            Manage and edit your portfolio projects.
          </p>
        </div>

        <Button
          onClick={() => handleEdit(null)}
          variant="primary"
          className="
            flex items-center gap-2
            px-4 py-2
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
            <thead style={{ background: "var(--gradient-bg)" }}>
              <tr>
                <th className="text-left p-4 border-b border-[var(--border)]">Title</th>
                <th className="text-left p-4 border-b border-[var(--border)]">Tech Stack</th>
                <th className="text-left p-4 border-b border-[var(--border)]">Status</th>
                <th className="text-right p-4 border-b border-[var(--border)]">Actions</th>
              </tr>
            </thead>

            <tbody>
              {projects.map((project) => (
                <tr
                  key={project._id}
                  className="
                    border-b border-[var(--border)]
                    hover:bg-[var(--gradient-bg)]
                    transition-all duration-150
                  "
                  style={{ background: "var(--gradient-bg)" }}
                >
                  <td className="p-4 font-medium">{project.name || project.title}</td>

                  <td className="p-4 text-[var(--text-secondary)]">{project.tech.join(", ")}</td>

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
                      <Button
                        variant="edit"
                        onClick={() => {
                          handleEdit(project);
                        }}
                        className="p-2 bg-yellow-400 rounded-full hover:bg-yellow-500 transition-colors"
                        icon={<Pencil size={16} />}
                      ></Button>

                      <Button
                        onClick={() => handleDelete(project)}
                        variant="secondarydelete"
                        className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                        icon={<Trash2 size={16} />}
                      ></Button>
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
