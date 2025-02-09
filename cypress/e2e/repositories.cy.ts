describe("Repositories for users", () => {
  const getFakeRepos = (n: number) => {
    return Array.from({ length: n }, (_, i) => ({
      id: i + 1,
      name: `repo${i + 1}`,
      description: `Description for repo${i + 1}`,
      html_url: `https://github.com/user/repo${i + 1}`,
      stargazers_count: Math.floor(Math.random() * 100),
    }));
  };

  const headersWithNextPage = {
    link: 'rel="next"',
  };

  const loadMoreButtonQuery = '[data-testid="load-more-button"]';
  const repositoriesLoadingQuery = '[data-testid="repositories-loading"]';
  const userAccordionQuery = '[data-testid^="user-accordion"]';
  const noRepositoriesQuery = '[data-testid="no-repositories"]';

  beforeEach(() => {
    cy.visit("/");

    cy.intercept("GET", "**/search/users*", {
      statusCode: 200,
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
  });

  it("shows loader for repositories", () => {
    cy.intercept("GET", "**/users/*/repos*", {
      statusCode: 200,
      body: getFakeRepos(1),
      delay: 2000,
    }).as("getRepositories");

    cy.get(userAccordionQuery).first().click();

    cy.get(repositoriesLoadingQuery).should("be.visible");
  });

  it("displays repositories for a user and hides loader", () => {
    cy.intercept("GET", "**/users/*/repos*", {
      statusCode: 200,
      body: getFakeRepos(1),
      delay: 1000,
    }).as("getRepositories");

    cy.get(userAccordionQuery).first().click();

    const repositoriesLoading = cy.get(repositoriesLoadingQuery);

    repositoriesLoading.should("be.visible");

    cy.wait("@getRepositories");

    repositoriesLoading.should("not.exist");
  });

  it("displays load more button when there are more repositories to be loaded", () => {
    cy.intercept("GET", "**/users/*/repos*", {
      statusCode: 200,
      body: getFakeRepos(10),
      delay: 2000,
      headers: headersWithNextPage,
    }).as("getRepositories");

    cy.get(userAccordionQuery).first().click();

    cy.get(repositoriesLoadingQuery).should("be.visible");

    cy.wait("@getRepositories");

    cy.get(loadMoreButtonQuery).should("be.visible");
  });

  it("hides load more button when there are no more repositories to be loaded", () => {
    cy.intercept("GET", "**/users/*/repos*", {
      statusCode: 200,
      body: getFakeRepos(10),
      headers: headersWithNextPage,
    }).as("getRepositories");

    cy.get(userAccordionQuery).first().click();

    cy.wait("@getRepositories");

    cy.intercept("GET", "**/users/*/repos*", {
      statusCode: 200,
      body: getFakeRepos(7),
    }).as("getLessRepositories");

    const loadMoreButton = cy.get(loadMoreButtonQuery);

    loadMoreButton.should("be.visible");

    loadMoreButton.first().click();

    cy.wait("@getLessRepositories");

    loadMoreButton.should("not.exist");
  });

  it("displays 'No repositories found' when user has none", () => {
    cy.intercept("GET", "**/users/*/repos*", {
      statusCode: 200,
      body: getFakeRepos(0),
    }).as("getRepositories");

    cy.get(userAccordionQuery).first().click();

    cy.wait("@getRepositories");

    cy.get(noRepositoriesQuery).should("be.visible");
  });

  it("displays an error Alert when API request fails and hides loader", () => {
    cy.intercept("GET", "**/users/*/repos*", {
      statusCode: 500,
    }).as("getRepositories");

    cy.get(userAccordionQuery).first().click();

    cy.wait("@getRepositories");

    cy.contains("There was an error").should("be.visible");
  });

  it("displays error toast when load more fails", () => {
    cy.intercept("GET", "**/users/*/repos*", {
      statusCode: 200,
      body: getFakeRepos(10),
      headers: headersWithNextPage,
    }).as("getRepositories");

    cy.get(userAccordionQuery).first().click();

    cy.wait("@getRepositories");

    cy.intercept("GET", "**/users/*/repos*", {
      statusCode: 500,
    }).as("getMoreRepositories");

    cy.get(loadMoreButtonQuery).click();

    cy.wait("@getMoreRepositories");

    //MUI Snackbar has role presentation
    cy.get('[role="presentation"]')
      .contains("There was an error")
      .should("be.visible");
  });
});
