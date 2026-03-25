import { motion } from "framer-motion";
import { Linkedin, Github, Instagram, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";
import { version } from "../../../package.json";
import ThemeSwitcher from "../common/ThemeSwitcher";

const socialLinks = [
  {
    id: "linkedin",
    enabled: true,
    url: "https://www.linkedin.com/in/sayarsamanta/",
    platform: "linkedin",
  },
  {
    id: "github",
    enabled: true,
    url: "https://github.com/sayarsamanta",
    platform: "github",
  },
  {
    id: "twitter",
    enabled: true,
    url: "https://x.com/sayarsamanta",
    platform: "twitter",
  },
  {
    id: "instagram",
    enabled: true,
    url: "https://instagram.com/your-profile",
    platform: "instagram",
  },
  {
    id: "email",
    enabled: true,
    url: "mailto:sayarsamanta@gmail.com",
    platform: "mail",
  },
];

const iconMap = {
  linkedin: <Linkedin size={18} color="#0A66C2" />,
  github: <Github size={18} color="var(--text-primary)" />,
  twitter: <FaXTwitter size={18} color="var(--text-primary)" />,
  instagram: <Instagram size={18} color="#E1306C" />,
  mail: <Mail size={18} color="var(--primary)" />,
};

export default function Footer() {
  return (
    <motion.footer
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed bottom-4 left-0 right-0 z-[100] flex justify-center px-2 sm:px-4"
    >
      <div className="max-w-[calc(100vw-12px)] flex items-center flex-nowrap bg-[var(--card)] border border-[var(--border)] backdrop-blur-2xl rounded-2xl p-1 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        {/* Brand */}
        <div className="flex flex-col px-2 sm:px-4 py-1 border-r border-[var(--border)] min-w-0 shrink">
          <span className="text-[9px] sm:text-[10px] font-black tracking-tighter text-[var(--text-primary)] whitespace-nowrap">
            SAYAR.S
          </span>

          <div className="flex items-center gap-1 mt-0.5 min-w-0">
            <span className="hidden sm:block text-[7px] font-bold text-[var(--text-secondary)] opacity-50 tracking-[0.15em] whitespace-nowrap">
              v{version}
            </span>

            <div className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-green-500 shadow-[0_0_4px_rgba(34,197,94,0.6)]" />
              <span className="text-[5px] sm:text-[6px] font-bold tracking-[0.2em] text-green-600 dark:text-green-400 whitespace-nowrap">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="flex items-center gap-0.5 sm:gap-1 bg-black/5 dark:bg-white/5 rounded-xl p-1 mx-1 sm:mx-2 border border-black/5 dark:border-white/5 shrink min-w-0">
          {socialLinks
            .filter((s) => s.enabled)
            .map((item) => (
              <a
                key={item.id}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="p-1 sm:p-2 hover:scale-110 transition-all"
              >
                <div className="w-4 h-4 flex items-center justify-center">
                  {iconMap[item.platform]}
                </div>
              </a>
            ))}
        </div>

        {/* Theme */}
        <div className="pl-1 pr-1 border-l border-[var(--border)] shrink-0">
          <ThemeSwitcher />
        </div>
      </div>
    </motion.footer>
  );
}
