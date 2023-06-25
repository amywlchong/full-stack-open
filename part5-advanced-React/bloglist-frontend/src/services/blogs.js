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

const create = async newObject => {
  const config = setConfig(token)

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const replace = async (id, newObject) => {
  const config = setConfig(token)

  const response = await axios.put(`${baseUrl}/${id}`, newObject, config)
  return response.data
}

const remove = async (id) => {
  const config = setConfig(token)

  await axios.delete(`${baseUrl}/${id}`, config)
}

export default { getAll, create, replace, remove, setToken }
