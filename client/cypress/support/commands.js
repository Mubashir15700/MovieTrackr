// Custom command to check authentication
Cypress.Commands.add('checkAuthentication', () => {
  return cy.request('/auth/checkauth').then((response) => {
    console.log(response);
    return response.body.status === "success";
  });
});

// Custom command to perform login if not authenticated
Cypress.Commands.add('performLoginIfNeeded', () => {
  cy.checkAuthentication().then((isAuthenticated) => {
    if (!isAuthenticated) {
      cy.visit('/login');

      // Check visibility and interact with email input
      cy.get('input#email', { timeout: 10000 }).should('be.visible').then(($input) => {
        cy.wrap($input).type('nikob123@example.com');
      });

      // Check visibility and interact with password input
      cy.get('input#password', { timeout: 10000 }).should('be.visible').then(($input) => {
        cy.wrap($input).type('12345@Qw');
      });

      // Check visibility and click the submit button
      cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click();

      // Wait for login to complete and assert redirection to dashboard
      cy.url({ timeout: 10000 }).should('include', '/');
    } else {
      cy.log('User is already authenticated.');
    }
  });
});

// Custom command to log out
Cypress.Commands.add('performLogout', () => {
  cy.get('.logoutIcon').click(); // Assuming .logoutIcon is the class name for your logout button

  // Confirm the logout in SweetAlert
  cy.get('.swal2-confirm').click(); // Click the confirm button in SweetAlert
});