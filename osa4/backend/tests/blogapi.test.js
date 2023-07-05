const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

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

beforeEach(async () => {
    await Blog.deleteMany({});
    for (const object of testBlogs) {
      let blogObject = new Blog(object);
      await blogObject.save();
      console.log("Test blog saved!");
    }
  });

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
        url: "ww.ihopethiswontwork.coa",
        likes: 2
    };

    await api
        .post('/api/blogs')
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


afterAll(async () => {
    await mongoose.connection.close()
})