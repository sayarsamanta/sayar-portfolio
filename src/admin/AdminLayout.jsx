import { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiSun, FiMoon } from "react-icons/fi";
import { ThemeContext } from "../context/ThemeContext";
import { SidebarContent } from "../components/admin/SidebarContent";
import useAboutAPI from "../hooks/useAboutAPI";
import useExperienceAPI from "../hooks/useExperienceAPI";
import useProjectAPI from "../hooks/useProjectAPI";
import { useSelector } from "react-redux";
export default function AdminLayout() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user } = useSelector((state) => state.about);
  const profileImg = user?.about?.intro?.profileImg || "";
  const name = user?.name || "Sayar Samanta";
  const { fetchUser } = useAboutAPI();
  const { fetchExperience } = useExperienceAPI();
  const { fetchProjects } = useProjectAPI();

  useEffect(() => {
    fetchUser();
    fetchExperience();
    fetchProjects();
  }, []);
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }, [darkMode]);

  return (
    <div className="h-screen bg-[var(--background)] flex overflow-hidden">
      <div className="hidden lg:flex w-64 border-r border-[var(--border)] bg-[var(--card)]">
        <SidebarContent />
      </div>
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
      <div className="flex-1 flex flex-col h-full">
        <div className="h-14 flex items-center justify-between px-6 border-b border-[var(--border)] bg-[var(--background)]">
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
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full border border-[var(--border)] hover:bg-[var(--card)] transition"
            >
              {darkMode ? <FiSun color="#FBBF24" size={18} /> : <FiMoon size={18} />}
            </button>
            <div className="w-9 h-9 rounded-full overflow-hidden bg-[var(--primary)] text-white flex items-center justify-center font-medium">
              {profileImg ? (
                <img src={profileImg} alt={name} className="w-full h-full object-cover" />
              ) : (
                name
                  ?.split(" ")
                  .map((word) => word[0].toUpperCase())
                  .join("")
              )}
            </div>
          </div>
        </div>
        <div className="p-6 flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
