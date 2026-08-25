const SortFilter = ({sortOption, setSortOption}) => {

    return (

        <div className='mb-4'>  
        
           <select
           value={sortOption}
           onChange={(e) => setSortOption(e.target.value)}
           className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
           >

            <option value='default'>
                Default
            </option>

            <option value='name-asc'>
                Name (A-Z)
            </option>

            <option value='name-desc'>
                Name (Z-A)
            </option>

            <option value='email-asc'>
                Email (A-Z)
            </option>

            <option value='email-desc'>
                Email (Z-A)
            </option>

           </select>

        </div>

    )

}
export default SortFilter;