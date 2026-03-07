import React from "react";
import { motion } from "framer-motion";
const ProjectCard = ({ proj, onClick }) => {
  return (
    <motion.div
      key={proj.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      onClick={() => onClick(proj)}
      className="
    group
    relative
    flex-grow
          basis-[280px]
          max-w-[380px]
    rounded-3xl
    overflow-hidden
    cursor-pointer
    transition-all
    duration-500
    shadow-md
  "
      style={{
        backgroundColor: "var(--card)",
        border: "1px solid var(--border)",
      }}
    >
      {/* IMAGE */}
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={proj.screenshots?.[0]}
          alt={proj.name}
          className="
        w-full h-full
        object-cover
        transition duration-700
        group-hover:scale-110
      "
        />

        {/* Soft gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60" />
      </div>

      {/* CONTENT */}
      <div className="p-6 md:p-8 space-y-5">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <h3 className="text-xl md:text-2xl font-semibold tracking-tight">{proj.name}</h3>

          <span
            className="text-xs px-3 py-1 rounded-full border"
            style={{
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {proj.type}
          </span>
        </div>

        {/* Short Description */}
        <p
          className="text-sm leading-relaxed line-clamp-2"
          style={{ color: "var(--text-secondary)" }}
        >
          {proj.description}
        </p>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2 pt-2">
          {proj.tech.slice(0, 4).map((tech, i) => (
            <span
              key={i}
              className="
            text-xs
            px-3 py-1
            rounded-full
            bg-black/5
            dark:bg-white/5
            backdrop-blur-md
          "
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Subtle Hover Glow */}
      <div
        className="
      absolute inset-0
      opacity-0
      group-hover:opacity-100
      transition duration-500
      pointer-events-none
    "
        style={{
          background: "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.08), transparent 60%)",
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;
