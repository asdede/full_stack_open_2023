import { useState, useEffect } from 'react';
import Title from './components/Title';
import Content from './components/Content';
import blogServices from './services/blogServices';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await blogServices.getAll();
        setBlogs(response);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    fetchBlogs();
  }, []);

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
      <Content blogs={blogs} handleLikes={handleLikes} />
    </div>
  );
};

export default App;