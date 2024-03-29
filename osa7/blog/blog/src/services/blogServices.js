import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  console.log(newObject)
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const getUsers = () => {
  const userUrl = 'http://localhost:3003/api/users'
  console.log('Fetching users')
  const request = axios.get(userUrl)
  return request.then(response => response.data)
}

const getAll = () => {
  console.log('Getting all')
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const update = (id, updateData) => {
  console.log('Updating content with', updateData)
  const request = axios.put(`${baseUrl}/${id}`, updateData)
  console.log(response => response.data)
  return request.then(response => response.data)
}

const del = async id => {
  console.log('removing id ', id)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${id}`, config)
  return response.data
}

export default {
  getAll: getAll,
  update: update,
  create: create,
  setToken: setToken,
  del: del,
  getUsers
}
