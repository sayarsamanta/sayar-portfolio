import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";

export default function AdminProtectedRoute({ children }) {
  const [isChecking, setIsChecking] = useState(true); 
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setIsValid(false);
      setIsChecking(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      setIsValid(!isExpired);

      if (isExpired) localStorage.removeItem("adminToken");
    } catch {
      localStorage.removeItem("adminToken");
      setIsValid(false);
    } finally {
      setIsChecking(false);
    }
  }, []);

  
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
          className="w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}
