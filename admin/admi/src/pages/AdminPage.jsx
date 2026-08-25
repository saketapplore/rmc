import { useEffect, useState, useMemo} from 'react'
import fetchUsers from '../services/userApi'
import AdminHeader from '../components/AdminHeader'
import UserTable from '../components/UserTable'
import SearchBar from '../components/SearchBar'
import DepartmentFilter from '../components/DepartmentFilter'
import StatusFilter from '../components/StatusFilter'
import SortFilter from '../components/SortFilter'
import Pagination from '../components/Pagination'
import UserForm from '../components/UserForm'
import UserDetails from '../components/UserDetails'
import BulkActions from '../components/BulkActions' 
import useLocalStorage from '../hooks/useLocalStorage'
import EmptyState from '../components/EmptyState'


const AdminPage = () => {

    const [users, setUsers] = useLocalStorage('admin-users', [])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [searchTerm, setSearchTerm] = useState('')
    const [department, setDepartment] = useState('all')
    const [status, setStatus] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const userPerPage = 10
    const [selectedUser, setSelectedUser] = useState(null)
    const [sortOption, setSortOption] = useState('default')
    const [selectedUserIds, setSelectedUserIds] = useState([])
    const [isUserModalOpen , setIsUserModalOpen] = useState(false)
    const [editUser, setEditUser] = useState(null)
    const [deleteUser, setDeleteUser] = useState(null)
    const [isBilkDeleteModalOpen, setIsBulkDeleteModalOpen] = useState(false)



    const departments = useMemo(() => {
        return [...new Set(users.map(user => user.department ))]
    }, [users])

    const handleSelectUser = (userId) => {

        setSelectedUserIds((prev) => {
            if(prev.includes(userId)){
                return prev.filter(
                    (id) => id !== userId
                )   
            }
            return [...prev, userId]
        })

    }

    const handleDeleteUser = (userId) => {
        
        const updatedUsers = users.filter(
            (user) => user.id !== userId
        )
        setUsers(updatedUsers)
    }

    const handleViewUser = (user) => {
        setSelectedUser(user)
    }

    const confirmDeleteUser = () => {
        setUsers((prevUsers) => 
         prevUsers.filter(
            (user) => user.id !== deleteUser.id
         )
        )
        setDeleteUser(null)
    }

    const filteredUsers  = useMemo(() => {
     
        let result = [...users]

        if(searchTerm.trim()){
            result = result.filter((user) => 
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
        }

        if(department !== 'all'){
            result = result.filter((user) => user.department === department)
        }
        
        if(status !== 'all'){

            result = result.filter(
                (user) => user.status.toLowerCase() === status.toLowerCase()
              )
        }

        switch(sortOption){

            case "name-asc":
                result.sort((a, b) => 
                 a.name.localeCompare(b.name)
                )
                break;
            
            case "name-desc":
                result.sort((a,b) => {
                    b.name.localeCompare(a.name)
                })
                break;

            case "email-asc":
                result.sort((a,b) => {
                    a.email.localeCompare(department.email)
                })
                break;

            case "email-desc":
                result.sort((a,b) => {
                    b.email.localeCompare(a.email)
                })
                break;

            default:
                break;

        }

        return result;

    }
    
    

    , [users, searchTerm, department, status, sortOption])

    const loadUsers = async () => {

        try {
            setLoading(true)
            setError(null)

          const storedUsers = localStorage.getItem('admin-users')

           if(storedUsers){
             setUsers(JSON.parse(storedUsers))
             return;
           }

           const data = await fetchUsers()

           setUsers(data)

           localStorage.setItem('admin-users' ,
            JSON.stringify(data)
           )

        } catch (error) {
            setError(error.message)
        } finally{
            setLoading(false)
        }

    }

    const handleSaveUser = (userData) => {

        if(editUser){

           const updatedUsers = users.map((user) =>
            user.id === userData.id ? userData : user
        )

        setUsers(updatedUsers)

        } else {

           const updatedUsers = 
           [...users, userData]

           setUsers(updatedUsers)

        }

        setIsUserModalOpen(false)
        setEditUser(null)

    }

    const totalPages = Math.ceil(
        filteredUsers.length / userPerPage
    )

    const paginatedUsers = useMemo(() => {
       const startIndex = (currentPage - 1) * userPerPage
       const endIndex = startIndex + userPerPage
       return filteredUsers.slice(startIndex, endIndex)
    }, [filteredUsers, currentPage])

    const allCurrentPageSelected = 
     paginatedUsers.length > 0 && 
     paginatedUsers.every((user) => selectedUserIds.includes(user.id))

     const handleSelectAll = () => {

        const currentPageIds = 
        paginatedUsers.map((user) => user.id)

        if(allCurrentPageSelected){

            setSelectedUserIds((prev) =>
            prev.filter(
                (userId) => !currentPageIds.includes(userId)
            )
            )
             return;
        }

        setSelectedUserIds((prev) => 
         [
            ...new Set([
                ...prev,
                ...currentPageIds
            ])
         ]
        )

     }

     const handleEditUser = (user) => {
        setEditUser(user)
        setIsUserModalOpen(true)
    }
    const handleBulkDelete = () => {

        if(selectedUserIds.length === 0){
            return;
        }

        setIsBulkDeleteModalOpen(true)

    }

    const corfirmBulkDelete = () => {

        const updatedUsers = users.filter(
            (user) => 
                !selectedUserIds.includes(user.id)
        )

        setUsers(updatedUsers)
        setSelectedUserIds([])
        setIsBulkDeleteModalOpen(false)
        
    }

    useEffect(() => {

        if (
            totalPages > 0 &&
            currentPage > totalPages
        ) {
            setCurrentPage(totalPages)
        }
    
    }, [currentPage, totalPages])

    useEffect(() => {
        loadUsers()
    }, [])

    useEffect(() => {
        setCurrentPage(1)
    }, [searchTerm, department, status, sortOption ])


    return (
        <div className='min-h-screen bg-gray-50 p-4'>
             <div className='max-w-7xl mx-auto'>

                 <AdminHeader 
                 onAddUser={() => {
                    setEditUser(null)
                    setIsUserModalOpen(true)
                 }}
                 />

                 <BulkActions selectedCount={selectedUserIds.length} onDelete={handleBulkDelete} />

                 <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                 <DepartmentFilter departments={departments} department={department} setDepartment={setDepartment} />
                 <StatusFilter status={status} setStatus={setStatus} />
                 <SortFilter sortOption={sortOption} setSortOption={setSortOption} />

                {
                    !loading && !error && filteredUsers.length === 0 ? (
                        <EmptyState 
                        onClear={() => {
                            setSearchTerm('')
                            setDepartment('all')
                            setStatus('all')
                            setSortOption('default')
                        }}
                        
                        />
                    ) : 

                    <UserTable users={paginatedUsers} loading={loading} error={error} onRetry={loadUsers} 
                    selectedUserIds={selectedUserIds} handleSelectUser={handleSelectUser}
                   handleSelectAll={handleSelectAll} allCurrentPageSelected={allCurrentPageSelected}
                   onEdit={handleEditUser}
                   onDelete={handleDeleteUser}
                   onView={handleViewUser}
                   />

                }

               

                 <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} 
                 />

                 {
                    isUserModalOpen && (
                        <UserForm user={editUser} onSubmit={handleSaveUser} onCancel={() => {
                            setIsUserModalOpen(false)
                            setEditUser(null)
                        }} />
                    )
                 }

                 {
                    selectedUser && (
                        <UserDetails user={selectedUser} onClose={() => setSelectedUser(null)} />
                    )
                 }

{
    deleteUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <h2 className="text-xl font-bold mb-3">
                    Delete User
                </h2>

                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                        {deleteUser.name}
                    </span>
                    ?
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => setDeleteUser(null)}
                        className="px-4 py-2 border rounded-md"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={confirmDeleteUser}
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    )
}

{
    isBilkDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">

            <div className="bg-white rounded-xl p-6 w-full max-w-md">

                <h2 className="text-xl font-bold mb-3">
                    Delete Selected Users
                </h2>

                <p className="text-gray-600 mb-6">
                    Are you sure you want to delete{" "}
                    <span className="font-semibold">
                        {selectedUserIds.length}
                    </span>{" "}
                    selected users?
                </p>

                <div className="flex justify-end gap-3">

                    <button
                        type="button"
                        onClick={() => setIsBilkDeleteModalOpen(false)}
                        className="px-4 py-2 border rounded-md"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={corfirmBulkDelete}
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                        Delete
                    </button>

                </div>

            </div>

        </div>
    )
}



             </div>
        </div>
    )

}

export default AdminPage;