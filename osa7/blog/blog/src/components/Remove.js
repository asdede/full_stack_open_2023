import React from 'react'
import blogServices from '../services/blogServices'
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Remove = ({ blog }) => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.login)
  const removeBlog = async id => {
    if (
      window.confirm(
        `Do you really want to delete ${blog.title} from ${blog.author}`
      )
    ) {
      await blogServices.del(id)
      dispatch(setNotification(`Removed blog ${blog.title}`,5))
      window.location.reload()
    }
  }
  if (user.name === user.name) {
    return (
      <button
        onClick={() => {
          removeBlog(blog.id)
        }}
      >
        Remove
      </button>
    )
  }
}

export default Remove
