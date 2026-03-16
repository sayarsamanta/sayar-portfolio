import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";
import api from "../../services/api";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;
    try {
      setTimeout(() => {
        navigate("/admin", { replace: true });
      }, 900);
    } catch {
      localStorage.removeItem("adminToken");
    }
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!form.email) newErrors.email = "Email is required";
    if (!form.password) newErrors.password = "Password is required";
    if (form.password && form.password.length < 6) newErrors.password = "Minimum 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      setLoading(true);
      setApiError("");

      const res = await api.post("http://localhost:5174/api/auth/login", form);
      if (res) {
        localStorage.setItem("adminToken", res.data.token);

        // Trigger success animation
        setSuccess(true);

        // Redirect after animation
        setTimeout(() => {
          navigate("/admin", { replace: true });
        }, 900);
      }
      // Save token in localStorage
    } catch {
      setApiError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-50 to-indigo-50 overflow-hidden">
      {/* Animated Background Glow */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-purple-400/20 rounded-full blur-3xl top-[-100px] left-[-100px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      />
      <motion.div
        className="absolute w-[400px] h-[400px] bg-pink-300/20 rounded-full blur-2xl bottom-[-80px] right-[-80px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "mirror" }}
      />

      {/* Login Card */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={success ? { scale: 0.9, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-3xl bg-white/20 backdrop-blur-xl border border-white/20 shadow-2xl"
      >
        <h2 className="text-3xl font-bold text-center mb-2 text-gray-900">Admin Login</h2>
        <p className="text-sm text-center text-gray-700 mb-6">
          Secure access to manage portfolio content
        </p>

        {apiError && <p className="text-red-500 text-sm mb-4 text-center">{apiError}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div className="relative">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/30 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="relative">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl bg-white/30 border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading || success}
            className="w-full py-3 rounded-xl font-semibold bg-purple-600 hover:bg-purple-700 text-white flex items-center justify-center transition-all duration-300"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : success ? (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                ✔
              </motion.span>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        {/* Back Link */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-gray-700 hover:text-purple-500 transition">
            ← Back to Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
