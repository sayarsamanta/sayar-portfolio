import { useContext, useEffect, useState } from "react";
import { motion } from "framer-motion";
import profileImg from "../../assets/profile.jpg";
import FloatingConnectButton from "../../components/FloatingConnectButton";
import { ThemeContext } from "../../context/ThemeContext";

const skills = [
  { name: "React", category: "Frontend", level: 90 },
  { name: "Node.js", category: "Backend", level: 85 },
  { name: "JavaScript", category: "Frontend", level: 95 },
  { name: "Tailwind CSS", category: "Frontend", level: 90 },
  { name: "Framer Motion", category: "Frontend", level: 80 },
  { name: "MongoDB", category: "Backend", level: 75 },
];

const achievements = [
  { title: "AWS Certified Developer", year: "2023" },
  { title: "Hackathon Winner", year: "2023" },
  { title: "Open Source Contributions", year: "2022" },
];

const education = [
  {
    degree: "B.Tech Computer Science",
    university: "ABC University",
    year: "2020",
  },
  { degree: "Higher Secondary", university: "XYZ School", year: "2016" },
];

const projects = [
  {
    name: "Fullstack Portfolio",
    tech: ["React", "Node.js", "Tailwind"],
    link: "#",
  },
  {
    name: "E-commerce Platform",
    tech: ["React", "Express", "MongoDB"],
    link: "#",
  },
];

const interests = ["Photography 📷", "Travel 🌏", "Music 🎵", "Open Source 💻"];

export default function About() {
  const [skillCategory, setSkillCategory] = useState("All");
  const { darkMode } = useContext(ThemeContext);

  // Toggle light/dark theme class on body
  useEffect(() => {
    if (darkMode) {
      document.body.classList.remove("light-theme");
    } else {
      document.body.classList.add("light-theme");
    }
  }, [darkMode]);

  const filteredSkills =
    skillCategory === "All"
      ? skills
      : skills.filter((s) => s.category === skillCategory);

  return (
    <div
      className="min-h-screen px-6 md:px-20 py-20 flex flex-col gap-28 relative
             transition-colors duration-500 bg-[var(--background)] text-[var(--text-primary)] font-body"
    >
      {/* Hero / Intro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center gap-10"
      >
        <motion.img
          src={profileImg}
          alt="Profile"
          className="w-36 h-36 rounded-full border-2 border-[var(--primary)] object-cover"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">
            About Me
          </h1>
          <p className="text-[var(--text-secondary)] text-lg md:text-xl leading-relaxed">
            I'm a Full Stack Developer passionate about building interactive,
            scalable web applications. I combine clean UI/UX with robust backend
            architecture to deliver end-to-end solutions. Currently focused on
            React, Node.js, and modern JavaScript technologies.
          </p>
        </div>
      </motion.div>

      {/* Skills */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-3xl font-heading font-semibold mb-6">Skills</h2>

        {/* Skill Category Filter */}
        <div className="flex gap-4 mb-6">
          {["All", "Frontend", "Backend"].map((cat) => (
            <button
              key={cat}
              onClick={() => setSkillCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-heading font-medium border transition-colors
            ${
              skillCategory === cat
                ? "bg-[var(--primary)] text-[var(--text-button)] border-[var(--primary)]"
                : "bg-[var(--card)] text-[var(--text-secondary)] border-[var(--border)] hover:border-[var(--primary)]"
            }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05, y: -3 }}
              className="bg-[var(--card)] rounded-xl p-4 shadow-lg transition-colors duration-300"
            >
              <div className="flex justify-between mb-2 font-heading font-medium">
                <span>{skill.name}</span>
                <span className="text-[var(--text-secondary)] text-sm">
                  {skill.level}%
                </span>
              </div>
              <div className="h-2 bg-[var(--background-alt)] rounded-full">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-2 rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-3xl font-heading font-semibold mb-6">
          Achievements
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievements.map((ach, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.03 }}
              className="bg-[var(--card)] rounded-xl p-4 shadow-lg text-center transition-colors duration-300"
            >
              <h3 className="font-heading font-semibold text-lg mb-2">
                {ach.title}
              </h3>
              <span className="text-[var(--text-secondary)] text-sm">
                {ach.year}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Education */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-3xl font-heading font-semibold mb-6">Education</h2>
        <div className="flex flex-col gap-4">
          {education.map((edu, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-[var(--card)] rounded-xl p-4 shadow-lg flex justify-between items-center transition-colors duration-300"
            >
              <div>
                <h3 className="font-heading font-medium">{edu.degree}</h3>
                <span className="text-[var(--text-secondary)] text-sm">
                  {edu.university}
                </span>
              </div>
              <span className="text-[var(--text-secondary)] text-sm">
                {edu.year}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Featured Projects */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-3xl font-heading font-semibold mb-6">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((proj, idx) => (
            <motion.a
              key={idx}
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.03, y: -2 }}
              className="bg-[var(--card)] rounded-xl p-4 shadow-lg flex flex-col gap-2 transition-colors duration-300"
            >
              <h3 className="font-heading font-semibold text-lg">
                {proj.name}
              </h3>
              <div className="flex gap-2 flex-wrap">
                {proj.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-1 rounded-full border border-[var(--border)] bg-[var(--background-alt)] transition-colors duration-300 font-body"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Personal Interests */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <h2 className="text-3xl font-heading font-semibold mb-6">
          Personal Interests
        </h2>
        <div className="flex flex-wrap gap-4">
          {interests.map((i, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.1, y: -2 }}
              className="text-sm px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--background-alt)] transition-colors duration-300 font-body"
            >
              {i}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* Floating Connect Button */}
      <FloatingConnectButton />
    </div>
  );
}
