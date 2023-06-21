import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'

test('form calls the createBlog function with the right details when a new blog is created', async () => {
  const mockCreateBlog = jest.fn().mockResolvedValue({
    title: '',
    author: ''
  })

  const mockSetAndClearNotification = jest.fn()

  const mockBlogFormRef = {
    current: {
      toggleVisibility: jest.fn()
    }
  }

  render(<BlogForm createBlog={mockCreateBlog} setAndClearNotification={mockSetAndClearNotification} blogFormRef={mockBlogFormRef}/>)

  const inputTitle = screen.getByRole('textbox', { name: /title/i })
  userEvent.type(inputTitle, 'Test Title')

  const inputAuthor = screen.getByRole('textbox', { name: /author/i })
  userEvent.type(inputAuthor, 'Test Author')

  const inputUrl = screen.getByRole('textbox', { name: /url/i })
  userEvent.type(inputUrl, 'http://testurl.com')

  const addButton = screen.getByRole('button', { name: /add/i })
  userEvent.click(addButton)

  expect(mockCreateBlog).toHaveBeenCalledTimes(1)

  expect(mockCreateBlog).toHaveBeenCalledWith({
    title: 'Test Title',
    author: 'Test Author',
    url: 'http://testurl.com'
  })
})
