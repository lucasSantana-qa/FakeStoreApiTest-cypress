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
            it('POST add new product', () => {
        cy.fixture("example").then(bodyReq => {
            cy.request({
                url: '/products',
                method: 'POST',
                body: {
                    "id": "",
                    "title": "Teste cy",
                    "price": 1200.00,    
                    "description": "A cypress test",
                    "category": "Test",
                    "image": "http://test.com"              
                  }
            }).as('response').then(res => {
                console.log(res)
            })
            cy.get('@response').its('status').should('be.eql', 201)
            cy.get('@response').its('body').should('have.property', 'id')
            cy.get('@response').its('body').should('have.property', 'title')
            cy.get('@response').its('body').should('have.property', 'image')
            cy.get('@response').its('body').should('have.property', 'description')
            cy.get('@response').its('body').should('have.property', 'price')
            cy.get('@response').its('body').should('have.property', 'category')
        })
    })
    it('GET a single product', () => {
        cy.request({
            url: `/products/1`,
            method: 'GET'
        }).as('response')
        cy.get('@response').its('status').should('be.eql', 200)
    })

    it.only('Update a product', () => {
      cy.request({
        url: '/products/1',
        method: 'PUT',
        body: {
            title: "Alterado",
            price: 100.00,
            description: "Alterado",
            category: "Alterado",
            image: "http://alterado.img"

        }
        }).as('response')
        cy.get('@response').its('status').should('be.eql', 200)
        cy.get('@response').its('body.category').should('be.eql', 'Alterado')   
        cy.get('@response').its('body.title').should('be.eql', 'Alterado')  
        cy.get('@response').its('body.description').should('be.eql', 'Alterado')  
        cy.get('@response').its('body.image').should('be.eql', 'http://alterado.img')
        cy.get('@response').its('body.price').should('be.eql', 100.00)
     })
})
