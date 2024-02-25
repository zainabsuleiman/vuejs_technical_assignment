// https://docs.cypress.io/api/introduction/api.html

describe("My First CRUD Test", () => {
  it('list  todos', () => {
    cy.server()
    cy.request({
      url: 'https://dummyjson.com/todos',
      method: 'GET',
    })
      .its('response.json()')
      .should('have.length', 6)
      cy.get('li.todo').should('have.length',6)
  })
});
