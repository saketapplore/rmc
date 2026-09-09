const SortDropdown = ({sortOption, setSortOption}) => {

    return (

        <div className='mb-6'>

           <select
           value={sortOption}
           onChange={(e) => setSortOption(e.target.value)}
           className='w-full p-2 border rounded-md'
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
                Name: A to Z
              </option>

              <option value='name-desc'>
                Name: Z to A
              </option>
         
           </select>

        </div>

    )

}

export default SortDropdown