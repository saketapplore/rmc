const DataRange = ({
    dataRange,
    setDataRange
}) => {

    return (

        <div className='flex items-center justify-center gap-2'>

            <select
            value={dataRange}
            onChange={(e) => setDataRange(e.target.value)}
            className='px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
                <option value="today">
                    Today
                </option>

                <option value="7">
                    Last 7 Days
                </option>

                <option value="30">
                    Last 30 Days
                </option>

                <option value="90">
                    Last 90 Days
                </option>

            </select>

        </div>

    )

}

export default DataRange;