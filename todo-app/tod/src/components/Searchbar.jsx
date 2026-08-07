const SearchBar = ({search, handleSearch}) => {


    
    return(
        <>
         <input type="text" placeholder="Search" value={search} onChange={handleSearch}/>
        </>
    )
}
export default SearchBar;