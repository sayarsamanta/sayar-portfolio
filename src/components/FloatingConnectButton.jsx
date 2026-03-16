import { useState, useEffect, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope } from "react-icons/fa";
import { ThemeContext } from "../context/ThemeContext";

export default function FloatingConnectButtonVertical() {
  const [showButton, setShowButton] = useState(false);
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    const checkScrollable = () => {
      const scrollable = document.body.scrollHeight > window.innerHeight + 10;
      setShowButton(!scrollable || window.scrollY > 50);
    };

    checkScrollable();
    window.addEventListener("scroll", checkScrollable);
    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("scroll", checkScrollable);
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  return (
    <AnimatePresence>
      {showButton && (
        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 100, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className={`fixed right-5 bottom-1/3 z-50 flex flex-col gap-4
            p-2 rounded-full shadow-xl
            ${darkMode ? "bg-zinc-900/80" : "bg-white/80"}
            backdrop-blur-md`}
        >
          {/* Github */}
          <a
            href="https://github.com/sayarsamanta"
            target="_blank"
            rel="noreferrer"
            className={`hover:scale-110 transition-transform ${darkMode ? "text-white" : "text-black"}`}
          >
            <FaGithub size={24} />
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sayarsamanta/"
            target="_blank"
            rel="noreferrer"
            className="text-[#0A66C2] hover:scale-110 transition-transform"
          >
            <FaLinkedin size={24} />
          </a>

          {/* Twitter */}
          <a
            href="https://x.com/sayarsamanta"
            target="_blank"
            rel="noreferrer"
            className="text-[#1DA1F2] hover:scale-110 transition-transform"
          >
            <FaTwitter size={24} />
          </a>

          {/* Email */}
          <a
            href="mailto:sayarsamanta@gmail.com"
            target="_blank"
            rel="noreferrer"
            className="hover:scale-110 transition-transform"
          >
            <FaEnvelope size={24} style={{ color: "#D14836" }} />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
