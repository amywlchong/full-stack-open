## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the Node.js server using the 'index.js' entry point.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.\
The port number (3001) could be different if you've set the PORT environment variable to something else.

### `npm run dev`

Starts the server in the development mode using Nodemon. Nodemon will automatically restart the server whenever file changes are detected, making it easier to develop and test changes.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.\
The port number (3001) could be different if you've set the PORT environment variable to something else.

### `npm test`

Runs test cases using Jest in a 'test' environment.\
The results of each test case will be displayed.

### `npm run lint`

Identify and report on potential issues in JavaScript code, ensuring adherence to certain coding standards and style guidelines, thereby helping to maintain code quality.

## Services and Tools Needed

Node.js and npm: Since this is a Node.js application, you'll need Node.js and npm (Node Package Manager) installed on your machine to run this project.

MongoDB Account or Instance: The Blog and User models in the models/blog.js and models/user.js files use MongoDB via Mongoose for data persistence. You need access to a MongoDB database, either via a cloud service like MongoDB Atlas (which would require an account) or a local MongoDB instance.

Environment Variables: The application uses the dotenv package to load environment variables from a .env file. You need to create this file in the root directory of your project and define any necessary variables, such as MONGODB_URI and TEST_MONGODB_URI for the database connection string and PORT for the server's port.
