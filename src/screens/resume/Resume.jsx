import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import Resume from "../../components/resume/Resume";
import EmptySection from "../../components/admin/experience/EmptySection";
import { useState } from "react";

export default function ResumePage() {
  const about = useSelector((state) => state.about);
  const { resume } = about.user || "";
  const [error, setError] = useState(false);
  return (
    <div
      className="min-h-screen  flex flex-col items-center py-10 px-4"
      style={{ background: "var(--gradient-bg)", paddingTop: "7rem" }}
    >
      {(!resume || error) && <EmptySection type={"Resume"} />}
      {resume && !error && (
        <>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center gap-4 mb-8"
          >
            <h1 className="text-3xl md:text-4xl font-heading font-bold text-[var(--text-primary)]">
              Resume
            </h1>
          </motion.div>
          <Resume pdfUrl={resume} setError={setError} />
        </>
      )}
    </div>
  );
}
