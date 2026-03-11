import { useState } from "react";
import { motion } from "framer-motion";

export default function Contact() {
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
      className="relative min-h-screen px-6 md:px-20 py-20 flex flex-col gap-20 font-body"
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
          className="text-5xl font-heading font-bold mb-4"
        >
          Let’s Connect
        </h1>
        <p
          style={{ color: "var(--text-secondary)" }}
          className="text-lg md:text-xl max-w-2xl mx-auto font-body"
        >
          I’m always open to collaboration or discussing new projects. Send me a message or connect
          via social platforms below.
        </p>
      </motion.div>

      {/* Glassmorphic Form */}
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        onSubmit={handleSubmit}
        className="max-w-2xl w-full sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto rounded-lg p-6 sm:p-8 md:p-10 flex flex-col gap-6 shadow-2xl border transition"
        style={{
          background: "var(--card-gradient)", // gradient depends on theme
          backdropFilter: "blur(20px)",
          borderColor: "var(--border)",
        }}
      >
        {/* Name Input */}
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          required
          className="px-5 py-3 rounded-lg focus:outline-none focus:ring-2 w-full font-body transition shadow-inner"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.08))",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            caretColor: "var(--primary)",
            backdropFilter: "blur(12px)",
          }}
        />

        {/* Email Input */}
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          required
          className="px-5 py-3 rounded-lg focus:outline-none focus:ring-2 w-full font-body transition shadow-inner"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.08))",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            caretColor: "var(--primary)",
            backdropFilter: "blur(12px)",
          }}
        />

        {/* Message Textarea */}
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={6}
          required
          className="px-5 py-3 rounded-lg focus:outline-none focus:ring-2 w-full resize-none font-body transition shadow-inner"
          style={{
            background: "linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.08))",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            caretColor: "var(--primary)",
            backdropFilter: "blur(12px)",
          }}
        />
        <motion.button
          whileHover={{
            scale: 1.05,
            boxShadow: "0 8px 20px rgba(255,255,255,0.3)",
          }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="px-8 py-3 rounded-2xl font-heading font-semibold transition shadow-lg border-2"
          style={{
            background: "linear-gradient(135deg, var(--primary), var(--secondary), var(--accent))",
            color: "var(--button-text)",
            borderColor: "var(--primary)",
            boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
          }}
        >
          {submitted ? "Message Sent ✅" : "Send Message"}
        </motion.button>
      </motion.form>
    </div>
  );
}
