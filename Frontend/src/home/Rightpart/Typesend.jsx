import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import useSendMessage from "../../context/useSendMessage.js";

function Typesend() {
  const [message, setMessage] = useState("");
  const { loading, sendMessages } = useSendMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    await sendMessages(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmit} className="px-4 py-2">
      <div className="flex items-center backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 dark:border-gray-600 shadow-md rounded-2xl px-4 py-2 space-x-2">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-grow bg-transparent outline-none text-black dark:text-white placeholder:text-black dark:placeholder:text-gray-300 px-3 py-2"
          disabled={loading}
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-all disabled:opacity-50"
        >
          <IoSend className="text-xl" />
        </button>
      </div>
    </form>
  );
}

export default Typesend;
