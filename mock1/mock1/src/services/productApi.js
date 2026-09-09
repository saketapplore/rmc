const BASE_URL = "https://dummyjson.com/products?limit=100"
import axios from "axios"

const getProducts = async () => {
   try {
    const response = await axios.get(BASE_URL)
    return response.data
   } catch (error) {
    console.log(error)
    throw error
   }
}

export default getProducts