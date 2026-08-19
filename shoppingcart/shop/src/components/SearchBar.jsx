const SearchBar = ({searchQuery, setSearchQuery}) => {

    return (

        <div className="shop-search">
            <input 
             type="text"
             placeholder="Search for a product"
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}   
            />
        </div>
    )

}

export default SearchBar