const Pagination = ({
    currentPage,
    totalPages,
    onPageChange
}) => {

    if(totalPages <= 1) return null;

    return (

        <div className='flex items-center justify-center gap-2 mt-5'>
 
             <button
             disabled={currentPage === 1}
             onClick={() => onPageChange(currentPage - 1)}
             className='px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
             >
                Previous
             </button>

             {
                Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                ).map((page) => (
                    <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 border rounded ${currentPage === page ? "bg-black text-white" : ""}`}
                    >
                        {page}
                    </button>
                ) )
             }


        <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className='px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed'
        >
            Next
            </button>
        </div>
    );
};

export default Pagination;