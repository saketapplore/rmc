const SortDropdown = ({sortOption , setSortOption}) => {

    return (

        <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className='border p-3 rounded-md  m-2'
        >

            <option value='default'>
                Default
            </option>

            <option value='price-asc'> 
                Price: Low to High
            </option>

            <option value='price-desc'>
                Price: High to Low
            </option>

            <option value='name-asc'>
                Name : A to Z
            </option>

            <option value='name-desc'>
                Name : Z to A
            </option>

        </select>

    )

}

export default SortDropdown