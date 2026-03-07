import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import { SidebarContent } from "../components/admin/SidebarContent";

export default function AdminLayout() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }, [darkMode]);

  return (
    <div className="h-screen bg-[var(--background)] flex overflow-hidden">
      {/* Sidebar Desktop */}
      <div className="hidden lg:flex w-64 border-r border-[var(--border)] bg-[var(--card)]">
        <SidebarContent />
      </div>

      {/* Sidebar Mobile Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.4 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: "spring", stiffness: 260, damping: 25 }}
              className="fixed top-0 left-0 w-64 h-full bg-[var(--card)] border-r border-[var(--border)] z-50 lg:hidden"
            >
              <SidebarContent close={() => setSidebarOpen(false)} />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full">
        {/* Topbar */}
        <div className="h-14 flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--background)]">
          {/* Left Section */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md hover:bg-[var(--card)] transition"
            >
              <FiMenu size={20} />
            </button>

            <h1 className="text-lg font-semibold capitalize">
              {location.pathname.split("/")[2] || "dashboard"}
            </h1>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-[var(--border)] hover:bg-[var(--card)] transition"
            >
              {darkMode ? <FiSun color="#FBBF24" size={18} /> : <FiMoon size={18} />}
            </button>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-[var(--primary)] text-white flex items-center justify-center font-medium">
              A
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
