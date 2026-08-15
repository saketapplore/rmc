const SortDropdown = ({sort, setSort}) => {

    return (
   
        <div className="sort-dropdown">
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
                 
                 <option value="default">Default</option>

                 <option value="price-low">Price Low - High</option>

                 <option value="price-high">Price High-Low</option>

                 <option value="rating-high">Rating High - Low</option>

            </select>
        </div>

    )

}

export default SortDropdown;