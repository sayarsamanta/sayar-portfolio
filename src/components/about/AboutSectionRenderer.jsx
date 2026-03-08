import { motion } from "framer-motion";

export default function AboutSectionRenderer({ type, items }) {
  if (!items || items.length === 0) return null;

  switch (type) {
    case "skills":
      return (
        <div
          className={`grid gap-6 text-left ${
            items.length === 1 ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-1 md:grid-cols-2"
          }`}
        >
          {items.map((skill, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 transition-all duration-300 hover:border-[var(--primary)] hover:shadow-xl"
            >
              <div className="flex justify-between mb-3 font-heading font-medium">
                <span>{skill.name}</span>
                <span className="text-[var(--text-secondary)] text-sm">{skill.percentage}%</span>
              </div>

              <div className="h-2 bg-[var(--background-alt)] rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.percentage}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 1 }}
                  className="h-2 rounded-full bg-gradient-to-r from-[var(--primary)] via-[var(--secondary)] to-[var(--accent)]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      );

    case "achievements":
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {items.map((ach, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.02 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 transition-all duration-300 hover:border-[var(--primary)] hover:shadow-xl"
            >
              <h3 className="font-heading font-semibold text-lg mb-2">{ach.title}</h3>

              <span className="text-[var(--text-secondary)] text-sm">{ach.year}</span>
            </motion.div>
          ))}
        </div>
      );

    case "education":
      return (
        <div className="flex flex-col gap-6 text-left">
          {items.map((edu, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.01 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col md:flex-row md:justify-between md:items-center transition-all duration-300 hover:border-[var(--primary)] hover:shadow-lg"
            >
              <div>
                <h3 className="font-heading font-medium text-lg">{edu.degree}</h3>

                <span className="text-[var(--text-secondary)] text-sm">{edu.institution}</span>
              </div>

              <span className="text-[var(--text-secondary)] text-sm mt-2 md:mt-0">
                {edu.duration}
              </span>
            </motion.div>
          ))}
        </div>
      );

    case "projects":
      return (
        <div className="grid gap-6 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))] text-left">
          {items.map((proj, idx) => (
            <motion.a
              key={idx}
              href={proj.githubLink}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-[var(--card)] border border-[var(--border)] rounded-2xl p-6 flex flex-col gap-4 transition-all duration-300 hover:border-[var(--primary)] hover:shadow-xl"
            >
              <h3 className="font-heading font-semibold text-lg">{proj.title}</h3>

              <p className="text-[var(--text-secondary)] text-sm leading-relaxed line-clamp-4">
                {proj.description}
              </p>

              <div className="flex gap-2 flex-wrap mt-auto">
                {proj.tech.map((tech, i) => (
                  <span
                    key={i}
                    className="text-xs px-3 py-1 rounded-full border border-[var(--border)] bg-[var(--background-alt)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.a>
          ))}
        </div>
      );

    case "interests":
      return (
        <div className="flex flex-wrap justify-center gap-4">
          {items.map((i, idx) => (
            <motion.span
              key={idx}
              whileHover={{ scale: 1.05, y: -2 }}
              className="text-sm px-4 py-2 rounded-full border border-[var(--border)] bg-[var(--card)] transition-all duration-300 hover:border-[var(--primary)]"
            >
              {i}
            </motion.span>
          ))}
        </div>
      );

    default:
      return null;
  }
}
