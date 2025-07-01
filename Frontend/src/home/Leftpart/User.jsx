import React from "react";
import useConversation from "../../zustand/useConversation.js";
import { useSocketContext } from "../../context/SocketContext.jsx";
import profile from "../../../public/user.jpg";

function User({ user }) {
  const { selectedConversation, setSelectedConversation } = useConversation();
  const isSelected = selectedConversation?._id === user._id;
  const { onlineUsers } = useSocketContext();
  const isOnline = onlineUsers.includes(user._id);

  return (
    <div
      className={`backdrop-blur-md 
        bg-white/30 dark:bg-gray-800/40 
        border border-white/40 dark:border-gray-700 
        shadow-md rounded-2xl m-2 p-2 cursor-pointer transition-all 
        ${isSelected ? "ring-2 ring-green-500" : "hover:ring-2 hover:ring-green-300 dark:hover:ring-green-500"}`}
      onClick={() => setSelectedConversation(user)}
    >
      <div className="flex items-center space-x-4">
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full border-2 border-green-500">
            <img src={profile} alt={user.fullname} />
          </div>
        </div>
        <div className="text-black dark:text-white">
          <h1 className="font-semibold text-base">{user.fullname}</h1>
          <span className="text-sm dark:text-gray-300">{user.email}</span>
        </div>
      </div>
    </div>
  );
}

export default User;
