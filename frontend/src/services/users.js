import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
  const object = {
    name: content.name,
    username: content.username,
    password: content.password
   }
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default {
  getAll,
  createNew,
}