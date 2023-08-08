import { createSlice } from '@reduxjs/toolkit'
import blogServices from '../services/blogServices'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort((a, b) => b.likes - a.likes)
    },
    createBlog (state, action) {
      const newblog = action.payload
      const returnedObj = blogServices.create(newblog)
      console.log('returnded',returnedObj)
      state.push(returnedObj)
    },
    voteBlog(state, action) {
      const { id, likes } = action.payload
      const blogToUpdate = state.find((blog) => blog.id === id)
      if (blogToUpdate) {
        blogToUpdate.likes = likes
      }
    },
  },
})

export const { setBlogs, createBlog, voteBlog } = blogSlice.actions
export default blogSlice.reducer

export const initializeBlogs = () => async (dispatch) => {
  console.log('Initialising blogs')
  const blogs = await blogServices.getAll()
  console.log(blogs)
  dispatch(setBlogs(blogs))
}
