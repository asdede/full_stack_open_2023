import { createAnecdote } from "../services/requests"
import { useQuery, useMutation, useQueryClient } from 'react-query'
import {NoteDispatch} from '../NoteContext'



const AnecdoteForm = () => {
  const dispatch = NoteDispatch()

  const queryClient = useQueryClient()
  const newPostMutation = useMutation(createAnecdote,{
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    },
    onError: () => {
      dispatch({type:"ERR"})
    }
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newPostMutation.mutate(content)
    console.log((content.length))
    if (content.length >= 5) {
      dispatch({type:"ADD",content})
    } else {
      dispatch({type:"ERR"})
    }

}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
