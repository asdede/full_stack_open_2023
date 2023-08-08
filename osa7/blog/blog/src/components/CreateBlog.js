import React from 'react'
import { useState, useRef } from 'react'
import { createBlog } from '../reducers/blogReducer'
import blogServices from '../services/blogServices'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const CreateBlog = () => {
  console.log('Creating new blog')

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  // eslint-disable-next-line no-unused-vars
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }
    try {
      dispatch(createBlog(blogObject))
      dispatch(setNotification(`Created new blog ${blogObject.title}`,5))
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (error) {
      console.log(error)
    }
  }
  /*
  const addBlog = async event => {
    event.preventDefault()

    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }
    try {
      const returnedObject = await blogServices.create(blogObject)
      await setBlogs(blogs.concat(returnedObject))
    } catch (error) {
      console.log(error.message)
    }
    dispatch(setNotification(`Created new blog ${blogObject.title}`,5))
    setAuthor('')
    setTitle('')
    setUrl('')
  }*/

  return (
    <div className="createblog">
      <form onSubmit={addBlog}>
        <h3>Create new blog</h3>
        <div>
          Title
          <input
            type="text"
            value={title}
            placeholder="Title"
            id="title"
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          Author
          <input
            type="text"
            id="author"
            value={author}
            placeholder="Author"
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          Url
          <input
            type="text"
            id="url"
            value={url}
            placeholder="Url"
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button id="submitBlog" name="submitBlog" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}

export default CreateBlog
