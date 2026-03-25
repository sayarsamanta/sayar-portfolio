import React from "react";
import AdminItemCard from "../../../components/AdminItemCard";
import { validateSection } from "../../../utils/helper";
import Button from "../../../components/common/Button";

const AboutAchievementEditor = ({ achForm, setAchForm, updateItem, about, removeItem }) => {
  const handleClick = () => {
    if (!validateSection("Achievments", achForm)) {
      return;
    }
    updateItem("achievements", achForm);
    setAchForm({
      id: "",
      title: "",
      year: "",
      description: "",
      icon: "",
    });
  };
  return (
    <div className="rounded-2xl border border-[var(--border)] p-4 sm:p-6 space-y-5 shadow-sm md:shadow-md">
      <h3 className="text-lg font-semibold">Achievements</h3>

      <div className="flex flex-col gap-2">
        <input
          placeholder="Title"
          value={achForm.title}
          onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] 
      bg-[var(--input-bg)] 
      px-4 py-2.5 
      text-sm text-[var(--text-primary)] 
      placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
      focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <input
          placeholder="Description"
          value={achForm.description}
          onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] 
      bg-[var(--input-bg)] 
      px-4 py-2.5 
      text-sm text-[var(--text-primary)] 
      placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
      focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <input
          placeholder="Year"
          value={achForm.year}
          onChange={(e) => setAchForm({ ...achForm, year: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] 
      bg-[var(--input-bg)] 
      px-4 py-2.5 
      text-sm text-[var(--text-primary)] 
      placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
      focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />

        <select
          value={achForm.type}
          onChange={(e) => setAchForm({ ...achForm, type: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] 
      bg-[var(--input-bg)] 
      px-4 py-2.5 
      text-sm text-[var(--text-primary)]
      focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          <option value="">Select Achievement Type</option>
          <option value="award">Award</option>
          <option value="competition">Competition</option>
          <option value="milestone">Milestone</option>
          <option value="certification">Certification</option>
        </select>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleClick}
          variant="primary"
          className="
        w-full sm:w-auto
        px-5 py-2.5 text-sm font-medium
        bg-[var(--primary)] text-[var(--text-button)]
        rounded-lg
        transition-all duration-200
        hover:opacity-90
        focus:outline-none focus:ring-2 focus:ring-[var(--primary)]
      "
        >
          Add / Save
        </Button>
      </div>

      <div className="space-y-3">
        {about.achievements.map((item) => (
          <AdminItemCard
            key={item.id}
            type="achievement"
            data={item}
            onDelete={() => removeItem("achievements", item.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default AboutAchievementEditor;
