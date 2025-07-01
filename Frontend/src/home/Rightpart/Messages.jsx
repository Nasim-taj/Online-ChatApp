import React, { useEffect, useRef } from "react";
import Message from "./Message";
import useGetMessage from "../../context/useGetMessage.js";
import Loading from "../../components/Loading.jsx";
import useGetSocketMessage from "../../context/useGetSocketMessage.js";

function Messages() {
  const { loading, messages } = useGetMessage();
  useGetSocketMessage();

  const lastMsgRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      if (lastMsgRef.current) {
        lastMsgRef.current.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }, [messages]);

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-200 via-white to-blue-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-800">
      <div className="w-full max-w-6xl h-[95vh] rounded-xl border border-white/40 dark:border-gray-600 bg-white/30 dark:bg-gray-800/40 backdrop-blur-md shadow-xl p-4 space-y-4 scroll-hidden">
        {loading ? (
          <Loading />
        ) : messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} ref={lastMsgRef}>
              <Message message={message} />
            </div>
          ))
        ) : (
          <p className="text-center text-black/70 dark:text-gray-300 mt-20 text-lg font-medium">
            Say Hi to start the conversation ✨
          </p>
        )}
      </div>
    </div>
  );
}

export default Messages;
