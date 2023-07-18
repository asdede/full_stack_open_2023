const { func } = require("prop-types")

describe('Blog ', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const  user = {
      username: "testi",
      name: "super",
      password: "salainen"
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function() {
    cy.contains('Login')
  })
  describe('Login', function() {
    it('Login succesful', function(){
      cy.get('#username').type('testi')
      cy.get('#password').type('salainen')
      cy.get('#loginBtn').click()
  
      cy.contains('Logged in as: super')
    })
    it('Fails with wrong credentials', function() {
      cy.get('#username').type('väärä')
      cy.get('#password').type('vääräa')
      cy.get('#loginBtn').click()
  
      cy.contains('Wrong password or username')
    })
  })
  describe('When blogged in', function() {
    beforeEach(function() {
      cy.contains('Login')

      cy.get('#username').type('testi')
      cy.get('#password').type('salainen')
      cy.get('#loginBtn').click()

    })
    it('a new blog can be created', function()  {
      cy.contains('Create new blog').click()
      cy.get('#title').type("Cypress test")
      cy.get('#author').type('Cypress')
      cy.get('#url').type('Testi')
      cy.get('#submitBlog').click()
      cy.contains('Cypress test')
    })
  describe('Blog actions', function() {
    beforeEach(function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type("Cypress test")
      cy.get('#author').type('Cypress')
      cy.get('#url').type('Testi')
      cy.get('#submitBlog').click()
      cy.contains('View').click()
    })
    it('Created test can be viewed', function() {
      cy.contains('Testi')
      cy.contains('Cypress')
      cy.contains("Info")
      cy.contains('Author')
      cy.contains('Url')
      cy.contains('Added by')
      cy.contains('Likes')
    })
    it('Created test can be liked', function() {
      cy.contains('0')
      cy.contains('Add Like').click()
      cy.contains('1')
    })
    it('Blog can be removed', function() {
      cy.contains('Remove')
      cy.contains('Remove').click()
      cy.contains('Cypress test').should('not.exist')
    })
    it('Only creator sees remove button', function() {
      cy.contains('Remove').should('exist')
      cy.contains('Log out').click()
      cy.contains('Remove').should('not.exist')
    })
  })
  describe('Blogs are sorted right',function() {
    beforeEach(function() {
      cy.contains('Create new blog').click()
      cy.get('#title').type("Cypress test")
      cy.get('#author').type('Cypress')
      cy.get('#url').type('Testi')
      cy.get('#submitBlog').click()
      cy.contains('Create new blog').click()
      cy.get('#title').type("LessLikes")
      cy.get('#author').type('Asd')
      cy.get('#url').type('Asd')
      cy.get('#submitBlog').click()
    })
    it('Sorted right', function() {
      cy.get('.toggleVis').eq(0).click()
      cy.get('.toggleVis').eq(1).click()
      cy.get('.blogLikeBtn').eq(1).click()
      cy.get('.title').eq(0).should('contain','Cypress test')
    })
  })
  })
})
