require('dotenv').config();

const http = require('http')
const express = require('express')
const app = express()
const cors = require('cors')
const Blog = require('./models/mongo')
const morgan = require('morgan');

morgan.token('requestData', (req) => JSON.stringify(req.body));

app.use(cors())
app.use(express.json())
app.use(express.static('build'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestData'));

// ----- Get all
app.get('/api/blogs', (request, response) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
})

// ------- Get by id
app.get('/api/blogs/:id', (req, res) => {
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
app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)
  console.log(blog)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
});

// ------ DELETE by id 
app.delete('/api/blogs/:id', (req, res) => {
  const {id} = req.params;
  console.log('ID of deleted object',id);
  Blog.findByIdAndRemove(id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error))
});

// ------ UPDATE
app.put('/api/blogs/:id', async (req,res,next) => {
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

const { PORT } = process.env;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

