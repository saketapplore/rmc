const SortDropdown = ({sortOption, setSortOption}) => {

    return (

        <>
        
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className='border rounded-lg px-4 py-3 mb-3'
        >


            <option value='default'>
                Default
            </option>

            <option value='price-asc'>
                Price: Low to High
            </option>

            <option value = 'price-desc'>
                Price: High to Low
            </option>

            <option value='rating-desc'>
                Rating: High - Low
            </option>

            <option value='name-asc'>
                Name: A - Z
            </option>

            <option value='name-desc'>
                Name: Z - A
            </option>

        </select>

        </>

    )

}

export default SortDropdown