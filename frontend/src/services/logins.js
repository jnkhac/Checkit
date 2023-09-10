import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

const login = async (crendentials) => {
    const response = await axios.post(baseUrl, crendentials)
    return response.data
}

export default { login }