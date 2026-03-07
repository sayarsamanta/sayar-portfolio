import React from "react";
import AdminItemCard from "../../../components/AdminItemCard";

const AboutAchievementEditor = ({ achForm, setAchForm, updateItem, about, removeItem }) => {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-2">Achievements</h3>
      <div className="flex gap-2 flex-wrap mb-2">
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
        <input
          placeholder="Icon"
          value={achForm.icon}
          onChange={(e) => setAchForm({ ...achForm, icon: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <button
          onClick={() => {
            updateItem("achievements", achForm);
            setAchForm({
              id: "",
              title: "",
              year: "",
              description: "",
              icon: "",
            });
          }}
          className="px-5 py-2.5 text-sm font-medium 
bg-[var(--primary)] text-[var(--text-button)] 
rounded-lg 
transition-all duration-200 
hover:opacity-90 
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        >
          Add / Save
        </button>
      </div>

      {about.achievements.map((item) => (
        <AdminItemCard
          key={item.id}
          type="achievement"
          data={item}
          onDelete={() => removeItem("achievements", item.id)}
        />
      ))}
    </div>
  );
};

export default AboutAchievementEditor;
