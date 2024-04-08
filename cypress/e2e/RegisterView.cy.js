describe('RegisterView', () => {
    it('should register successfully', () => {
        cy.intercept('POST', 'http://localhost:8080/auth/register').as('register');
        cy.visit('localhost:5173/register');
        cy.get('input[placeholder="First name"]').type('First Name');
        cy.get('input[placeholder="Last name"]').type('Last Name');
        cy.get('input[placeholder="Username"]').type('TestUser');
        cy.get('input[placeholder="Email"]').type('test@email.com');
        cy.get('input[placeholder="Password"]').type('testtest123');
        cy.get('button').click();
        cy.wait('@register').then((interception) => {
            assert.isNotNull(interception.response.body, 'POST');
        })
    });

    it('should give feedback on empty fields', () => {
        cy.visit('localhost:5173/register');
        cy.get('button').click();
        cy.get('div').should('contain.text', 'First name is required');
        cy.get('div').should('contain.text', 'Last name is required');
        cy.get('div').should('contain.text', 'Username is required');
        cy.get('div').should('contain.text', 'Email is required');
        cy.get('div').should('contain.text', 'Password is required');
    })

    it('should give feedback on invalid email', () => {
        cy.visit('localhost:5173/register');
        cy.get('input[placeholder="Email"]').type('testemail.com');
        cy.get('button').click();
        cy.get('div').should('contain.text', 'Please enter a valid email address: example@domain.com');
    })

    it('should give feedback on invalid password', () => {
        cy.visit('localhost:5173/register');
        cy.get('input[placeholder="Password"]').type('test');
        cy.get('button').click();
        cy.get('div').should('contain.text', 'Password must be at least 8 characters');
    })
});