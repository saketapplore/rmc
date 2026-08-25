import { useState } from 'react'

const UserForm = ({ user, onSubmit, onCancel }) => {

   const [name, setName] = useState(user?.name || '')
   const [email, setEmail] = useState(user?.email || '')
   const [department, setDepartment] = useState(user?.department || '')
   const [role, setRole] = useState(user?.role || '')
   const [status, setStatus] = useState(
     user?.status?.toLowerCase() || 'active'
   )

   const [errors, setErrors] = useState({})

   const handleSubmit = (e) => {

    e.preventDefault()

    const newErrors = {}

    if(!name.trim()){
        newErrors.name = 'Name is required'
    }

    if (!email.trim()) {
        newErrors.email = 'Email is required'
    } else if (
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    ) {
        newErrors.email = 'Invalid email address'
    }
    
    if(!department.trim()){
        newErrors.department = 'Department is required'
    }

    if(!role.trim()){
        newErrors.role = 'Role is required'
    }

    if(!status.trim()){
        newErrors.status = 'Status is required'
    }

    if(Object.keys(newErrors).length > 0){
        setErrors(newErrors)
        return
    }

    const userData = {
        id: user?.id || Date.now(),
        name: name.trim(),
        email: email.trim(),
        department,
        role,
        status
    }

    onSubmit(userData)

   }

   return (

    <div className='fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50'>

       <div className='bg-white rounded-xl p-6 w-full max-w-lg'>

          <h2 className='text-xl font-bold mb-6'>
             
             {user ? 'Edit User' : 'Add User'}

          </h2>
 
          <form onSubmit={handleSubmit} className='space-y-4'>

            <div>

                 <label className='block mb-1 font-medium'>
                    Name
                 </label>

                 <input 
                  type='text'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full p-2 border rounded-md'
                 />

                 {
                    errors.name && (
                        <p className='test-red text-sm mt-1'>
                            {errors.name}
                        </p>
                    )
                 }

            </div>   

            <div>
                <label className='block mb-1 font-medium'>
                    Email
                </label>

                <input 
                type='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className='w-full p-2 border rounded-md'
                />

                {
                    errors.email && (
                        <p className='test-red text-sm mt-1'>
                            {errors.email}
                        </p>
                    )
                }

            </div> 
 
            <div>
                <label className='block mb-1 font-medium'>
                    Department
                </label>

                <select
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className='w-full p-2 border rounded-md'
                >
                    <option value=''>Select Department</option>
                    <option value='HR'>HR</option>
                    <option value='Marketing'>Marketing</option>
                    <option value='Sales'>Sales</option>
                    <option value='Finance'>Finance</option>
                    <option value='Engineering'>Engineering</option>
                </select>

                {
                    errors.department && (
                        <p className='test-red text-sm mt-1'>
                            {errors.department}
                        </p>
                    )
                }

            </div>

            <div>
                <label className='block mb-1 font-medium'>
                    Role
                </label>

                 <select
                 value={role}
                 onChange={(e) => setRole(e.target.value)}
                 className='w-full p-2 border rounded-md'
                 >
                    <option value=''>Select Role</option>
                    <option value='Admin'>Admin</option>
                    <option value='User'>User</option>
                 </select>

                 {
                    errors.role && (
                        <p className='test-red text-sm mt-1'>
                            {errors.role}
                        </p>
                    )
                 }

            </div>

            <div>
                        <label className='block mb-1 font-medium'>
                            Status
                        </label>

                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className='w-full p-2 border rounded-md'
                        >
                            <option value='active'>
                                Active
                            </option>

                            <option value='inactive'>
                                Inactive
                            </option>
                        </select>

                        {errors.status && (
                            <p className='text-red-500 text-sm mt-1'>
                                {errors.status}
                            </p>
                        )}
                    </div>


                    {/* Buttons */}

                    <div className='flex justify-end gap-3 pt-4'>

                        <button
                            type='button'
                            onClick={onCancel}
                            className='px-4 py-2 border rounded-md'
                        >
                            Cancel
                        </button>

                        <button
                            type='submit'
                            className='bg-blue-600 text-white px-4 py-2 rounded-md'
                        >
                            {user ? 'Update User' : 'Add User'}
                        </button>

                    </div>

          </form>

       </div>


    </div>

   )

}

export default UserForm