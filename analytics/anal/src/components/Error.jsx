const Error = ({ message, onRetry }) => {
    return (
      <div className="bg-white rounded-xl p-10 text-center">
  
        <p className="text-red-500 text-lg font-semibold">
          {message}
        </p>
  
        <button
          onClick={onRetry}
          className="mt-4 bg-black text-white px-5 py-2 rounded-lg"
        >
          Retry
        </button>
  
      </div>
    );
  };
  
  export default Error;