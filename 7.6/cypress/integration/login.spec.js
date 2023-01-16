const email = "test@test.com";
const password = "test";

describe("login process", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Should successfully login", () => {
    cy.login(email, password);
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("Should not login with empty login", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type(" ");
    cy.get("#pass").type(password);
    cy.contains("Submit").click();
    cy.checkValidationMessage("#mail");
  });

  it("Should not login with empty password", () => {
    cy.contains("Log in").click();
    cy.get("#mail").type(email);
    cy.contains("Submit").click();
    cy.checkValidationMessage("#pass");
  });
});

describe("favorites page", () => {
  beforeEach(() => {
    cy.visit("/favorites");
  });

  it("after authorization page Favorites should appear", () => {
    cy.get("a")
      .last()
      .should("have.text", "Please add some book to favorit on home page!");
    cy.login(email, password);
    cy.get("h4").should("have.text", "Favorites");
  });

  const title = "testTitle";
  const author = "testAuthor";
  const title2 = "testTitle2";
  const author2 = "testAuthor2";

  it("should add book to favorites by button", () => {
    cy.addNewBook(email, password, title2, author2);
    cy.get("button").contains("Submit").click();
    cy.wait(2000);
    cy.get("button").contains("Add to favorite").click();
    cy.checkBookAndDelete(title2, author2);
  });

  it("should add book to favorites by checkbox", () => {
    cy.addNewBook(email, password, title, author);
    cy.get("#favorite").check();
    cy.get("button").contains("Submit").click();
    cy.checkBookAndDelete(title, author);
  });
});
