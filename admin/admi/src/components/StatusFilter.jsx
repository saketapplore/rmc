const StatusFilter = ({status, setStatus}) => {
    

    return (
        <div className='mb-4'>

         <select
         value={status}
         onChange={(e) => setStatus(e.target.value)}
         className='w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
         >
            <option value='all'>
                All Status
            </option>

            <option value='active'>
                Active
            </option>

            <option value='inactive'>
                Inactive
            </option>

         </select>

        </div>
    )

}

export default StatusFilter;