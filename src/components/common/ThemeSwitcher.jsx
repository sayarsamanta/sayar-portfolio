import { motion } from "framer-motion";
import { FiSun, FiMoon, FiMonitor } from "react-icons/fi"; // Using react-icons
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const ThemeSwitcher = () => {
  const { mode, setMode } = useContext(ThemeContext);

  const options = [
    { id: "light", icon: <FiSun />, label: "Light" },
    { id: "system", icon: <FiMonitor />, label: "System" },
    { id: "dark", icon: <FiMoon />, label: "Dark" },
  ];

  return (
    <div className="flex p-1 bg-black/5 dark:bg-white/5 backdrop-blur-md rounded-full border border-black/10 dark:border-white/10 w-fit">
      {options.map((opt) => (
        <button
          key={opt.id}
          onClick={() => setMode(opt.id)}
          className={`relative flex items-center gap-2 px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-colors duration-300 ${
            mode === opt.id
              ? "text-[var(--primary)]"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          }`}
        >
          {mode === opt.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white dark:bg-white/10 shadow-sm rounded-full -z-10"
              transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            />
          )}
          <span className="text-sm">{opt.icon}</span>
          <span className="hidden sm:block">{opt.label}</span>
        </button>
      ))}
    </div>
  );
};

export default ThemeSwitcher;
