## Available Scripts

In the project directory, you can run:

### `npm install`

Install the project dependencies.

### `npm start`

Starts the Node.js server in production mode using the 'index.js' entry point.\
For `npm start` and `npm run dev`, open [http://localhost:3003/api/blogs](http://localhost:3003/api/blogs) to view the state of the server in your browser.\
The port number (3003) could be different if you've set the PORT environment variable to something else.

### `npm run dev`

Starts the server in the development mode using Nodemon.\
Nodemon will automatically restart the server whenever file changes are detected, making it easier to develop and test changes.

### `npm run lint`

Identify and report on potential issues in JavaScript code, ensuring adherence to certain coding standards and style guidelines, thereby helping to maintain code quality.

## Services and Tools Needed

Node.js and npm: Since this is a Node.js application, you'll need Node.js and npm (Node Package Manager) installed on your machine to run this project.

MongoDB Account or Instance: The Blog and User models in the models/blog.js and models/user.js files use MongoDB via Mongoose for data persistence. You need access to a MongoDB database, either via a cloud service like MongoDB Atlas (which would require an account) or a local MongoDB instance.

Environment Variables: The application requires certain environment variables, which are specified in a .env file. Please refer to the .env.example file in the project's root directory for a template on the required variables. Create your own .env file in the same directory, and define the variables.
