import React, { useRef, useState } from "react";
import { FilterDropdown, FilterOption } from "./modals/FilterDropdown";

type SearchBarProps = {
  onSearchClick: (value: string) => void;
}

const SearchBar = React.memo(({ onSearchClick }: SearchBarProps) => {
    const [searchValue, setSearchValue] = useState<string>("");
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [filters, setFilters] = useState<FilterOption[]>([
      { id: "popular", label: "Show only popular", checked: false },
      { id: "recent", label: "Show only recent", checked: false },
    ]);

    function toggleDropdown() {
      setIsOpen((open) => !open);
    }

    function onChangeFilter(id: string) {
      setFilters((prev) =>
      prev.map((f) => (f.id === id ? { ...f, checked: !f.checked } : f))
      );
    }

      function onApply() {
        alert(
          `Filters applied: ${filters
            .filter((f) => f.checked)
            .map((f) => f.label)
            .join(", ") || "None"}`
        );
        setIsOpen(false);
      }

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
          <button
            className="px-4 py-2 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200 text-sm font-medium transition"
            onClick={toggleDropdown}
            ref={buttonRef}
          >
            Filter
          </button>
          <FilterDropdown
            isOpen={isOpen}
            onToggle={toggleDropdown}
            onApply={onApply}
            options={filters}
            onChangeFilter={onChangeFilter}
            buttonRef={buttonRef}
          />

        </div>
    );
})
export default SearchBar;