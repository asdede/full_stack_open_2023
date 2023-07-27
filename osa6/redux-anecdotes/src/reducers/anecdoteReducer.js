import { createSlice } from '@reduxjs/toolkit'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name:'posts',
  initialState,
  reducers: {
    createPost(state,action) {
      const post = asObject(action.payload)
      state.push(post)
    },
    votePost(state,action) {

      const id = action.payload
      const data = state.map((p) => p.id === id ? {
        ...p,votes: p.votes + 1 
      }:p)
      return data.sort((a,b) => b.votes - a.votes)
    }
  },
})

/*
const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch (action.type) {

    case 'ADD-LIKE':
      const id = action.payload.id
      const data = state.map((p) => p.id === id ? {
        ...p,votes: p.votes + 1 
      }:p)
      return data.sort((a,b) => b.votes - a.votes)
    
    case 'POST':
      const newPost = asObject(action.payload)
      return  [...state,newPost]
    }
  
  return state.sort((a,b) => b.votes - a.votes)
}
*/
/* 
export const votePost = (id) => {
  // Adds like to post
  return {
    type:'ADD-LIKE',
    payload: {id}
  }
}
*/
/*
export const createPost = (content) => {
  console.log(content)
  // Adds new post
  return {
    type:'POST',
    payload: content
  }
}
*/
console.log((anecdoteSlice.actions))

export const { createPost, votePost } = anecdoteSlice.actions
export default anecdoteSlice.reducer