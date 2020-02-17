describe('Test e2e', function() {
    it('Visits the application', function() {
        cy.visit('http://msprfront.califourchon.wtf/')

        cy.get('.test').eq(0).click()

        cy.get('#plus').click()

        cy.get('#product').type('Patate')

        cy.get('#quantity').type('3')

        cy.get('#unitPrice').type('4.56')

        cy.get('#addProduct').click()

        cy.get('#plusUser').click()

        cy.get('#firstname').type('Test')

        cy.get('#lastname').type('test')

        cy.get('#addUser').click()


    })
})
