const EmptyState = ({ onClear }) => {

    return (
        <div className="bg-white rounded-xl p-10 text-center">

            <h2 className="text-xl font-semibold">
                No users found
            </h2>

            <p className="text-gray-500 mt-2">
                Try changing your search or filters.
            </p>

            <button
                type="button"
                onClick={onClear}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md"
            >
                Clear Filters
            </button>

        </div>
    )
}

export default EmptyState