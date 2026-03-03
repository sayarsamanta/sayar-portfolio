import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";
import { Section } from "../../components/admin/projects/Section";
import { DynamicList } from "../../components/admin/projects/DynamicList";
import { Input } from "../../components/admin/projects/Input";
import { Textarea } from "../../components/admin/projects/Textarea";
export default function AdminAddProjectModal({
  isOpen,
  onClose,
  onSave,
  item,
}) {
  const [form, setForm] = useState(() => ({
    name: "",
    type: "",
    description: "",
    role: "",
    duration: "",
    status: "Draft",
    team: "",
    year: "",
    github: "",
    live: "",
    problem: "",
    solution: "",
    features: [""],
    tech: [""],
    screenshots: item?.screenshots || [],
  }));

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (item) {
      setForm({
        name: item.name || "",
        type: item.type || "",
        description: item.description || "",
        role: item.role || "",
        duration: item.duration || "",
        status: item.status || "Draft",
        team: item.team || "",
        year: item.year || "",
        github: item.github || "",
        live: item.live || "",
        problem: item.problem || "",
        solution: item.solution || "",
        features: item.features?.length ? item.features : [""],
        tech: item.tech?.length ? item.tech : [""],
        screenshots: item.screenshots || [],
        id: item.id, // keep id if you use it to update
      });
    } else {
      // reset form when no item
      setForm({
        name: "",
        type: "",
        description: "",
        role: "",
        duration: "",
        status: "Draft",
        team: "",
        year: "",
        github: "",
        live: "",
        problem: "",
        solution: "",
        features: [""],
        tech: [""],
        screenshots: [],
      });
    }
    setErrors({});
  }, [item, isOpen]);
  if (!isOpen) return null;

  // ---------- BASIC INPUT HANDLER ----------
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ---------- ARRAY HANDLER ----------
  const handleArrayChange = (index, field, value) => {
    const updated = [...form[field]];
    updated[index] = value;
    setForm({ ...form, [field]: updated });
  };

  const addArrayField = (field) => {
    setForm({ ...form, [field]: [...form[field], ""] });
  };

  const removeArrayField = (index, field) => {
    const updated = [...form[field]];
    updated.splice(index, 1);
    setForm({ ...form, [field]: updated });
  };

  // ---------- SCREENSHOT HANDLER ----------
  const handleScreenshotUpload = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => URL.createObjectURL(file));
    setForm({ ...form, screenshots: previews });
  };

  // ---------- VALIDATION ----------
  const validate = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Project name required";
    if (!form.description.trim())
      newErrors.description = "Description required";
    if (!form.year.trim()) newErrors.year = "Year required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    onSave(form);
    onClose();
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999] font-sans">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="absolute inset-0 flex justify-center items-start overflow-y-auto py-10">
        <div className="w-full max-w-4xl bg-[var(--card)] border border-[var(--border)] rounded-2xl p-8 shadow-xl space-y-8">
          {/* Header */}
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">
              {item ? "Edit Project" : "Add Project"}
            </h3>
            <button onClick={onClose}>
              <X size={20} />
            </button>
          </div>

          {/* ========== BASIC INFO ========== */}
          <Section title="Basic Information">
            <Input
              name="name"
              placeholder="Project Name"
              value={form.name}
              onChange={handleChange}
              error={errors.name}
            />
            <Input
              name="type"
              placeholder="Type (Fullstack / Frontend)"
              value={form.type}
              onChange={handleChange}
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
            />
            <Input
              name="duration"
              placeholder="Duration (Jan 2025 – Mar 2025)"
              value={form.duration}
              onChange={handleChange}
            />
            <Input
              name="team"
              placeholder="Team (Solo / 3 Members)"
              value={form.team}
              onChange={handleChange}
            />
            <Input
              name="year"
              placeholder="Year"
              value={form.year}
              onChange={handleChange}
              error={errors.year}
            />
          </Section>

          {/* ========== LINKS ========== */}
          <Section title="Links">
            <Input
              name="github"
              placeholder="GitHub URL"
              value={form.github}
              onChange={handleChange}
            />
            <Input
              name="live"
              placeholder="Live URL"
              value={form.live}
              onChange={handleChange}
            />
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="input-glass"
            >
              <option value="Draft">Draft</option>
              <option value="Live">Live</option>
            </select>
          </Section>

          {/* ========== PROBLEM & SOLUTION ========== */}
          <Section title="Problem & Solution">
            <Textarea
              name="problem"
              placeholder="Problem Statement"
              value={form.problem}
              onChange={handleChange}
            />
            <Textarea
              name="solution"
              placeholder="Solution Description"
              value={form.solution}
              onChange={handleChange}
            />
          </Section>

          {/* ========== FEATURES ========== */}
          <DynamicList
            title="Features"
            field="features"
            form={form}
            handleArrayChange={handleArrayChange}
            addArrayField={addArrayField}
            removeArrayField={removeArrayField}
          />

          {/* ========== TECH STACK ========== */}
          <DynamicList
            title="Tech Stack"
            field="tech"
            form={form}
            handleArrayChange={handleArrayChange}
            addArrayField={addArrayField}
            removeArrayField={removeArrayField}
          />

          {/* ========== SCREENSHOTS ========== */}
          <Section title="Screenshots">
            <input type="file" multiple onChange={handleScreenshotUpload} />
            <div className="grid grid-cols-3 gap-4 mt-4">
              {form.screenshots.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  className="rounded-lg border border-[var(--border)]"
                />
              ))}
            </div>
          </Section>

          {/* Submit */}
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
              {item ? "Save Changes" : "Save Project"}
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
