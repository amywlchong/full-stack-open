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
      cy.addBlog('blog title', 'blog author', 'www.blog-url.com')

      cy.get('#main-blog-container')
        .contains('blog title by blog author')
    })

    it('A blog can be liked', function() {
      cy.addBlog('blog title', 'blog author', 'www.blog-url.com')
      let initialLikes

      cy.get('.single-blog-container').within(() => {
        cy.get('button').contains('view').click()

        cy.get('p').contains(' like').then(($likes) => {
          initialLikes = Number($likes.text().split(' ')[0])
        })

        cy.get('button').contains('like').click()

        cy.get('p').contains(' like').should(($likes) => {
          const newLikes = Number($likes.text().split(' ')[0])
          expect(newLikes).to.eq(initialLikes + 1)
        })
      })
    })

    it('User can delete own blog', function() {
      cy.addBlog('blog title', 'blog author', 'www.blog-url.com')

      cy.get('.single-blog-container').within(() => {
        cy.get('button').contains('view').click()

        cy.get('button').contains('delete').should('be.visible').click()
      })

      cy.get('#main-blog-container').should('not.contain', 'blog title by blog author')
    })

    it('Users who are not the blog creator cannot see the delete button', function() {
      cy.addBlog('blog title', 'blog author', 'www.blog-url.com')
      cy.wait(1000)
      cy.logout()

      cy.login('seconduser', 'password')

      cy.get('.single-blog-container').within(() => {
        cy.get('button').contains('view').click()
        cy.contains('button', 'delete').should('not.exist')
      })
    })

    it('Blogs are ordered by likes', function() {
      cy.addBlogWithLikes('The title with the second most likes', 'blog author 1', 'www.blog-url1.com', 5)
      cy.addBlogWithLikes('The title with the third most likes', 'blog author 2', 'www.blog-url2.com', 3)
      cy.addBlogWithLikes('The title with the most likes', 'blog author 3', 'www.blog-url3.com', 10)
      cy.visit('http://localhost:3000')

      cy.get('#main-blog-container').within(() => {
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
