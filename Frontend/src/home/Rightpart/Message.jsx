import React from "react";

function Message({ message }) {
  const authUser = JSON.parse(localStorage.getItem("ChatApp"));
  const itsMe = message.senderId === authUser.user._id;

  const alignment = itsMe ? "items-end" : "items-start";
  const bubbleColor = itsMe
    ? "bg-white/30 text-black dark:bg-green-600/30 dark:text-white"
    : "bg-white/20 text-black dark:bg-gray-700/40 dark:text-white";

  const bubbleAlign = itsMe ? "ml-auto" : "mr-auto";

  const createdAt = new Date(message.createdAt);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className={`flex flex-col ${alignment} px-4`}>
      <div
        className={`max-w-[75%] px-4 py-2 rounded-2xl shadow-md backdrop-blur-md border border-white/40 dark:border-gray-600 ${bubbleColor} ${bubbleAlign}`}
      >
        <p className="text-sm">{message.message}</p>
        <span className="text-xs text-black/60 dark:text-gray-300/50 mt-1 block text-right">
          {formattedTime}
        </span>
      </div>
    </div>
  );
}

export default Message;
