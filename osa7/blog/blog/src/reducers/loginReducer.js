import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import loginServices from '../services/loginServices'
import blogServices from '../services/blogServices'

const initialState = ''

export const login = createAsyncThunk('login/login', async (credentials) => {
  const user = await loginServices.login(credentials)
  blogServices.setToken(user.token)
  window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
  return user
})

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    dologin: async(state, action) => {
      console.log('loggin in',action.payload)
      try {
        const user = await loginServices.login(action.payload)
        console.log(user)
        blogServices.setToken(user.token)
        window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
        return user
      } catch (e) {
        console.log(e)
        return e
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        return action.payload
      })
      .addCase(login.rejected, (state, action) => {
        console.log(action.error)
        return state
      })
  },
})

export const { setUser,dologin } = loginSlice.actions
export default loginSlice.reducer