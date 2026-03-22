import { motion, AnimatePresence } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import { ThemeContext } from "../context/ThemeContext";
import { useContext, useEffect, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import MaintenancePage from "../screens/maintenance/MaintenancePage";
import useAdminShortcut from "../hooks/useAdminShortcut";
import useAboutAPI from "../hooks/useAboutAPI";
import { hasData } from "../utils/helper";
import Footer from "../components/footer/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

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

      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.4 }}
          // 1. Removed pb-32 (the footer will now provide the bottom space)
          // 2. Removed overflow-auto (let the main window handle the scroll for a "single page" feel)
          className="flex-grow flex flex-col"
        >
          {/* Main Page Content */}
          <main className="flex-grow">
            <Outlet />
          </main>

          {/* 3. Footer moved INSIDE the motion div */}
          <Footer />
        </motion.div>
      </AnimatePresence>

      {/* 4. This is where your new separate ScrollToTop component goes */}
      <ScrollToTop />
    </div>
  );
};

export default MainLayout;
