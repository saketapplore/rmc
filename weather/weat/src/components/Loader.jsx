const Loader = () => {
    return (
      <div className="space-y-6 animate-pulse">
        
        {/* Current Weather Skeleton */}
        <div className="rounded-2xl bg-gray-200 p-6">
          <div className="h-6 w-40 rounded bg-gray-300" />
  
          <div className="mt-6 h-12 w-24 rounded bg-gray-300" />
  
          <div className="mt-4 h-4 w-28 rounded bg-gray-300" />
  
          <div className="mt-6 grid grid-cols-3 gap-4">
            <div className="h-12 rounded bg-gray-300" />
            <div className="h-12 rounded bg-gray-300" />
            <div className="h-12 rounded bg-gray-300" />
          </div>
        </div>
  
        {/* Forecast Skeleton */}
        <div>
          <div className="mb-4 h-6 w-32 rounded bg-gray-200" />
  
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl bg-gray-200 p-5"
              >
                <div className="h-4 w-12 rounded bg-gray-300" />
  
                <div className="mx-auto mt-4 h-8 w-8 rounded bg-gray-300" />
  
                <div className="mx-auto mt-4 h-6 w-16 rounded bg-gray-300" />
  
                <div className="mx-auto mt-3 h-4 w-20 rounded bg-gray-300" />
              </div>
            ))}
          </div>
        </div>
  
      </div>
    );
  };
  
  export default Loader;