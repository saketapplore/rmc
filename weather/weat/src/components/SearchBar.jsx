import { memo } from 'react'

const SearchBar = ({ city, setCity, onSearch, loading }) => {
  const handleSubmit = (event) => {
    event.preventDefault();

    if (loading) return;

    onSearch();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-3 sm:flex-row"
    >
      <label htmlFor="city-search" className="sr-only">
        Search city
      </label>

      <input
        id="city-search"
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(event) => setCity(event.target.value)}
        disabled={loading}
        autoComplete="off"
        className="flex-1 rounded-lg border px-4 py-3 outline-none focus:ring-2"
      />

      <button
        type="submit"
        disabled={loading}
        className="rounded-lg px-6 py-3 text-white disabled:opacity-50"
      >
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
};

export default memo(SearchBar);