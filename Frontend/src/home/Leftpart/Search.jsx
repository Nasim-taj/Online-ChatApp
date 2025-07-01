import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import useGetAllUsers from "../../context/useGetAllUsers";
import useConversation from "../../zustand/useConversation";
import toast from "react-hot-toast";

function Search() {
  const [search, setSearch] = useState("");
  const [allUsers] = useGetAllUsers();
  const { setSelectedConversation } = useConversation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!search) return;
    const conversation = allUsers.find((user) =>
      user.fullname?.toLowerCase().includes(search.toLowerCase())
    );
    if (conversation) {
      setSelectedConversation(conversation);
      setSearch("");
    } else {
      toast.error("User not found");
    }
  };

  return (
    <div className="px-4 py-2">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-between backdrop-blur-md bg-white/30 dark:bg-gray-800/40 border border-white/40 dark:border-gray-600 shadow-md rounded-2xl px-4 py-2 transition-all">
          <input
            type="text"
            placeholder="Search user by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-grow bg-transparent outline-none text-black dark:text-white placeholder:text-black dark:placeholder:text-gray-300 px-2 py-1"
          />
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white rounded-full p-2 transition-all"
          >
            <FaSearch className="text-xl" />
          </button>
        </div>
      </form>
    </div>
  );
}

export default Search;
