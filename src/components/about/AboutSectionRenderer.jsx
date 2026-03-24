import { motion } from "framer-motion";
import { FaTrophy, FaMedal, FaRocket, FaCertificate } from "react-icons/fa";

const iconMap = {
  award: FaTrophy,
  competition: FaMedal,
  milestone: FaRocket,
  certification: FaCertificate,
};

export default function AboutSectionRenderer({ type, items }) {
  if (!items || items.length === 0) return null;

  switch (type) {
    case "skills":
      return (
        <div
          className={`grid gap-4 sm:gap-6 text-left ${
            items.length === 1 ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {items.map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className=" border border-[var(--border)]
              rounded-xl sm:rounded-2xl
              p-4 sm:p-5 md:p-6
              transition-all duration-200
              hover:border-[var(--primary)] hover:shadow-xl"
            >
              <div className="flex justify-between mb-3 font-heading font-medium text-sm sm:text-base">
                <span className="min-w-0 break-words">{skill.name}</span>
                <span className="text-[var(--text-secondary)] text-xs sm:text-sm">
                  {skill.percentage}%
                </span>
              </div>

              <div className="h-2 bg-[var(--background-alt)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-2 rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "achievements":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 text-left">
          {items.map((ach, idx) => {
            const Icon = iconMap[ach.type] || FaTrophy;

            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.02 }}
                className="border border-[var(--border)]
                rounded-xl sm:rounded-2xl
                p-4 sm:p-5 md:p-6
                transition-all duration-200
                hover:border-[var(--primary)] hover:shadow-lg
                flex flex-col gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="bg-[var(--primary)]/10 text-[var(--primary)] p-2 sm:p-3 rounded-lg">
                    <Icon size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading font-semibold text-sm sm:text-base md:text-lg leading-snug break-words">
                      {ach.title}
                    </h3>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed break-words">
                  {ach.description}
                </p>

                <div>
                  <span className="text-[10px] sm:text-xs px-2 py-1 rounded-md bg-[var(--border)] text-[var(--text-secondary)]">
                    {ach.year}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      );

    case "education":
      return (
        <div className="flex flex-col gap-4 sm:gap-6 text-left">
          {items.map((edu, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="border border-[var(--border)]
              rounded-xl sm:rounded-2xl
              p-4 sm:p-5 md:p-6
              flex flex-col gap-2
              md:flex-row md:justify-between md:items-center
              transition-all duration-200
              hover:border-[var(--primary)] hover:shadow-lg"
            >
              <div className="min-w-0">
                <h3 className="font-heading font-medium text-sm sm:text-base md:text-lg break-words">
                  {edu.degree}
                </h3>

                <span className="text-[var(--text-secondary)] text-xs sm:text-sm break-words">
                  {edu.institution}
                </span>
              </div>

              <span className="text-[var(--text-secondary)] text-xs sm:text-sm mt-1 md:mt-0">
                {edu.duration}
              </span>
            </motion.div>
          ))}
        </div>
      );

    case "interests":
      return (
        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {items.map((i, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="text-xs sm:text-sm px-3 sm:px-4 py-1.5 sm:py-2
              rounded-full border border-[var(--border)]
              
              hover:border-[var(--primary)] transition-all duration-200"
            >
              {i}
            </motion.span>
          ))}
        </div>
      );

    default:
      return null;
  }
}
