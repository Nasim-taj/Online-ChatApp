import React, { useEffect, useState } from "react";
import Left from "./home/Leftpart/Left";
import Right from "./home/Rightpart/Right";
import Signup from "./components/Signup";
import Login from "./components/Login";
import { useAuth } from "./context/AuthProvider";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, Routes } from "react-router-dom";

function App() {
  const [authUser] = useAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Toggle <html> class based on isDarkMode
  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            authUser ? (
              <div className="drawer lg:drawer-open h-screen w-screen bg-gradient-to-br from-blue-200 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden transition-colors duration-500">
                <input
                  id="my-drawer-2"
                  type="checkbox"
                  className="drawer-toggle"
                />

                {/* Right panel */}
                <div className="drawer-content flex items-center justify-center rounded-2xl shadow-lg bg-gradient-to-br from-blue-200 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
                  {/* Toggle Button */}
                  <div className="absolute top-4 right-4 z-50">
                    <button
                      onClick={() => setIsDarkMode(!isDarkMode)}
                     className="fixed bottom-24 left-6 z-50 p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-md hover:scale-105 transition"
      >
                      {isDarkMode ? " ☀️ " : " 🌙 "}
                    </button>
                  </div>
                  <Right />
                </div>

                {/* Left panel */}
                <div className="drawer-side">
                  <label
                    htmlFor="my-drawer-2"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                  ></label>
                  <div className="w-80 min-h-full p-1">
                    <div className="h-full rounded-2xl shadow-lg bg-gradient-to-br from-blue-200 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
                      <Left />
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Navigate to={"/login"} />
            )
          }
        />
        <Route
          path="/login"
          element={authUser ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/signup"
          element={authUser ? <Navigate to="/" /> : <Signup />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
