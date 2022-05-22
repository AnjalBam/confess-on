export const hello = 'hello';

describe('Testing login feature', () => {
    describe('testing login page', () => {
        it('should contain login as title', () => {
            cy.visit('/auth/login');
            cy.title().should('include', 'Login');
        })
    })
})