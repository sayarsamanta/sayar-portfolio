import { useState } from "react";
import { motion } from "framer-motion";
import useContactAPI from "../../hooks/useContactAPI";
import { Input } from "../../components/admin/projects/Input";
import { Textarea } from "../../components/admin/projects/Textarea";
import { validateContactUsForm } from "../../utils/helper";
export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState({});

  const { sendEmail } = useContactAPI();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError((prev) => ({
      ...prev,
      [e.target.name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateContactUsForm(formData, setError)) return;
    const { name, email, message } = formData;

    const res = await sendEmail(name, email, message);
    if (res) {
      setFormData({ name: "", email: "", message: "" });
      setSubmitted()(true);
    }
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
        <Input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Your Name"
          error={error.name}
        />

        {/* Email Input */}
        <Input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your Email"
          error={error.email}
        />

        {/* Message Textarea */}
        <Textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={6}
          error={error.message}
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
