import React from "react";
import AdminItemCard from "../../../components/AdminItemCard";
import { validateSection } from "../../../utils/helper";
import Button from "../../../components/common/Button";

const percentageOptions = Array.from({ length: 10 }, (_, i) => (i + 1) * 10);
const AboutSkillEditor = ({ about, skillForm, setSkillForm, updateItem, removeItem }) => {
  const handleClick = () => {
    if (!validateSection("Skills", skillForm)) {
      return;
    }

    updateItem("skills", skillForm);

    setSkillForm({
      id: "",
      name: "",
      percentage: "",
      type: "",
    });
  };
  return (
    <div className="rounded-2xl border border-[var(--border)] p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-2">Skills</h3>
      <div className="flex flex-wrap gap-2 mb-2">
        <input
          placeholder="Skill Name (React, Node, etc)"
          value={skillForm.name}
          onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)]
bg-[var(--input-bg)]
px-4 py-2.5
text-sm text-[var(--text-primary)]
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <select
          value={skillForm.percentage}
          onChange={(e) =>
            setSkillForm({
              ...skillForm,
              percentage: Number(e.target.value),
            })
          }
          className="bg-[var(--input-bg)]
      border border-[var(--border)]
      rounded-lg
      px-3 py-2
      text-sm
      focus:outline-none
      focus:border-[var(--primary)]
      transition w-full
    "
        >
          <option value="">Select Percentage</option>

          {percentageOptions.map((val) => (
            <option key={val} value={val}>
              {val}%
            </option>
          ))}
        </select>

        <select
          value={skillForm.type}
          onChange={(e) => setSkillForm({ ...skillForm, type: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)]
bg-[var(--input-bg)]
px-4 py-2.5 text-sm text-[var(--text-primary)]"
        >
          <option value="">Select Category</option>
          <option value="Frontend">Frontend</option>
          <option value="Backend">Backend</option>
          <option value="DevOps">DevOps</option>
          <option value="Tools">Tools</option>
        </select>
        <Button
          onClick={handleClick}
          variant="primary"
          className="px-5 py-2.5 text-sm font-medium
bg-[var(--primary)] text-[var(--text-button)]
rounded-lg
transition-all duration-200
hover:opacity-90
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          Add / Save
        </Button>
      </div>
      {about.skills?.map((item) => (
        <AdminItemCard
          key={item.id}
          type="skill"
          data={item}
          onDelete={() => removeItem("skills", item.id)}
        />
      ))}
    </div>
  );
};

export default AboutSkillEditor;
