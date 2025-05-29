
const SearchBar = () => {
    return (
        <div className="w-full sm:max-w-md">
          <input
            type="text"
            placeholder="Search posts..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          />
        </div>
    );
}
export default SearchBar;