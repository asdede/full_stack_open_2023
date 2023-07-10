import { useState, useEffect } from 'react';
import Title from './components/Title';
import Content from './components/Content';
import Login from './components/Login';
import LogOut from './components/Logout';
import Notification from './components/Notification';
import CreateBlog from './components/CreateBlog';
import blogServices from './services/blogServices';
import loginServices from './services/loginServices';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author,setAuthor] = useState('')
  const [url,setUrl] = useState('')
  const [[notification,code],setNotification] = useState([null,null])



  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
        if (loggedUserJSON) {
          const user = JSON.parse(loggedUserJSON)
          setUser(user)
          blogServices.setToken(user.token)
        }
        const response = await blogServices.getAll();
        setBlogs(response);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
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
      handleNotification({notification:`Succesful login welcome user ${user.name}` })
    } catch (exception) {
      handleNotification({notification:"Wrong password or username"})
     }}

  const handleLogout = async (event) => {
    console.log("Loggin out")
    window.localStorage.setItem(
      'loggedBlogUser', JSON.stringify("")
    )
    handleNotification({notification:`Logged out as user ${user.name}`})
    blogServices.setToken(null)
    setUser(null)
  }

  const handleNotification = (event) => {
    setNotification([event.notification, event.code]);
  
    setTimeout(() => {
      setNotification([null, null]);
    }, 5000);
  };

  const addBlog = (event) => {
    event.preventDefault();
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    blogServices
      .create(blogObject)
        .then(returnedObject => {
          setBlogs(blogs.concat(returnedObject))
        })
    setAuthor('')
    setTitle('')
    setUrl('')
    handleNotification({notification:`Added new blog: ${title} from ${author}`})
  }

  const handleLikes = async (id, updateData) => {
    try {
      await blogServices.update(id, updateData);
      const updatedBlogs = blogs.map(blog => {
        if (blog.id === id) {
          return { ...blog, likes: blog.likes + 1 };
        }
        return blog;
      });
      setBlogs(updatedBlogs);
    } catch (error) {
      console.error('Error updating likes:', error);
    }
  };

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
      {user && (
        <CreateBlog 
          handleSubmit={addBlog}
          title={title}
          setTitle={setTitle}
          author={author}
          setAuthor={setAuthor}
          url={url}
          setUrl={setUrl}
        />
        
      )}
      {user && (
        <LogOut username={user.name} handleLogout={handleLogout} />
      )}
      {user && (
        <Content blogs={blogs} handleLikes={handleLikes} username={user.name} />
      )}
    </div>
  );
};

export default App;