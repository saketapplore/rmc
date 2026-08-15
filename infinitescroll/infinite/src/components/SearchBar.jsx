const SearchBar = ({search, setSearch}) => {

return (
    <input
    type="text"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    placeholder="Search products..."
    className="w-full p-2 border border-gray-300 rounded-md"
    />
)

}

export default SearchBar