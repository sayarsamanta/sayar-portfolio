import React from "react";
import { motion } from "framer-motion";
import resumePDF from "../../assets/Sayar_Samanta_CV.pdf"; // your PDF

export default function ResumePage() {
  return (
    <div
      className="min-h-screen px-6 md:px-20 py-20 flex flex-col items-center"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      <motion.h1
        className="text-5xl font-bold mb-12 text-center font-heading"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        My Resume
      </motion.h1>

      {/* Resume Preview */}
      <motion.div
        className="w-full max-w-4xl bg-[var(--card)] rounded-3xl p-8 shadow-xl flex flex-col items-center gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* PDF Embed / Preview */}
        <iframe
          src={resumePDF}
          title="Resume"
          className="w-full h-[90vh] md:h-[95vh] rounded-xl border shadow-lg"
        />

        {/* Download Button */}
        <a
          href={resumePDF}
          download="Sayar_Samanta_Resume.pdf"
          className="px-6 py-3 bg-[var(--primary)] text-[var(--text-light)] rounded-2xl shadow-lg transition hover:opacity-80"
        >
          Download Resume
        </a>
      </motion.div>
    </div>
  );
}
