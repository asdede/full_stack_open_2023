import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useDispatch } from 'react-redux';

import Filter from './components/Filter'
import { initializePosts } from './reducers/anecdoteReducer'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializePosts())
  },[dispatch])
  
  return (
    <div>
    <Notification/>
    <Filter />
    <h2>Anecdotes</h2>
    <AnecdoteForm />
    <AnecdoteList/>
    </div>
  )
}

export default App