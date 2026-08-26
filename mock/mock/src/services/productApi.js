import axios from 'axios'

const BASE_URL = "https://dummyjson.com/products?limit=100"

const getProducts = async () => {

    try {
        const response = await axios.get(BASE_URL)
        return response.data.products
    } catch (error) {
        console.error('Error fetching products:', error)
        throw error
    }

}

export default getProducts