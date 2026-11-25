import { useEffect, useState } from 'react';
import './Header.css';

const links = [
  ['About', '/#about'],
  ['Experience', '/#experience'],
  ['Projects', '/#projects'],
  ['Contact', '/#contact'],
];
const RESUME = '/Vazquez_Fernando.pdf';

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    const onDown = (e) => {
      if (!e.target.closest('#menu, #burger')) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onDown);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onDown);
    };
  }, []);

  return (
    <>
      <header className="bar after">
        <div className="wrap in">
          <a href="/#top" aria-label="Fernando Vazquez, home">
            <img className="logo" src="/img/logo.svg" alt="Fernando Vazquez" />
          </a>
          <nav className="top" aria-label="Main">
            {links.map(([label, href]) => (
              <a key={href} href={href}>
                {label}
              </a>
            ))}
            <a className="resume" href={RESUME} target="_blank" rel="noreferrer">
              Resume
            </a>
          </nav>
        </div>
      </header>
      <button
        id="burger"
        aria-label="Menu"
        aria-controls="menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <span />
        <span />
        <span />
      </button>
      <nav id="menu" aria-label="Mobile" data-open={open} inert={!open}>
        {links.map(([label, href]) => (
          <a key={href} href={href} onClick={() => setOpen(false)}>
            {label}
          </a>
        ))}
        <a className="resume" href={RESUME} target="_blank" rel="noreferrer">
          Resume
        </a>
      </nav>
    </>
  );
}
