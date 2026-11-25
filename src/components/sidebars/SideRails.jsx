import GitHubIcon from '../icons/GitHubIcon.jsx';
import InstagramIcon from '../icons/InstagramIcon.jsx';
import LinkedInIcon from '../icons/LinkedInIcon.jsx';
import './SideRails.css';

export default function SideRails() {
  return (
    <>
      <div className="rail l">
        <a href="https://github.com/fevazquez" aria-label="GitHub">
          <GitHubIcon />
        </a>
        <a href="https://www.linkedin.com/in/fernando-4-vazquez/" aria-label="LinkedIn">
          <LinkedInIcon />
        </a>
        <a href="https://www.instagram.com/itsfernanflow/" aria-label="Instagram">
          <InstagramIcon />
        </a>
      </div>
      <div className="rail r">
        <a href="mailto:f4vazquez@gmail.com">f4vazquez@gmail.com</a>
      </div>
    </>
  );
}
