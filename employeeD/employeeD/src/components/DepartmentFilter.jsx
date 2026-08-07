const DepartmentFilter = ({departments, selectedDepartment, setSelectedDepartment}) => {

    return (
        <>
      

        <select value={selectedDepartment} onChange={(e) => setSelectedDepartment(e.target.value)} >
            <option value="">All Departments</option>
            {
                Array.from(departments).map((department) => (
                    <option key={department} value={department}>{department}</option>
                ))
            }
            </select>
        </>
    )
}

export default DepartmentFilter;