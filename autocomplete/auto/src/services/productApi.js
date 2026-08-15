import axios from "axios";

const BASE_URL = "https://dummyjson.com/products";

const fetchProducts = async (query, signal) => {
  const response = await axios.get(
    `${BASE_URL}/search?q=${query}`,
    {
      signal,
    }
  );
  

  return response.data.products;
};

export default fetchProducts;