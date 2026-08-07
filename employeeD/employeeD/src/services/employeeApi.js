import axios from 'axios'

const BASE_URL =  'https://dummyjson.com/users'

export const getEmployees = async () => {
    try {
        
        const response = await axios.get(BASE_URL)   
        return response.data.users
        } catch (error) {
        console.error('Error fetching employees:', error)
        throw error
    }
}
