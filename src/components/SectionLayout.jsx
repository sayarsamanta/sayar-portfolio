import { motion } from "framer-motion";

const SectionLayout = ({
  title,
  description,
  children,
  maxWidth = "max-w-5xl",
  centered = true,
  showDivider = true,
}) => {
  return (
    <section className={`w-full py-8 px-6 max-[440px]:py-0 max-[340px]:px-0`}>
      <div
        className={`${maxWidth} mx-auto flex flex-col ${
          centered ? "items-center text-center" : ""
        }`}
      >
        <motion.div
          // initial={{ opacity: 0, y: 30 }}
          // whileInView={{ opacity: 1, y: 0 }}
          // viewport={{ once: true }}
          // transition={{ duration: 0.6 }}
          className="w-full"
        >
          {title && (
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">{title}</h2>
          )}

          {description && (
            <p className="text-[var(--text-secondary)] max-w-2xl mx-auto mb-8">{description}</p>
          )}

          {children}
        </motion.div>
      </div>

      {showDivider && (
        <div className="mt-14 w-full flex justify-center">
          <div className="h-px w-3/4 bg-gradient-to-r from-transparent via-[var(--border)] to-transparent opacity-60" />
        </div>
      )}
    </section>
  );
};

export default SectionLayout;
