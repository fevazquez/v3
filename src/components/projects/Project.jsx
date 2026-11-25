import GitHubIcon from '../icons/GitHubIcon.jsx';
import './Projects.css';

export default function Project({ title, description, tech, href, flip = false, visual }) {
  return (
    <div className={flip ? 'feat flip' : 'feat'}>
      <div className="vis">{visual ?? title}</div>
      <div className="info">
        <h3>{title}</h3>
        <p className="desc">{description}</p>
        <ul>
          {tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        {href && (
          <div className="links">
            <a href={href} aria-label={`${title} on GitHub`}>
              <GitHubIcon />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
