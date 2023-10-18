/// <reference types="Cypress" />
 
describe('Hidden Items', function() {
 
  it('My FirstTest case',function() {
    cy.visit(Cypress.env('url') + "AutomationPractice/")

    // Make sur you get the child div
    cy.get('div.mouse-hover-content').invoke('show')
    cy.contains('Top').click()
    cy.url().should('include', 'top')

    // You can force to click on hidden items
    //cy.contains('Top').click({force: true})
  })
})