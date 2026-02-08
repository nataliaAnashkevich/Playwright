import { Page } from '@playwright/test';

export class ToDoPage {
  constructor (private page: Page) {
  }

  async goToPage () {
    await this.page.goto('http://todomvc.com/examples/react/dist/');
  }

  async addTodo (toDoName: string) {
    await this.page.fill('.new-todo', toDoName);
    await this.page.press('.new-todo', 'Enter');
  }
}
