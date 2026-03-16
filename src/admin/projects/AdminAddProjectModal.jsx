import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { Section } from "../../components/admin/projects/Section";
import { DynamicList } from "../../components/admin/projects/DynamicList";
import { Input } from "../../components/admin/projects/Input";
import { Textarea } from "../../components/admin/projects/Textarea";
import ProjectCard from "../../components/project/ProjectCard";
import { BLANK_FORM, validateProj } from "../../utils/helper";
import AdminAddScreenshot from "./AdminAddScreenshot";

export default function AdminAddProjectModal({ isOpen, onClose, onSave, item, loading }) {
  const [rawFiles, setRawFiles] = useState([]);
  const [form, setForm] = useState(BLANK_FORM);

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen) {
      if (item) {
        setForm({
          ...BLANK_FORM,
          ...item,
          features: item.features?.length ? item.features : [""],
          tech: item.tech?.length ? item.tech : [""],
        });
      } else {
        setForm(BLANK_FORM);
      }
    }
  }, [item, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleArrayChange = (index, field, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const addArrayField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (index, field) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  const handleScreenshotUpload = (e) => {
    const files = Array.from(e.target.files);

    // Store the raw files for the API call
    setRawFiles(files);

    // Store the previews for the Live Preview UI
    const previews = files.map((file) => URL.createObjectURL(file));
    setForm({ ...form, screenshots: previews });
  };

  const handleSubmit = () => {
    if (!validateProj(form, setErrors, item, rawFiles)) return;
    onSave(form, rawFiles, item?.slug, !!item);
  };
  const handleClose = () => {
    // form.screenshots.forEach((url) => {
    //   if (url.startsWith("blob:")) URL.revokeObjectURL(url);
    // });
    setForm(BLANK_FORM);
    setRawFiles([]);
    setErrors({});

    setTimeout(() => {
      onClose();
    }, 0);
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] font-sans">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      {/* Modal Wrapper */}
      <div className="absolute inset-0 flex justify-center items-start overflow-y-auto py-10 px-6">
        <div
          className="
          w-full
          max-w-7xl
          bg-[var(--card)]
          border border-[var(--border)]
          rounded-2xl
          shadow-xl
          p-8
        "
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold">{item ? "Edit Project" : "Add Project"}</h3>

            <button onClick={handleClose}>
              <X size={20} />
            </button>
          </div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-12">
            {/* ================= LEFT : FORM ================= */}
            <div className="space-y-8 max-h-[80vh] overflow-y-auto pr-4">
              {/* BASIC INFO */}
              <Section title="Basic Information">
                <Input
                  name="title"
                  placeholder="Project Name"
                  value={form.title}
                  onChange={handleChange}
                  error={errors.title}
                />

                <Input
                  name="type"
                  placeholder="Type (Fullstack / Frontend)"
                  value={form.type}
                  onChange={handleChange}
                  error={errors.type} // Added
                />

                <Textarea
                  name="description"
                  placeholder="Short Description"
                  value={form.description}
                  onChange={handleChange}
                  error={errors.description}
                />

                <Input
                  name="role"
                  placeholder="Your Role"
                  value={form.role}
                  onChange={handleChange}
                  error={errors.role} // Added
                />

                <Input
                  name="duration"
                  placeholder="Duration (Jan 2025 – Mar 2025)"
                  value={form.duration}
                  onChange={handleChange}
                  error={errors.duration} // Added
                />

                <Input
                  name="team"
                  placeholder="Team (Solo / 3 Members)"
                  value={form.team}
                  onChange={handleChange}
                  error={errors.team} // Added
                />

                <Input
                  name="year"
                  placeholder="Year"
                  value={form.year}
                  onChange={handleChange}
                  error={errors.year}
                />
              </Section>

              {/* LINKS */}
              <Section title="Links">
                <Input
                  name="github"
                  placeholder="GitHub URL"
                  value={form.github}
                  onChange={handleChange}
                  error={errors.github} // Added
                />

                <Input
                  name="live"
                  placeholder="Live URL"
                  value={form.live}
                  onChange={handleChange}
                  error={errors.live} // Added
                />

                <select
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                  className="input-glass"
                >
                  <option value="Live">Live</option>
                  <option value="Development">Development</option>
                  <option value="Completed">Completed</option>
                </select>
              </Section>

              {/* PROBLEM & SOLUTION */}
              <Section title="Problem & Solution">
                <Textarea
                  name="problem"
                  placeholder="Problem Description"
                  value={form.problem}
                  onChange={handleChange}
                  error={errors.problem}
                />
                <Textarea
                  name="solution"
                  placeholder="Solution Description"
                  value={form.solution}
                  onChange={handleChange}
                  error={errors.solution}
                />
              </Section>

              {/* FEATURES */}
              <DynamicList
                title="Features"
                field="features"
                form={form}
                handleArrayChange={handleArrayChange}
                addArrayField={addArrayField}
                removeArrayField={removeArrayField}
                errors={errors}
              />

              {/* TECH STACK */}
              <DynamicList
                title="Tech Stack"
                field="tech"
                form={form}
                handleArrayChange={handleArrayChange}
                addArrayField={addArrayField}
                removeArrayField={removeArrayField}
                errors={errors}
              />
              <AdminAddScreenshot
                form={form}
                handleScreenshotUpload={handleScreenshotUpload}
                errors={errors}
                rawFiles={rawFiles || item?.screenshots}
                setRawFiles={setRawFiles}
                setForm={setForm}
              />

              {/* ACTION BUTTONS */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 border border-[var(--border)] rounded-xl"
                >
                  Cancel
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={loading} // Prevent multiple clicks
                  className={`
    px-6 py-2 rounded-xl bg-[var(--primary)] text-[var(--text-button)]
    flex items-center justify-center gap-2 transition-all
    ${loading ? "opacity-70 cursor-not-allowed" : "hover:brightness-110 active:scale-95"}
  `}
                >
                  {loading ? (
                    <>
                      <svg
                        className="animate-spin h-4 w-4 text-current"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      <span>Processing...</span>
                    </>
                  ) : item ? (
                    "Save Changes"
                  ) : (
                    "Save Project"
                  )}
                </button>
              </div>
            </div>

            {/* ================= RIGHT : LIVE PREVIEW ================= */}
            <div className="flex flex-col items-center">
              <h4 className="text-lg font-semibold mb-6">Live Preview</h4>

              <div className="sticky top-20 w-full flex justify-center">
                <ProjectCard
                  proj={{
                    ...form,
                    screenshots: form.screenshots.length
                      ? form.screenshots
                      : ["https://placehold.co/800x500"],
                  }}
                  preview
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
