const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/user');

const checkPassword = (password) => {
    if (password === "" || password === null || password.length < 3) {
        const errorMsg = "Password is too short or does not exist"
        const statusCode = 204
        throw {statusCode,message: errorMsg};
    }
    return true

}

const checkUsername = async (username) => {
    const userExists = await User.findOne({ username });
  
    if (userExists) {
      const errorMsg = "Username already exists";
      const statusCode = 409;
      throw { statusCode, message: errorMsg };
    } else if (username === "" || username.length < 3 || username === null) {
      const errorMsg = "Username is too short";
      const statusCode = 204;
      throw { statusCode, message: errorMsg };
    } else {
      return true;
    }
  };

usersRouter.post('/', async (req,res) => {
    const {username, name, password } = req.body
    try {
        await checkPassword(password);
        await checkUsername(username);
        
        const salt = 10;
        const passwordHash = await bcrypt.hash(password, salt);
    
        const user = new User({
            username,
            name,
            passwordHash,
        });
    
        const savedUser = await user.save();
        res.status(201).json(savedUser);
    
    } catch (error) {
        console.log(error)
        const status = error.statusCode || 400
        const errorMsg = error.message || "Bad request";
        res.status(status).json({error:errorMsg})
    }
});

usersRouter.get('/', async (request, response) => {
    const users = await User
        .find({}).populate('blogs',{url:1,title: 1,author:1,id:1})
    response.json(users)
  })

module.exports = usersRouter