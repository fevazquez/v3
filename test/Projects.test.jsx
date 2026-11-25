import { render, screen } from '@testing-library/react';
import Projects from '../src/components/projects/Projects.jsx';

const mockPictures = [
  {
    src: '/_astro/homelab.webp',
    srcSet: '/_astro/homelab.webp 1x, /_astro/homelab@2x.webp 2x',
    width: 500,
    height: 300,
    alt: 'Automated Linux & Containerized Home Lab architecture',
  },
  {
    src: '/_astro/screenshot.webp',
    srcSet: '/_astro/screenshot.webp 1x, /_astro/screenshot@2x.webp 2x',
    width: 500,
    height: 350,
    alt: 'fernandovazquez.dev portfolio screenshot',
  },
];

test('renders both projects, their visuals, and the GitHub links', () => {
  render(<Projects pictures={mockPictures} />);

  expect(screen.getByRole('heading', { name: /Projects/ })).toBeInTheDocument();
  expect(
    screen.getByRole('heading', { name: 'Automated Linux & Containerized Home Lab' }),
  ).toBeInTheDocument();

  const homelabImg = screen.getByRole('img', {
    name: 'Automated Linux & Containerized Home Lab architecture',
  });
  expect(homelabImg).toBeInTheDocument();
  expect(homelabImg).toHaveAttribute('src', '/_astro/homelab.webp');

  const portfolioImg = screen.getByRole('img', {
    name: 'fernandovazquez.dev portfolio screenshot',
  });
  expect(portfolioImg).toBeInTheDocument();
  expect(portfolioImg).toHaveAttribute('src', '/_astro/screenshot.webp');

  const links = screen.getAllByRole('link', { name: /GitHub/ });
  expect(links).toHaveLength(2);
  links.forEach((link) => {
    expect(link).toHaveAttribute('href', expect.stringContaining('github.com'));
  });
});
