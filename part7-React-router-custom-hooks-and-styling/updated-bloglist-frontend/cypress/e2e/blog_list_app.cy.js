describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')

    cy.createUser('Amy Chong', 'amychong', 'codingisfun')
    cy.createUser('Second User', 'seconduser', 'password')

    cy.visit('http://localhost:3000')
  })

  it('login form can be opened', function() {
    cy.contains('log in').click()
    cy.contains('Sign in')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.loginViaGUI('amychong', 'codingisfun')
      cy.contains('Logged in as Amy Chong')
    })

    it('fails with wrong credentials', function() {
      cy.loginViaGUI('amychong', 'wrong')
      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login('amychong', 'codingisfun')
    })

    it('A blog can be created', function() {
      cy.addBlog('blog title', 'blog author', 'blog post')

      cy.get('#blog-list-container')
        .contains('blog title by blog author')
    })

    it('A blog can be liked', function() {
      cy.addBlog('blog title', 'blog author', 'blog post')
      let initialLikes

      cy.contains('blog title by blog author').click()

      cy.get('.blog-details-container').within(() => {

        cy.get('p').contains(' like').then(($likes) => {
          initialLikes = Number($likes.text().split(' ')[0])
        })

        cy.get('.likeButton').click()

        cy.get('p').contains(' like').should(($likes) => {
          const newLikes = Number($likes.text().split(' ')[0])
          expect(newLikes).to.eq(initialLikes + 1)
        })
      })
    })

    it('User can delete own blog', function() {
      cy.addBlog('blog title', 'blog author', 'blog post')

      cy.contains('blog title by blog author').click()

      cy.get('button').contains('delete').should('be.visible').click()

      cy.get('#blog-list-container').should('not.contain', 'blog title by blog author')
    })

    it('Users who are not the blog creator cannot see the delete button', function() {
      cy.addBlog('blog title', 'blog author', 'blog post')
      cy.logout()

      cy.login('seconduser', 'password')

      cy.contains('blog title by blog author').click()

      cy.get('.blog-details-container').within(() => {

        cy.contains('button', 'delete').should('not.exist')
      })
    })

    it('Blogs are ordered by likes', function() {
      cy.addBlogWithLikes('The title with the second most likes', 'blog author 1', 'blog post 1', 5)
      cy.addBlogWithLikes('The title with the third most likes', 'blog author 2', 'blog post 2', 3)
      cy.addBlogWithLikes('The title with the most likes', 'blog author 3', 'blog post 3', 10)
      cy.visit('http://localhost:3000')

      cy.get('#blog-list-container').within(() => {
        cy.get('.single-blog-container').then((blogContainers) => {
          const titles = blogContainers.map((i, el) => el.innerText.split(' by ')[0]).get()
          expect(titles).to.deep.eq([
            'The title with the most likes',
            'The title with the second most likes',
            'The title with the third most likes'
          ])
        })
      })
    })
  })
})
