const SearchBar = ({searchTerm, setSearchTerm}) => {

    return (
      <div>
        <input 
        type="text"
        placeholder="Search Products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full border rounded-lg px-4 py-3'
        />
      </div>
    )

}

export default SearchBar