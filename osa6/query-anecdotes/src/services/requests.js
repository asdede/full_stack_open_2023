import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const createId = () => (100000 * Math.random()).toFixed(0)

export const getAnecdotes = () => 
    axios.get(baseUrl).then(res => res.data)

export const createAnecdote = newAnecdote => {
    const fullAnecdote = {
        content : newAnecdote,
        id: createId(),
        votes: 0
    }
    axios.post(baseUrl,fullAnecdote).then(res => res.data)
}

export const vote = votedObject => 
    axios.put(`${baseUrl}/${votedObject.id}`,votedObject).then(res => res.data)
