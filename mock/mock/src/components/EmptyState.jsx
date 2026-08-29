const EmptyState = ({onClear}) => {

    return (

        <div className='bg-white rounded-xl p-10 text-center'>
            
            <h2 className='text-xl font-semibold mb-2'>
                No products found
            </h2>

            <p className="text-gray-500 mb-4">
        Try changing your search or filters.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
      >
        Clear Filters
      </button>

        </div>

    )

}

export default EmptyState;