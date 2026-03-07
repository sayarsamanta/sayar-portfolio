import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

export default function FloatingConnectButton() {
  const [showButton, setShowButton] = useState(false);
  const [alwaysVisible, setAlwaysVisible] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const checkScrollable = () => {
      const scrollable = document.body.scrollHeight > window.innerHeight + 10;
      setAlwaysVisible(!scrollable);
    };
    checkScrollable();
    window.addEventListener("resize", checkScrollable);

    const handleScroll = () => {
      if (alwaysVisible) {
        setShowButton(true);
      } else {
        setShowButton(window.scrollY > 50);
      }
    };
    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", checkScrollable);
    };
  }, [alwaysVisible]);

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed bottom-8 right-8 z-50 px-5 py-3 rounded-full shadow-lg flex items-center gap-4 transition-colors
        font-body
        ${darkMode ? "bg-zinc-900" : "bg-white"}
      `}
        >
          <span
            className={`font-semibold hidden md:block ${darkMode ? "text-white" : "text-black"}`}
          >
            Connect with Me
          </span>
          <div className="flex gap-3 text-xl items-center">
            {/* Github */}
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className={`hover:opacity-80 ${darkMode ? "text-white" : "text-black"}`}
            >
              <FaGithub />
            </a>
            {/* LinkedIn */}
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noreferrer"
              className="text-[#0A66C2] hover:opacity-80"
            >
              <FaLinkedin />
            </a>
            {/* Twitter */}
            <a
              href="https://twitter.com/yourusername"
              target="_blank"
              rel="noreferrer"
              className="text-[#1DA1F2] hover:opacity-80"
            >
              <FaTwitter />
            </a>
            {/* Gmail */}
            <a
              href="mailto:yourname@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="hover:opacity-80"
            >
              <FaEnvelope style={{ color: "#D14836" }} />
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
