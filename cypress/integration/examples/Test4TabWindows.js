/// <reference types="Cypress" />
 
describe('Tab Windows', function() {
 
  it('',function() {
    // Pop up
    cy.visit(Cypress.env('url') + "AutomationPractice/")
    cy.get('#alertbtn').click()
    cy.get('[value="Confirm"]').click()

    // Verify pop up text
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Hello , share this practice page and share your knowledge')
    })
    
    cy.on('window:confirm', (str) => {
      expect(str).to.equal('Hello , Are you sure you want to confirm?')
    }) 

    // Tab windows
    cy.get('#opentab').invoke('removeAttr', 'target').click()
    cy.origin("https://www.qaclickacademy.com", () => {
      cy.get("#navbarSupportedContent a[href*='about']").click();
      cy.get(".mt-50 h2").should('contain','QAClick Academy');
    })
  })
})