import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import useThemeStore from "../zustand/themeStore";

function Signup() {
  const [authUser, setAuthUser] = useAuth();
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");
  const confirmPassword = watch("confirmPassword", "");

  const validatePasswordMatch = (value) => {
    return value === password || "Passwords do not match";
  };

  const onSubmit = async (data) => {
    const userInfo = {
      fullname: data.fullname,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    };

    await axios
      .post("/api/user/signup", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Signup successful");
        }
        localStorage.setItem("ChatApp", JSON.stringify(response.data));
        setAuthUser(response.data);
      })
      .catch((error) => {
        if (error.response) {
          toast.error("Error: " + error.response.data.error);
        }
      });
  };

  return (
    <>
      {/* Dark Mode Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 right-4 z-50 p-2 bg-gray-200 dark:bg-gray-800 text-black dark:text-white rounded-xl shadow-md hover:scale-105 transition"
      >
        {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
      </button>

      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-200 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/40 shadow-xl px-8 py-6 rounded-2xl w-96 space-y-4"
        >
          <h1 className="text-3xl font-bold text-center text-black dark:text-white drop-shadow-md">
            Chat<span className="text-green-500">App</span>
          </h1>
          <h2 className="text-xl font-semibold text-center text-black dark:text-white">Signup</h2>

          {/* Fullname */}
          <label className="flex items-center gap-2 bg-white/20 dark:bg-white/10 border border-black dark:border-white px-3 py-2 rounded-lg backdrop-blur-sm">
            <input
              type="text"
              className="grow outline-none bg-transparent text-black dark:text-white placeholder:text-black dark:placeholder:text-white"
              placeholder="Fullname"
              {...register("fullname", { required: true })}
            />
          </label>
          {errors.fullname && (
            <span className="text-red-600 text-sm font-semibold">This field is required</span>
          )}

          {/* Email */}
          <label className="flex items-center gap-2 bg-white/20 dark:bg-white/10 border border-black dark:border-white px-3 py-2 rounded-lg backdrop-blur-sm">
            <input
              type="email"
              className="grow outline-none bg-transparent text-black dark:text-white placeholder:text-black dark:placeholder:text-white"
              placeholder="Email"
              {...register("email", { required: true })}
            />
          </label>
          {errors.email && (
            <span className="text-red-600 text-sm font-semibold">This field is required</span>
          )}

          {/* Password */}
          <label className="flex items-center gap-2 bg-white/20 dark:bg-white/10 border border-black dark:border-white px-3 py-2 rounded-lg backdrop-blur-sm">
            <input
              type="password"
              className="grow outline-none bg-transparent text-black dark:text-white placeholder:text-black dark:placeholder:text-white"
              placeholder="Password"
              {...register("password", { required: true })}
            />
          </label>
          {errors.password && (
            <span className="text-red-600 text-sm font-semibold">This field is required</span>
          )}

          {/* Confirm Password */}
          <label className="flex items-center gap-2 bg-white/20 dark:bg-white/10 border border-black dark:border-white px-3 py-2 rounded-lg backdrop-blur-sm">
            <input
              type="password"
              className="grow outline-none bg-transparent text-black dark:text-white placeholder:text-black dark:placeholder:text-white"
              placeholder="Confirm Password"
              {...register("confirmPassword", {
                required: true,
                validate: validatePasswordMatch,
              })}
            />
          </label>
          {errors.confirmPassword && (
            <span className="text-red-600 text-sm font-semibold">
              {errors.confirmPassword.message}
            </span>
          )}

          {/* Footer */}
          <div className="flex justify-between items-center text-sm">
            <p className="text-black dark:text-white">
              Have an account?
              <Link to="/login" className="text-blue-600 dark:text-blue-400 underline ml-1 font-medium">
                Login
              </Link>
            </p>
            <input
              type="submit"
              value="Signup"
              className="text-white bg-green-500 px-4 py-2 cursor-pointer rounded-lg hover:bg-green-600 transition-all"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Signup;
