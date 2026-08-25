import ForecastCard from "./ForecastCard";

const Forecast = ({ forecast = []}) => {
  return (
    <section className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">
        4-Day Forecast
      </h2>

      
      {
        forecast.length === 0 ? (
          <p>No forecast available</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {forecast.map((item) => (
              <ForecastCard key={item.id} forecast={item} />
            ))}
          </div>
        )
      }

    </section>
  );
};

export default Forecast;