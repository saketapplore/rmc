import axios from "axios"

const BASE_URL = "https://dummyjson.com/products"

const getProducts = async (pageParam = 0) => {

    try {
        const response = await axios.get(`${BASE_URL}?limit=10&skip=${pageParam}`)
        return response.data
    } catch (error) {
        console.error(error)
        throw error
    }
}

export default getProducts