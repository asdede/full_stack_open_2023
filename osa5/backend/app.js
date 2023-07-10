const config = require('./utils/config')
const http = require('http')
const express = require('express')
const cors = require('cors')
const Blog = require('./models/blog')
const morgan = require('morgan');
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const tokenExtractor = require('./middleware/tokenExtractor');


const app = express()

morgan.token('requestData', (req) => JSON.stringify(req.body));

logger.info("Connecting mongoose")
mongoose.connect(config.MONGODB_URI)
    .then(result => {
        console.log("connected!")
    })
    .catch((error) => {
        console.log("error connecting database",error.message)
    });

app.use(tokenExtractor);
app.use(cors())
app.use(express.json())
app.use(express.static('build'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :requestData'));
app.use('/api/blogs', blogRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app  