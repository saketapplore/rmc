const Pagination = ({ totalPages, currentPage, setCurrentPage}) => {

    return (

        <div className='flex items-center justify-center gap-4 mt-6'>
           
           <button
           disabled={currentPage === 1}
           onClick={() => setCurrentPage(currentPage - 1)}
           className='px-4 py-2 border rounded disabled:opacity-50 disabled:cursor-not-allowed'
           >
            Previous
           </button>

           <span>
              Page {currentPage} of {totalPages}
           </span>

           <button
           disabled={currentPage === totalPages}
           onClick={() => setCurrentPage(currentPage + 1)}
           >
             Next
           </button>

        </div>

    )

}

export default Pagination