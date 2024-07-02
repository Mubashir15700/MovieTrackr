describe('Movie Watchlist App', () => {
  beforeEach(() => {
    // Visit the app or login if required
    cy.visit('http://localhost:5173');
  });

  it('should check whether the user is authenticated or not', () => {
    // Make API request to check authentication status
    cy.request('/auth/checkauth').then((response) => {
      if (response && response.status === "success") {
        // User is authenticated, skip login
        cy.log(response);
        cy.log('User is already authenticated.');
      } else {
        // User is not authenticated, navigate to login page
        cy.visit('/login');

        // Perform login
        cy.get('input#email').should('be.visible').type('nikob123@example.com');
        cy.get('input#password').should('be.visible').type('12345@Qw');
        // Submit the form
        cy.get('button[type="submit"]').should('be.visible').click();

        // Wait for login to complete and assert redirection to dashboard
        cy.url().should('include', '/');
      }
    });
  });

  it('should navigate to add movie page', () => {
    // Find the Link component with text or id
    cy.get('#addMovieIcon').click();

    // Assert navigation to add movie page
    cy.url().should('include', '/add-movie');

    // check for the page headings relevant to the add movie form
    cy.contains('h1', 'Add a New Movie');
  });

  it('should add a new movie', () => {
    // Fill in the movie form
    cy.get('input#title').should('be.visible').type('New Movie Title');
    cy.get('input#description').should('be.visible').type('This is a description of the new movie.');
    cy.get('input#releaseYear').should('be.visible').type('2023');
    cy.get('select#genre').should('be.visible').select(['Action', 'Drama']);
    // Submit the form
    cy.get('button[type="submit"]').click();

    // Assert that the movie is added and user is redirected to the dashboard or movie list
    cy.url().should('include', '/'); // Adjust based on your actual redirection
    cy.contains('New Movie Title').should('exist'); // Verify the new movie is displayed
  });
});
