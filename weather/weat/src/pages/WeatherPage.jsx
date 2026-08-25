import { useState, useCallback} from 'react'
import { getWeather } from '../services/weatherApi'
import SearchBar from '../components/SearchBar'
import CurrentWeather from '../components/CurrentWeather'
import Forecast from '../components/Forecast'
import Loader from '../components/Loader'
import EmptyState from '../components/EmptyState'   
import ErrorState from '../components/ErrorState'

const WeatherPage = () => {

    const [city, setCity] = useState('')
    const [weather, setWeather] = useState(null)

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const handleSearch = useCallback(async () => {

        if (!city.trim()) {
            setError('Please enter a city name')
            setWeather(null)
            return
        }

        try {
          setLoading(true)
          setError(null)
          
          const data = await getWeather(city)

          setWeather(data)
          
        } catch (error) {
            setError(error.message)
            setWeather(null)
        } finally {
            setLoading(false)
        }

    }, [city])

    return (
        <div className="min-h-screen bg-gray-100">
          <div className="mx-auto max-w-5xl px-4 py-8">
            
            <header className="mb-8 text-center text-3xl font-bold">
                <h1 className='text-3xl font-bold md:text-4xl'>Weather Dashboard</h1>
                <p className='text-gray-500 mt-2 md:text-lg'>Enter a city name to see the current weather and forecast</p>
            </header>
      
            <SearchBar
              city={city}
              setCity={setCity}
              onSearch={handleSearch}
              loading={loading}
            />
      
            <div className="mt-8">
              {loading && <Loader />}
      
              {error && !loading && (
                <ErrorState message={error} onRetry={handleSearch} />
              )}
      
              {weather && !loading && !error && (
                <>
                  <CurrentWeather weather={weather} />
      
                  <Forecast forecast={weather.forecast} />
                </>
              )}

              {!loading && !error && !weather && (
                <EmptyState />
              )}

            </div>
      
          </div>
        </div>
      );

}

export default WeatherPage