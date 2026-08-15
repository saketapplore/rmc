const Error = ({ onRetry }) => {

    return (
        <div className="mt-2 border rounded-lg p-4 bg-white">
            <p className="text-sm text-red-500">
                Unable to load products. Please try again.
            </p>

            <button onClick={onRetry}
            className='mt-2 border px-3 py-1 rounded text-sm text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200'
            >
                Retry
            </button>

        </div>
    )

}

export default Error