const { info, errorLogger } = require("./logger");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const Blog = require("../models/blog");

const checkBlogExists = async (request, response, next) => {
  const blog = await Blog.findById(request.params.id);

  if (!blog) {
    return response.status(404).json({ error: "blog not found" });
  }

  request.blog = blog;

  next();
};

const tokenExtractor = (request, response, next) => {
  const getTokenFrom = (request) => {
    const authorization = request.get("authorization");
    if (authorization && authorization.startsWith("Bearer ")) {
      return authorization.replace("Bearer ", "");
    }
    return null;
  };

  request.token = getTokenFrom(request);

  next();
};

const userExtractor = async (request, response, next) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  if (!request.token || !decodedToken?.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }
  request.user = await User.findById(decodedToken.id);

  next();
};

const requestLogger = (request, response, next) => {
  info("Method:", request.method);
  info("Path:  ", request.path);
  info("Body:  ", request.body);
  info("---");
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  errorLogger(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({ error: "invalid token" });
  }

  next(error);
};

module.exports = {
  checkBlogExists,
  tokenExtractor,
  userExtractor,
  requestLogger,
  unknownEndpoint,
  errorHandler,
};
