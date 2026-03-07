import React from "react";
import AdminItemCard from "../../../components/AdminItemCard";

const AboutInterestEditor = ({
  interestInput,
  setInterestInput,
  about,
  addInterest,
  removeInterest,
}) => {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 space-y-4">
      <h3 className="text-lg font-semibold mb-2">Personal Interests</h3>
      <div className="flex gap-2 mb-2">
        <input
          placeholder="Interest"
          value={interestInput}
          onChange={(e) => setInterestInput(e.target.value)}
          className="w-full rounded-lg border border-[var(--border)] 
bg-[var(--input-bg)] 
px-4 py-2.5 
text-sm text-[var(--text-primary)] 
placeholder:text-sm placeholder:text-[var(--text-secondary)] placeholder:opacity-70
focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <button
          onClick={addInterest}
          className="px-3 bg-[var(--primary)] text-[var(--text-button)] rounded-md"
        >
          Add
        </button>
      </div>
      {about.personalInterests.map((item, id) => (
        <AdminItemCard key={item} type="interest" data={item} onDelete={() => removeInterest(id)} />
      ))}
    </div>
  );
};

export default AboutInterestEditor;
