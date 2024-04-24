import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";

test("should be able to register", async ({ page }) => {
  const user = new User();
  const signupPage = new SignupPage();

  await signupPage.load(page);
  await signupPage.signup(page, user);

  const todoPage = new TodoPage();

  const welcomeMessage = await todoPage.getWelcomeMessage(page);
  await expect(welcomeMessage).toBeVisible();

  // const firstNameInput = page.locator("[data-testid=first-name]");
  // const lastNameInput = page.locator("[data-testid=last-name]");
  // const emailInput = page.locator("[data-testid=email]");
  // const passwordInput = page.locator("[data-testid=password]");
  // const confirmPasswordInput = page.locator("[data-testid=confirm-password]");
  // const submitButton = page.locator("[data-testid=submit]");
  // const welcomeMessage = page.locator("[data-testid=welcome]");

  // await page.goto("/signup");
  // await firstNameInput.fill(user.getFirstName());
  // await lastNameInput.fill(user.getLastName());
  // await emailInput.fill(user.getEmail());
  // await passwordInput.fill(user.getPassword());
  // await confirmPasswordInput.fill(user.getPassword());
  // await submitButton.click();
  // await expect(welcomeMessage).toBeVisible();
});

test("should be able to register via API", async ({
  page,
  request,
  context,
}) => {
  const user = new User();
  const response = await new UserApi().signup(request, user);

  const responseBody = await response.json();
  const access_token = responseBody.access_token;
  const firstName = responseBody.firstName;
  const userID = responseBody.userID;

  await context.addCookies([
    {
      name: "access_token",
      value: access_token,
      url: "https://todo.qacart.com",
    },
    {
      name: "firstName",
      value: firstName,
      url: "https://todo.qacart.com",
    },
    {
      name: "userID",
      value: userID,
      url: "https://todo.qacart.com",
    },
  ]);
  await page.goto("/signup");

  const todoPage = new TodoPage();

  const welcomeMessage = await todoPage.getWelcomeMessage(page);
  await expect(welcomeMessage).toBeVisible();
});

test("should be able to log in", async ({ page }) => {
  await page.goto("/login");

  const emailInput = page.locator("[id=email]");
  const passwordInput = page.locator("[id=password]");
  const submitButton = page.locator("[id=submit]");
  const welcomeMessage = page.locator("[data-testid=welcome]");

  await emailInput.fill("BillyBob@email.com");
  await passwordInput.fill("test@123");
  await submitButton.click();
  await expect(welcomeMessage).toBeVisible();
});
