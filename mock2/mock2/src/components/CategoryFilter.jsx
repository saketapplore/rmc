const CategoryFilter = ({categories , category , setCategory}) => {

    return (
        
        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className='px-4 py-2 border rounded-lg'
        >

           <option value='all'>
            All Categories
           </option>

           {
            categories.map((cat) => {
              return (
                <option
                 key={cat}
                 value={cat}
                >
                    {cat}
                </option>
                )
            })
           }

        </select>
            
    )

}

export default CategoryFilter