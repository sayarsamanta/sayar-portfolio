import { useEffect, useState } from "react";
import "./Experience.css";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import ExpCard from "../../components/experience/expCard";
import EmptySection from "../../components/admin/experience/EmptySection";
import useExperienceAPI from "../../hooks/useExperienceAPI";

export default function Experience() {
  const experienceData = useSelector((state) => state.experience.exp);
  const { fetchExperience } = useExperienceAPI();
  const [expandedId, setExpandedId] = useState(null);

  useEffect(() => {
    fetchExperience();
  }, []);

  return (
    <div
      className="min-h-screen w-full py-24 px-6"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* Section Title */}
      {experienceData && experienceData.length > 0 && (
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mb-20">
          Experience
        </h1>
      )}

      {experienceData && experienceData.length === 0 && <EmptySection type={"Experience"} />}

      {experienceData && experienceData.length > 0 && (
        <div className="relative max-w-5xl mx-auto">
          {/* Center Gradient Line */}
          <div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[4px] h-full opacity-30"
            style={{
              background:
                "linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))",
            }}
          />

          <div className="flex flex-col gap-16 relative">
            {experienceData.map((exp, index) => {
              const isLeft = index % 2 === 0; // alternate sides
              return (
                <div
                  key={exp._id}
                  className={`relative w-full flex ${isLeft ? "justify-start" : "justify-end"}`}
                >
                  {/* Dot on timeline */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-6 w-4 h-4 rounded-full bg-[var(--primary)] z-10 shadow-md"></div>

                  {/* Card without border */}
                  <motion.div
                    className="card-motion bg-[var(--card)] rounded-2xl p-6 max-w-md w-full"
                    layout
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ExpCard
                      expandedId={expandedId}
                      setExpandedId={setExpandedId}
                      index={index}
                      {...exp}
                    />
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
