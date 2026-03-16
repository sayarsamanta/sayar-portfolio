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
  index,
  compact = false,
  timelineGradient = "linear-gradient(to bottom, var(--primary), var(--secondary), var(--accent))",
}) => {
  const isExpanded = expandedId === _id;

  return (
    <motion.div
      key={_id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="w-full flex justify-start"
    >
      {/* Vertical Accent aligned with timeline */}
      <div
        className="w-1 rounded-full mr-3"
        style={{
          background: timelineGradient,
        }}
      />

      {/* Card */}
      <motion.div
        onClick={() => setExpandedId(isExpanded ? null : _id)}
        whileHover={{ scale: 1.03 }}
        className={`flex-1 rounded-xl p-4 shadow-md cursor-pointer transition-all`}
        style={{
          backgroundColor: "var(--card)", // Uses CSS variable for light/dark
          color: "var(--text-primary)",
        }}
      >
        {/* Role & Company */}
        <h3 className={`${compact ? "text-lg" : "text-xl"} font-semibold`}>{role}</h3>
        <p className="text-xs md:text-sm text-[var(--text-secondary)]">
          {company} • {duration}
        </p>

        {/* Tech Tags */}
        {tech?.some((t) => t.trim() !== "") && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tech.map((t, i) => (
              <span
                key={i}
                className="text-[10px] md:text-xs px-2 py-0.5 rounded-full border hover:bg-[var(--primary)] hover:text-white transition-colors duration-200"
                style={{ borderColor: "var(--border)" }}
              >
                {t}
              </span>
            ))}
          </div>
        )}

        {/* Expandable Description */}
        <AnimatePresence>
          {!compact && isExpanded && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-3 text-sm text-[var(--text-secondary)] break-words whitespace-pre-line"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};

export default TimelineExpCard;
