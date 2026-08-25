const EmptyState = () => {
    return (
      <div className="mt-8 rounded-2xl bg-white p-10 text-center shadow-sm">
        <div className="text-5xl">🌤️</div>
  
        <h2 className="mt-4 text-xl font-semibold">
          Search for a city
        </h2>
  
        <p className="mt-2 text-gray-500">
          Enter a city name to see the current weather
          and forecast.
        </p>
      </div>
    );
  };
  
  export default EmptyState;