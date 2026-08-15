const Error = ({ onRetry}) => {

    return (
        <div className="error-container">
            <h2>
                Something went wrong
            </h2>

            <button onClick={onRetry} className="error-retry-btn">
                Retry
            </button>

        </div>
    )

}

export default Error;