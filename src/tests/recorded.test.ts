import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://todomvc.com/examples/react/dist/');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('Walk the dog');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').click();
  await page.getByTestId('text-input').fill('By new dress');
  await page.getByTestId('text-input').press('Enter');
  await page.getByTestId('text-input').fill('Work work');
  await page.getByTestId('text-input').press('Enter');
  await page.getByRole('link', { name: 'All' }).click();
  await page.getByRole('link', { name: 'Completed' }).click();
  await page.getByTestId('footer-navigation').click();
  await page.getByRole('link', { name: 'Quick Start' }).click();
});