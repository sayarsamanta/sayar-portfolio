import { createContext, useState, useEffect, useRef } from "react";
import { theme } from "../theme/theme";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("theme-preference") || "system";
  });

  const modeRef = useRef(mode);

  useEffect(() => {
    modeRef.current = mode;
    localStorage.setItem("theme-preference", mode);
  }, [mode]);

  useEffect(() => {
    const root = document.documentElement;
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const apply = (isDark) => {
      const colors = isDark ? theme.dark : theme.light;

      // Variables
      root.style.setProperty("--bg", colors.background);
      root.style.setProperty("--card", colors.card);
      root.style.setProperty("--text-primary", colors.textPrimary);
      root.style.setProperty("--text-secondary", colors.textSecondary);
      root.style.setProperty("--border", colors.border);

      // Class toggles
      if (isDark) {
        root.classList.add("dark");
        root.classList.remove("light-theme");
      } else {
        root.classList.remove("dark");
        root.classList.add("light-theme");
      }
    };

    const handleChange = (e) => {
      console.log("EVENT FIRED: OS is now", e.matches ? "Dark" : "Light");

      const currentPreference = localStorage.getItem("theme-preference") || "system";

      if (currentPreference === "system") {
        apply(e.matches);
      }
    };

    const initialIsDark = mode === "system" ? darkQuery.matches : mode === "dark";
    apply(initialIsDark);

    darkQuery.addEventListener("change", handleChange);

    return () => darkQuery.removeEventListener("change", handleChange);
  }, [mode]);

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>;
};
