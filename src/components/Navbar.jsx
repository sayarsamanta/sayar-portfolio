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

  return (
    <motion.nav
      initial={{ y: 0 }}
      animate={{ y: visible ? 0 : -100 }}
      transition={{ duration: 0.3 }}
      className="fixed left-0 right-0 top-0 z-50 font-heading backdrop-blur-md"
      style={{
        background: isOpen ? "transparent" : "var(--gradient-bg)",
        backdropFilter: isOpen ? "none" : "blur(10px)",
        WebkitBackdropFilter: isOpen ? "none" : "blur(10px)",
      }}
    >
      <div className="flex justify-between items-center px-5 md:px-7 py-2 md:py-2.5">
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="cursor-pointer"
        >
          <Link to="/" className="relative rounded-full  overflow-hidden">
            <ProfileAvatar src={profileImg || placeholder} size="small" />
          </Link>
        </motion.div>

        {/* Right Controls */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <button
            onClick={() => setMode(mode === "light" ? "dark" : "light")}
            className="p-1.5 rounded-full border border-[var(--border)] hover:bg-[var(--card)] transition-colors"
          >
            {mode === "dark" ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Hamburger */}
          <button
            onClick={() => setIsOpen(true)}
            className="p-1.5 rounded-full border border-[var(--border)] hover:bg-[var(--card)] transition-colors"
          >
            <FiMenu size={20} />
          </button>
        </div>
      </div>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Full Screen Overlay */}
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35 }}
              className="fixed top-0 right-0 h-screen w-[80%] md:w-[320px] z-50 p-6 backdrop-blur-xl flex flex-col"
              style={{
                background: "var(--gradient-bg)",
                borderLeft: "1px solid var(--border)",
              }}
            >
              {/* Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-base font-semibold">Sayar Samanta</h2>
                  <p className="text-xs text-[var(--text-secondary)]">Full Stack Developer</p>
                </div>

                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 rounded-full border border-[var(--border)] hover:bg-[var(--card)] transition-colors"
                >
                  <FiX size={20} />
                </button>
              </div>

              {/* Links */}
              <div className="flex flex-col gap-5">
                {navItems.map((item, i) => (
                  <motion.div
                    key={item.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <NavLink
                      to={item.path}
                      end={item.path === "/"}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-base transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--primary)]"
                            : "text-[var(--text-primary)] hover:text-[var(--primary)]"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}

                {token && (
                  <NavLink
                    to="/admin"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-2 text-base hover:text-[var(--primary)] transition-colors duration-300"
                  >
                    <FiShield size={16} />
                    Admin Panel
                  </NavLink>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
