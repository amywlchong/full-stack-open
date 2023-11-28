import { useQuery, useMutation, useQueryClient } from "react-query";
import blogService from "../services/blogs";

const useBlogs = (id) => {
  const queryClient = useQueryClient();

  const {
    data: blogs = [],
    isLoading: isLoadingBlogs,
    isError: isBlogsError,
  } = useQuery("blogs", blogService.getAll, {
    refetchOnWindowFocus: false,
    enabled: !id,
    refetchOnMount: true,
  });

  const {
    data: oneBlog,
    isLoading: isLoadingOneBlog,
    isError: isOneBlogError,
  } = useQuery(["blog", id], () => blogService.getOne(id), {
    refetchOnWindowFocus: false,
    refetchInterval: 1000 * 60, // 1 minute
    enabled: !!id,
    refetchOnMount: true,
  });

  const createBlogMutation = useMutation(blogService.create, {
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData("blogs") || [];
      queryClient.setQueryData("blogs", blogs.concat(newBlog));

      queryClient.invalidateQueries("users");
      queryClient.invalidateQueries(["user", newBlog.creator.id]);
    },
  });

  const updateBlogMutation = useMutation(blogService.replace, {
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(["blog", updatedBlog.id], updatedBlog);

      const blogs = queryClient.getQueryData("blogs") || [];
      queryClient.setQueryData(
        "blogs",
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      );

      queryClient.invalidateQueries("users");
      queryClient.invalidateQueries(["user", updatedBlog.creator.id]);
    },
  });

  const deleteBlogMutation = useMutation(blogService.remove, {
    onSuccess: (_, mutationArgs) => {
      const blogs = queryClient.getQueryData("blogs") || [];
      const deletedBlog = blogs.find((blog) => blog.id === mutationArgs);
      queryClient.setQueryData(
        "blogs",
        blogs.filter((blog) => blog.id !== mutationArgs)
      );

      queryClient.invalidateQueries("users");
      if (
        deletedBlog &&
        queryClient.getQueryData(["user", deletedBlog.creator.id])
      ) {
        queryClient.refetchQueries(["user", deletedBlog.creator.id]);
      }
    },
  });

  const createCommentMutation = useMutation(blogService.createComment, {
    onSuccess: (newComment, variables) => {
      const { blogId } = variables;

      const blog = queryClient.getQueryData(["blog", blogId]);

      blog.comments = blog.comments.concat(newComment);
      queryClient.setQueryData(["blog", blogId], blog);
    },
  });

  const createBlog = async (blogObject) => {
    const returnedBlog = await createBlogMutation.mutateAsync(blogObject);
    return returnedBlog;
  };

  const updateBlog = async (blogObject, incrementLikes = false) => {
    if (incrementLikes) {
      blogObject.likes += 1;
    }

    await updateBlogMutation.mutateAsync(blogObject);
  };

  const deleteBlog = async (id) => {
    await deleteBlogMutation.mutateAsync(id);
  };

  const createComment = async (blogId, commentObject) => {
    const returnedComment = await createCommentMutation.mutateAsync({
      blogId,
      commentObject,
    });
    return returnedComment;
  };

  return {
    blogs,
    isLoadingBlogs,
    isBlogsError,
    oneBlog,
    isLoadingOneBlog,
    isOneBlogError,
    createBlog,
    updateBlog,
    deleteBlog,
    createComment,
  };
};

export default useBlogs;
