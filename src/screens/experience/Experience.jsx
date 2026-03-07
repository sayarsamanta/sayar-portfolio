import { useState, useContext } from "react";
import "./Experience.css";
import { ThemeContext } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import ExpCard from "../../components/experience/expCard";

export default function Experience() {
  const experienceData = useSelector((state) => state.experience.exp);
  const [expandedId, setExpandedId] = useState(null);
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className="min-h-screen w-full py-24 px-6"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* Section Title */}
      <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mb-20">Experience</h1>

      <div className="relative max-w-4xl mx-auto">
        {/* Center Line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full opacity-30"
          style={{
            background:
              "linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))",
          }}
        />

        <div className="flex flex-col gap-16 relative">
          {experienceData.map((exp, index) => {
            return (
              <ExpCard
                expandedId={expandedId}
                setExpandedId={setExpandedId}
                index={index}
                {...exp}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
