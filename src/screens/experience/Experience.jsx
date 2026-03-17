import { useEffect, useState } from "react";
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
      className="min-h-screen w-full py-16 px-4 md:px-6"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >{experienceData && experienceData.length > 0 && (
        <h1 className="text-3xl md:text-5xl font-heading font-bold text-center mb-16">
          Experience
        </h1>
      )}

      {experienceData && experienceData.length === 0 && <EmptySection type={"Experience"} />}

      {experienceData && experienceData.length > 0 && (
        <div className="relative max-w-4xl mx-auto"><div
            className="absolute left-1/2 -translate-x-1/2 top-0 w-[3px] h-full opacity-30"
            style={{
              background:
                "linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))",
            }}
          />

          <div className="flex flex-col gap-10 relative">
            {experienceData.map((exp, index) => {
              const isLeft = index % 2 === 0;

              return (
                <div
                  key={exp._id}
                  className={`relative w-full flex ${isLeft ? "justify-start" : "justify-end"}`}
                ><div className="absolute left-1/2 -translate-x-1/2 top-3 w-3 h-3 rounded-full bg-[var(--primary)] z-10 shadow-md"></div><motion.div
                    className="bg-[var(--card)] rounded-xl p-4 max-w-xs md:max-w-sm w-full shadow-sm cursor-pointer hover:shadow-md transition"
                    layout
                    
                    
                    
                    
                    
                  >
                    <ExpCard
                      expandedId={expandedId}
                      setExpandedId={setExpandedId}
                      index={index}
                      {...exp}
                      compact={false} 
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
