import React, { useState } from "react";

type SearchBarProps = {
  onSearchClick: (value: string) => void;
}

const SearchBar = React.memo(({ onSearchClick }: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState<string>("");

    return (
        <div className="w-full sm:max-w-md flex items-center space-x-2">
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Search posts..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
          <button 
            onClick={() => onSearchClick(searchValue)}
            className="px-4 py-2 bg-blue-600 text-white font-medium rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition">
            Search
          </button>

        </div>
    );
})
export default SearchBar;