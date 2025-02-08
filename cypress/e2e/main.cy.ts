describe("GitHub User Search", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("searches for users and displays results", () => {
    cy.intercept("GET", "**/search/users?q=test&per_page=5", {
      body: {
        items: [
          { id: 1, login: "user1" },
          { id: 2, login: "user2" },
          { id: 3, login: "user3" },
          { id: 4, login: "user4" },
          { id: 5, login: "user5" },
        ],
      },
    }).as("getUsers");

    cy.get("input").type("test");
    cy.get("form").submit();

    cy.wait("@getUsers");

    cy.get('[data-testid="users-loading"]').should("not.exist");
    cy.get('[data-testid="user-accordion"]').should("have.length", 5);
  });

  it("displays 'No users found' when search returns empty", () => {
    cy.intercept("GET", "**/search/users?q=unknown&per_page=5", {
      statusCode: 200,
      body: { items: [] },
    }).as("getNoUsers");

    cy.get("input").type("unknown");
    cy.get("form").submit();

    cy.wait("@getNoUsers");

    cy.get('[data-testid="no-users-found"]').should("be.visible");
  });

  it("displays an error message when API request fails", () => {
    cy.intercept("GET", "**/search/users?q=error&per_page=5", {
      statusCode: 500,
      body: { message: "Internal Server Error" },
    }).as("getError");

    cy.get("input").type("error");
    cy.get("form").submit();

    cy.wait("@getError");

    cy.get('[data-testid="users-error"]', { timeout: 8000 }).should(
      "be.visible"
    );
  });
});
