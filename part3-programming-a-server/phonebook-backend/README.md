## Deployed Phonebook App

https://interactive-phonebook.fly.dev/

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

Currently, the "test" script isn't set up to perform any tests - it only outputs an error message saying "Error: no test specified" and then exits.

### `npm run build:ui`

The "build:ui" script removes the current 'build' directory (if it exists), then navigates to a different project directory to build a front-end project. After successfully building the front-end project, it copies the built static files to the 'build' directory in the backend project.

### `npm run deploy`

The "deploy" script uses the Fly CLI to deploy the application to a Fly.io application, which is a platform for deploying and running applications.

### `npm run deploy:full`

The "deploy:full" script first executes the 'build:ui' script to build the front-end, then it deploys the application using the 'deploy' script.

### `npm run logs:prod`

The "logs:prod" script fetches and displays logs for the deployed application using Fly's logs command.

### `npm run lint`

Identify and report on potential issues in JavaScript code, ensuring adherence to certain coding standards and style guidelines, thereby helping to maintain code quality.

## Services and Tools Needed

Node.js and npm: Since this is a Node.js application, you'll need Node.js and npm (Node Package Manager) installed on your machine to run this project.

MongoDB Account or Instance: The Person model in the models/person.js file uses MongoDB via Mongoose for data persistence. You need access to a MongoDB database, either via a cloud service like MongoDB Atlas (which would require an account) or a local MongoDB instance.

Environment Variables: The application uses the dotenv package to load environment variables from a .env file. You need to create this file in the root directory of your project and define any necessary variables, such as MONGODB_URI for the database connection string and PORT for the server's port.

fly.io Account: You would need a Fly.io account if you plan to deploy the app using the deploy, deploy:full, and logs:prod scripts.
