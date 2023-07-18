import React from 'react'
import { useRef } from 'react'
import Togglable from './togglable'
import Remove from './Remove'

const Content = ({ blogs,handleLikes,user }) => {
  const blogObjects = useRef()

  blogs = blogs.sort((a,b) => a.likes - b.likes)
  blogs = blogs.reverse()

  console.log(' setting up content')
  return (
    <div>
      <table className='center'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Info</th>
          </tr>
        </thead>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td className='title'>{blog.title}
                <Remove blog={blog} user={user}/></td>
              <Togglable  buttonLabel='View' ref={blogObjects} cancelLabel='Hide'>
                <table className='center'>
                  <tr key={blog.id}>
                    <th>Author</th>
                    <th>Url</th>
                    <th>Added by</th>
                    <th>Likes</th>
                    <th></th>
                  </tr>
                  <tr>
                    <td className="author" >{blog.author}</td>
                    <td className='url'>{blog.url}</td>
                    <td className='username'>{blog.user.name}</td>
                    <td className='likes'>{blog.likes}</td>
                    <td><button className='blogLikeBtn' name='Like' onClick={() => handleLikes(blog.id,{ likes:1 })}>Add Like</button></td>
                  </tr>
                </table>

              </Togglable>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
export default Content
