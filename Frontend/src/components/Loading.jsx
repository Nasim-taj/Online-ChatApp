import React from "react";

function Loading() {
  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-r from-blue-200 via-white to-blue-200">
      <div className="flex flex-col gap-4 w-52 p-6 rounded-2xl backdrop-blur-md bg-white/30 border border-white/40 shadow-xl">
        <div className="h-32 w-full bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-4 w-28 bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-4 w-full bg-gray-300 rounded-md animate-pulse"></div>
        <div className="h-4 w-full bg-gray-300 rounded-md animate-pulse"></div>
      </div>
    </div>
  );
}

export default Loading;
