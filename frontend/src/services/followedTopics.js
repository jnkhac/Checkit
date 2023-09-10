import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/joins'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getUserFollowedTopics = async () => {
    const config = {
        headers: { authorization: token }
    }
    const response = await axios.get(baseUrl + '/user', config)
    return response.data
}

export default {
    setToken,
    getAll,
    getUserFollowedTopics
}