const Error = ({ onRetry, isRetrying }) => {

    return (
        <div>
            <p>Something went wrong. Please try again.</p>
            <button onClick={onRetry} disabled={isRetrying}>
                {isRetrying ? 'Retrying...' : 'Retry'}
            </button>
        </div>
    )

}

export default Error;