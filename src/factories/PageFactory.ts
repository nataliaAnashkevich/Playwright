import { Page } from '@playwright/test';
import { ToDoPage } from '../page-objects/ToDoPage';

export class PageFactory {
  static toDoPage(page: Page) {
    return new ToDoPage(page);
  }
}


