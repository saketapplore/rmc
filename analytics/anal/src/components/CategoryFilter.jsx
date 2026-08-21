const CategoryFilter = ({
    category,
    setCategory,
    categories
}) => {

    return (

        <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
        >

          {
            categories.map((category) => (
                <option key={category} value={category}>
                    {
                        category === 'all' 
                        ? "All Categories"
                        : category
                    }
        </option>
    ))
  }
</select>
);
};

export default CategoryFilter;