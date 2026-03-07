import { useState } from "react";
import { Navigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function AdminProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(true);

  //   useEffect(() => {
  //     const token = localStorage.getItem("adminToken");

  //     if (!token) {
  //       setIsValid(false);
  //       return;
  //     }

  //     try {
  //       const decoded = jwtDecode(token);

  //       const isExpired = decoded.exp * 1000 < Date.now();

  //       if (isExpired) {
  //         localStorage.removeItem("adminToken");
  //         setIsValid(false);
  //       } else {
  //         setIsValid(true);
  //       }
  //     } catch (error) {
  //       localStorage.removeItem("adminToken");
  //       setIsValid(false);
  //     }
  //   }, []);

  // While checking token
  if (isValid === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--background)]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 0.8,
            ease: "linear",
          }}
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
