import React, { useEffect, useState } from "react";
import Chatuser from "./Chatuser";
import Messages from "./Messages";
import Typesend from "./Typesend";
import useConversation from "../../zustand/useConversation.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { CiMenuFries } from "react-icons/ci";

function Right() {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  useEffect(() => {
    return setSelectedConversation(null);
  }, [setSelectedConversation]);

  return (
    <div className="w-full bg-gradient-to-r from-blue-200 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">

      {!selectedConversation ? (
        <NoChatSelected />
      ) : (
        <div className="flex flex-col h-screen">
          <Chatuser />
          <div className="flex-1 overflow-y-auto" style={{ maxHeight: "calc(92vh - 8vh)" }}>
            <Messages />
          </div>
          <Typesend />
        </div>
      )}
    </div>
  );
}

export default Right;

const NoChatSelected = () => {
  const [authUser] = useAuth();

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-200 via-white to-blue-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-all">
      <div className="backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 dark:border-gray-700 shadow-xl px-8 py-6 rounded-2xl max-w-md text-center space-y-4 mx-4">
        <h1 className="text-3xl font-bold text-black dark:text-white drop-shadow-md">
          Welcome{" "}
          <span className="text-green-500">{authUser?.user?.fullname || "User"}</span>
        </h1>
        <p className="text-black dark:text-gray-200 text-base">
          No chat selected.
          <br />
          Please start a conversation by selecting someone from your contacts.
        </p>
        <label
          htmlFor="my-drawer-2"
          className="cursor-pointer inline-flex items-center justify-center px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all text-sm font-semibold lg:hidden"
        >
          <CiMenuFries className="mr-2 text-lg" />
          Open Contacts
        </label>
      </div>
    </div>
  );
};
