const BASE_URL = "https://dummyjson.com/products?limit=100"

import axios from 'axios'

const getProducts = async() => {

    try {
        const response = await axios.get(BASE_URL)
        return response.data.products
    } catch (error) {
        console.log("Error ", error)
    }

}

export default getProducts