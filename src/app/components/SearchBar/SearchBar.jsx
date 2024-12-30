"use client";
import { useState } from "react";
import { Search } from "lucide-react";

function SearchBar({ onSearch }) {
  const [searchId, setSearchId] = useState("");

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };


  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchId.trim() !== "") {
      onSearch(searchId); 
    }
  };

  return (
    <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl m-auto">
      <div className="relative">
        <input
          type="text"
          value={searchId}
        onChange={handleSearchChange}
          placeholder="Search by ID"
          className="w-full px-6 py-4 text-lg rounded-full border-2 border-blue-100 focus:border-blue-500 focus:outline-none text-right pr-14 placeholder:text-gray-600 text-gray-900 m-auto"
          dir="rtl"
        />
        <button
          type="submit"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700"
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
