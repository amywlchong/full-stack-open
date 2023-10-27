import axios from 'axios'
const baseUrl = '/api/users'

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
  const config = setConfig(token)

  const response = await axios.get(baseUrl, config)
  return response.data
}

const getOne = async (id) => {
  const config = setConfig(token)

  const response = await axios.get(`${baseUrl}/${id}`, config)
  return response.data
}

export default { getAll, getOne, setToken }
