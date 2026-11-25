// test/Experience.test.jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Experience from '../src/components/experience/Experience.jsx';

test('clicking a tab shows its panel', async () => {
  const user = userEvent.setup();
  render(<Experience />);
  expect(screen.getByRole('tab', { name: 'AWS' })).toHaveAttribute('aria-selected', 'true');
  await user.click(screen.getByRole('tab', { name: 'Nisum' }));
  expect(screen.getByRole('tabpanel')).toHaveTextContent('DevOps Engineer');
});

test('ArrowUp wraps from the first tab to the last', async () => {
  const user = userEvent.setup();
  render(<Experience />);
  screen.getByRole('tab', { name: 'AWS' }).focus();
  await user.keyboard('{ArrowUp}');
  expect(screen.getByRole('tab', { name: 'SOPAC' })).toHaveAttribute('aria-selected', 'true');
});

test('arrow keys move between tabs', async () => {
  const user = userEvent.setup();
  render(<Experience />);
  screen.getByRole('tab', { name: 'AWS' }).focus();
  await user.keyboard('{ArrowDown}');
  expect(screen.getByRole('tab', { name: 'Nisum' })).toHaveAttribute('aria-selected', 'true');
});

test('accordion rows expand and collapse', async () => {
  const user = userEvent.setup();
  render(<Experience />);
  const nisum = screen.getByRole('button', { name: 'Nisum' });
  expect(nisum).toHaveAttribute('aria-expanded', 'false');
  await user.click(nisum);
  expect(nisum).toHaveAttribute('aria-expanded', 'true');
  await user.click(nisum);
  expect(nisum).toHaveAttribute('aria-expanded', 'false');
});
