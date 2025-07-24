describe('Website Tests', () => {
  beforeEach(() => {
    // Visit the home page before each test
    cy.visit('http://localhost:3000/index.html');
  });

  it('displays the home page correctly', () => {
    cy.get('h1').should('contain', 'Welcome to Our Website');
    cy.get('p').should('contain', 'This is the home page');
    cy.get('#cta-button').should('be.visible');
  });

  it('navigates to the about page', () => {
  cy.get('nav a[href="about.html"]').click();
  cy.url().should('match', /\/about(\.html)?$/);
  cy.get('h1').should('contain', 'About Us');
  });

  it('navigates to the contact page', () => {
    cy.get('nav a[href="contact.html"]').click();
    cy.url().should('match', /\/contact(\.html)?$/);
    cy.get('h1').should('contain', 'Contact Us');
    cy.get('form').should('exist');
  });

  it('tests the CTA button functionality', () => {
    cy.get('#message').should('not.be.visible');
    cy.get('#cta-button').click();
    cy.get('#message').should('be.visible').and('contain', 'Button was clicked!');
  });

  it('tests the contact form submission', () => {
    cy.visit('http://localhost:3000/contact.html');
    
    cy.get('#name').type('Test User');
    cy.get('#email').type('test@example.com');
    cy.get('#message').type('This is a test message');
    
    // Stub the alert
    const stub = cy.stub();
    cy.on('window:alert', stub);
    
    cy.get('form').submit().then(() => {
      expect(stub.getCall(0)).to.be.calledWith('Form submitted successfully!');
    });
    
    // Verify form is reset
    cy.get('#name').should('have.value', '');
  });

  // Bonus: Failing test (intentional bug)
  it('verifies all team members are listed', () => {
    cy.visit('http://localhost:3000/about.html');
    cy.get('.team-list li').should('have.length', 3); // Should fail (only 2 listed)
  // You can fix the failing test by adding the missing team member to about.html:
  // <li>Miguel - Project Manager</li>
  });
});