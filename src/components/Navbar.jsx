import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import profileImg from "../assets/profile.jpg";
import { FiMenu, FiX } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const mobileMenuVariants = {
    hidden: { y: "-100%", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
    exit: { y: "-100%", opacity: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 backdrop-blur-md transition-colors duration-300"
      style={{
        backgroundColor: darkMode
          ? scrolled
            ? "rgba(20,20,20)" // dark semi-transparent when scrolled
            : "rgba(20,20,30)" // lighter transparent on top
          : scrolled
          ? "rgba(255,255,255,0.85)" // light semi-transparent when scrolled
          : "rgba(255,255,255)", // transparent light mode
        // borderBottom: scrolled ? `1px solid var(--border)` : "none",
      }}
    >
      <div className="flex justify-between items-center px-8 py-5">
        {/* Logo / Profile */}
        <motion.div
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="relative">
            <img
              src={profileImg}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover border border-[var(--border)] ring-1 ring-white/20 object-top hidden sm:block"
            />
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] blur-xl z-[-1]"
            />
          </div>
        </motion.div>

        {/* Dark/Light Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded-full font-semibold transition"
          style={{
            backgroundColor: "var(--primary)",
            color: darkMode ? "var(--text-primary)" : "var(--text-light)",
          }}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>

        {/* Desktop Links */}
        <div className="hidden sm:flex gap-10 relative">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className="relative text-sm uppercase tracking-wider transition-colors duration-300"
              style={{
                color: darkMode
                  ? "var(--text-secondary)"
                  : "var(--text-secondary)",
              }}
            >
              {({ isActive }) => (
                <div className="relative">
                  {item.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-2 left-0 right-0 h-[2px] rounded-full bg-[var(--primary)]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Menu Button */}
        <div className="sm:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="focus:outline-none"
          >
            <motion.div
              animate={{ rotate: isOpen ? 90 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="sm:hidden absolute top-full left-0 w-full flex flex-col items-start p-6"
            style={{
              backgroundColor: darkMode
                ? "rgba(20,20,20,0.95)"
                : "rgba(255,255,255,0.95)",
            }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={`py-2 w-full transition-colors duration-300 ${
                  darkMode ? "text-white" : "text-black"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
