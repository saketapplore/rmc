const SearchBar = ({search, setSearch}) => {

    return (

        <div className='bg-white rounded-xl p-5 mt-6'>
            
            <input 
             type='text'
             placeholder='Search orders...'
             value={search}
             onChange={(e) => {
                setSearch(e.target.value);
             }}
             className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

        </div>

    )

}

export default SearchBar;