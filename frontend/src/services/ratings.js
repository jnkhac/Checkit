import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/ratings'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createNew = async (details) => {
    const config = {
        headers: { authorization: token }
    }
    const object = {
        ...details
    }
    const response = await axios.post(baseUrl, object, config)
    return response.data
}

const remove = async (id) => {
    const config = {
        headers: { authorization: token }
    }
    const newURL = `${baseUrl}/${id}`
    const request = axios.delete(newURL, config)
    return request.then(response => response.data)
}

const update = async (id) => {
    const config = {
        headers: { authorization: token },
    }
    const newURL = `${baseUrl}/${id}`
    const request = axios.put(newURL, null, config)
    return request.then(response => response.data)
}

export default {
    setToken,
    getAll,
    createNew,
    remove,
    update
}