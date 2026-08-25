const SearchBar = ({searchTerm , setSearchTerm}) => {

    return (

        <div className='mb-4'>

        <input 
        type='text'
        placeholder='Search by name or email'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />

        </div>
    );
};

export default SearchBar;