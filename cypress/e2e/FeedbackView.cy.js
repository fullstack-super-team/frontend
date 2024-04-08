describe('FeedbackView', () => {
    it('should submit feedback successfully', () => {
        cy.intercept('POST', 'http://localhost:8080/feedback').as('submitFeedback');
        cy.visit('localhost:5173/feedback');
        cy.get('TextArea[placeholder="Enter your feedback here..."]').type('Testing writing a feedback');
        cy.get('button').click();
        cy.wait('@submitFeedback').then((interception) => {
            assert.isNotNull(interception.response.body, 'POST');
        })
    });

    it('should give message on empty feedback', () => {
        cy.visit('localhost:5173/feedback');
        cy.get('button').click();
        cy.get('div').should('contain.text', 'Please enter your feedback before submitting.');
    })
});