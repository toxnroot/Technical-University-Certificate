"use client";
import { useState } from "react";
import { Search } from "lucide-react";

function SearchDashboard({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    onSearch(e.target.value); // تنفيذ البحث أثناء الكتابة
  };

  return (
    <form className="w-full max-w-2xl m-auto">
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder="Seach by (id, name, course, instructor)"
          className="w-full px-6 py-4 text-lg rounded-full border-2 border-blue-100 focus:border-blue-500 focus:outline-none text-left pr-14 placeholder:text-gray-600 text-gray-900 m-auto"
          dir="rtl"
        />
        <button
          type="button"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-700"
          onClick={() => onSearch(searchQuery)}
        >
          <Search size={24} />
        </button>
      </div>
    </form>
  );
}

export default SearchDashboard;
