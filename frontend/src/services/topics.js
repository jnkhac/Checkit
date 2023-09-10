import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/topics'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const getById = async ({ id }) => {
    const response = await axios.get(baseUrl + '/' + id)
    return response.data
}

const createNew = async (topic) => {
    const config = {
        headers: { authorization: token }
    }
    // const object = {
    //     name: content.name,
    //     desc: content.desc,
    // }
    const response = await axios.post(baseUrl, topic, config)
    return response.data
}

export default {
    setToken,
    getAll,
    getById,
    createNew
}