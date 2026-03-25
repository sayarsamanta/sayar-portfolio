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
          className="fixed bottom-16 sm:bottom-20 md:bottom-24 right-4 sm:right-6 md:right-8 z-50 flex items-center justify-center"
          style={{ background: "none", border: "none", padding: 0 }}
        >
          <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16">
            {/* Outer ring */}
            <svg className="absolute inset-0 w-full h-full rotate-[-90deg]" viewBox="0 0 64 64">
              <circle
                cx="32"
                cy="32"
                r="28"
                stroke="currentColor"
                className="text-[var(--text-main,#000)] opacity-10"
                strokeWidth="4"
                fill="none"
              />
              <motion.circle
                cx="32"
                cy="32"
                r="28"
                stroke="var(--primary,#8b5cf6)"
                strokeWidth="4"
                strokeLinecap="round"
                fill="none"
                style={{ pathLength: scaleX }}
              />
            </svg>

            {/* Inner circle button */}
            <div className="flex items-center justify-center rounded-full w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-[var(--secondary,#6366f1)] shadow-xl transition-all duration-300 group-hover:brightness-110">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="relative z-10 md:group-hover:-translate-y-1 transition-transform duration-300 sm:w-[18px] sm:h-[18px] md:w-[20px] md:h-[20px]"
              >
                <path d="M18 15l-6-6-6 6" />
              </svg>
            </div>
          </div>
        </motion.button>
      )}
    </AnimatePresence>
  );
};

export default ScrollToTop;
