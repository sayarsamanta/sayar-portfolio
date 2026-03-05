import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
const notify = () => toast("Admin access detected");
export default function useAdminShortcut() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "a") {
        notify();
        setTimeout(() => navigate("/admin/login"), 1000);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [navigate]);
}
