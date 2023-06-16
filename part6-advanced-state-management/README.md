# Part 6 - Advanced State Management

This directory houses my solutions to the exercises from the course.

## [unicafe-redux](https://github.com/amywlchong/full-stack-open/tree/master/part6-advanced-state-management/unicafe-redux)

This directory hosts a revised Unicafe feedback system, now built using React and Redux. The application, maintaining its original purpose, captures user feedback and displays statistics, with Redux now managing the state for improved scalability and robustness.

**Skills demonstrated:**
- Basic Redux architecture and principles
- Implementation of Redux reducers and actions
- Immutable state management with the Redux store
- Testing Redux reducers with Jest and the deep-freeze library
- Integrating Redux with a React application

## [redux-anecdotes](https://github.com/amywlchong/full-stack-open/tree/master/part6-advanced-state-management/redux-anecdotes)

This directory contains a React-based anecdote sharing and voting application. The application allows users to view, vote on, add, and search for anecdotes. The state of the application, including the anecdotes, their votes, filter and notifications, is managed using Redux with asynchronous actions facilitated by Redux Thunk. All data are persistently stored using a json-server backend.

**Skills demonstrated:**
- Structuring of components in React
- State management with Redux and Redux Thunk
- Asynchronous action creators in Redux
- Use of Redux Toolkit for efficient Redux code
- Integration with a JSON server backend
- React hooks for event handling
- Data passing using props in React

## [query-anecdotes](https://github.com/amywlchong/full-stack-open/tree/master/part6-advanced-state-management/query-anecdotes)

This directory houses a React application that fetches, displays, and allows voting for software engineering anecdotes using React Query and a local JSON Server. The application further uses the useReducer hook and context for notification state management. In the case of an unsuccessful server communication, the application is designed to display an error page.

**Skills demonstrated:**
- Integration of the React Query library for data fetching, mutation (adding and voting for anecdotes), and error handling
- Usage of the useReducer hook and context for managing notification state
- Implementation of error handling mechanisms, specifically for server communication errors and failed POST requests
- Conditional rendering based on server communication status
- Use of JSON Server as a local server for development
