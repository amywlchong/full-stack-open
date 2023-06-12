import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const get = () => {
  return axios
    .get(baseUrl)
    .then(response => response.data)
}

const create = (personObj) => {
  return axios
    .post(baseUrl, personObj)
    .then(response => response.data)
}

const remove = (url) => {
  return axios
    .delete(url)
}

const replace = (url, personObj) => {
  return axios
    .put(url, personObj)
    .then(response => response.data)
}

export default {get, create, remove, replace}
