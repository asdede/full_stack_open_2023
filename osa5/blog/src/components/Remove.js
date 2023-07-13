import React from 'react'
import blogServices from '../services/blogServices'

const Remove = ({ blog,user }) => {
  const removeBlog = async (id) => {
    if (window.confirm(`Do you really want to delete ${blog.title} from ${blog.author}`)) {
      await blogServices
        .del(id)
      window.location.reload()
    }

  }
  if (blog.user.name === user.name) {
    return (
      <button onClick={() => {removeBlog(blog.id)}}>Remove</button>
    )}
}

export default Remove
