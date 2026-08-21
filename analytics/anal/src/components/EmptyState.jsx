const EmptyState = () => {
    return (
      <div className="bg-white rounded-xl p-10 text-center">
  
        <p className="text-gray-500 text-lg">
          No orders found
        </p>
  
        <p className="text-sm text-gray-400 mt-2">
          Try changing your search or filters.
        </p>
  
      </div>
    );
  };
  
  export default EmptyState;