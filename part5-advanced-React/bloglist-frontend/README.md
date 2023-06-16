## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the frontend React app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

### `npm run lint`

Identifies and reports on potential issues in JavaScript code, ensuring adherence to certain coding standards and style guidelines, thereby helping to maintain code quality.

### `npm run cypress:open`

Opens the Cypress Test Runner. It allows you to run end-to-end tests on the app in a user-friendly interface.

## Services and Tools Needed

Node.js and npm: You'll need Node.js and npm (Node Package Manager) installed on your machine for the development, building, and testing of this application. Node.js provides the runtime environment for development tools, while npm is used to manage and install these tools and libraries.

Backend Server and Database: The app uses Axios to make HTTP requests to a backend server. Make sure you have the backend server from [part4-blog-list-backend](https://github.com/amywlchong/full-stack-open/tree/master/part4-testing-servers-and-user-administration/blog-list-backend) running. The server should be running on http://localhost:3003, as specified by the proxy setting in the package.json file. The backend server, in turn, interacts with a MongoDB database. Ensure the backend server and database are correctly set up and running to fully interact with the frontend.
