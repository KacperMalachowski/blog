/// <reference types="Cypress" /> 

describe('HomePage', () => {
  it('should return go home on brand click', () => {
    cy.visit('/');

    cy.get('nav').get('a').contains('Kacper Małachowski').click();

    cy.url().should('eq', `${Cypress.config().baseUrl}/`);
  });
});

export {};