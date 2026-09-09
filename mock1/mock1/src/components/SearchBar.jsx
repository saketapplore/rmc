const SearchBar = ({searchTerm, setSearchTerm}) => {

    return (

        <div className='mb-6'>
            <input 
            type='text'
            placeholder='Search Products...'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            />
        </div>

    )

}


export default SearchBar