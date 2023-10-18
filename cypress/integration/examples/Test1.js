/// <reference types="Cypress" />

describe('My First Test', () => {
  it('Does not do much!', () => {
   cy.visit(Cypress.env('url') + "seleniumPractise/#/")
   cy.get('.search-keyword').type('ca')
   cy.wait(2000)
   cy.get('.product:visible').should('have.length', 4)
   //Parent child chaining
   cy.get('.products').as('productLocator')

   cy.get('@productLocator').find('.product').should('have.length', 4)
   cy.get('@productLocator').find('.product').eq(2).contains('ADD TO CART').click()
   cy.get('@productLocator').find('.product').each(($el, index, $list) => {
    
    const textVeg = $el.find('h4.product-name').text()
    if(textVeg.includes('Cashews')) {
      cy.wrap($el).find('button').click()
    }
   })

   cy.get('.brand').should('have.text', 'GREENKART')

    cy.get('.brand').then(function(logoElement){
      cy.log(logoElement.text())   
    })
  })
})