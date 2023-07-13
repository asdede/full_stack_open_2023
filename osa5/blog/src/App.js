import React from 'react'
import { useState, useEffect } from 'react'
import Title from './components/Title'
import Content from './components/Content'
import Login from './components/Login'
import LogOut from './components/Logout'
import Notification from './components/Notification'
import CreateBlog from './components/CreateBlog'
import blogServices from './services/blogServices'
import loginServices from './services/loginServices'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState('')
  const [[notification],setNotification] = useState([null,null])
  const [createBlogVisible, setCreateBlogVisible] = useState(false)


  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogServices.setToken(user.token)
        }
        const response = await blogServices.getAll()
        setBlogs(response)
      } catch (error) {
        console.error('Error fetching blogs:', error)
      }
    }
    fetchBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginServices.login({
        username, password
      })
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      )
      blogServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      handleNotification({ notification:`Succesful login welcome user ${user.name}` })
    } catch (exception) {
      handleNotification({ notification:'Wrong password or username' })
    }}

  const handleLogout = async (event) => {
    console.log('Loggin out')
    window.localStorage.setItem(
      'loggedBlogUser', JSON.stringify('')
    )
    handleNotification({ notification:`Logged out as user ${user.name}` })
    blogServices.setToken(null)
    console.log(event)
    setUser('')
  }

  const handleNotification = (event) => {
    setNotification([event.notification, event.code])

    setTimeout(() => {
      setNotification([null, null])
    }, 5000)
  }

  const handleLikes = async (id, updateData) => {
    try {
      await blogServices.update(id, updateData)
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === id) {
          return { ...blog, likes: blog.likes + 1 }
        }
        return blog
      })
      setBlogs(updatedBlogs)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const createBlog = () => {
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

    return (

      <div>
        <div  style={hideWhenVisible}>
          <button id='createBlog' onClick={() => setCreateBlogVisible(true)}>Create new blog</button>
        </div>
        <div style={showWhenVisible}>
          <CreateBlog
            blogs={blogs}
            setBlogs={setBlogs} />
          <button onClick={() => setCreateBlogVisible(false)}>Cancel</button>
        </div>
      </div>

    )}


  return (
    <div>
      <Title />
      {notification && (
        <Notification notification={notification}/>
      )}
      {!user && (
        <Login handleLogin={handleLogin} username={username}
          setUsername={setUsername} password={password}
          setPassword={setPassword}/>
      )}

      {user && createBlog()}

      {user && (
        <LogOut username={user.name} handleLogout={handleLogout} />
      )}
      <Content blogs={blogs} handleLikes={handleLikes} user={user}
        handleNotification={handleNotification}/>
    </div>
  )
}


export default App