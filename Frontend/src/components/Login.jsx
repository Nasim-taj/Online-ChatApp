import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import DarkModeToggle from "../components/DarkModeToggle";

function Login() {
  const [authUser, setAuthUser] = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };

    axios
      .post("/api/user/login", userInfo)
      .then((response) => {
        if (response.data) {
          toast.success("Login successful");
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
      <DarkModeToggle />

      <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-200 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 transition-colors">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="backdrop-blur-md bg-white/30 dark:bg-white/10 border border-white/40 shadow-xl px-8 py-6 rounded-2xl w-96 space-y-4"
        >
          <h1 className="text-3xl font-bold text-center text-black dark:text-white drop-shadow-md">
            Chat<span className="text-green-500">App</span>
          </h1>
          <h2 className="text-xl font-semibold text-center text-black dark:text-white">Login</h2>

          {/* Email */}
          <label className="flex items-center gap-2 bg-white/20 dark:bg-white/10 border border-black dark:border-white px-3 py-2 rounded-lg backdrop-blur-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 text-black dark:text-white"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793l6.674 3.684c.206.1.446.1.652 0L15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70 text-black dark:text-white"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
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

          {/* Text & Button */}
          <div className="flex justify-between items-center text-sm">
            <p className="text-black dark:text-white">
              New user?
              <Link
                to="/signup"
                className="text-blue-600 dark:text-blue-400 underline ml-1 font-medium"
              >
                Signup
              </Link>
            </p>
            <input
              type="submit"
              value="Login"
              className="text-white bg-green-500 px-4 py-2 cursor-pointer rounded-lg hover:bg-green-600 transition-all"
            />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
