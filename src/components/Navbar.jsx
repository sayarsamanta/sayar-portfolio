import { useState, useEffect, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import profileImg from "../assets/profile.jpg";
import { FiMenu, FiX, FiSun, FiMoon, FiShield } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import { useSelector } from "react-redux";

const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { user } = useSelector((state) => state.user);
  const [scrolled, setScrolled] = useState(
    typeof window !== "undefined" ? window.scrollY > 10 : false
  );
  const [isOpen, setIsOpen] = useState(false);
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [visible, setVisible] = useState(true);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const { profileImg, role } = user || {};
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      setScrolled(currentScrollPos > 20);

      if (Math.abs(prevScrollPos - currentScrollPos) > 5) {
        setVisible(prevScrollPos > currentScrollPos || currentScrollPos < 50);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

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
      initial={{ y: 0 }}
      animate={{
        y: visible ? 0 : -100,
        backgroundColor: darkMode
          ? "rgba(0, 0, 0, 0.9)" // Dark mode + scrolled
          : "rgba(255, 255, 255, 0.5)", // Light mode + scrolled
        borderBottom: scrolled
          ? darkMode
            ? "1px solid rgba(255, 255, 255, 0.1)"
            : "1px solid rgba(0, 0, 0, 0.05)"
          : "1px solid rgba(0, 0, 0, 0)",
      }}
      transition={{ duration: 0.3 }}
      className="fixed shadow-lg left-0 right-0 top-0 z-50 backdrop-blur-md font-heading"
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
              className="w-12 h-12 rounded-full object-cover border border-[var(--border)] ring-1 ring-white/20 object-top hidden lg:block"
            />
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] blur-xl z-[-1]"
            />
          </div>
        </motion.div>

        {/* Desktop Links + Theme Icon */}
        <div className="hidden md:flex gap-6 items-center relative">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className="relative text-sm uppercase tracking-wider font-heading group transition-colors duration-300"
              style={{ color: "var(--text-secondary)" }}
            >
              {({ isActive }) => (
                <div className="relative px-1 py-1">
                  {/* Text */}
                  <span
                    className="
          transition-colors duration-300
          group-hover:text-[var(--primary)]
        "
                    style={{
                      color: isActive
                        ? "var(--primary)"
                        : "var(--text-secondary)",
                    }}
                  >
                    {item.name}
                  </span>

                  {/* Hover Underline */}
                  {!isActive && (
                    <span
                      className="
            absolute left-0 -bottom-1
            h-[2px] w-0
            bg-[var(--primary)]
            transition-all duration-300 ease-out
            group-hover:w-full
          "
                    />
                  )}

                  {/* Active Indicator (Animated) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[var(--primary)]"
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
          {role === "admin" && (
            <NavLink
              to="/admin"
              className="relative text-sm uppercase tracking-wider font-heading group transition-colors duration-300"
            >
              <div className="relative px-1 py-1 flex items-center gap-1">
                <FiShield size={16} className="text-[var(--primary)]" />
                <span>Admin Panel</span>
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-[var(--primary)] transition-all duration-300 ease-out group-hover:w-full" />
              </div>
            </NavLink>
          )}

          {/* Theme Toggle Icon */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="ml-4 p-2 rounded-full border border-[var(--border)] hover:bg-[var(--card)] transition-colors font-heading"
          >
            {darkMode ? (
              <FiSun color="#FBBF24" size={20} />
            ) : (
              <FiMoon size={20} />
            )}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-3">
          {/* Mobile Theme Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full border border-[var(--border)] hover:bg-[var(--card)] transition-colors font-heading"
          >
            {darkMode ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>

          {/* Hamburger */}
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
            className="md:hidden absolute top-full left-0 w-full flex flex-col items-start p-6 font-heading"
            style={{ backgroundColor: "var(--card)" }}
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={mobileMenuVariants}
          >
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className="py-2 w-full transition-colors duration-300 font-heading"
                style={{ color: "var(--text-primary)" }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            {role === "admin" && (
              <NavLink
                to="/admin"
                className="py-2 w-full transition-colors duration-300 font-heading flex items-center gap-2"
                onClick={() => setIsOpen(false)}
              >
                <FiShield size={18} /> Admin Panel
              </NavLink>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
