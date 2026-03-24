import { motion } from "framer-motion";

const RouteLoader = ({ label = "Loading..." }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
      <motion.div
        className="flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full border-4 border-t-transparent border-[var(--accent)]"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1,
            ease: "linear",
          }}
        />

        <motion.p
          className="text-sm tracking-widest text-[var(--text-secondary)] uppercase"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
          }}
        >
          {label}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default RouteLoader;
