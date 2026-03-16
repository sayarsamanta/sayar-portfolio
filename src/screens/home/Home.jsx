import { useContext } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { Stat } from "../../components/Stat";
import { useSelector } from "react-redux";
import ProfileAvatar from "../../components/profilepic/ProfileAvatar";
import placeholder from "../../assets/placeholder.jpg";
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
      className="relative min-h-[90vh] flex flex-col items-center overflow-hidden px-4 p-10"
      style={{ background: "var(--background)" }}
    >
      {/* Mobile Profile Image */}
      <div className="flex justify-center">
        <div className="relative">
          <div className="mt-14">
            <ProfileAvatar src={profileImg || placeholder} size="large" />
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative flex flex-col items-center justify-center text-center 
  max-w-3xl mx-auto gap-5 px-4 sm:px-6 lg:px-8 mt-14 sm:mt-14"
      >
        {/* Role Badge */}
        <motion.div
          variants={itemVariants}
          className="px-4 py-1.5 text-xs sm:text-sm rounded-full 
    border border-[var(--border)] bg-[var(--background-alt)] 
    text-[var(--text-secondary)]"
        >
          Full Stack Developer
        </motion.div>

        {/* Name */}
        <motion.h1
          variants={itemVariants}
          className="font-heading font-bold leading-tight
    text-3xl sm:text-5xl md:text-6xl lg:text-7xl"
          style={{ color: "var(--text-primary)" }}
        >
          {name || "Sayar Samanta"}
        </motion.h1>

        {/* Bio / Role */}
        <motion.h2
          variants={itemVariants}
          className="text-base sm:text-lg md:text-xl 
    font-medium max-w-xl"
          style={{ color: "var(--text-secondary)" }}
        >
          {bio}
        </motion.h2>

        {/* Brief */}
        <motion.p
          variants={itemVariants}
          className="max-w-xl leading-relaxed 
    text-sm sm:text-base md:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          {brief}
        </motion.p>

        {/* Quote */}
        {qoute && (
          <motion.p
            variants={itemVariants}
            className="italic text-xs sm:text-sm 
      text-[var(--text-tertiary)] 
      border-l-2 border-[var(--primary)] pl-3 mt-2"
          >
            "{qoute}"
          </motion.p>
        )}

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4 mt-6">
          <Link
            to="/projects"
            className="px-6 sm:px-7 py-3 rounded-xl text-sm sm:text-base 
      font-medium transition-all duration-300 
      hover:scale-105 shadow-md"
            style={{
              backgroundColor: "var(--primary)",
              color: darkMode ? "#000" : "#fff",
            }}
          >
            View Projects
          </Link>

          <Link
            to="/resume"
            className="px-6 sm:px-7 py-3 rounded-xl text-sm sm:text-base 
      border transition-all duration-300 
      hover:bg-[var(--background-alt)]"
            style={{
              borderColor: "var(--primary)",
              color: "var(--text-primary)",
            }}
          >
            View Resume
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-6 sm:gap-10 mt-10"
        >
          <Stat count={projects} label="Projects" />
          <Stat count={experienceYears} label="Years Exp" />
          <Stat count={clients} label="Clients" />
        </motion.div>
      </motion.div>

      {/* Floating Tech Icons */}
      <div className="hidden md:flex flex-row gap-8 mt-10">
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
            className="bg-[var(--card)] p-2 rounded-full shadow-lg text-[var(--text-primary)] font-body text-xs"
          >
            {tech?.name}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Home;
