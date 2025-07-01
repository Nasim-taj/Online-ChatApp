import React from "react";
import User from "./User";
import useGetAllUsers from "../../context/useGetAllUsers";

function Users() {
  const [allUsers, loading] = useGetAllUsers();

  return (
    <div className="flex flex-col backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 dark:border-gray-700 shadow-md rounded-xl m-4 p-2">
      <h1 className="text-lg font-bold text-black dark:text-white text-center mb-2">
        Messages
      </h1>
      <div
        className="flex-1 overflow-y-auto"
        style={{ maxHeight: "calc(84vh - 10vh)" }}
      >
        {allUsers.map((user, index) => (
          <User key={index} user={user} />
        ))}
      </div>
    </div>
  );
}

export default Users;
