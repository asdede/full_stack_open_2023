const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const jwt = require('jsonwebtoken')

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');
const { generateToken } = require('../utils/list_helper');

const testerUser = {
  username: "Tester",
  name: "Teppo tester",
  password: "123456"
}

const testBlogs = [
    {
      title: "First Blog",
      author: "John Doe",
      url: "https://example.com/first-blog",
      likes: 10
    },
    {
      title: "Second Blog",
      author: "Jane Smith",
      url: "https://example.com/second-blog",
      likes: 5
    },
    {
      title: "Third Blog",
      author: "Sam Johnson",
      url: "https://example.com/third-blog",
      likes: 2
    },
    {
      title: "Fourth Blog",
      author: "Emily Brown",
      url: "https://example.com/fourth-blog",
      likes: 8
    }
];
let userId = ""

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});
    const newUser = new User(testerUser)
    newUser.save()
    userId = newUser.id
    for (const object of testBlogs) {
      let blogObject = new Blog({
        title: object.title,
        author:object.author,
        user:userId,
        url: object.url,
        likes: object.likes
      });
      await blogObject.save();
    }
  });

test('Test user was created', async () => {
  await api
    .get('/api/users')
    .expect(200)
})

test('Format is JSON', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type',/application\/json/)
});

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs');

    expect(response.body).toHaveLength(testBlogs.length);
})

test('Specific blog title is included', async () => {
    const response = await api.get('/api/blogs');

    const titles = response.body.map(item => item.title);

    expect(titles).toContain(
        'Fourth Blog'
    )
});

test('ID is not _ID', async () => {
    const response = await api.get('/api/blogs');
    expect(response.body[0].id).toBeDefined();
})

test('HTTP POST works', async () => {
    const newTestBlog = {
        title: "Testi1",
        author:"tester123",
        user: userId,
        url: "ww.ihopethiswontwork.coa",
        likes: 2
    };
    const token = generateToken(userId);

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(newTestBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(testBlogs.length + 1);
    const blogs = response.body.map(title => title.title);
    expect(blogs).toContain("Testi1")
})

test('HTTP DELETE test', async () => {
    let response = await api.get('/api/blogs')
    const firstID = response.body[0].id
    await api.delete("/"+firstID)
    response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(testBlogs.length)
})

test('HTTP POST won\'t work with wrong token', async () => {
  const newTestBlog = {
    title: "Testi1",
    author: "tester123",
    user: userId,
    url: "ww.ihopethiswontwork.coa",
    likes: 2
  };


  await api
    .post('/api/blogs')
    .send(newTestBlog)
    .expect(401);

  const response = await api.get('/api/blogs');
  expect(response.body).toHaveLength(testBlogs.length);
});

afterAll(async () => {
    await mongoose.connection.close()
})