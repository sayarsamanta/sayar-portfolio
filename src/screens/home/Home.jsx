import { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import ProfileAvatar from "../../components/profilepic/ProfileAvatar";
import placeholder from "../../assets/placeholder.jpg";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Home = () => {
  const { darkMode } = useContext(ThemeContext);
  const { user } = useSelector((state) => state.about);
  const {
    name,
    stats: { projects, experienceYears, clients },
    about: {
      skills,
      intro: { bio, brief, qoute, profileImg },
    },
  } = user || {};

  return (
    <div
      className="relative min-h-screen px-6 py-16 flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--gradient-bg)" }}
    >
      {/* Desktop UI */}
      <div className="hidden md:flex relative z-10 flex-col items-center text-center max-w-4xl">
        <ProfileAvatar src={profileImg || placeholder} size="large" />
        <h1
          className="mt-6 text-5xl sm:text-6xl font-extrabold bg-clip-text text-transparent"
          style={{ backgroundImage: "var(--gradient-text)" }}
        >
          {name || "Sayar Samanta"}
        </h1>
        <p className="mt-3 text-[var(--text-secondary)]">{bio}</p>
        <p className="mt-2 text-[var(--text-secondary)]">{brief}</p>
        {qoute && (
          <p
            className="mt-4 italic text-[var(--text-tertiary)] border-l-2 pl-3"
            style={{ borderColor: "var(--primary)" }}
          >
            "{qoute}"
          </p>
        )}

        {/* Stats Cards */}
        <div className="mt-12 w-full flex flex-wrap justify-center gap-4 px-2 sm:px-0">
          {[
            { label: "Projects", count: projects, color: "var(--primary)" },
            { label: "Years Exp", count: experienceYears, color: "var(--primary)" },
            { label: "Clients", count: clients, color: "var(--primary)" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i, duration: 0.6 }}
              className={`
        flex items-center gap-4 px-6 py-4 
        bg-white/10 backdrop-blur-md border-l-4 rounded-lg shadow-lg 
        min-w-[200px] flex-1
        transition-transform hover:scale-105
      `}
              style={{ borderColor: stat.color }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{stat.count}</h2>
              <p className="text-[var(--text-secondary)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Skills badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {skills.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.8 * i,
                duration: 2,
                repeat: Infinity,
              }}
              className="
        px-3 py-2
        rounded-full
        shadow-lg
        text-[var(--text-primary)]
        font-body
        text-xs sm:text-sm
        whitespace-nowrap
      "
            >
              {tech?.name}
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4">
          <Link
            className="px-6 py-2 rounded-xl font-medium transition hover:scale-105 shadow-md"
            style={{
              background: "var(--primary)",
              color: darkMode ? "#000" : "#fff",
            }}
            to="/projects"
          >
            Projects
          </Link>
          <Link
            className="px-6 py-2 rounded-xl border font-medium transition hover:bg-[var(--background-alt)]"
            style={{
              borderColor: "var(--primary)",
              color: "var(--text-primary)",
            }}
            to="/resume"
          >
            Resume
          </Link>
        </div>
      </div>
      {/* Mobile UI */}
      <div className="md:hidden relative z-10 flex flex-col items-center text-center max-w-md pb-6 mt-5">
        <ProfileAvatar src={profileImg || placeholder} size="medium" />
        <h1
          className="mt-4 text-3xl sm:text-4xl font-bold bg-clip-text text-transparent"
          style={{ backgroundImage: "var(--gradient-text)" }}
        >
          {name || "Sayar Samanta"}
        </h1>
        <p className="mt-2 text-[var(--text-secondary)]">{bio}</p>
        <p className="mt-1 text-[var(--text-secondary)] text-sm">{brief}</p>
        {qoute && (
          <p
            className="mt-3 italic text-[var(--text-tertiary)] border-l-2 pl-3 text-sm"
            style={{ borderColor: "var(--primary)" }}
          >
            "{qoute}"
          </p>
        )}
        <div className="mt-12 w-full flex flex-wrap justify-center gap-4 px-2 sm:px-0">
          {[
            { label: "Projects", count: projects, color: "var(--primary)" },
            { label: "Years Exp", count: experienceYears, color: "var(--primary)" },
            { label: "Clients", count: clients, color: "var(--primary)" },
          ].map((stat, i) => (
            <motion.div
              key={i}
              variants={itemVariants}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 * i, duration: 0.6 }}
              className={`
        flex items-center gap-4 px-6 py-4 
        bg-white/10 backdrop-blur-md border-l-4 rounded-lg shadow-lg 
        min-w-[200px] flex-1
        transition-transform hover:scale-105
      `}
              style={{ borderColor: stat.color }}
            >
              <h2 className="text-2xl font-bold text-[var(--text-primary)]">{stat.count}</h2>
              <p className="text-[var(--text-secondary)]">{stat.label}</p>
            </motion.div>
          ))}
        </div>
        {/* Skills badges */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {skills.map((tech, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: 0.8 * i,
                duration: 2,
                repeat: Infinity,
              }}
              className="
        px-3 py-2
        rounded-full
        shadow-lg
        text-[var(--text-primary)]
        font-body
        text-xs sm:text-sm
        whitespace-nowrap
      "
            >
              {tech?.name}
            </motion.div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex flex-col gap-3 w-full">
          <Link
            className="w-full px-6 py-2 rounded-xl font-medium transition hover:scale-105 shadow-md text-center"
            style={{
              background: "var(--primary)",
              color: darkMode ? "#000" : "#fff",
            }}
            to="/projects"
          >
            Projects
          </Link>
          <Link
            className="w-full px-6 py-2 rounded-xl border font-medium transition hover:bg-[var(--background-alt)] text-center"
            style={{
              borderColor: "var(--primary)",
              color: "var(--text-primary)",
            }}
            to="/resume"
          >
            Resume
          </Link>
        </div>

        <div className="h-16"></div>
      </div>
    </div>
  );
};

export default Home;
