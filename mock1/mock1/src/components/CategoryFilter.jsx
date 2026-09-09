const CategoryFilter = ({categoryFilter, setCategoryFilter, categories}) => {

    return (

        <div className='mb-6'>

            <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md'
            >

                <option value='all'>All Categories</option>

                
                    {
                        categories.map((category) => (
                           <option
                           key={category}
                           value={category}
                           >
                            {category}
                           </option>
                        ))
                    }
                

            </select>

        </div>

    )

}

export default CategoryFilter