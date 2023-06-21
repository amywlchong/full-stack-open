import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

let mockBlog

beforeEach(() => {
  mockBlog = {
    title: 'Test Blog',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    creator: { username: 'testUser', name: 'Test User' },
    updatedBy: [],
    id: '12345'
  }
})

test('renders blog title and author, but not URL or likes by default', () => {
  render(<Blog blog={mockBlog} replaceBlog={jest.fn()} deleteBlog={jest.fn()} user={{username: 'testUser'}}/>)

  const blogTitle = screen.getByText(/Test Blog by Test Author/i)
  expect(blogTitle).toBeInTheDocument()

  const DetailsButton = screen.getByRole('button', {name: /view/i})
  expect(DetailsButton).toBeInTheDocument()

  const blogUrl = screen.queryByText(/http:\/\/testurl.com/i)
  expect(blogUrl).not.toBeInTheDocument()

  const blogLikes = screen.queryByText(/5/i)
  expect(blogLikes).not.toBeInTheDocument()
})

test('shows blog URL and likes when the details button is clicked', () => {
  render(<Blog blog={mockBlog} replaceBlog={jest.fn()} deleteBlog={jest.fn()} user={{username: 'testUser'}}/>)

  const detailsButton = screen.getByRole('button', { name: /view/i })
  userEvent.click(detailsButton)

  const blogUrl = screen.getByText(/http:\/\/testurl.com/i)
  expect(blogUrl).toBeInTheDocument()

  const blogLikes = screen.getByText(/5/i)
  expect(blogLikes).toBeInTheDocument()
})
