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
          <div className="w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium text-[15px] text-[var(--text-primary)] leading-snug">
                {data.title}
              </p>

              <p className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-secondary)] whitespace-nowrap">
                {data.year}
              </p>
            </div>

            <p className="text-sm text-[var(--text-secondary)] mt-1 leading-relaxed break-words line-clamp-4">
              {data.description}
            </p>
          </div>
        );

      case "education":
        return (
          <div className="w-full">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-medium text-[15px] text-[var(--text-primary)] leading-snug">
                {data.degree}
              </p>

              <p className="text-[11px] px-2 py-0.5 rounded-full bg-[var(--input-bg)] border border-[var(--border)] text-[var(--text-secondary)] whitespace-nowrap">
                {data?.duration}
              </p>
            </div>

            <p className="text-sm text-[var(--text-secondary)] mt-1 break-words">
              {data.institution}
            </p>
          </div>
        );

      case "interest":
        return <p className="font-medium text-[15px] text-[var(--text-primary)]">{data}</p>;

      case "skill":
        return (
          <>
            <div className="flex items-center  w-full">
              <p className="font-medium text-[15px] text-[var(--text-primary)]">{data.name}</p>
            </div>

            <p className="text-xs text-[var(--text-secondary)]">{data.type}</p>
            <div className="flex justify-center">
              <div className="w-full h-1.5 bg-[var(--border)] rounded-full mt-1 overflow-hidden">
                <div
                  className="h-full bg-[var(--primary)] rounded-full"
                  style={{ width: `${data.percentage}%` }}
                />
              </div>
              <p className="text-xs text-[var(--text-secondary)] mx-2 b-2">{data.percentage}%</p>
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
        flex items-start gap-3
        border border-[var(--border)]
        rounded-xl
        px-4 py-3
        bg-[linear-gradient(135deg,var(--card),var(--input-bg))]
        transition-all duration-300
        hover:border-[var(--primary)]
        hover:shadow-md
      "
    >
      <div className="flex items-start gap-3 flex-1 min-w-0">
        <div className="mt-1 opacity-80 shrink-0">{getIcon()}</div>

        <div className="flex flex-col gap-0.5 flex-1 min-w-0">{renderContent()}</div>
      </div>

      <button
        onClick={onDelete}
        className="
          shrink-0
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
        <span className="hidden sm:inline">Delete</span>
      </button>
    </motion.div>
  );
}
