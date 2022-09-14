export {};
describe('test homepage', () => {
    context('720p viewport', () => {
        beforeEach(() => {
            cy.viewport(1280, 720);
        });

        describe('When you visit home', () => {
            it('should visit home', () => {
                cy.visit('/');
            });

            it('should render helloworld', () => {
                cy.get('#helloworld').should('be.visible');
            });
        });
    });
});
