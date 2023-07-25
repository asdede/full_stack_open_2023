import { createPost } from './../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { useState } from 'react'


const AnecdoteForm = () => {
    const [content,setContent] = useState('')
    const dispatch = useDispatch()

    const hanldeInputChange = (event) => {
        setContent(event.target.value)
      }
    
    const post = (event) => {
      event.preventDefault()
      dispatch(createPost(content))
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