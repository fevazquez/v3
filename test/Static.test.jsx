// test/Static.test.jsx
import { render, screen } from '@testing-library/react';
import Splash from '../src/components/splash/Splash.jsx';
import Hero from '../src/components/hero/Hero.jsx';
import About from '../src/components/about/About.jsx';
import Contact from '../src/components/contact/Contact.jsx';
import Footer from '../src/components/footer/Footer.jsx';
import SideRails from '../src/components/sidebars/SideRails.jsx';
import NotFound from '../src/components/notfound/NotFound.jsx';

test('Splash renders the logo overlay', () => {
  const { container } = render(<Splash />);
  expect(container.querySelector('.splash')).toBeInTheDocument();
});

test('Hero shows the name', () => {
  render(<Hero />);
  expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Fernando Vazquez');
});

test('About shows the photo', () => {
  render(<About />);
  expect(screen.getByAltText('Fernando Vazquez')).toBeInTheDocument();
});

test('Contact has a mailto link', () => {
  render(<Contact />);
  expect(screen.getByRole('link', { name: 'Say hello' })).toHaveAttribute(
    'href',
    expect.stringMatching(/^mailto:/),
  );
});

test('Footer renders', () => {
  const { container } = render(<Footer />);
  expect(container.querySelector('footer')).toBeInTheDocument();
});

test('side rail has the social links', () => {
  render(<SideRails />);
  expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
    'href',
    expect.stringContaining('github.com'),
  );
  expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
    'href',
    expect.stringContaining('linkedin.com'),
  );
  expect(screen.getByRole('link', { name: /instagram/i })).toHaveAttribute(
    'href',
    expect.stringContaining('instagram.com'),
  );
});

test('404 page has a way home', () => {
  render(<NotFound />);
  expect(screen.getByRole('heading', { name: '404' })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
});
