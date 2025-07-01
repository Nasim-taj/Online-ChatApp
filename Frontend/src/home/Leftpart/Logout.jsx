import React, { useState } from "react";
import { BiLogOutCircle } from "react-icons/bi";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import useThemeStore from "../../zustand/themeStore"; // <-- Add theme store

function Logout() {
  const [loading, setLoading] = useState(false);
  const { theme } = useThemeStore(); // <-- Use theme

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/user/logout");
      localStorage.removeItem("ChatApp");
      Cookies.remove("jwt");
      toast.success("Logged out successfully");
      window.location.reload();
    } catch (error) {
      console.log("Error in Logout", error);
      toast.error("Error in logging out");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-2">
      <div className="flex items-center justify-between backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 dark:border-gray-600 shadow-md rounded-2xl px-4 py-2 transition-all">
        <span className="text-black dark:text-white font-semibold">Logout</span>
        <button
          onClick={handleLogout}
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-all disabled:opacity-50"
        >
          <BiLogOutCircle className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default Logout;
