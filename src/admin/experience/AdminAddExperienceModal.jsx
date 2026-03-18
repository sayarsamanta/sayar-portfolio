import { useState, useEffect } from "react";
import { Trash2, X } from "lucide-react";
import { createPortal } from "react-dom";
import { Section } from "../../components/admin/projects/Section";
import { Input } from "../../components/admin/projects/Input";
import TimelineExpCard from "../../components/experience/TimelineExpCard";
import { formatDuration, parseDuration, validateExp } from "../../utils/helper";
import { Textarea } from "../../components/admin/projects/Textarea";

export default function AdminAddExperienceModal({ isOpen, onClose, onSave, item }) {
  const [form, setForm] = useState({
    company: "",
    role: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
    tech: [""],
    id: null,
    isPresent: false,
  });

  const [errors, setErrors] = useState({});
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    if (item) {
      const parsed = parseDuration(item?.duration);
      setForm({
        company: item.company || "",
        role: item.role || "",
        startDate: parsed.startDate || "",
        endDate: parsed.endDate || "",
        location: item.location || "",
        description: item.description || "",
        tech: item.tech?.length ? item.tech : [""],
        id: item.id,
        isPresent: parsed.current,
      });
    } else {
      setForm({
        company: "",
        role: "",
        startDate: "",
        endDate: "",
        isPresent: false,
        location: "",
        description: "",
        tech: [""],
        id: null,
      });
    }
    setErrors({});
  }, [item, isOpen]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleArrayChange = (index, value) => {
    const updated = [...form?.tech];
    updated[index] = value;
    setForm({ ...form, tech: updated });
    setErrors((prev) => ({
      ...prev,
      tech: "",
    }));
  };

  const addTechnology = () => setForm({ ...form, tech: [...form?.tech, ""] });

  const removeTechnology = (index) => {
    const updated = [...form.tech];
    updated.splice(index, 1);
    setForm({ ...form, tech: updated });
  };

  const handlePresentChange = (e) => {
    const checked = e.target.checked;

    setForm((prev) => ({
      ...prev,
      isPresent: checked,
      endDate: checked ? "" : prev.endDate,
    }));
  };

  const handleSubmitAction = () => {
    if (!validateExp(form, setErrors)) {
      return;
    }
    onSave(form, !!item, item?.slug, item?._id);
  };

  if (!isOpen) return null;

  const previewData = {
    company: form.company || "Company Name",
    role: form.role || "Role Title",
    duration: formatDuration(form.startDate, form.endDate),
    description: form.description || "Experience description preview will appear here.",
    tech: form.tech && form.tech.length > 0 && form.tech.filter((t) => t.trim() !== ""),
    id: form.id || "preview",
  };

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div className="absolute inset-0 flex justify-center items-start overflow-y-auto py-10 px-4">
        <div className="w-full max-w-5xl bg-[var(--card)] border border-[var(--border)] rounded-md shadow-xl p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-xl font-semibold">{item ? "Edit Experience" : "Add Experience"}</h3>

            <button
              onClick={onClose}
              className="p-2 rounded-md hover:bg-[var(--bg-soft)] transition"
            >
              <X size={20} />
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-10">
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
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[var(--text-secondary)]">Start Date</label>

                    <Input
                      type="month"
                      name="startDate"
                      value={form.startDate || ""}
                      onChange={handleChange}
                      className="px-4 py-2
      rounded-md
      border border-[var(--border)]
      bg-[var(--bg-soft)]
      text-[var(--text-primary)]"
                      error={errors.startDate}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-xs text-[var(--text-secondary)]">End Date</label>

                    <Input
                      type="month"
                      name="endDate"
                      disabled={form.isPresent}
                      value={form.endDate || ""}
                      onChange={handleChange}
                      className={`px-4 py-2
    rounded-md
    border border-[var(--border)]
    ${form.isPresent ? "bg-[var(--bg-disabled)]" : "bg-[var(--bg-soft)]"}
    text-[var(--text-primary)]`}
                      error={errors.endDate}
                    />
                    <label className="flex items-center gap-2 mt-2">
                      <input
                        type="checkbox"
                        checked={form.isPresent}
                        onChange={handlePresentChange}
                      />
                      Currently working here
                    </label>
                  </div>
                </div>

                <Textarea
                  name="description"
                  placeholder="Short Description"
                  value={form.description}
                  onChange={handleChange}
                  error={errors.description}
                />
                <Input
                  name="location"
                  placeholder="Location"
                  value={form.location}
                  onChange={handleChange}
                />
              </Section>

              <Section title="Technologies Used">
                {form.tech &&
                  form.tech.length > 0 &&
                  form.tech.map((tech, index) => (
                    <div key={index} className="flex gap-3 items-start mb-3 w-full">
                      {/* Input container takes 80% */}
                      <div className="flex-[0_0_80%]">
                        <Input
                          type="text"
                          value={tech}
                          onChange={(e) => handleArrayChange(index, e.target.value)}
                          placeholder="Technology"
                          error={errors.tech}
                          className="w-full"
                        />
                      </div>

                      {/* Icon Button container takes 20% */}
                      {form.tech.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeTechnology(index)}
                          title="Remove technology"
                          className="flex-[0_0_5%] h-[42px] flex items-center justify-center text-red-500 hover:text-red-700 transition-colors"
                        >
                          <Trash2 size={18} />
                        </button>
                      )}
                    </div>
                  ))}

                <button
                  type="button"
                  onClick={addTechnology}
                  className="mt-2 text-sm px-4 py-2 rounded-md border border-dashed border-[var(--border)] hover:bg-[var(--bg-soft)] flex items-center gap-2"
                >
                  <span>+</span> Add Technology
                </button>
              </Section>
            </div>
            <div className="space-y-4 sticky top-6 h-fit">
              <h4 className="text-sm font-medium text-[var(--text-secondary)]">Live Preview</h4>

              <div className="border border-[var(--border)] rounded-md p-4 bg-[var(--bg-soft)]">
                <TimelineExpCard
                  {...previewData}
                  tech={previewData.tech}
                  index={0}
                  expandedId={expandedId}
                  setExpandedId={setExpandedId}
                  fromPreview={true}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-10">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-md border border-[var(--border)] hover:bg-[var(--bg-soft)]"
            >
              Cancel
            </button>

            <button
              onClick={handleSubmitAction}
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
