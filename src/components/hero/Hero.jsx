import './Hero.css';

export default function Hero() {
  return (
    <div className="hero">
      <div className="text">
        <div className="item" style={{ '--n': '1' }}>
          <p className="greet" style={{ marginBottom: '.9rem', maxWidth: 'none' }}>
            Hello, I am
          </p>
        </div>
        <div className="item" style={{ '--n': '2' }}>
          <h1>Fernando Vazquez.</h1>
        </div>
        <div className="item" style={{ '--n': '3' }}>
          <h2>Software Engineer</h2>
        </div>
        <div className="item" style={{ '--n': '4' }}>
          <p>I engineer reliable, automated infrastructure and backend systems built to scale.</p>
          <a className="btn" href="#contact">
            Get in touch
          </a>
        </div>
      </div>
      <div className="pic">
        <img src="/img/hero.webp" alt="Illustration of Fernando" />
      </div>
    </div>
  );
}
