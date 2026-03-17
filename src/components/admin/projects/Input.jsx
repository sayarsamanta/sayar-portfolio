import React from "react";

export const Input = ({ className, type, name, value, onChange, placeholder, error }) => {
  return (
    <div className="flex flex-col">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl border border-[var(--border)] bg-transparent text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-purple-500 transition ${className}`}
      />
      <div className="min-h-[1.25rem] mt-1 text-xs text-red-500">{error || " "}</div>
    </div>
  );
};
