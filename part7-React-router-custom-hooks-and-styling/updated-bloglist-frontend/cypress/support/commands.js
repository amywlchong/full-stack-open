Cypress.Commands.add('createUser', (name, username, password) =>{
  const user = {
    name,
    username,
    password
  }
  cy.request('POST', 'http://localhost:3003/api/users/', user)
})

Cypress.Commands.add('loginViaGUI', (username, password) => {
  cy.get('button').contains('log in').click()
  cy.get('#username').type(username)
  cy.get('#password').type(password)
  cy.get('#login-button').click()
})

Cypress.Commands.add('login', (username, password) => {
  cy.request('POST', 'http://localhost:3003/api/login', {
    username, password
  }).then(response => {
    localStorage.setItem('loggedBlogappUser', JSON.stringify(response.body))
    cy.visit('http://localhost:3000')
  })
})

Cypress.Commands.add('logout', () => {
  cy.get('button').contains('log out').click()
})

Cypress.Commands.add('addBlog', (title, author, url) => {
  cy.get('button').contains('new blog').click()
  cy.get('#title').type(title)
  cy.get('#author').type(author)
  cy.get('#url').type(url)
  cy.get('button').contains('add').click()
})

Cypress.Commands.add('addBlogWithLikes', (title, author, url, likes) => {
  const blog = {
    title,
    author,
    url,
    likes
  }
  cy.request({
    url: 'http://localhost:3003/api/blogs',
    method: 'POST',
    body: blog,
    headers: {
      'Authorization': `Bearer ${JSON.parse(window.localStorage.getItem('loggedBlogappUser')).token}`
    }
  })
})

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
