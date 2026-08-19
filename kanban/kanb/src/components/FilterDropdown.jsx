const FilterDropdown = ({filterStatus, setFilterStatus}) => {
    return (
        <div>
            <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
                <option value="all">All</option>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>
        </div>
    )
}
export default FilterDropdown;