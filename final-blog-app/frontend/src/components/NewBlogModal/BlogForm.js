import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import useField from "../../hooks/useField";
import { NotificationContext } from "../../contexts/NotificationContext";
import { fullWidthStyles } from "../../styles/styles";
import {
  Typography,
  Button,
  TextField,
  OutlinedInput,
  Box,
} from "@mui/material";
import { useModal } from "../../contexts/ModalContext";

const BlogForm = ({ createBlog }) => {
  const {
    value: newTitle,
    onChange: handleTitleChange,
    reset: resetTitle,
  } = useField("text");
  const {
    value: newAuthor,
    onChange: handleAuthorChange,
    reset: resetAuthor,
  } = useField("text");
  const {
    value: newBlogPost,
    onChange: handleBlogPostChange,
    reset: resetBlogPost,
  } = useField("text");
  const [uploadedImage, setUploadedImage] = useState(null);
  const { closeBlogModal } = useModal();
  const [, showNotification] = useContext(NotificationContext);
  const navigate = useNavigate();

  const handleImageChange = (event) => {
    setUploadedImage(event.target.files[0]);
  };

  const addBlog = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("title", newTitle);
    formData.append("author", newAuthor);
    formData.append("blogPost", newBlogPost);
    formData.append("image", uploadedImage);

    try {
      const { id, title, author } = await createBlog(formData);
      closeBlogModal();
      showNotification(
        `Success! A new blog "${title}" ${
          author ? `by ${author}` : ""
        } has been added.`,
        "success"
      );
      navigate(`/blogs/${id}`);
      resetTitle();
      resetAuthor();
      resetBlogPost();
    } catch (error) {
      console.error(error);
      showNotification(error.response?.data?.error, "error", "modal");
    }
  };

  return (
    <form onSubmit={addBlog} encType="multipart/form-data">
      <Typography variant="h3">Add a new blog post</Typography>
      <Box>
        <Box sx={fullWidthStyles}>
          <TextField
            label="title"
            id="title"
            fullWidth
            value={newTitle}
            onChange={handleTitleChange}
            sx={{ marginBottom: "10px" }}
          />
        </Box>
        <Box sx={fullWidthStyles}>
          <TextField
            label="author"
            id="author"
            fullWidth
            value={newAuthor}
            onChange={handleAuthorChange}
            sx={{ marginBottom: "10px" }}
          />
        </Box>
        <Box sx={fullWidthStyles}>
          <OutlinedInput
            multiline
            rows={8}
            placeholder="blog post"
            id="blog-post"
            fullWidth
            value={newBlogPost}
            onChange={handleBlogPostChange}
            sx={{ marginBottom: "10px" }}
          />
        </Box>
        <Box sx={fullWidthStyles}>
          <Typography variant="body1">Upload image (jpg, png, etc.)</Typography>
          <OutlinedInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            sx={{ marginBottom: "10px" }}
          />
        </Box>
        <Button
          variant="outlined"
          onClick={() => {
            closeBlogModal();
          }}
          sx={{ marginRight: "10px", textTransform: "capitalize" }}
        >
          Close
        </Button>
        <Button
          variant="contained"
          type="submit"
          sx={{ textTransform: "capitalize" }}
        >
          Add
        </Button>
      </Box>
    </form>
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
