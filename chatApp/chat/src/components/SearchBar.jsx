

const SearchBar = ({search, setSearch}) => {

    return (

         <div className="p-4">
          
          <input 
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
          }}
          className='w-full border rounded-md p-2 focus:outline-none'
          />    

         </div>

    )
    
}

export default SearchBar;