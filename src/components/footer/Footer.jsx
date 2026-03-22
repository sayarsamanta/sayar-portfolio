import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Mail } from "lucide-react"; // updated imports
import { FaXTwitter } from "react-icons/fa6";

const socialLinks = [
  {
    id: "linkedin",
    enabled: true,
    url: "https://www.linkedin.com/in/sayarsamanta/",
    platform: "linkedin",
  },
  { id: "github", enabled: true, url: "https://github.com/sayarsamanta", platform: "github" },
  {
    id: "twitter",
    enabled: true,
    url: "https://x.com/sayarsamanta", // Update with your handle
    platform: "twitter",
  },
  {
    id: "instagram",
    enabled: true,
    url: "https://instagram.com/your-profile",
    platform: "instagram",
  },
  { id: "email", enabled: true, url: "mailto:sayarsamanta@gmail.com", platform: "mail" },
];

const iconMap = {
  linkedin: <Linkedin size={20} color="#0A66C2" />,
  github: <Github size={20} color="var(--text-primary)" />,
  twitter: <FaXTwitter size={20} color="var(--text-primary)" />,
  instagram: <Instagram size={20} color="#E1306C" />,
  mail: <Mail size={20} color="var(--primary)" />,
};

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      // FIX: Changed mt-20 to pt-20 and removed background to make it part of the page
      className="w-full px-4 sm:px-10 pb-10 pt-20 relative"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Card 1: Identity */}
        <div
          className="md:col-span-2 p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl flex flex-col justify-center backdrop-blur-md"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
          }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1">
              {/* THEMED TEXT: Frontend Engineer */}
              <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)] leading-tight">
                Frontend Engineer
              </h3>
              <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-[0.2em]">
                Full Stack Capable
              </p>
            </div>
            <div className="h-10 w-[1px] bg-black/10 dark:bg-white/10 hidden sm:block" />
            <p className="text-xs text-[var(--text-secondary)] leading-relaxed max-w-[220px]">
              Building scalable digital experiences with modern UI precision.
            </p>
          </div>
        </div>

        {/* Card 2: Socials */}
        <div
          className="p-4 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl flex items-center justify-center backdrop-blur-md"
          style={{ background: "rgba(255, 255, 255, 0.03)" }}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {socialLinks
              ?.filter((item) => item.enabled)
              .map((item) => (
                <a
                  key={item.id}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-black/5 dark:bg-white/5 text-[var(--text-secondary)] rounded-2xl hover:bg-[var(--primary)] hover:text-white transition-all duration-300 border border-transparent"
                >
                  <div className="w-4 h-4 flex items-center justify-center">
                    {iconMap[item.platform]}
                  </div>
                </a>
              ))}
          </div>
        </div>

        {/* Card 3: Status */}
        <div
          className="p-6 rounded-3xl border border-black/10 dark:border-white/10 shadow-xl flex items-center justify-center backdrop-blur-md"
          style={{ background: "rgba(255, 255, 255, 0.03)" }}
        >
          <div className="flex flex-col items-center gap-4">
            <div className="space-y-1 text-center">
              <p className="text-[10px] font-bold text-[var(--primary)] uppercase tracking-[0.2em]">
                Freelance & Full-time
              </p>
              <h4 className="text-lg font-bold text-[var(--text-primary)] leading-tight">
                Available for Hire
              </h4>
            </div>

            <div className="flex items-center gap-2 px-3 py-1 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="text-[9px] font-bold text-[var(--text-secondary)] uppercase tracking-widest">
                Active Search: 2026
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Metadata Line */}
      <div className="max-w-7xl mx-auto mt-10 px-4 flex flex-col sm:flex-row justify-between items-center text-[9px] font-bold uppercase tracking-[0.3em] text-[var(--text-secondary)] gap-4 opacity-50">
        <p>© 2026 Sayar Samanta</p>
        <div className="flex gap-4">
          <span>React Ecosystem</span>
          <span className="opacity-30">•</span>
          <span>Tailwind CSS</span>
        </div>
      </div>
    </motion.footer>
  );
}
