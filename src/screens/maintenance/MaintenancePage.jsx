import { motion } from "framer-motion";

export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 bg-[var(--background)] text-[var(--text-primary)] font-sans">
      {/* Animated Icon / Illustration */}
      <motion.div
        animate={{ rotate: [0, 10, -10, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="mb-6"
      >
        {/* You can replace this with your SVG logo or icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-[var(--primary)]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </motion.div>

      {/* Headline */}
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Site Under Maintenance</h1>

      {/* Subtext */}
      <p className="text-[var(--text-secondary)] text-center max-w-lg">
        We are working hard to bring the site back! Thanks for your patience.
        <br />
        Please check back soon or contact admin if needed.
      </p>

      {/* Optional Call-to-Action */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        className="mt-6 px-6 py-3 bg-[var(--primary)] text-[var(--text-button)] rounded-xl font-medium shadow hover:shadow-lg transition-all duration-200"
        onClick={() => window.location.reload()}
      >
        Refresh
      </motion.button>
    </div>
  );
}
