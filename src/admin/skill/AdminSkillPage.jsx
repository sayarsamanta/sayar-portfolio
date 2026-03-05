import { useContext, useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

export default function AdminSkillPage() {
  const [skills, setSkills] = useState(["React", "Node.js", "MongoDB"]); // initial skills

  const [newSkill, setNewSkill] = useState("");

  const { darkMode, setDarkMode } = useContext(ThemeContext);

  // Add new skill
  const handleAddSkill = () => {
    const skill = newSkill.trim();
    if (!skill) return; // ignore empty input
    if (skills.includes(skill)) return; // avoid duplicates
    setSkills((prev) => [...prev, skill]);
    setNewSkill("");
  };

  // Delete skill
  const handleDeleteSkill = (skill) => {
    setSkills((prev) => prev.filter((s) => s !== skill));
  };

  return (
    <div className="p-8 space-y-6 font-sans">
      <h1 className="text-2xl font-semibold">Admin Skills</h1>

      {/* Add New Skill */}
      <div className="flex gap-2 items-center">
        <input
          type="text"
          placeholder="Add new skill"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          className="border border-[var(--border)] rounded px-3 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
        />
        <button
          onClick={handleAddSkill}
          className="flex items-center gap-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          <Plus size={16} /> Add
        </button>
      </div>

      {/* Skill List */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {skills.map((skill) => (
          <div
            key={skill}
            className="flex justify-between items-center bg-[var(--card)] border border-[var(--border)] rounded px-3 py-2"
          >
            <span className="text-sm font-medium">{skill}</span>
            <button
              onClick={() => handleDeleteSkill(skill)}
              className="p-1 text-red-600 hover:text-red-800"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
