const SortDropdown = ({sortOption, setSortOption}) => {

    return (

        <select value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
        <option value="">Sort by</option>
        <option value="asc">A-Z</option>
        <option value="desc">Z-A</option>
        </select>
    )

}

export default SortDropdown;