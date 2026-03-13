import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import FloatingConnectButton from "../components/FloatingConnectButton";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useEffect } from "react";
import { useSelector } from "react-redux";
import MaintenancePage from "../screens/maintenance/MaintenancePage";
import useAdminShortcut from "../hooks/useAdminShortcut";
import useAboutAPI from "../hooks/useAboutAPI";

const MainLayout = () => {
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();
  useAdminShortcut();

  const about = useSelector((state) => state.about.data);
  const user = useSelector((state) => state.about.user); // nested about object

  const { fetchUser, loading } = useAboutAPI();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // Theme handling
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }, [darkMode]);

  // Show loader while fetching
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // Show maintenance page if about data is still missing
  if (!about) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen">
      {user && <Navbar />}

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="flex-grow h-screen pt-14"
          style={{
            backgroundColor: "var(--background)",
            color: "var(--text-primary)",
          }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>

      <FloatingConnectButton />
    </div>
  );
};

export default MainLayout;
