import { useState, useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from "../context/ThemeContext";

export default function Contact() {
  const { darkMode } = useContext(ThemeContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      className="relative min-h-screen px-6 md:px-20 py-20 flex flex-col gap-20"
      style={{
        backgroundColor: "var(--background)",
        color: "var(--text-primary)",
      }}
    >
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1
          style={{ color: "var(--text-primary)" }}
          className="text-5xl font-bold mb-4"
        >
          Let’s Connect
        </h1>
        <p
          style={{ color: "var(--text-secondary)" }}
          className="text-lg md:text-xl max-w-2xl mx-auto"
        >
          I’m always open to collaboration or discussing new projects. Send me a
          message or connect via social platforms below.
        </p>
      </motion.div>

      {/* Glassmorphic Form */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="max-w-2xl mx-auto rounded-3xl p-10 flex flex-col gap-6 shadow-2xl border transition"
        style={{
          background: "var(--card-gradient)", // gradient depends on theme
          backdropFilter: "blur(20px)",
          borderColor: "var(--border)",
        }}
      >
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="px-5 py-3 rounded-2xl focus:outline-none focus:ring-2 transition shadow-inner w-full"
          style={{
            backgroundColor: "var(--input-background)",
            color: "var(--text-primary)",
            borderColor: "var(--border)",
            caretColor: "var(--primary)",
          }}
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="px-5 py-3 rounded-2xl focus:outline-none focus:ring-2 transition shadow-inner w-full"
          style={{
            backgroundColor: "var(--input-background)",
            color: "var(--text-primary)",
            borderColor: "var(--border)",
            caretColor: "var(--primary)",
          }}
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={6}
          required
          className="px-5 py-3 rounded-2xl focus:outline-none focus:ring-2 transition shadow-inner w-full resize-none"
          style={{
            backgroundColor: "var(--input-background)",
            color: "var(--text-primary)",
            borderColor: "var(--border)",
            caretColor: "var(--primary)",
          }}
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-8 py-3 rounded-2xl font-semibold shadow-lg transition"
          style={{
            background: "var(--primary-gradient)",
            color: "var(--button-text)",
          }}
        >
          {submitted ? "Message Sent ✅" : "Send Message"}
        </motion.button>
      </motion.form>
    </div>
  );
}
