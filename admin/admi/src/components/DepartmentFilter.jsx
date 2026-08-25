const DepartmentFilter = ({departments, department , setDepartment}) => {

    return (

        <div className='mb-4'>

          <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          >

           <option value='all'>All Departments</option>

           {departments
             .filter((dept) => dept && dept !== 'all')
             .map((dept) => (
              <option key={dept} value={dept}>
                 {dept}
               </option>
             ))}
          </select>

        </div>

    )

}
export default DepartmentFilter;