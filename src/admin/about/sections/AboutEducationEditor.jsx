import React from "react";
import AdminItemCard from "../../../components/AdminItemCard";
import { validateSection } from "../../../utils/helper";

const AboutEducationEditor = ({ eduForm, setEduForm, updateItem, about, removeItem }) => {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-2">Education</h3>
      <div className="flex gap-2 flex-wrap mb-2">
        <input
          placeholder="Degree"
          value={eduForm.degree}
          onChange={(e) => setEduForm({ ...eduForm, degree: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <input
          placeholder="Institution"
          value={eduForm.institution}
          onChange={(e) => setEduForm({ ...eduForm, institution: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <input
          placeholder="Duration"
          value={eduForm.duration}
          onChange={(e) => setEduForm({ ...eduForm, duration: e.target.value })}
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <button
          onClick={() => {
            if (!validateSection("Education", eduForm)){
              console.log("came here",eduForm)
              
              return;
            } 
            updateItem("education", eduForm);
            setEduForm({
              id: "",
              degree: "",
              institution: "",
              duration: "",
              location: "",
              grade: "",
              description: "",
              logo: "",
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
      {about.education.map((item) => (
        <AdminItemCard
          key={item.id}
          type="education"
          data={item}
          onDelete={() => removeItem("education", item.id)}
        />
      ))}
    </div>
  );
};

export default AboutEducationEditor;
