import { configureStore } from '@reduxjs/toolkit'
import anecdoteReducer from './reducers/anecdoteReducer'
import filterReducer from './reducers/filterReducer'
import notificationReducer from './reducers/notificationReducer'

const store = configureStore({
    reducer: {
      posts : anecdoteReducer,
      filter : filterReducer,
      notification: notificationReducer
    }
  },console.log("Store exported"))

export default store