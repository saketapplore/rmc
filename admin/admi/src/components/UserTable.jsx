const UserTable = ({ users, loading, error, onRetry, selectedUserIds, handleSelectUser, handleSelectAll, allCurrentPageSelected , onEdit , onDelete , onView }) => {


     if(loading){
        return (
            <div className='bg-white rounded-xl p-6'>
                Loading Users...
            </div>
        )
     }

     if(error){
        return (
            <div className='bg-white rounded-xl p-6 text-center'>
               
               <p className='text-red-500 mb-4'>
                 {error}
               </p>

               <button
               onClick={onRetry}
               className='bg-blue-600 text-white px-4 py-2 rounded-lg'
               >
                 Retry
               </button>

            </div>
        )
     }

    return (

        <div className='bg-white rounded-xl shadow-sm overflow-x-auto'
        
        >

           <table className='w-full'>
 
               <thead className='bg-gray-50'>
                   
                   <tr>

                     <th className='p-4 text-left'>
                        <div className='flex items-center justify-between'>
                            <label className='flex items-center cursor-pointer'>
                                <input
                                type='checkbox'
                                checked={allCurrentPageSelected}
                                onChange={handleSelectAll}
                                className='mr-2'
                                />
                            </label>
                        </div>
                     </th>

                     <th className='p-4 text-left'>
                        #
                     </th>

                     <th className='p-4 text-left'>
                        Name
                     </th>

                     <th className='p-4 text-left'>
                        Email
                     </th>

                     <th className='p-4 text-left'>
                        Department
                     </th>

                     <th className='p-4 text-left'>
                        Status
                     </th>

                     <th className='p-4 text-left'>
                        Role
                     </th>

                     <th className='p-4 text-left'>
                        Actions
                     </th>

                   </tr>

               </thead>

               <tbody>
                 
                 {users.map((user) => (

                    <tr
                    key={user.id}
                    className='border-t'
                    >
                        <td className='p-4'>
                            <input
                                type='checkbox'
                                checked={selectedUserIds.includes(user.id)}
                                onChange={() => handleSelectUser(user.id)}
                            />
                        </td>

                        <td className='p-4'>
                            {user.id}
                        </td>

                        <td className='p-4 font-medium'>
                            {user.name}  
                        </td>

                        <td className='p-4'>
                            {user.email}
                        </td>

                        <td className='p-4'>
                            {user.department}
                        </td>

                        <td className='p-4'>
                            <span
                             className={`px-3 py-1 rounded-full text-xs font-medium ${
                                user.status === 'Active' ? `bg-green-100 text-green-700` 
                                : `bg-red-100 text-red-700`
                             }`}
                            >
                                {user.status}
                            </span>
                        </td>

                        <td className='p-4'>
                            <span className='px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs'>
                                {user.role}
                            </span>
                        </td>

                        <td className='p-4'>
                           <button type='button' className='text-blue-600 mr-3' onClick={() => onEdit(user)}>
                             Edit
                           </button>

                           <button type='button' className='text-red-600' onClick={() => onDelete(user)}>
                             Delete
                           </button>

                           <button type='button' className='text-gray-600' onClick={() => onView(user)}>
                             View
                           </button>
                        </td>

                    </tr>

                 ))}

               </tbody>

           </table>

        </div>

    )

}

export default UserTable