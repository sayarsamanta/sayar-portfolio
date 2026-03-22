import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import FloatingConnectButton from "../components/FloatingConnectButton";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import MaintenancePage from "../screens/maintenance/MaintenancePage";
import useAdminShortcut from "../hooks/useAdminShortcut";
import useAboutAPI from "../hooks/useAboutAPI";
import { hasData } from "../utils/helper";

const MainLayout = () => {
  const { darkMode } = useContext(ThemeContext);
  const location = useLocation();
  useAdminShortcut();

  const about = useSelector((state) => state.about.data);
  const user = useSelector((state) => state.about.user);

  const { fetchUser, loading } = useAboutAPI();
  useEffect(() => {
    if (!hasData(about)) {
      fetchUser();
    }
  }, [fetchUser, about]);

  useLayoutEffect(() => {
    document.body.classList.toggle("light-theme", !darkMode);
  }, [darkMode]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!about) {
    return <MaintenancePage />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      {user && <Navbar />}
      <AnimatePresence mode="wait" className="flex-grow">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          className="flex-grow pb-32 md:pb-0 overflow-auto"
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <FloatingConnectButton />
    </div>
  );
};

export default MainLayout;
