const SkeletonCard = () => {
    return (
      <div className="bg-white rounded-xl shadow-sm p-4 animate-pulse">
  
        <div className="h-48 bg-gray-200 rounded-lg mb-4" />
  
        <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
  
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-3" />
  
        <div className="h-4 bg-gray-200 rounded w-1/3 mb-4" />
  
        <div className="h-5 bg-gray-200 rounded w-1/4" />
  
      </div>
    );
  };
  
  export default SkeletonCard;