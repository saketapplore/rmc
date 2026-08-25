import axios from 'axios';

const BASE_URL = "https://dummyjson.com/users?limit=100";

const fetchUsers = async () => {

    try {
        const response = await axios.get(BASE_URL)

        const users = response.data.users.map((user) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            email: user.email,
            department : user.company?.department || 'N/A',
            role: user.role || 'User',
            status: user.age % 2 === 0 ? 'Active' : 'Inactive'
         }))

        return users;
    } catch (error) {
        console.error('Error fetching users:', error);
        return [];
    }

}

export default fetchUsers;