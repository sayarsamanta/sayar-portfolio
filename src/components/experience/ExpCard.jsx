import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "react-quill-new/dist/quill.snow.css";
const ExpCard = ({
  setExpandedId,
  expandedId,
  role,
  company,
  duration,
  tech,
  description,
  id,
  index,
  fromPreview = false,
}) => {
  const isExpanded = expandedId === id;
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative ${fromPreview ? "h-80" : "h-70"} flex justify-center`}
    >
      {/* Dot */}
      {!fromPreview && (
        <div
          className="absolute top-4 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full z-20"
          style={{ backgroundColor: "var(--primary)" }}
        />
      )}

      {/* Card */}
      <motion.div
        onClick={() => setExpandedId(isExpanded ? null : id)}
        whileHover={{ y: -6 }}
        transition={{ type: "spring", stiffness: 200 }}
        className="w-full md:w-[80%] backdrop-blur-xl border rounded-2xl p-8 shadow-xl cursor-pointer transition-all"
        style={{
          backgroundColor: "var(--card)",
          borderColor: "var(--border)",
        }}
      >
        <h3 className="text-xl md:text-2xl font-heading font-semibold">{role}</h3>

        <p className="text-sm mt-1 text-[var(--text-secondary)]">{company}</p>

        <p className="text-xs mt-1 text-[var(--text-tertiary)]">{duration}</p>

        {/* Tech */}
        <div className="flex flex-wrap gap-2 mt-4">
          {tech.map((tech, i) => (
            <span
              key={i}
              className="text-xs px-3 py-1 rounded-full border"
              style={{
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        {fromPreview && (
          <div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="[&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5"
            dangerouslySetInnerHTML={{ __html: description }}
          />
          // <motion.p
          //   initial={{ opacity: 0, height: 0 }}
          //   animate={{ opacity: 1, height: "auto" }}
          //   exit={{ opacity: 0, height: 0 }}
          //   transition={{ duration: 0.4 }}
          //   className="text-sm
          //         leading-relaxed
          //         text-[var(--text-secondary)]
          //         break-words
          //         whitespace-pre-line
          //         max-h-40
          //         overflow-y-auto
          //         pr-2"
          // >
          //   {description}
          // </motion.p>
        )}
        {/* Expandable */}
        {!fromPreview && (
          <AnimatePresence>
            {isExpanded && (
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.4 }}
                className="mt-5 text-sm leading-relaxed text-[var(--text-secondary)]"
              >
                {description}
              </motion.p>
            )}
          </AnimatePresence>
        )}
      </motion.div>
    </motion.div>
  );
};

export default ExpCard;
