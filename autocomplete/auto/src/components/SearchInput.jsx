const SearchInput = ({query, setQuery, setIsOpen , onKeyDown}) => {

 return (
    <div className='relative'>
        <input 
        type='text'
        placeholder='Search for products'
        value={query}
        onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
        }}
        onKeyDown={onKeyDown}
        className='w-full border rounded-lg p-3 pr-10'
        />
        {query && (
            <button 
            onClick={() => setQuery("")}
            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700'
            >
                  ✕
            </button>
        )}
    </div>
 )

}

export default SearchInput