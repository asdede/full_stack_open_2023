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
import { useDispatch, useSelector } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import Users, { User } from './components/Users'

import {
  BrowserRouter as Router,
  Routes, Route, Link,
  useParams, useNavigate
} from 'react-router-dom'


const App = () => {
  const dispatch = useDispatch()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user,setUser] = useState('')
  const [createBlogVisible, setCreateBlogVisible] = useState(false)

  const [users,setUsers] = useState([])
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await blogServices.getUsers()
        setUsers(response)
      } catch (error) {
        console.error('Error fetching users:', error)
      }
    }
    fetchUsers()
  }, [])
  /*
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
*/
  /*
  const handleLogin = event => {
    event.preventDefault()
    try {
      dispatch(dologin({ username,password }))
      setUsername('')
      setPassword('')
      const msg = `Succesful login, welcome user ${username}`
      dispatch(setNotification(msg,5))
    } catch (exception) {
      dispatch(setNotification('Wrong password or username'))
    }
  }
*/
  const Menu = (props) => {
    const navbar = {
      paddingRight: 10,
      paddingLeft: 10,
      backgroundColor: '#f2f2f2',
      border: '1px solid #ddd',
      borderRadius: '10px',
      marginRight: '10px',
      textAlign: 'center'
    }
    const navbarBtn = {
      paddingRight: 20,
      paddingLeft: 20,
      paddingDown: 20
    }

    return (
      <div >
        <Router>
          <div style={navbar}>
            <Link style={navbarBtn} to={'/blogs'}>blogs</Link>
            <Link style={navbarBtn} to={'/users'}>users</Link>
            <Link style={navbarBtn} to={user ? '': '/login'}>
              {user ? '' : 'login '}
            </Link>
          </div>

          <Routes>
            <Route path="/blogs" element={<Content handleLikeleLikes user={props.user}/>} />
            <Route path='/users' element={<Users users={props.users}/>} />
            <Route path="/users/:id" element={<User users={props.users}/>} />
            <Route path='/login' element={<Login handleLogin={props.handleLogin} username={props.username}
              setUsername={props.setUsername} password={props.password} setPassword={props.setPassword} /> } />
          </Routes>
        </Router>

      </div>
    )
  }


  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginServices.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogUser', JSON.stringify(user))
      blogServices.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const msg = `Succesful login, welcome user ${username}`
      dispatch(setNotification(msg,5))
    } catch (exception) {
      dispatch(setNotification('Wrong password or username'))
    }
  }

  const handleLogout = async event => {
    console.log('Loggin out')
    window.localStorage.setItem('loggedBlogUser', JSON.stringify(''))
    dispatch(setNotification(`Logged out as user ${user.name}`,5))
    blogServices.setToken(null)
    console.log(event)
    setUser('')
  }

  const handleLikes = async (id, updateData) => {
    try {
      await blogServices.update(id, updateData)
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === id) {
          dispatch(setNotification(`Liked post ${blog.title}`,5))
          return { ...blog, likes: blog.likes + 1 }
        }
        return blog
      })
      setBlogs(updatedBlogs)
    } catch (error) {
      dispatch(setNotification('Something went wrong',5))
      console.error('Error updating likes:', error)
    }
  }

  const createBlog = () => {
    const hideWhenVisible = { display: createBlogVisible ? 'none' : '' }
    const showWhenVisible = { display: createBlogVisible ? '' : 'none' }

    return (
      <div>
        <div style={hideWhenVisible}>
          <button id="createBlog" onClick={() => setCreateBlogVisible(true)}>
            Create new blog
          </button>
        </div>
        <div style={showWhenVisible}>
          <CreateBlog />
          <button onClick={() => setCreateBlogVisible(false)}>Cancel</button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <Title />
      {<Notification/>}
      {user && createBlog()}
      {user && <LogOut username={user.name} handleLogout={handleLogout} />}
      <Menu users={users}
        handleLogin={handleLogin}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword} />
    </div>
  )
}

export default App
