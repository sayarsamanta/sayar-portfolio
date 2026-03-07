import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [apiError, setApiError] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) return;

    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 > Date.now()) {
        navigate("/admin");
      }
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

      //   const res = await axios.post("/api/auth/login", form);

      //   localStorage.setItem("adminToken", res.data.token);

      // Trigger success animation
      setSuccess(true);

      // Wait for animation before redirect
      setTimeout(() => {
        navigate("/admin");
      }, 900);
    } catch (err) {
      setApiError("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[var(--background)] overflow-hidden">
      {/* Background Glow */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.4 }}
        transition={{ duration: 2 }}
        className="absolute w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* Login Card */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={success ? { scale: 0.9, opacity: 0 } : { y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-md p-8 rounded-2xl 
                   bg-[var(--card)] border border-[var(--border)] 
                   shadow-2xl backdrop-blur-xl"
      >
        <h2 className="text-2xl font-semibold text-center mb-2">Admin Access</h2>

        <p className="text-sm text-center text-[var(--text-secondary)] mb-6">
          Secure login to manage portfolio content
        </p>

        {apiError && <p className="text-red-500 text-sm mb-4 text-center">{apiError}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <input
              type="email"
              name="email"
              placeholder="Admin Email"
              value={form.email}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
              className="w-full px-4 py-3 rounded-xl 
                         bg-transparent border border-[var(--border)] 
                         text-sm focus:outline-none 
                         focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSubmit(e);
              }}
              className="w-full px-4 py-3 rounded-xl 
                         bg-transparent border border-[var(--border)] 
                         text-sm focus:outline-none 
                         focus:ring-2 focus:ring-purple-500 transition"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          {/* Button */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            whileHover={{ scale: 1.02 }}
            type="submit"
            disabled={loading || success}
            className="w-full py-3 rounded-xl font-medium
                       bg-purple-600 hover:bg-purple-700
                       flex items-center justify-center
                       transition-all duration-300"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 0.8,
                  ease: "linear",
                }}
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

        {/* Back to Portfolio */}
        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs text-[var(--text-secondary)] 
                       hover:text-purple-500 transition"
          >
            ← Back to Portfolio
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
