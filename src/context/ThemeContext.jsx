import { createContext, useState, useEffect } from "react";
import { theme } from "../theme/theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const root = document.documentElement;

    const colors = darkMode ? theme.dark : theme.light;
    root.style.setProperty("--bg", colors.background);
    root.style.setProperty("--card", colors.card);
    root.style.setProperty("--text-primary", colors.textPrimary);
    root.style.setProperty("--text-secondary", colors.textSecondary);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--primary", theme.primary);
    root.style.setProperty("--secondary", theme.secondary);
    root.style.setProperty("--accent", theme.accent);
  }, [darkMode]);

  return (
    <ThemeContext.Provider value={{ darkMode, setDarkMode }}>{children}</ThemeContext.Provider>
  );
};
