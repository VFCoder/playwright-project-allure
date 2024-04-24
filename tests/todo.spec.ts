import { test, expect } from "@playwright/test";
import User from "../models/User";
import TodoPage from "../pages/TodoPage";
import SignupPage from "../pages/SignupPage";
import NewTodoPage from "../pages/NewTodoPage";

test("should be able to add todo", async ({ page, context, request }) => {
  //register via API:
  const user = new User();
  const signupPage = new SignupPage();
  await signupPage.signupUsingAPI(request, user, context);

  //add todo:
  const todo = "Do something productive";
  const newTodoPage = new NewTodoPage();
  await newTodoPage.load(page);
  await newTodoPage.addTodo(page, todo);

  //verify:
  const todoPage = new TodoPage();
  const todoItem = await todoPage.getTodoItem(page);
  expect(await todoItem.innerText()).toEqual(todo);

});

test("should be able to delete todo", async ({ page, context, request }) => {
  //register via API:
  const user = new User();
  const signupPage = new SignupPage();
  await signupPage.signupUsingAPI(request, user, context);

  //add todo via API:
  const todoText = "Do the dishes";
  const newTodoPage = new NewTodoPage();
  await newTodoPage.addTodoUsingAPI(request, todoText, user);

  //delete todo:
  const todoPage = new TodoPage();
  await todoPage.load(page);
  await todoPage.deleteTodo(page);

  //verify:
  const noTodoMessage = await todoPage.getNoTodoMessage(page);
  await expect(noTodoMessage).toBeVisible();

});
