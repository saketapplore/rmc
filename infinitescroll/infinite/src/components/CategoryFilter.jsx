const CategoryFilter = ({category, setCategory, categories}) => {

    return (

        <div>
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                 <option value="">All</option>
                 {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                 ))}
            </select>
        </div>

    )

}

export default CategoryFilter