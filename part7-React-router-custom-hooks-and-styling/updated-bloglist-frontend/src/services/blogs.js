import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const setConfig = token => {
  return {
    headers: { Authorization: token }
  }
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`)
  return response.data
}

const create = async newObject => {
  const config = setConfig(token)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const replace = async (updatedObject) => {
  const config = setConfig(token)

  const response = await axios.put(`${baseUrl}/${updatedObject.id}`, updatedObject, config)
  return response.data
}

const remove = async (id) => {
  const config = setConfig(token)

  await axios.delete(`${baseUrl}/${id}`, config)
}

const createComment = async ({blogId, commentObject}) => {
  const config = setConfig(token)

  const response = await axios.post(`${baseUrl}/${blogId}/comments`, commentObject, config)
  return response.data
}

export default { getAll, getOne, create, replace, remove, createComment, setToken }
