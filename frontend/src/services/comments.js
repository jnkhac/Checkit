import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/comments'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getAllByNote = async ({ id }) => {
    const response = await axios.get(baseUrl + '/note/' + id)
    return response.data
}

const createNew = async (comment) => {
    const config = {
        headers: { authorization: token }
    }
    const response = await axios.post(baseUrl, comment, config)
    return response.data
}

export default {
    setToken,
    getAll,
    getAllByNote,
    createNew
}