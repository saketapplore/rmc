const EmployeeTable = ({employees}) => {

    return (
        <>
        
        <div className="employee-table">
          {employees.map((employee) => (
            <div key={employee.id}>
                <img src={employee.image} alt={employee.firstName} />
                 <h3>{employee.firstName} {employee.lastName}</h3>
                 <p>{employee.email}</p>
                 <p>{employee.phone}</p>
            </div>
          ))} 
        </div>
    </>
  );
};

export default EmployeeTable;