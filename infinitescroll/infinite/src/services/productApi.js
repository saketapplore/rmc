import axios from "axios"

const BASE_URL = "https://dummyjson.com/products"

const getProducts = async () => {

    try {
        const response = await axios.get(BASE_URL)
        return response.data
    } catch (error) {
        console.log(error)
        return []
    }

}

export default getProducts