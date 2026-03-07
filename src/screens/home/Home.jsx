import { useContext } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../../context/ThemeContext";
import { Stat } from "../../components/Stat";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import ProfileAvatar from "../../components/profilepic/ProfileAvatar";
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
  const navigate = useNavigate();
  const { darkMode } = useContext(ThemeContext);
  const { user } = useSelector((state) => state.about);
  const {
    name,
    bio,
    brief,
    profileImg,
    qoute,
    stats: { projects, experienceYears, clients },
    about: { skills },
  } = user || {};

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center overflow-hidden px-4 p-6">
      {/* Background Glows */}
      {/* <div className="absolute inset-0 -z-10">
        <div
          className="absolute top-[-150px] left-[-150px] w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: "var(--primary)", opacity: 0.05 }}
        />
        <div
          className="absolute bottom-[-150px] right-[-150px] w-[400px] h-[400px] rounded-full blur-3xl"
          style={{ backgroundColor: "var(--secondary)", opacity: 0.05 }}
        />
      </div> */}

      {/* Mobile Profile Image */}
      <div className="flex justify-center mb-6 w-full">
        <div className="relative">
          <div className="mt-12">
            <ProfileAvatar src={profileImg} size="large" />
          </div>
        </div>
      </div>

      {/* Hero Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="flex flex-col items-center justify-center max-w-2xl mx-auto gap-4 font-body mt-25"
      >
        <motion.h1
          variants={itemVariants}
          className="text-5xl sm:text-6xl md:text-7xl font-bold font-heading leading-tight"
          style={{ color: "var(--text-primary)" }}
        >
          {name}
        </motion.h1>

        <motion.h2
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl font-light "
          style={{ color: "var(--text-secondary)" }}
        >
          {bio}
        </motion.h2>

        <motion.p
          variants={itemVariants}
          className="mt-4 max-w-lg leading-relaxed text-sm sm:text-base text-center"
          style={{ color: "var(--text-secondary)" }}
        >
          {brief}
        </motion.p>

        {/* Personal Tagline */}
        <motion.p
          variants={itemVariants}
          className="mt-2 italic text-sm sm:text-base text-[var(--text-tertiary)]"
        >
          {qoute}
        </motion.p>

        {/* Buttons */}
        <motion.div variants={itemVariants} className="mt-6 flex flex-wrap justify-center gap-4">
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

      {/* Scroll Down Indicator */}
      <motion.div
        className="absolute bottom-6 animate-bounce"
        style={{ color: "var(--text-secondary)" }}
        onClick={() => navigate("/about")}
      >
        <FaChevronDown size={24} />
      </motion.div>
    </div>
  );
};

export default Home;
