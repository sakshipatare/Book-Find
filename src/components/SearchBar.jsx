import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar({ onSearch, defaultQuery = "" }) {
  const [query, setQuery] = useState(defaultQuery);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mb-8">
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
        <div className="relative flex items-center bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700 transition-all duration-300 focus-within:border-blue-500 focus-within:shadow-2xl">
          <div className="pl-6 pr-3 text-gray-400">
            <Search size={22} />
          </div>
          <input
            type="text"
            placeholder="Search for any book title..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 py-4 px-2 bg-transparent focus:outline-none text-gray-800 dark:text-gray-100 placeholder-gray-400"
          />
          <button
            type="submit"
            className="m-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-3 rounded-xl hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Search
          </button>
        </div>
      </div>
    </form>
  );
}
