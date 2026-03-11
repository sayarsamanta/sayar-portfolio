import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { Section } from "../../components/admin/projects/Section";
import { Input } from "../../components/admin/projects/Input";
import ExpCard from "../../components/experience/ExpCard";
import { formatDuration } from "../../utils/helper";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

const modules = {
  toolbar: [
    ["bold", "italic"],
    [{ list: "bullet" }, { list: "ordered" }],
  ],
};
export default function AdminAddExperienceModal({ isOpen, onClose, onSave, item }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    technologies: [""],
    id: null,
    isPresent: false,
  });

  const [errors, setErrors] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (item) {
      setForm({
        company: item.company || "",
        role: item.role || "",
        duration: item.duration || "",
        location: item.location || "",
        description: item.description || "",
        technologies: item.technologies?.length ? item.technologies : [""],
        id: item.id,
      });
    } else {
      setForm({
        company: "",
        role: "",
        duration: "",
        location: "",
        description: "",
        technologies: [""],
        id: null,
      });
    }
    setErrors({});
  }, [item, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index, value) => {
    const updated = [...form.technologies];
    updated[index] = value;
    setForm({ ...form, technologies: updated });
  };

  const addTechnology = () => setForm({ ...form, technologies: [...form.technologies, ""] });

  const removeTechnology = (index) => {
    const updated = [...form.technologies];
    updated.splice(index, 1);
    setForm({ ...form, technologies: updated });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.company.trim()) newErrors.company = "Company required";
    if (!form.role.trim()) newErrors.role = "Role required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePresentChange = (e) => {
    const checked = e.target.checked;

    setForm((prev) => ({
      ...prev,
      isPresent: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const cleanDescription = form.description?.replace(/<(.|\n)*?>/g, "").trim();
    console.log(cleanDescription);
    // onSave(form, !!item);
    // onClose();
  };

  if (!isOpen) return null;

  const previewData = {
    company: form.company || "Company Name",
    role: form.role || "Role Title",
    duration: formatDuration(form.startDate, form.endDate),
    description: form.description || "Experience description preview will appear here.",
    technologies: form.technologies.filter((t) => t.trim() !== ""),
    id: form.id || "preview",
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* backdrop */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="absolute inset-0 flex justify-center items-start overflow-y-auto py-10 px-4">
        <div className="w-full max-w-5xl bg-[var(--card)] border border-[var(--border)] rounded-md shadow-xl p-8">
          {/* header */}
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold">{item ? "Edit Experience" : "Add Experience"}</h3>

            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-[var(--bg-soft)] transition"
            >
              <X size={20} />
            </button>
          </div>

          {/* layout */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
            {/* FORM */}
            <div className="space-y-6">
              <Section title="Basic Info">
                <Input
                  name="company"
                  placeholder="Company Name"
                  value={form.company}
                  onChange={handleChange}
                  error={errors.company}
                  className={"rounded-sm"}
                />

                <Input
                  name="role"
                  placeholder="Your Role"
                  value={form.role}
                  onChange={handleChange}
                  error={errors.role}
                />

                <div className="grid grid-cols-2 gap-4">
                  {/* Start Date */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[var(--text-secondary)]">Start Date</label>

                    <input
                      type="month"
                      name="startDate"
                      value={form.startDate || ""}
                      onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                      className="px-4 py-2
      rounded-md
      border border-[var(--border)]
      bg-[var(--bg-soft)]
      text-[var(--text-primary)]"
                    />
                  </div>

                  {/* End Date */}
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[var(--text-secondary)]">End Date</label>

                    <input
                      type="month"
                      name="endDate"
                      disabled={form.isPresent}
                      value={form.endDate || ""}
                      onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                      className={`px-4 py-2
    rounded-md
    border border-[var(--border)]
    ${form.isPresent ? "bg-[var(--bg-disabled)]" : "bg-[var(--bg-soft)]"}
    text-[var(--text-primary)]`}
                    />
                    <label className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        checked={setForm.isPresent}
                        onChange={handlePresentChange}
                      />
                      Currently working here
                    </label>
                  </div>
                </div>

                {/* <Textarea
                  name="description"
                  placeholder="Short Description"
                  value={form.description}
                  onChange={handleChange}
                /> */}
                <div
                  className="
                  input-glass rounded-md overflow-hidden
                  [&_.ql-toolbar]:bg-transparent
                  [&_.ql-container]:bg-transparent
                  [&_.ql-toolbar]:border-none
                  [&_.ql-container]:border-none
"
                >
                  <ReactQuill
                    theme="snow"
                    value={form.description}
                    onChange={(value) =>
                      setForm((prev) => ({
                        ...prev,
                        description: value,
                      }))
                    }
                    className="w-full min-h-[150px]"
                  />
                </div>

                <Input
                  name="location"
                  modules={modules}
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                />
              </Section>

              <Section title="Technologies Used">
                {form.technologies.map((tech, index) => (
                  <div key={index} className="flex gap-3 items-center">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleArrayChange(index, e.target.value)}
                      placeholder="Technology"
                      className="flex-1 px-4 py-2 rounded-md border border-[var(--border)] bg-[var(--bg-soft)]"
                    />

                    {form.technologies.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        className="text-xs px-3 py-1 rounded-md bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addTechnology}
                  className="text-sm px-4 py-2 rounded-md border border-dashed border-[var(--border)] hover:bg-[var(--bg-soft)]"
                >
                  + Add Technology
                </button>
              </Section>
            </div>

            {/* PREVIEW */}
            <div className="space-y-4 sticky top-6 h-fit">
              <h4 className="text-sm font-medium text-[var(--text-secondary)]">Live Preview</h4>

              <div className="border border-[var(--border)] rounded-md p-4 bg-[var(--bg-soft)]">
                <ExpCard
                  {...previewData}
                  tech={previewData.technologies}
                  index={0}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                  fromPreview={true}
                />
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-[var(--border)] hover:bg-[var(--bg-soft)]"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-md bg-[var(--primary)] text-[var(--text-button)]"
            >
              {item ? "Save Changes" : "Add Experience"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
