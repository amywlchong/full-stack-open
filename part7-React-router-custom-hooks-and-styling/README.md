# Part 7 - React Router, Custom Hooks, and Styling

This directory houses my solutions to the exercises from the course.

## [updated-bloglist-frontend](https://github.com/amywlchong/full-stack-open/tree/master/part7-React-router-custom-hooks-and-styling/updated-bloglist-frontend)

This directory contains an upgraded and refactored version of the blog list application. Users are free to view blogs, and upon authentication, they can add blogs, like them, delete the blogs they added, and post comments. The application has been updated to offer a navigation menu for seamless navigation between various blog and user views, coupled with robust state management. Moreover, it has been styled with Material UI to showcase a responsive and aesthetic UI.

**Skills demonstrated:**
- Leveraging useReducer, context, custom hook, and React Query for robust state management
- Employing a token-based authentication system for user login
- Interacting with a RESTful API using Axios for HTTP requests
- Executing CRUD operations with the async/await syntax, optimizing promise handling
- Efficiently managing HTTP response data within the application and updating the component state

## [updated-blog-list-backend](https://github.com/amywlchong/full-stack-open/tree/master/part7-React-router-custom-hooks-and-styling/updated-blog-list-backend)

This directory hosts the enhanced and refactored backend of the blog list application, developed using Node.js, Express, and MongoDB. The application has added the capability to create comments. It also enables users to access all blogs or a specific blog by ID, retrieve all users or a specific user by ID, as well as perform various CRUD operations on blogs. Only authenticated and authorized users can add, update, delete, and comment on blogs.

**Skills demonstrated:**
- Setup and configuration of a Node.js and Express.js application
- Usage of various middleware in Express.js to enable Cross-Origin Resource Sharing, handle incoming requests, etc.
- Implementation and testing of token-based user authentication and authorization
- Model definition and schema customization in Mongoose
- CRUD operations on a MongoDB database using Mongoose

## [routed-anecdotes](https://github.com/amywlchong/full-stack-open/tree/master/part7-React-router-custom-hooks-and-styling/routed-anecdotes)

This directory houses a simple anecdotes application, built using React, React Router, and a custom hook. The application displays a list of anecdotes, and allows users to add new anecdotes. It provides smooth navigation between different views through integrated routing. In addition, it employs a custom hook to manage states to simplify the creation of anecdotes.

**Skills demonstrated:**
- Incorporation of React Router for seamless in-app navigation
- Using a custom hook to manage form input states and facilitate form resets
- Implementation of notifications and automatic redirection to the home page upon the creation of a new anecdote
