const ErrorState = ({ message, onRetry }) => {
    return (
      <div 
      role="alert"
      className="mt-8 rounded-2xl bg-white p-8 text-center shadow-sm">
        <div className="text-4xl">⚠️</div>
  
        <h2 className="mt-3 text-xl font-semibold">
          Something went wrong
        </h2>
  
        <p className="mt-2 text-gray-500">
          {message}
        </p>
  
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 rounded-lg bg-black px-5 py-2 text-white"
        >
          Retry
        </button>
      </div>
    );
  };
  
  export default ErrorState;