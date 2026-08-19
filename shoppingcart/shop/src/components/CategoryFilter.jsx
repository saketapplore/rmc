const CategoryFilter = ({categories, selectedCategory , setSelectedCategory}) => {

    return (
        <div className="shop-filter">
            <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                <option value="all">All Categories</option>
                {
                    categories.map((category) => (
                        <option key={category} value={category}>{category}</option>
                    ))
                }
            </select>
        </div>
    )

}

export default CategoryFilter