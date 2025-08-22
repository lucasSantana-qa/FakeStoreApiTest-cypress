/// <reference types = "cypress"/>

describe('Products', () => {
    it("GET all products", () => {
        cy.request({
            url: '/products',
            method: 'GET'
        }).as('response').its('body').then(body => {
            expect(body).to.be.an('array')
            expect(body[0]).to.have.property('id')
            expect(body[0]).to.have.property('title')
            expect(body[0]).to.have.property('price')
            expect(body[0]).to.have.property('description')
            expect(body[0]).to.have.property('category')
            expect(body[0]).to.have.property('image')
        })
        cy.get('@response').its('status').should('be.eql', 200)
        cy.get('@response').should('have.property', 'body')
    })
})
