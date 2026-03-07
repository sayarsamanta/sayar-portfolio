import { motion } from "framer-motion";
import { FaRegEye } from "react-icons/fa";

export default function PreviewEmptyState({
  title = "Nothing to Preview Yet",
  message = "Add content from the admin panel to see it here.",
}) {
  return (
    <motion.div
      className="w-full max-w-3xl mx-auto border border-dashed 
      border-[var(--border)] rounded-xl p-10 text-center
      bg-[var(--card)]/40 backdrop-blur-sm mt-5"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col items-center gap-4">
        <div
          className="w-14 h-14 rounded-full bg-[var(--background)]
        flex items-center justify-center text-[var(--text-secondary)]"
        >
          <FaRegEye size={22} />
        </div>

        <h3 className="text-lg font-semibold text-[var(--text-primary)]">{title}</h3>

        <p className="text-sm text-[var(--text-secondary)] max-w-md">{message}</p>
      </div>
    </motion.div>
  );
}
