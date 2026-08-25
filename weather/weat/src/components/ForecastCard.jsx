import { memo } from "react";

const ForecastCard = ({ forecast }) => {
  return (
    <article className="rounded-xl bg-white p-5 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <h3 className="font-semibold">
        {forecast.day}
      </h3>

      <div
        className="mt-4 text-4xl"
        aria-label={forecast.condition}
      >
        {forecast.icon}
      </div>

      <p className="mt-4 text-2xl font-bold">
        {forecast.temperature}°C
      </p>

      <p className="mt-2 text-sm text-gray-500">
        {forecast.condition}
      </p>
    </article>
  );
};

export default memo(ForecastCard);