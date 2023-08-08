import blogServices from '../services/blogServices'
import React, { useEffect,useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams, useNavigate
} from 'react-router-dom'

const Users = ({ users }) => {
  return (
    <div>
      <ul>
        {users.map(user => (
          <li><Link to={`/users/${user.id}`}>{user.name}</Link> - Blogs created {user.blogs.length}</li>
        ))}
      </ul>
    </div>
  )
}

export const User = ({ users }) => {
  const id = useParams().id
  const user = users.find(u => u.id === id)
  if (!user) {return null}
  return(
    <div>
      <ul>
        {user.blogs.map(blog => (
          <li>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

export default Users