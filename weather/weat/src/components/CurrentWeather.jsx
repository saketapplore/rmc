const CurrentWeather = ({ weather }) => {
    return (
      <section className="rounded-2xl bg-white p-6 shadow-md">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          
          <div>
            <h2 className="text-2xl font-bold">
              {weather.city}, {weather.country}
            </h2>
  
            <p className="mt-2 text-gray-500">
              Current Weather
            </p>
          </div>
  
          <div className="flex items-center gap-4">
            <span className="text-6xl">
              {weather.icon}
            </span>
  
            <div>
              <h1 className="text-5xl font-bold">
                {weather.temperature}°C
              </h1>
  
              <p className="mt-2 text-gray-600">
                {weather.condition}
              </p>
            </div>
          </div>
        </div>
  
        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
          
          <div className="rounded-xl bg-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Feels Like
            </p>
  
            <p className="mt-1 text-lg font-semibold">
              {weather.feelsLike}°C
            </p>
          </div>
  
          <div className="rounded-xl bg-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Humidity
            </p>
  
            <p className="mt-1 text-lg font-semibold">
              {weather.humidity}%
            </p>
          </div>
  
          <div className="rounded-xl bg-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Wind
            </p>
  
            <p className="mt-1 text-lg font-semibold">
              {weather.windSpeed} km/h
            </p>
          </div>
  
        </div>
      </section>
    );
  };
  
  export default CurrentWeather;