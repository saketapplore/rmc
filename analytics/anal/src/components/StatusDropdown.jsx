const StatusDropdown = ({status, setStatus}) => {
    return (
        <div className='bg-white rounded-xl p-5 mt-6'>
            <select
             value={status}
             onChange={(e) => setStatus(e.target.value)}
             className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
                <option value="all">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
            </select>
        </div>
    )
}

export default StatusDropdown;