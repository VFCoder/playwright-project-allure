import { Page } from "@playwright/test";

export default class TodoPage {
  private get addTodoButton() {
    return ".sc-idiyUo.hWRklb button";
  }

  private get todoItem() {
    return "[data-testid=todo-item]";
  }
  private get welcomeMessage() {
    return "[data-testid=welcome]";
  }
  private get noTodoMessage() {
    return "[data-testid=no-todos]";
  }
  private get deleteTodoButton() {
    return "[data-testid=delete]";
  }

  async load(page: Page) {
    await page.goto("/todo");
  }

  async getWelcomeMessage(page: Page) {
    return page.locator(this.welcomeMessage);
  }
  async getTodoItem(page: Page) {
    return page.locator(this.todoItem);
  }
  async deleteTodo(page: Page) {
    await page.click(this.deleteTodoButton);
  }
  async getNoTodoMessage(page: Page) {
    return page.locator(this.noTodoMessage);
  }
}
// const deleteTodoButton = page.locator("[data-testid=delete]");
// const noTodosMessage = page.locator("[data-testid=no-todos]");
//await deleteTodoButton.click();

// const welcomeMessage = page.locator("[data-testid=welcome]");
// await expect(welcomeMessage).toBeVisible();
// const addTodoButton = page.locator(".sc-idiyUo.hWRklb button");
// const newTodoInput = page.locator("[data-testid=new-todo]");
// const createTodoButton = page.locator("[data-testid=submit-newTask]");
// const todoItem = page.locator("[data-testid=todo-item]");
// const todoText = "Do the dishes";

// await page.goto("/todo");
// await addTodoButton.click();
// await newTodoInput.fill(todoText);
// await createTodoButton.click();
// expect(await todoItem.innerText()).toEqual(todoText);
