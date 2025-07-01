import React, { useEffect } from "react";
import Search from "./Search";
import Users from "./Users";
import Logout from "./Logout";
import useThemeStore from "../../zustand/themeStore";

function Left() {
  const { theme, toggleTheme } = useThemeStore();

  // Apply the dark class to the root
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  return (
    <div className="w-full min-h-screen flex flex-col bg-gradient-to-r from-blue-200 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
      {/* Toggle Dark Mode Button */}


      {/* Search bar */}
      <Search />

      {/* User list */}
      <div
        className="flex-1 overflow-y-auto scrollbar-hide"
        style={{ maxHeight: "calc(85vh - 8vh)" }}
      >
        <Users />
      </div>

      {/* Logout button */}
      <Logout />
    </div>
  );
}

export default Left;
