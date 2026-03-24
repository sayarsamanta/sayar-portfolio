import { useState, useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiMenu, FiX, FiSun, FiMoon, FiShield } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import { useSelector } from "react-redux";
import ProfileAvatar from "./profilepic/ProfileAvatar";
import placeholder from "../assets/placeholder.jpg";
const navItems = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Projects", path: "/projects" },
  { name: "Experience", path: "/experience" },
  { name: "Contact", path: "/contact" },
];

const Navbar = () => {
  const { user } = useSelector((state) => state.about || null);
  const token = localStorage.getItem("adminToken");

  const [isOpen, setIsOpen] = useState(false);
  const [visible, setVisible] = useState(true);
  const { mode, setMode } = useContext(ThemeContext);
  const {
    about: {
      intro: { profileImg },
    },
    role,
  } = user || {};

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
      }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 right-0 top-0 z-50 backdrop-blur-md font-heading"
    >
      <div className="flex justify-between items-center px-8 py-5">
        <motion.div
          whileHover={{ scale: 1.1, rotate: 2 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <Link
            to={"/"}
            className="relative rounded-full object-cover border border-[var(--border)] ring-1 ring-white/20 object-top hidden lg:block"
          >
            <ProfileAvatar src={profileImg || placeholder} size="small" />
            <motion.div
              animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)] blur-xl z-[-1]"
            />
          </Link>
        </motion.div>
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
                  <span
                    className="
          transition-colors duration-300
          group-hover:text-[var(--primary)]
        "
                    style={{
                      color: isActive ? "var(--primary)" : "var(--text-secondary)",
                    }}
                  >
                    {item.name}
                  </span>
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
          {token && (
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
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className="ml-4 p-2 rounded-full border border-[var(--border)] hover:bg-[var(--card)] transition-colors font-heading"
          >
            {mode === "dark" ? <FiSun color="#FBBF24" size={20} /> : <FiMoon size={20} />}
          </button>
        </div>
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className="p-2 rounded-full border border-[var(--border)] hover:bg-[var(--card)] transition-colors font-heading"
          >
            {mode === "dark" ? <FiSun size={20} /> : <FiMoon size={20} />}
          </button>
          <button onClick={() => setIsOpen(!isOpen)} className="focus:outline-none">
            <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
              {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </motion.div>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="md:hidden absolute top-full left-0 w-full flex flex-col items-start p-6 font-heading backdrop-blur-md"
            style={{
              background: "var(--gradient-bg)",
              WebkitBackdropFilter: "blur(10px)",
              backdropFilter: "blur(10px)",
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
                className="py-2 w-full transition-colors duration-300 font-heading"
                style={{ color: "var(--text-primary)" }}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            ))}
            {token && (
              <NavLink
                to="/admin"
                className="py-2 w-full transition-colors duration-300 font-heading flex items-center gap-2"
                style={{ color: "var(--text-primary)" }}
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
