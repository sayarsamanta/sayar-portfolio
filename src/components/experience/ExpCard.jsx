import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExpCard = ({
  setExpandedId,
  expandedId,
  role,
  company,
  duration,
  tech,
  description,
  _id,
  index,
  fromPreview = false,
}) => {
  const isExpanded = expandedId === _id;

  return (
    <motion.div
      key={_id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="relative w-full flex justify-center md:justify-start"
    >
      {/* Card */}
      <motion.div
        onClick={() => setExpandedId(isExpanded ? null : _id)}
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
        className={`w-full max-w-md md:max-w-[350px] backdrop-blur-xl border rounded-2xl p-6 md:p-8 shadow-lg cursor-pointer transition-all duration-300`}
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        {/* Role & Company */}
        <h3 className="text-xl md:text-2xl font-heading font-semibold">{role}</h3>
        <p className="text-sm mt-1 text-[var(--text-secondary)]">{company}</p>
        <p className="text-xs mt-1 text-[var(--text-tertiary)]">{duration}</p>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tech?.some((item) => item.trim() !== "") &&
            tech?.map((techName, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full border hover:bg-[var(--primary)] hover:text-white transition-colors duration-200"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                {techName}
              </span>
            ))}
        </div>

        {/* Expandable Description */}
        <AnimatePresence>
          {isExpanded && !fromPreview && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)] break-words whitespace-pre-line"
            >
              {description}
            </motion.p>
          )}
        </AnimatePresence>

        {/* Preview Mode Description */}
        {fromPreview && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 text-sm leading-relaxed text-[var(--text-secondary)] break-words whitespace-pre-line"
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ExpCard;
