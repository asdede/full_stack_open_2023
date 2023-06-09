const config = require('../utils/config')

const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

const url = config.MONGODB_URI

const blogSchema = mongoose.Schema({
    title: String,
    author: String,
    user: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'

    },
    url: String,
    likes: Number,
});

blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Blog', blogSchema)
