import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bootSequences = [
  "Initializing SayarOS v3.0.2...",
  "Loading kernel modules...",
  "Mounting /dev/frontend...",
  "Checking UI_CRAFTSMANSHIP... [OK]",
  "Establishing secure connection to React...",
  "Optimizing Framer Motion engine...",
  "User Authenticated: SAYAR_SAMANTA",
  "Booting GUI...",
];

const Preloader = ({ setLoading }) => {
  const [currentLine, setCurrentLine] = useState(0);

  useEffect(() => {
    if (currentLine < bootSequences.length) {
      const timing = currentLine === 3 || currentLine === 6 ? 500 : 150;
      const timeout = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, timing);
      return () => clearTimeout(timeout);
    } else {
      const finalDelay = setTimeout(() => setLoading(false), 800);
      return () => clearTimeout(finalDelay);
    }
  }, [currentLine, setLoading]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-[var(--background)]"
    >
      <div className="w-full max-w-lg p-6 font-mono">
        <div className="flex flex-col space-y-2">
          {bootSequences.slice(0, currentLine).map((line, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.1 }}
              className="flex items-start gap-3"
            >
              <span className="text-[var(--primary)] shrink-0">➜</span>
              <span className="text-[var(--text-primary)] text-sm sm:text-base break-all opacity-90">
                {line.includes("[OK]") ? (
                  <>
                    {line.replace("[OK]", "")}
                    <span className="text-green-500 font-bold">[OK]</span>
                  </>
                ) : (
                  line
                )}
              </span>
            </motion.div>
          ))}
          {currentLine < bootSequences.length && (
            <motion.div
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="h-5 w-2 bg-[var(--primary)] ml-7"
            />
          )}
        </div>
        <div className="mt-10 w-full h-[2px] bg-[var(--border)] rounded-full overflow-hidden opacity-50">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: `${(currentLine / bootSequences.length) * 100}%` }}
            className="h-full bg-[var(--primary)] shadow-[0_0_10px_var(--primary)]"
            transition={{ ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Preloader;
