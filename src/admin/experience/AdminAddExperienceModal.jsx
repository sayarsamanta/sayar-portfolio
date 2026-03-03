import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { Section } from "../../components/admin/projects/Section";
import { Input } from "../../components/admin/projects/Input";
import { Textarea } from "../../components/admin/projects/Textarea";

export default function AdminAddExperienceModal({
  isOpen,
  onClose,
  onSave,
  item,
}) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    duration: "",
    location: "",
    description: "",
    technologies: [""],
    id: null,
  });

  const [errors, setErrors] = useState({});

  // Sync form when editing
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

  // Basic input handler
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Array handler for technologies
  const handleArrayChange = (index, value) => {
    const updated = [...form.technologies];
    updated[index] = value;
    setForm({ ...form, technologies: updated });
  };

  const addTechnology = () =>
    setForm({ ...form, technologies: [...form.technologies, ""] });
  const removeTechnology = (index) => {
    const updated = [...form.technologies];
    updated.splice(index, 1);
    setForm({ ...form, technologies: updated });
  };

  // Validation
  const validate = () => {
    const newErrors = {};
    if (!form.company.trim()) newErrors.company = "Company required";
    if (!form.role.trim()) newErrors.role = "Role required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form, !!item); // isEdit flag
    onClose();
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="absolute inset-0 flex justify-center items-start overflow-y-auto py-10">
        <div className="w-full max-w-2xl bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-xl space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              {item ? "Edit Experience" : "Add Experience"}
            </h3>
            <button onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          <Section title="Basic Info">
            <Input
              name="company"
              placeholder="Company Name"
              value={form.company}
              onChange={handleChange}
              error={errors.company}
            />
            <Input
              name="role"
              placeholder="Your Role"
              value={form.role}
              onChange={handleChange}
              error={errors.role}
            />
            <Input
              name="duration"
              placeholder="Duration (Jan 2023 – Mar 2025)"
              value={form.duration}
              onChange={handleChange}
            />
            <Input
              name="location"
              placeholder="Location"
              value={form.location}
              onChange={handleChange}
            />
            <Textarea
              name="description"
              placeholder="Short Description"
              value={form.description}
              onChange={handleChange}
            />
          </Section>

          <Section title="Technologies Used">
            {form.technologies.map((tech, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={tech}
                  onChange={(e) => handleArrayChange(index, e.target.value)}
                  className="border p-2 rounded flex-1"
                  placeholder="Technology"
                />
                <button
                  type="button"
                  onClick={() => removeTechnology(index)}
                  className="px-2 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={addTechnology}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add Technology
            </button>
          </Section>

          <div className="flex justify-end gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-[var(--border)] rounded-xl"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-6 py-2 rounded-xl bg-[var(--primary)] text-[var(--text-button)]"
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
