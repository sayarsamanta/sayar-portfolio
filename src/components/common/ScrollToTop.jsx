import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex items-center justify-center group"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          {/* Progress Ring Container */}
          <svg width="64" height="64" className="rotate-[-90deg]">
            {/* THE CHANNEL (The background track) */}
            <circle
              cx="32"
              cy="32"
              r="28"
              // Uses text color at 10% opacity so it shows as a light grey in light mode
              // and a faint white in dark mode.
              stroke="currentColor"
              className="text-[var(--text-main, #000)] opacity-10"
              strokeWidth="4"
              fill="none"
            />

            {/* THE PROGRESS (Indigo border) */}
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              stroke="var(--primary, #8b5cf6) "
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              style={{ pathLength: scaleX }}
            />
          </svg>

          {/* CENTRAL BUTTON (Secondary Purple) */}
          <div
            className="absolute inset-0 m-auto w-11 h-11 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:brightness-110"
            style={{
              background: "var(--secondary, #6366f1)",
              boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)",
            }}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="relative z-10 group-hover:-translate-y-1 transition-transform duration-300"
            >
              <path d="M18 15l-6-6-6 6" />
            </svg>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
