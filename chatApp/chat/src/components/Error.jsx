const Error = ({message, onRetry}) => {

    return (

        <div className="p-6 text-center">

           <p className="text-gray-500">
            {message}
           </p>

           <button 
           onClick={onRetry}
           className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
           >
            Retry
           </button>
          
        </div>

    )

};

export default Error;