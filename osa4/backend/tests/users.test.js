const bcrypt = require('bcrypt')
const User = require('../models/user')
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('../utils/list_helper')
const api = supertest(app);


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
      await User.deleteMany({})
  
      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', passwordHash })
  
      await user.save()
    })
  
    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await helper.usersInDb()
  
      const newUser = {
        username: 'mluukkai',
        name: 'Matti Luukkainen',
        password: 'salainen',
      }
  
      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)
  
      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
  
      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })

    test('Creation with empty password fails', async () => {
      const newUser = {
        username: 'Tester',
        name: 'test',
        password: ''
      }
      await api 
        .post('/api/users')
        .send(newUser)
        .expect(204)
    })
    test('Creation with short password fails', async () => {
      const newUser = {
        username: 'Tester',
        name:'test',
        password:'23'
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(204)
    })
    test('Creation with existing username fails', async () => {
      const newUser = {
        username: 'root',
        name: 'asd',
        password: 'salainen',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(409)
    })
    test('Creation with NaN username fails', async () => {
      const newUser = {
        username: '',
        name: 'tester',
        password: 'asdasd',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(204)
    })
    test('Creation with short username fails', async () => {
      const newUser = {
        username: 'aw',
        name: 'tester',
        password: 'asdasd',
      }
      await api
        .post('/api/users')
        .send(newUser)
        .expect(204)
    })
});

afterAll(async () => {
    await mongoose.connection.close()
})