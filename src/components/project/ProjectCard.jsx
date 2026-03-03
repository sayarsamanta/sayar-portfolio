import React from "react";
import { FaNodeJs, FaReact } from "react-icons/fa";
import { motion } from "framer-motion";
const ProjectCard = ({ proj, onClick }) => {
  return (
    <motion.div
      key={proj.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="
            relative 
            rounded-3xl 
            p-5 sm:p-6 md:p-8 
            cursor-pointer 
            overflow-hidden 
            group 
            border 
            backdrop-blur-xl
            shadow-lg
          "
      style={{
        backgroundColor: "var(--card)",
        borderColor: "var(--border)",
      }}
      onClick={() => onClick(proj)}
    >
      {/* Top Accent Line */}
      <div
        className="absolute top-0 left-0 w-full h-1 opacity-70 group-hover:opacity-100"
        style={{
          background:
            "linear-gradient(90deg, var(--primary), var(--secondary), var(--accent))",
        }}
      />

      {/* ===== IMAGE SECTION ===== */}
      {proj.screenshots?.[0] && (
        <div className="relative h-48 sm:h-56 md:h-60 rounded-2xl overflow-hidden mb-6">
          {/* Background Image */}
          <img
            src={proj.screenshots[0]}
            alt={proj.name}
            className="
        absolute inset-0 
        w-full h-full 
        object-cover 
        transition duration-500 
        group-hover:scale-105 
        group-hover:brightness-90
      "
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />

          {/* ===== Tech Icon Badge (Top Right) ===== */}
          <div
            className="
        absolute top-3 right-3 
        z-20 
        p-2 
        rounded-full 
        backdrop-blur-md 
        border 
        bg-white/10 
        transition duration-300 
        group-hover:scale-110
      "
          >
            {proj.type === "Fullstack" && (
              <FaNodeJs size={20} style={{ color: "var(--primary)" }} />
            )}

            {proj.type === "Frontend" && (
              <FaReact
                size={18}
                style={{ color: "#67E8F9" }}
                className="group-hover:rotate-12 transition duration-300"
              />
            )}
          </div>

          {/* ===== Title Overlay ===== */}
          <div className="absolute bottom-4 left-4 right-4 z-10">
            <h3 className="text-white text-lg sm:text-xl md:text-2xl font-heading font-semibold">
              {proj.name}
            </h3>
          </div>
        </div>
      )}

      {/* ===== TECH STACK BELOW IMAGE ===== */}
      <div className="flex flex-wrap gap-2 relative z-10">
        {proj.tech.map((tech, i) => (
          <span
            key={i}
            className="text-xs px-3 py-1 rounded-full border"
            style={{
              backgroundColor: "var(--card)",
              borderColor: "var(--border)",
              color: "var(--text-secondary)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Hover Ring */}
      <div
        className="absolute inset-0 rounded-3xl ring-0 group-hover:ring-2 transition"
        style={{
          ringColor: "var(--primary)",
        }}
      />
    </motion.div>
  );
};

export default ProjectCard;
