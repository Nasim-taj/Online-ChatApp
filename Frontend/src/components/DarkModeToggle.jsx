import React, { useEffect } from "react";
import useThemeStore from "../zustand/themeStore";

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <button
      onClick={toggleTheme}
      className="fixed top-4 right-4 z-50 p-2 bg-gray-300 dark:bg-gray-700 text-black dark:text-white rounded-lg shadow"
    >
      {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
};

export default DarkModeToggle;
