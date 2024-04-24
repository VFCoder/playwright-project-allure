import { test, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import SignupPage from "../pages/SignupPage";
import TodoPage from "../pages/TodoPage";

test("should be able to register", async ({ page }) => {
  //sign up:
  const user = new User();
  const signupPage = new SignupPage();
  await signupPage.load(page);
  await signupPage.signup(page, user);

  //verify:
  const todoPage = new TodoPage();
  const welcomeMessage = await todoPage.getWelcomeMessage(page);
  await expect(welcomeMessage).toBeVisible();

});

test("should be able to register via API", async ({
  page,
  request,
  context,
}) => {
  //sign up via API:
  const user = new User();
  const signupPage = new SignupPage();
  await signupPage.signupUsingAPI(request, user, context);

  //verify:
  const todoPage = new TodoPage();
  await todoPage.load(page);
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
