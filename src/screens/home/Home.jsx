import { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import profileImg from "../../assets/profile.jpg";
import { ThemeContext } from "../../context/ThemeContext";
import { Stat } from "../../components/Stat";
import { FaChevronDown } from "react-icons/fa";
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
    <div className="relative min-h-[90vh] flex flex-col items-center overflow-hidden px-4 lg:px-10">
      {/* Background Glows */}
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: "var(--primary)", opacity: 0.05 }}
        />
        <div
          className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: "var(--secondary)", opacity: 0.05 }}
        />
      </div>

      {/* Mobile Profile Image */}
      <div className="flex justify-center mb-6 md:hidden w-full">
        <div className="relative">
          <div
            className="absolute inset-0 rounded-full blur-2xl scale-110"
            style={{ backgroundColor: "var(--accent)", opacity: 0.1 }}
          ></div>
          <motion.img
            src={profileImg}
            alt="Profile"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
            transition={{
              opacity: { duration: 0.6 },
              scale: { duration: 0.6 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
            }}
            className="w-56 h-56 sm:w-64 sm:h-64 mt-9 rounded-full object-cover object-top ring-1 ring-white/20"
          />
        </div>
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center max-w-2xl mx-auto gap-4 font-body mt-32"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Sayar Samanta
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl font-light"
          style={{ color: "var(--text-secondary)" }}
        >
          Full Stack Developer | React & Node.js Engineer
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-lg leading-relaxed text-sm sm:text-base"
          style={{ color: "var(--text-secondary)" }}
        >
          I build scalable web applications with clean architecture, modern
          UI/UX principles, and production-ready backend systems.
        </motion.p>

        {/* Personal Tagline */}
        <motion.p
          variants={itemVariants}
          className="mt-2 italic text-sm sm:text-base text-[var(--text-tertiary)]"
        >
          "Transforming ideas into interactive digital experiences."
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={itemVariants}
          className="mt-6 flex flex-wrap justify-center gap-4"
        >
          <Link
            to="/projects"
            className="px-6 py-3 text-sm font-medium tracking-wide transition duration-300 rounded-2xl font-body"
            style={{
              backgroundColor: "var(--primary)",
              color: darkMode ? "#000" : "#fff",
            }}
          >
            View Projects
          </Link>

          <Link
            to="/resume"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 text-sm tracking-wide border rounded-2xl transition duration-300 font-body"
            style={{
              borderColor: "var(--primary)",
              color: "var(--text-primary)",
            }}
          >
            View Resume
          </Link>
        </motion.div>

        {/* Mini Stats */}
        <motion.div className="flex flex-wrap justify-center gap-8 mt-10">
          <Stat count={12} label="Projects" />
          <Stat count={5} label="Years Exp" />
          <Stat count={20} label="Clients" />
        </motion.div>
      </motion.div>

      {/* Floating Tech Icons */}
      <div className="hidden md:flex flex-row gap-8 mt-10">
        {[
          "React",
          "Node.js",
          "Express",
          "JS",
          "Tailwind",
          "mongoDB",
          "React Native",
        ].map((tech, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.8 * i,
              duration: 2,
              repeat: Infinity,
            }}
            className="bg-[var(--card)] p-2 rounded-full shadow-lg text-[var(--text-primary)] font-body text-xs"
          >
            {tech}
          </motion.div>
        ))}
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 animate-bounce"
        style={{ color: "var(--text-secondary)" }}
      >
        <FaChevronDown size={24} />
      </motion.div>
    </div>
  );
};

export default Home;
