const Pagination = ({currentPage, totalPages, setCurrentPage}) => {

    return (
        <div className="pagination">
           <button disabled={currentPage === 1} className="pagination-button" onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
           <span>{currentPage} of {totalPages} </span>
           <button disabled={currentPage === totalPages} className="pagination-button" onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
    )

}

export default Pagination;