import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from './../services/anecdotes'

const initialState = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

// const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name:'posts',
  initialState,
  reducers: {
    createPost(state,action) {
      const post = asObject(action.payload)
      anecdoteService.post(post)
      state.push(post)
    },
    votePost(state,action) {

      anecdoteService.vote(action.payload)
      const id = action.payload
      const data = state.map((p) => p.id === id ? {
        ...p,votes: p.votes + 1 
      }:p)
      return data.sort((a,b) => b.votes - a.votes)
    },
    appendPost(state, action) {
      state.push(action.payload)
    },
    setPosts(state, action) {
      return action.payload.sort((a,b) => b.votes - a.votes)
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

export const initializePosts = () => {
  return async dispatch => {
    const posts = await anecdoteService.getAll()
    dispatch(setPosts(posts))
  }
}

export const { createPost, votePost, appendPost, setPosts } = anecdoteSlice.actions
export default anecdoteSlice.reducer