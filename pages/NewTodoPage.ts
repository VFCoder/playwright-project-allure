import { APIRequestContext, Page } from "@playwright/test";
import TodoApi from "../apis/TodoApi";
import User from "../models/User";

export default class NewTodoPage {
  async load(page: Page) {
    await page.goto("/todo/new");
  }
  private get newTodoInput() {
    return "[data-testid=new-todo]";
  }
  private get createTodoButton() {
    return "[data-testid=submit-newTask]";
  }
  async addTodo(page: Page, todoText: string) {
    await page.fill(this.newTodoInput, todoText);
    await page.click(this.createTodoButton);
  }
  async addTodoUsingAPI(request: APIRequestContext, todoText: string, user: User){
    await new TodoApi().addTodo(request, todoText, user);

  }
}
