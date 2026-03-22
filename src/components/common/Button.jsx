import React from "react";
import { motion } from "framer-motion";

const Button = ({
  children,
  onClick,
  loading = false,
  disabled = false,
  icon: Icon,
  type = "button",
  loadingText = "Processing...",
  variant = "primary",
  className = "",
  ...props
}) => {
  const variantStyles = {
    primary: "px-6 py-2.5 rounded-lg bg-[var(--primary)] text-white hover:brightness-110",
    secondary: "px-6 py-2.5 rounded-lg bg-[var(--secondary)] text-white hover:brightness-110",
    outline:
      "px-6 py-2.5 rounded-lg border-2 border-[var(--primary)] text-[var(--primary)] bg-transparent hover:bg-[var(--primary)] hover:text-white",
    cancel: "px-6 py-2.5 rounded-lg border border-[var(--border)] hover:bg-[var(--bg-soft)]",
    delete: "px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700",
    edit: "p-0 bg-transparent border-none",
    secondarydelete: "p-2 bg-red-500 rounded-full text-white hover:bg-red-600",
  };

  const currentVariant = variantStyles[variant] || variantStyles.primary;

  return (
    <motion.button
      whileHover={!disabled && !loading ? { scale: 1.02 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed font-medium
        ${currentVariant} 
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
          className="w-4 h-4 border-2 border-current border-t-transparent rounded-full shrink-0"
        />
      ) : (
        Icon && <span className="flex items-center shrink-0">{Icon}</span>
      )}

      {/* Only show text if children exist and we aren't loading (or show loadingText) */}
      {children && <span className="leading-none">{loading ? loadingText : children}</span>}
    </motion.button>
  );
};

export default Button;
