import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, vote } from './services/requests'
import { useReducer,  useContext } from 'react'
import {NoteDispatch} from './NoteContext'

const App = () => {
  const dispatch = NoteDispatch()
  const queryClient = useQueryClient()

  const voteMutation = useMutation(vote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const handleVote = (anecdote) => {
    voteMutation.mutate({...anecdote,votes :anecdote.votes +1})
    dispatch({type:"VOTE",anecdote})
  }

  const result = useQuery(
    'anecdotes', getAnecdotes)
  console.log(result)
  
  if (result.isLoading) {
    return <div>Loading data ....</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
