/// <reference types="Cypress" />
import HomePage from '../pageObjects/HomePage'
import ProductPage from '../pageObjects/ProductPage'

describe('Framework test', function() {

  before(function() {
    cy.fixture('frameworkTest').then(function(data) {
      this.data = data
    })
  })

  it('Demo example', function() {
    const homePage = new HomePage()
    const productPage = new ProductPage()

    cy.visit(Cypress.env('url') + 'angularpractice/')
    
    homePage.getEditBox().type(this.data.name)
    homePage.getGender().select(this.data.gender)
    homePage.getTwoWayDataBinding().should('have.value', this.data.name)
    homePage.getEditBox().should('have.attr', 'minlength', '2')
    homePage.getEntrepreneur().should('be.disabled')
    homePage.getShopTab().click()

    this.data.productName.forEach(element => {
      cy.selectProduct(element)
      
    });
    productPage.checkoutButton().click()

    var sum = 0

    cy.get('tr td:nth-child(4) strong').each(($el, index, $list) => {
      const actualText = $el.text()
      var res = actualText.split(" ")
      res = res[1].trim()
      sum = Number(sum) + Number(res)
    })

    cy.get('h3 strong').then(function(element) {
      const amount = element.text()
      var res = amount.split(" ")
      var total = res[1].trim()
      expect(Number(total)).to.equal(sum)
    })

    cy.contains('Checkout').click()
    cy.get('#country').type('India')
    cy.wait(6000)
    cy.get('.suggestions > ul > li > a').click()
    cy.get('.checkbox').click()
    cy.get('input[type="submit"]').click()

    // If cypress add gaps or other stuff to strings
    //cy.get('.alert').should('have.text', 'Success! Thank you! Your order will be delivered in next few weeks :-).')
    //Right way
    cy.get('.alert').then(function(element) {
      const actualText = element.text()
      expect(actualText.includes('Success!')).to.be.true
    })
  })
})