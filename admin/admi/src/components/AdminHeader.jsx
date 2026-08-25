const AdminHeader = ({onAddUser}) => {

    return (
        <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6'>
        
           <div>
              <h1 className='text-2xl font-bold'>
                Admin Panel
              </h1>

              <p className='text-gray-500'>
                Manage Users
              </p>

           </div>

           <button className='bg-blue-600 text-white px-4 py-2 rounded-lg' onClick={onAddUser}>
             + Add User
           </button>
      
        </div>
    )

}

export default AdminHeader