import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { createPost } from './../reducers/anecdoteReducer'
import { setNotification } from './../reducers/notificationReducer'


const AnecdoteForm = () => {
    const [content,setContent] = useState('')
    const dispatch = useDispatch()

    const hanldeInputChange = (event) => {
        setContent(event.target.value)
      }
    
    const post = (event) => {
      event.preventDefault()
      dispatch(createPost(content))
      const msg = `Created new anecdote: "${content}"`
      dispatch(setNotification(msg,5))
      setContent('')
    }
    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={post}> 
              <div><input value={content} onChange={hanldeInputChange}/></div>
              <button type="submit">create</button>
            </form>
        </div>
    )
}

export default AnecdoteForm