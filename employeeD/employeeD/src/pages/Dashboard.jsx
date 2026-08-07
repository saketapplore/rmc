import { useState, useMemo, useEffect} from 'react'

import { useQuery} from '@tanstack/react-query'
import {getEmployees} from '../services/employeeApi'
import EmployeeTable from '../components/EmployeeTable'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import DepartmentFilter from '../components/DepartmentFilter'
import SortDropdown from '../components/SortDropdown'
import EmptyState from '../components/EmptyState'
import Loader from '../components/Loader'
import Error from '../components/Error'


const Dashboard = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [selectedDepartment, setSelectedDepartment] = useState('')
    const [sortOption, setSortOption] = useState('')   
    const [currentPage, setCurrentPage] = useState(1);
       
    

    const {data, isLoading, error, refetch , isFetching} = useQuery({
        queryKey: ['employees'],
        queryFn: getEmployees
    })
    
 
    useEffect(() => {
        setCurrentPage(1);
    }, [searchTerm, selectedDepartment])
    
    const departments = useMemo(() => {
        return [...new Set(data?.map(emp => emp.company.department))]
    }, [data]);

    const filteredEmployees = useMemo(() => {

        let filtered = data?.filter((employee) => {
            const fullName = `${employee.firstName} ${employee.lastName}`.toLowerCase();
            const matchesSearch = fullName.toLowerCase().includes(searchTerm.toLowerCase()) 
            || employee.email.toLowerCase().includes(searchTerm.toLowerCase())

            return matchesSearch;
        })

        if(selectedDepartment){
            filtered = filtered.filter((employee) => employee.company.department === selectedDepartment)
        }
        return filtered;
    }, [data, searchTerm , selectedDepartment])

    const sortedEmployees = useMemo(() => {
        let sorted = [...filteredEmployees || []];
        if(sortOption === 'asc'){
            sorted.sort((a,b) => a.firstName.localeCompare(b.firstName));
        } else if(sortOption === 'desc'){
            sorted.sort((a,b) => b.firstName.localeCompare(a.firstName));
        }
        return sorted;
    }, [filteredEmployees, sortOption])

    const employeesPerPage = 5;
    const totalPages = Math.ceil((sortedEmployees?.length || 0) / employeesPerPage);
 
     const paginatedEmployees = useMemo(() => {
        const startIndex = (currentPage - 1) * employeesPerPage;
        const endIndex = startIndex + employeesPerPage;
        return sortedEmployees?.slice(startIndex, endIndex);
     }, [sortedEmployees, currentPage, employeesPerPage]
    )

    if(isLoading) return <Loader />


    if(error) return <Error onRetry={refetch} isRetrying={isFetching} />  

   



    return (
        <>
        
        <h1>Dashboard</h1>

        <SearchBar search={searchTerm} setSearch={setSearchTerm}/>

        <DepartmentFilter departments={departments} selectedDepartment={selectedDepartment} setSelectedDepartment={setSelectedDepartment} />

        <SortDropdown sortOption={sortOption} setSortOption={setSortOption} sortedEmployees={sortedEmployees}/>

        {
            paginatedEmployees.length > 0 ? (
                <EmployeeTable employees={paginatedEmployees} />
            ) : (
                <EmptyState />
            )
        }

      {
        totalPages > 1 && (
            <Pagination currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
        )
      }
     
        </>
    )

}

export default Dashboard;