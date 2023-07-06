import { useQuery, useMutation, useQueryClient } from 'react-query'
import blogService from '../services/blogs'

const useBlogs = () => {
  const queryClient = useQueryClient()

  const { data: blogs = [], isLoading, isError } = useQuery('blogs', blogService.getAll, {
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 10,  // 10 minutes
  })

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.concat(newBlog))

      queryClient.invalidateQueries('users')
    }
  })

  const updateBlogMutation = useMutation(blogService.replace, {
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.map(blog => blog.id === updatedBlog.id
        ? updatedBlog
        : blog)
      )

      queryClient.invalidateQueries('users')
    }
  })

  const deleteBlogMutation = useMutation(blogService.remove, {
    onSuccess: (_, mutationArgs) => {
      const blogs = queryClient.getQueryData('blogs')
      queryClient.setQueryData('blogs', blogs.filter(blog => blog.id !== mutationArgs))

      queryClient.invalidateQueries('users')
    }
  })

  const createBlog = async (blogObject) => {
    const returnedBlog = await createBlogMutation.mutateAsync(blogObject)
    return returnedBlog
  }

  const updateBlog = (blogObject, incrementLikes = false) => {
    if (incrementLikes) {
      blogObject.likes += 1
    }

    updateBlogMutation.mutate(blogObject)
  }

  const deleteBlog = async (id) => {
    await deleteBlogMutation.mutateAsync(id)
  }

  return {
    blogs,
    isLoading,
    isError,
    createBlog,
    updateBlog,
    deleteBlog
  }
}

export default useBlogs
