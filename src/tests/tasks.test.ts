import { test, expect } from '@playwright/test';
import { PageFactory } from '../factories/PageFactory';

test.describe('ToDoMVC', () => {

  test.beforeEach(async ({ page }) => {
    // await page.goto('http://todomvc.com/examples/react/dist/');
    const toDoPage = PageFactory.toDoPage(page);
    await toDoPage.goToPage();
  });

  test('Add a new todo', async ({ page }) => {
    const toDoPage = PageFactory.toDoPage(page);
    await toDoPage.addTodo('Install Playwright');

    // await page.fill('.new-todo', 'Install Playwright');
    // await page.press('.new-todo', 'Enter');

    const todoItems = page.locator('.todo-list li');
    await expect(todoItems).toHaveCount(1);
    await expect(todoItems.first()).toContainText('Install Playwright');
  });

  test('Mark todo as completed (edit)', async ({ page }) => {
    const toDoPage = PageFactory.toDoPage(page);
    await toDoPage.addTodo('Install Allure');

    // await page.fill('.new-todo', 'Install Allure');
    // await page.press('.new-todo', 'Enter');

    const checkbox = page.locator('.todo-list li .toggle');
    await checkbox.check();

    const completed = page.locator('.todo-list li.completed');
    await expect(completed).toHaveCount(1);
  });

  test('Delete a todo', async ({ page }) => {
    const toDoPage = PageFactory.toDoPage(page);
    await toDoPage.addTodo('Read today\'s news');

    // await page.fill('.new-todo', 'Read today\'s news');
    // await page.press('.new-todo', 'Enter');

    const todoItem = page.locator('.todo-list li');
    await todoItem.hover();
    await page.click('.todo-list li .destroy');

    await expect(todoItem).toHaveCount(0);
  });

  test('filter active vs completed', async ({ page }) => {
    const toDoPage = PageFactory.toDoPage(page);
    await toDoPage.addTodo('Play with the cat');
    await toDoPage.addTodo('Make cake');

    // await page.fill('.new-todo', 'Play with the cat');
    // await page.press('.new-todo', 'Enter');
    // await page.fill('.new-todo', 'Make cake');
    // await page.press('.new-todo', 'Enter');

    await page.locator('.todo-list li .toggle').first().check();

    await page.click('text=Active');
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li')).toContainText('Make cake');

    await page.click('text=Completed');
    await expect(page.locator('.todo-list li')).toHaveCount(1);
    await expect(page.locator('.todo-list li')).toContainText('Play with the cat');
  });
});
