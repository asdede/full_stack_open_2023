const blogRouter = require('express').Router()
const Blog = require('../models/blog')

// ----- Get all
blogRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
  // ------- Get by id
  blogRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    Blog.findById(id)
    .then((blog) => {
      res.json(blog);
        if (blog) {
          res.json(blog)
        } else {
          res.status(404).end()
        }
      });
  }); 
  
  // ------- Post new
  blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    console.log(blog)
  
    const savedBlog = await blog.save();
    response.status(201).json(savedBlog)
  });
  
  // ------ DELETE by id 
  blogRouter.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      logger.info(`Deleting object with id of ${id}`);
      await Blog.findByIdAndRemove(id);
      res.status(204).json().end();
    } catch (error) {
      // Handle the error
      console.error('Error occurred while deleting the blog:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // ------ UPDATE
  blogRouter.put('/:id', async (req,res,next) => {
    console.log("Updating data")
    try {
      const { id } = req.params;
      const updateData = req.body;
      console.log(updateData)
  
      const blog = await Blog.findById(id);
      if (!blog) {
        return res.status(404).json({ error: "blog not found"})
      }
      const  existingLikes = blog.likes;
  
      const newLikes = existingLikes + updateData.likes;
      updateData.likes = newLikes;
  
      const result = await Blog.findByIdAndUpdate(id, updateData, { new: true });
      if (!result) {
        return res.status(404).json({error: "Blog not found"});
      }
      res.json(result);
    } catch (error) {
      next(error)
    }
  });

module.exports = blogRouter