import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Content from './Content'
import App from '../App'

test('renders title', () => {
  const blogs = [
    {
      id: 1,
      title: 'tokentest',
      author: 'tester112223',
      url: 'www.aasddssdssaadd.aaaa.2',
      likes: '8',
      user: {
        id: 1,
        name: 'John Doe',
      },
    },
  ]
  const handleLikes = jest.fn()
  const user = {
    id: 1,
    name: 'Mock User',
  }

  const { container } = render(
    <Content blogs={blogs} handleLikes={handleLikes} user={user} />
  )

  const div = container.querySelector('.title')

  expect(div).toHaveTextContent('tokentest')
})

test('Clickin shows rest of the content', async () => {
  const blogs = [
    {
      id: 1,
      title: 'tokentest',
      author: 'tester112223',
      url: 'www.aasddssdssaadd.aaaa.2',
      likes: '8',
      user: {
        id: 1,
        name: 'John Doe',
      },
    },
  ]
  const handleLikes = jest.fn()
  const user = {
    id: 1,
    name: 'Mock User',
  }
  const simUser = userEvent.setup()

  const { container } = render(
    <Content blogs={blogs} handleLikes={handleLikes} user={user} />
  )

  const button = screen.getByText('View')
  await simUser.click(button)

  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const username = container.querySelector('.username')
  const likes = container.querySelector('.likes')
  expect(author).toHaveTextContent('tester112223')
  expect(url).toHaveTextContent('www.aasddssdssaadd.aaaa.2')
  expect(username).toHaveTextContent('John Doe')
  expect(likes).toHaveTextContent('8')
})

test('likes called twice when pressed twice', async () => {
  const blogs = [
    {
      id: 1,
      title: 'tokentest',
      author: 'tester112223',
      url: 'www.aasddssdssaadd.aaaa.2',
      likes: '8',
      user: {
        id: 1,
        name: 'John Doe',
      },
    },
  ]
  const handleLikes = jest.fn()
  const user = {
    id: 1,
    name: 'Mock User',
  }
  const simUser = userEvent.setup()

  render(<Content blogs={blogs} handleLikes={handleLikes} user={user} />)
  const button = screen.getByText('View')
  await simUser.click(button)

  const likeBtn = screen.getByRole('button', { name: 'Add Like' })
  await simUser.click(likeBtn)
  await simUser.click(likeBtn)

  expect(handleLikes.mock.calls).toHaveLength(2)
})

test('Creating new blog post works', async () => {
  const user = {
    name: 'root',
    password: 'salainen',
  }
  const simUser = userEvent.setup()

  const { container } = render(<App />)

  // Log in to get the create button
  const usernameInput = screen.getByPlaceholderText('Username')
  const passwordInput = screen.getByPlaceholderText('Password')

  await userEvent.type(usernameInput, user.name)
  await userEvent.type(passwordInput, user.password)

  const loginButton = container.querySelector('#loginBtn')
  await userEvent.click(loginButton)

  const createBtn = container.querySelector('#createBlog')
  await userEvent.click(createBtn)

  const inputs = screen.getAllByRole('textbox')
  const titleInput = inputs[0]
  const authorInput = inputs[1]
  const urlInput = inputs[2]
  console.log(inputs)
  const createBlogBtn = inputs[3]

  await userEvent.type(titleInput, 'mockTest')
  await userEvent.click(createBlogBtn)

  // Wait for the creation process to complete
})
