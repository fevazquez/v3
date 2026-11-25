import './About.css';

export default function About({ photo = { src: '/img/self.jpg' } }) {
  return (
    <section className="s about" id="about">
      <div>
        <h2 className="t">About</h2>
        <p>
          Heya! I'm Fernando, a Software Engineer with 4+ years of experience. I have interests
          spanning systems reliability, infrastructure automation, and practical AI tooling. My
          curiosity about computing started back in high school algebra class when I first heard
          about the P vs NP problem.
        </p>
        <p>
          Outside of work, I spend plenty of time tinkering with self-hosted infrastructure,
          automation, and web projects—and away from the keyboard, you'll usually find me training
          Capoeira or calisthenics.
        </p>
      </div>
      <div className="frame">
        <img
          src={photo.src}
          srcSet={photo.srcSet}
          width={photo.width}
          height={photo.height}
          alt="Fernando Vazquez"
          loading="lazy"
          decoding="async"
        />
      </div>
    </section>
  );
}
