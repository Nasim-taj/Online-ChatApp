import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import { CiMenuFries } from "react-icons/ci";
import profile from "../../../public/user.jpg";

function Chatuser() {
  const { selectedConversation } = useConversation();
  const { onlineUsers } = useSocketContext();

  const getOnlineUsersStatus = (userId) => {
    return onlineUsers.includes(userId) ? "Online" : "Offline";
  };

  return (
    <div className="flex items-center justify-between backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 dark:border-gray-600 shadow-md rounded-2xl px-4 py-2 m-2">
      <label
        htmlFor="my-drawer-2"
        className="cursor-pointer lg:hidden text-black dark:text-white"
      >
        <CiMenuFries className="text-2xl" />
      </label>
      <div className="flex items-center space-x-3">
        <div className="avatar online">
          <div className="w-12 rounded-full border-2 border-green-500">
            <img src={profile} alt="User" />
          </div>
        </div>
        <div className="text-black dark:text-white">
          <h1 className="text-lg font-semibold">{selectedConversation.fullname}</h1>
          <span className="text-sm">
            {getOnlineUsersStatus(selectedConversation._id)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Chatuser;
