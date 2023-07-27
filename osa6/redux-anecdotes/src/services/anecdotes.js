import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const post = async (data) => {
    const response = await axios.post(baseUrl,data)
    return response.data
}

const vote = async (id) => {
    const response = await axios.get(`${baseUrl}/${id}`)
    const anecdote = response.data
    const updated = {...anecdote,votes: anecdote.votes + 1 }
    const putRes = await axios.put(`${baseUrl}/${id}`,updated)
    return putRes.data
}

export default {getAll, post, vote}