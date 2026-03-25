import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import TimelineExpCard from "../../components/experience/TimelineExpCard";

import EmptySection from "../../components/admin/experience/EmptySection";
import useExperienceAPI from "../../hooks/useExperienceAPI";

export default function Experience() {
  const experienceData = useSelector((state) => state.experience.exp);
  const { fetchExperience } = useExperienceAPI();
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadExperience = async () => {
      setLoading(true);
      await fetchExperience();
      setLoading(false);
    };
    if (!experienceData || experienceData?.length === 0) {
      loadExperience();
    }
  }, [fetchExperience, experienceData]);

  return (
    <div
      className="min-h-screen w-full py-16 px-4 md:px-6 pb-20 sm:pb-24 md:pb-32   "
      style={{ background: "var(--gradient-bg)" }}
    >
      {!loading && experienceData.length === 0 && <EmptySection type={"Experience"} />}

      {!loading && experienceData.length > 0 && (
        <>
          <h1 className="text-4xl font-heading font-bold text-center mb-10 mt-14">Experience</h1>

          <div className="relative max-w-4xl mx-auto">
            <div
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
                  >
                    <div className="absolute left-1/2 -translate-x-1/2 top-3 w-3 h-3 rounded-full bg-[var(--primary)] z-10 shadow-md"></div>
                    <motion.div
                      className="rounded-xl max-w-sm cursor-pointer hover:shadow-md transition"
                      style={{ background: "var(--gradient-bg)" }}
                    >
                      <TimelineExpCard
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
        </>
      )}
    </div>
  );
}
