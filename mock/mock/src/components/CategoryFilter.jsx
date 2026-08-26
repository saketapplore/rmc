const CategoryFilter = ({categories, category, setCategory}) => {

    return (
        <>
          <select
           value={category}
           onChange={(e) => setCategory(e.target.value)}
           className='border rounded-lg px-4 py-3 mb-6'
          >

              <option value='all'>
                All Categories
              </option>
             
             {
                categories.map((category) => (
                    <option key={category} value={category}> 
                        {category}
                    </option>
                ))
             }

          </select>
        </>
    )

}

export default CategoryFilter