const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const tokenExtractor = require('../middleware/tokenExtractor');
const jwt = require('jsonwebtoken')

blogRouter.use(tokenExtractor);

// ----- Get all
blogRouter.get('/',async  (request, response) => {
  const blogs = await Blog
    .find({}).populate('user',{username:1,name:1,id:1})
    response.json(blogs)
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
    const body = request.body
    if (!request.token) {
      return response.status(401).json({error: 'invalid token'})
    }
    const token = jwt.verify(request.token,process.env.SECRET)
    const user = await User.findById(token.id)
    const blog = new Blog({
      title:body.title,
      author:body.author,
      user:user.id,
      url:body.url,
      likes: body.likes
    })
  
    const savedBlog = await blog.save();
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)
  });
  
  // ------ DELETE by id 
  blogRouter.delete('/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const blog = await Blog.findById(id);
      const userid = blog.user;
      const token = jwt.verify(req.token, process.env.SECRET);
      const tokenUserId = token.id;
      if ( tokenUserId !== userid.toString()) {
        return res.status(401).json({error: "No acces"})
      }
      console.log("Deleting object")
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