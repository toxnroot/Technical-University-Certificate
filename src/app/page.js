"use client";
import { useState } from "react";
import SearchBar from "../app/components/SearchBar/SearchBar"; 
import StudentCard from "../app/components/StudentCard/StudentCard";

function Page() {
  const [searchResult, setSearchResult] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async (id) => {
    try {
      const response = await fetch(`/api/students/${id}`);
      if (response.ok) {
        const student = await response.json();
        setSearchResult(student);
        setError("");
      } else {
        setSearchResult(null);
        setError("Student not found");
      }
    } catch (error) {
      setSearchResult(null);
      setError("Error fetching student data");
      console.error("Error fetching student data:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">

      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">System for Student Information</h2>
          <p className="text-gray-600 mb-8">Search for a student by ID</p>
          <SearchBar onSearch={handleSearch} /> 
        </div>

        {error && (
          <div className="text-center text-red-600 mt-8">
            {error}
          </div>
        )}

        {searchResult && (
          <div className="flex justify-center mt-8">
            <StudentCard student={searchResult} /> 
          </div>
        )}
      </main>
    </div>
  );
}

export default Page;
