const SortDropdown = ({sortOption, setSortOption, currentPage, setCurrentPage}) => {

    return (
        <div className='bg-white rounded-xl p-5 mt-6'>

          <select
            value={sortOption}
            onChange={(e) => {setSortOption(e.target.value);
                setCurrentPage(1);
            }}
            className='w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >

             <option value="default">
                Default
             </option>

             <option value="amount-low">
                Amount (Low to High)
             </option>

             <option value="amount-high">
              Amount (High to Low)
             </option>

             <option value="date-new">
                Date (New to Old)
             </option>
             
             <option value="date-old">
                Date (Old to New)
             </option>
          </select>
        </div>
    );
};

export default SortDropdown;