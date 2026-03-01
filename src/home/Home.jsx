import { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profileImg from "../assets/profile.jpg";
import { ThemeContext } from "../context/ThemeContext";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const { darkMode } = useContext(ThemeContext);

  return (
    <div
      className="relative min-h-[85vh] px-10 flex items-center overflow-hidden transition-colors duration-500"
      style={{ backgroundColor: "var(--bg)" }}
    >
      {/* Background Glow */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: "var(--primary)", opacity: 0.05 }}
        ></div>
        <div
          className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: "var(--secondary)", opacity: 0.05 }}
        ></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 gap-16 items-center w-full"
      >
        {/* LEFT SIDE CONTENT */}
        <div>
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ color: "var(--text-primary)" }}
          >
            Sayar Samanta
          </motion.h1>

          <motion.h2
            variants={itemVariants}
            className="mt-4 text-xl md:text-2xl font-light"
            style={{ color: "var(--text-secondary)" }}
          >
            Full Stack Developer | React & Node.js Engineer
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mt-6 max-w-lg leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            I build scalable web applications with clean architecture, modern
            UI/UX principles, and production-ready backend systems.
          </motion.p>

          <motion.div variants={itemVariants} className="mt-10 flex gap-6">
            <Link
              to="/projects"
              className="px-6 py-3 text-sm font-medium tracking-wide transition duration-300"
              style={{
                backgroundColor: "var(--primary)",
                color: darkMode ? "#000" : "#fff",
              }}
            >
              View Projects
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 text-sm tracking-wide border rounded-full transition duration-300"
              style={{
                borderColor: "var(--primary)",
                color: "var(--text-primary)",
              }}
            >
              Download Resume
            </motion.button>
          </motion.div>
        </div>

        {/* RIGHT SIDE PROFILE IMAGE */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center md:justify-end"
        >
          <div className="relative">
            {/* Glow behind image */}
            <div
              className="absolute inset-0 rounded-full blur-2xl scale-110"
              style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
            ></div>

            <motion.img
              src={profileImg}
              alt="Profile"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{
                opacity: 1,
                scale: 1,
                y: [0, -10, 0],
              }}
              transition={{
                opacity: { duration: 0.6 },
                scale: { duration: 0.6 },
                y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
              }}
              className="relative w-64 h-64 md:w-80 md:h-80 rounded-full object-cover object-top ring-1 ring-white/20"
            />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Home;
