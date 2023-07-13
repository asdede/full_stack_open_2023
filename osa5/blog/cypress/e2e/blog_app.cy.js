describe('Blog ', function() {
  it('front page can be opened', function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    cy.contains('Login')

    cy.get('#username').type('root')
    cy.get('#password').type('salainen')
    cy.get('#loginBtn').click()
    
    cy.contains('Logged in as: Superuser')
  })
})