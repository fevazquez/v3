// test/Header.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Header from '../src/components/header/Header.jsx';

test('burger opens and Escape closes the menu', async () => {
  const user = userEvent.setup();
  render(<Header />);
  const burger = screen.getByRole('button', { name: 'Menu' });
  expect(burger).toHaveAttribute('aria-expanded', 'false');
  await user.click(burger);
  expect(burger).toHaveAttribute('aria-expanded', 'true');
  await user.keyboard('{Escape}');
  expect(burger).toHaveAttribute('aria-expanded', 'false');
});

test('clicking outside closes the menu', async () => {
  const user = userEvent.setup();
  render(<Header />);
  const burger = screen.getByRole('button', { name: 'Menu' });
  await user.click(burger);
  await user.click(document.body);
  expect(burger).toHaveAttribute('aria-expanded', 'false');
});

test('nav links point at home page sections', () => {
  render(<Header />);
  expect(screen.getAllByRole('link', { name: 'About' })[0]).toHaveAttribute('href', '/#about');
});
