/// <reference types="Cypress" />
const Posts = require("../fixtures/posts.json");

describe("Test", () => {
  it("Should open home page", () => {
    cy.visit("/");
  });
});

describe("Header Test", () => {
  it("should go to blog when Blog Link clicked", () => {
    const apiURL = Cypress.env('GRAPHQL_URL_ENDPOINT')
    cy.intercept(`${apiURL}**`, { fixture: "posts.json"});

    cy.visit('/');
    cy.get("nav").get("a").contains("Blog").click();
    cy.contains("Why you should test your code?").should("exist");
  })
});
