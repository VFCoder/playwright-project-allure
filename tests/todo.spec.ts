import { test, expect } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import TodoApi from "../apis/TodoApi";
import TodoPage from "../pages/TodoPage";
import SignupPage from "../pages/SignupPage";
import NewTodoPage from "../pages/NewTodoPage";

test("should be able to add todo", async ({ page, context, request }) => {
  //register via API:
  const user = new User();
  const todo = "Do something productive";

  const signupPage = new SignupPage();

  await signupPage.signupUsingAPI(request, user, context);
  //add todo:
  const newTodoPage = new NewTodoPage();

  await newTodoPage.load(page);
  await newTodoPage.addTodo(page, todo);
  // const addTodoButton = page.locator(".sc-idiyUo.hWRklb button");
  // const newTodoInput = page.locator("[data-testid=new-todo]");
  // const createTodoButton = page.locator("[data-testid=submit-newTask]");
  //const todoItem = page.locator("[data-testid=todo-item]");
  const todoPage = new TodoPage();
  const todoItem = await todoPage.getTodoItem(page);
  expect(await todoItem.innerText()).toEqual(todo);
  // await page.goto("/todo");
  // await addTodoButton.click();
  // await newTodoInput.fill(todoText);
  // await createTodoButton.click();
  //expect(await todoItem.innerText()).toEqual(todo);
});

test("should be able to delete todo", async ({ page, context, request }) => {
  //register via API:
  const user = new User();
  //const response = await new UserApi().signup(request, user);

  const signupPage = new SignupPage();

  await signupPage.signupUsingAPI(request, user, context);

  //add todo via API:
  const todoText = "Do the dishes";

  //await page.goto("/todo");

  //await new TodoApi().addTodo(request, todoText, user);

  //await page.goto("/todo/new");

  //delete todo:
  // const deleteTodoButton = page.locator("[data-testid=delete]");
  // const noTodosMessage = page.locator("[data-testid=no-todos]");
  const newTodoPage = new NewTodoPage();

  await newTodoPage.addTodoUsingAPI(request, todoText, user);
  const todoPage = new TodoPage();

  await todoPage.load(page);
  await todoPage.deleteTodo(page);
  const noTodoMessage = await todoPage.getNoTodoMessage(page);
  await expect(noTodoMessage).toBeVisible();
  //await page.goto("/todo");
  // await deleteTodoButton.click();
  // await expect(noTodosMessage).toBeVisible();
});
