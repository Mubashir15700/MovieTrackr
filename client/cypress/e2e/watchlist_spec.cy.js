import '../support/commands.js';

// Testings
describe('Movie Watchlist App', () => {
  before(() => {
    cy.checkAuthentication().then((isAuthenticated) => {
      if (!isAuthenticated) {
        cy.performLoginIfNeeded();
      } else {
        // Visit the home page only if not already there
        cy.url().then((url) => {
          if (!url.includes('/login')) {
            cy.visit('/');
          }
        });
      }
    });
  });

  it('should find the "add movie" button and navigate to the add movie page', () => {
    // Find the button with ID "addMovieIcon" and click it
    cy.get('#addMovieIcon button', { timeout: 10000 }).should('be.visible').click();

    // Assert that the URL includes "/add-movie"
    cy.url({ timeout: 10000 }).should('include', '/add-movie');
  });

  it('should add a new movie', () => {
    // Navigate to "/" route
    cy.visit('/');

    // Find the button with ID "addMovieIcon" and click it
    cy.get('#addMovieIcon button', { timeout: 10000 }).should('be.visible').click();

    // Fill out the form
    cy.get('input#title', { timeout: 10000 }).should('be.visible').type('New Movie');
    cy.get('textarea#description', { timeout: 10000 }).should('be.visible').type('This is a description of the new movie.');
    cy.get('input#releaseYear', { timeout: 10000 }).should('be.visible').type('2024');
    cy.get('select#genre', { timeout: 10000 }).should('be.visible').select(['Action', 'Drama']);

    // Submit the form
    cy.get('button[type="submit"]', { timeout: 10000 }).should('be.visible').click();

    // Assert that the movie is added and we are redirected to the main page
    cy.url({ timeout: 10000 }).should('include', '/');
    cy.contains('New Movie').should('be.visible');
  });

  it('should delete a movie', () => {
    // Navigate to "/" route
    cy.visit('/');

    let movieId;

    // Intercept the DELETE request to handle it in Cypress
    cy.intercept('DELETE', `/watchlist/movies/${movieId}`).as('deleteMovie');

    // Perform action that triggers deletion (clicking delete button)
    // Replace with actual selector if different in your application
    cy.get('#deleteMovieIcon').click();

    // Confirm the deletion in the SweetAlert dialog
    cy.get('.swal2-confirm').click();

    // Wait for the API request to complete
    // cy.wait('@deleteMovie').then((interception) => {
    //   // Check the request status and other details if necessary
    //   expect(interception.response.statusCode).to.eq(200);

    //   // Optionally, assert that the movie is removed from UI if needed
    //   cy.contains('.movieTitle', 'Deleted Movie').should('not.exist');
    // });
  });

  it('should click the first movie\'s edit button', () => {
    // Navigate to "/" route
    cy.visit('/');

    // Click the edit button of the first movie
    cy.get('#editMovieIcon').first().click();

    // Assert that the URL includes "/edit-movie/{movieId}" (replace {movieId} with actual movie ID logic)
    cy.url().should('match', /\/edit-movie\/[a-zA-Z0-9_-]+$/);

    // Change values
    cy.get('input#title').clear().type('Edited Movie Title');
    cy.get('textarea#description').clear().type('This movie has been edited.');
    cy.get('input#releaseYear').clear().type('2002');
    cy.get('select#genre').select('Drama'); // Change genre selection

    // Click submit button
    cy.get('button[type="submit"]').click();

    // Assert that the movie has been edited successfully and redirected
    cy.url().should('include', '/'); // Adjust this assertion based on your application's redirect logic
    cy.contains('Edited Movie Title').should('be.visible');
  });

  it('should log out the user', () => {
    // Navigate to "/" route
    cy.visit('/');
    // Perform the logout action
    cy.performLogout();

    // Assert that the URL includes "/login" indicating user is logged out
    cy.url({ timeout: 10000 }).should('include', '/login');
  });
});
