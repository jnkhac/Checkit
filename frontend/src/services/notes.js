import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/notes'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getHomeNotes = async () => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.get(baseUrl + '/home', config)
  return response.data
}

const getPopularNotes = async () => {
  const response = await axios.get(baseUrl + '/popular')
  return response.data
}

const getPopularAuthNotes = async () => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.get(baseUrl + '/popular/auth', config)
  return response.data
}

const getSavedNotes = async () => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.get(baseUrl + '/savednotes', config)
  return response.data
}

const getNotesByTopic = async ({ id }) => {
  const response = await axios.get(baseUrl + '/topic/' + id)
  return response.data
}

const getNoteById = async ({ id }) => {
  const response = await axios.get(baseUrl + '/' + id)
  return response.data
}

const getNoteByIdAuth = async ({ id }) => {
  const config = {
    headers: { authorization: token }
  }
  const response = await axios.get(baseUrl + '/auth/' + id, config)
  return response.data
}

const createNew = async (details) => {
  const config = {
    headers: { authorization: token }
  }
  const object = {
    ...details,
    title: details.title,
    content: details.content,
    topicId: details.topicId,
    important: false
  }
  const response = await axios.post(baseUrl, object, config)
  return response.data
}

const update = async (id, object) => {
  const request = axios.put(`${baseUrl}/${id}`)
  return request.then(response => response.data)
}

const remove = async (id) => {
  const config = {
    headers: { authorization: token }
  }
  const newURL = `${baseUrl}/${id}`
  const request = axios.delete(newURL, config)
  return request.then(response => response.data)
}

export default {
  setToken,
  getAll,
  createNew,
  update,
  remove,
  getHomeNotes,
  getPopularNotes,
  getPopularAuthNotes,
  getSavedNotes,
  getNotesByTopic,
  getNoteById,
  getNoteByIdAuth
}