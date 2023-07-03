import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
    console.log("Getting all")
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
};

const update = (id, updateData) => {
  console.log('Updating content with', updateData);
  const request = axios.put(`${baseUrl}/${id}`, updateData);
  console.log(response => response.data)
  return request.then(response => response.data);
};

export default {
    getAll: getAll,
    update: update
};