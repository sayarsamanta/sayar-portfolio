import { motion } from "framer-motion";
import { Trash2, Trophy, GraduationCap, Heart, Code } from "lucide-react";

export default function AdminItemCard({ type, data, onDelete }) {
  const getIcon = () => {
    switch (type) {
      case "achievement":
        return <Trophy size={18} className="text-yellow-400" />;

      case "education":
        return <GraduationCap size={18} className="text-blue-400" />;

      case "interest":
        return <Heart size={18} className="text-pink-400" />;

      case "skill":
        return <Code size={18} className="text-green-400" />;

      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (type) {
      case "achievement":
        return (
          <>
            <p className="font-medium text-[15px]">{data.title}</p>
            <p className="text-xs text-[var(--text-secondary)]">{data.year}</p>
          </>
        );

      case "education":
        return (
          <>
            <p className="font-medium text-[15px]">{data.degree}</p>
            <p className="text-sm text-[var(--text-secondary)]">
              {data.institution}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">{data.year}</p>
          </>
        );

      case "interest":
        return <p className="font-medium text-[15px]">{data}</p>;

      case "skill":
        return (
          <>
            <div className="flex items-center justify-between w-full">
              <p className="font-medium text-[15px]">{data.name}</p>

              {/* <span className="text-xs text-[var(--text-secondary)]">
                {data.percentage}%
              </span> */}
            </div>

            <p className="text-xs text-[var(--text-secondary)]">{data.type}</p>

            {/* Skill Progress */}
            <div className="w-full h-1.5 bg-[var(--border)] rounded-full mt-1 overflow-hidden">
              <div
                className="h-full bg-[var(--primary)] rounded-full"
                style={{ width: `${data.percentage}%` }}
              />
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="
        group
        flex items-start justify-between
        bg-[var(--card)]
        border border-[var(--border)]
        rounded-xl
        px-4 py-3
        transition-all duration-300
        hover:border-[var(--primary)]
        hover:shadow-lg
      "
    >
      {/* LEFT CONTENT */}
      <div className="flex items-start gap-3">
        <div className="mt-1 opacity-80">{getIcon()}</div>

        <div className="flex flex-col gap-0.5">{renderContent()}</div>
      </div>

      {/* DELETE BUTTON */}
      <button
        onClick={onDelete}
        className="
          flex items-center gap-1
          text-red-400
          text-xs
          px-2 py-1
          rounded-md
          border border-transparent
          hover:border-red-500
          hover:bg-red-500/10
          transition-all
        "
      >
        <Trash2 size={14} />
        Delete
      </button>
    </motion.div>
  );
}
