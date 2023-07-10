const listHelper = require('../utils/list_helper')

test_list_empty = [];

test_list_oneBlog = [{
  title:"test",
  author: "testihenklo",
  url: "www.testi123,123,213",
  likes: 29
}];

test_multipleBlogs = [
  {
    title:"test1",
    author: "testihenklo",
    url: "www.testi123,123,213",
    likes: 6
  },
  {
    title:"test2",
    author: "testihenklo",
    url: "www.testi123,123,213",
    likes: 10
  },
  {
      title:"test3",
  author: "testihenklo",
  url: "www.testi123,123,213",
  likes: 0
  }
];

const test_manyBlogs = [
  {
    title: "test1",
    author: "tester",
    url: "www.testi123,123,213",
    likes: 6
  },
  {
    title: "test2",
    author: "testihenklo",
    url: "www.testi123,123,213",
    likes: 10
  },
  {
    title: "test3",
    author: "tester",
    url: "www.testi123,123,213",
    likes: 0
  },
  {
    title: "test4",
    author: "testihenklo",
    url: "www.testi123,123,213",
    likes: 3
  },
  {
    title: "test5",
    author: "paavo",
    url: "www.testi123,123,213",
    likes: 2
  },
  {
    title: "test6",
    author: "testihenklo",
    url: "www.testi123,123,213",
    likes: 8
  },
  {
    title: "test7",
    author: "pasi",
    url: "www.testi123,123,213",
    likes: 5
  }
];



test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe("total likes", () => {
  test("When list is empty",() => {
    const result = listHelper.total(test_list_empty);
    expect(result).toBe(0)
  });

  test("When list has one blog", () => {
    const result = listHelper.total(test_list_oneBlog);
    expect(result).toBe(29)
  });

  test("When list has multiple objects", () => {
    const result = listHelper.total(test_multipleBlogs,"likes");
    expect(result).toBe(16)
  })
});

describe("Favorite blog", () => {

  favBlog = {
    title: "test2",
    author: "testihenklo",
    url: "www.testi123,123,213",
    likes: 10
  }

  test("Favorite blog when array is empty", () => {
    const result = listHelper.favorite(test_list_empty,"likes");
    expect(result).toBe(null);
  })
  test("Favorite blog from multiple blogs", () => {
    const result = listHelper.favorite(test_manyBlogs,"likes");
    expect(result).toEqual(favBlog)
  })
})

describe("Most blogs", () => {
  mostBlogs = { name: 'testihenklo', blogs: 3 }
  test("Most blogs", () => {
    const result = listHelper.mostBlogs(test_multipleBlogs);
    expect(result).toEqual(mostBlogs)
  });
});

describe("Most likes", () => {
  mostLikes = { author: 'testihenklo', likes: 21 }
  test("Most likes from multiple values", () => {
    const result = listHelper.mostLikes(test_manyBlogs);
    expect(result).toEqual(mostLikes) 
  })
});
