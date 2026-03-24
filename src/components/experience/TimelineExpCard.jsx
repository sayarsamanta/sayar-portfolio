import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const TimelineExpCard = ({
  setExpandedId,
  expandedId,
  role,
  company,
  duration,
  tech,
  description,
  _id,
  compact = false,
}) => {
  const isExpanded = expandedId === _id;

  return (
    <motion.div>
      <motion.div
        onClick={() => setExpandedId(isExpanded ? null : _id)}
        whileHover={{
          y: -4,
          scale: 1.005,
        }}
        className="
          rounded-2xl p-5 lg:p-6 border cursor-pointer
          transition-all duration-200 shadow-sm
          hover:shadow-[0_18px_42px_rgba(0,0,0,0.08)]
          backdrop-blur-md
        "
        style={{
          background: "rgba(255,255,255,0.03)",
          borderColor: isExpanded ? "var(--primary)" : "var(--border)",
          color: "var(--text-primary)",
        }}
      >
        <div className="flex flex-col gap-5">
          {/* Header */}
          <div className="space-y-2">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3
                  className={`${compact ? "text-lg" : "text-xl lg:text-2xl"} font-semibold tracking-tight`}
                >
                  {role}
                </h3>

                <p className="text-sm md:text-base text-[var(--text-secondary)] mt-2 font-medium">
                  {company}
                </p>
              </div>

              <div
                className="
                  text-[11px] md:text-xs
                  px-3 py-1 rounded-full border
                  whitespace-nowrap
                "
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                  backgroundColor: "rgba(255,255,255,0.03)",
                }}
              >
                {duration}
              </div>
            </div>
          </div>

          {/* Tech stack */}
          {tech?.some((t) => t.trim() !== "") && (
            <div className="flex flex-wrap gap-2">
              {tech.map((t, i) => (
                <motion.span
                  key={i}
                  whileHover={{
                    scale: 1.04,
                    y: -1,
                  }}
                  whileTap={{ scale: 0.98 }}
                  className="
                    text-[11px] md:text-xs
                    px-2.5 py-1 rounded-md border
                    
                    
                  "
                  style={{
                    backgroundColor: "var(--primary)",
                    color: "white",
                    borderColor: "transparent",
                  }}
                >
                  {t}
                </motion.span>
              ))}
            </div>
          )}

          {/* Expandable description */}
          <AnimatePresence initial={false}>
            {!compact && isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: 0.35,
                  ease: "easeInOut",
                }}
                className="overflow-hidden"
              >
                <motion.p
                  initial={{ y: 8 }}
                  animate={{ y: 0 }}
                  exit={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="
                    text-sm md:text-[15px]
                    text-[var(--text-secondary)]
                    break-words whitespace-pre-line
                    leading-6 md:leading-7 opacity-90
                  "
                >
                  {description}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TimelineExpCard;
