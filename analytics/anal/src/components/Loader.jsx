const Loader = () => {
    return (
      <div className="space-y-6">
  
        {/* KPI Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="bg-white rounded-xl p-5"
            >
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
  
              <div className="h-8 bg-gray-200 rounded w-32 mt-4 animate-pulse" />
  
              <div className="h-4 bg-gray-200 rounded w-20 mt-3 animate-pulse" />
            </div>
          ))}
  
        </div>
  
        {/* Chart Skeleton */}
        <div className="bg-white rounded-xl p-5">
  
          <div className="h-5 bg-gray-200 rounded w-40 animate-pulse mb-5" />
  
          <div className="h-[300px] bg-gray-100 rounded animate-pulse" />
  
        </div>
  
      </div>
    );
  };
  
  export default Loader;