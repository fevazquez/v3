import { useRef, useState } from 'react';
import './Experience.css';

const jobs = [
  {
    tab: 'AWS',
    company: 'Amazon Web Services',
    role: 'Software Development Engineer II',
    when: 'September 2022 to November 2026',
    summary:
      'I worked on the systems that provision and orchestrate AWS’s bare metal server fleet, with a focus on security, reliability, and automation across all AWS regions.',
    highlights: [
      'Ruby on Rails',
      'AWS CDK',
      'Aurora',
      'CloudWatch',
      'CloudFormation',
      'DynamoDB',
      'IAM',
      'Lambda',
      'SWF',
      'Distributed systems',
    ],
    url: 'https://aws.amazon.com/',
  },
  {
    tab: 'Nisum',
    company: 'Nisum',
    role: 'DevOps Engineer',
    when: 'September 2021 to September 2022',
    where: 'Fremont, CA',
    summary:
      'I built internal web applications with React and Spring Boot and deployed them to an Azure Kubernetes Service cluster. I also created Jenkins and Docker pipelines that automated building, testing, and releasing containerized apps.',
    highlights: ['React', 'Spring Boot', 'Kubernetes', 'Jenkins', 'Docker'],
    url: 'https://www.nisum.com/',
  },
  {
    tab: 'SOPAC',
    company: 'Scripps Orbit and Permanent Array Center',
    role: 'Research Assistant',
    when: 'June 2019 to September 2021',
    where: 'La Jolla, CA',
    summary:
      'Built and maintained web applications to improve and expand working with large GPS and seismic data sets including real-time collection, quality control, analysis, display, and documentation.',
    highlights: ['Perl', 'Flask', 'MySQL', 'Linux'],
    url: 'https://sopac-csrc.ucsd.edu/',
  },
];

function Details({ job }) {
  return (
    <div className="details">
      <h3>
        {job.role}{' '}
        <span className="sep" aria-hidden="true">
          |
        </span>{' '}
        <a className="inline" href={job.url} target="_blank" rel="noreferrer">
          {job.company}
        </a>
      </h3>
      <p className="when">{job.when}</p>
      {job.summary && <p>{job.summary}</p>}
      {job.highlights && (
        <ul className="highlights">
          {job.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Chevron() {
  return (
    <svg className="chev" viewBox="0 0 24 24" aria-hidden="true">
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

export default function Experience() {
  const [active, setActive] = useState(0); // desktop tabs
  const [open, setOpen] = useState(new Set()); // all closed at first
  const toggle = (i) =>
    setOpen((prev) => {
      const next = new Set(prev);
      next.has(i) ? next.delete(i) : next.add(i);
      return next;
    });
  const refs = useRef([]);

  const go = (i) => {
    setActive(i);
    refs.current[i]?.focus();
  };
  const onKeyDown = (e, i) => {
    const n = jobs.length;
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      go((i + 1) % n);
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      go((i + n - 1) % n);
    }
  };

  return (
    <section className="s wide" id="experience">
      <h2 className="t">Experience</h2>

      <div className="jobs">
        <div className="tabs" role="tablist" aria-label="Experience" aria-orientation="vertical">
          {jobs.map((job, i) => (
            <button
              key={job.tab}
              ref={(el) => (refs.current[i] = el)}
              role="tab"
              id={`t${i}`}
              aria-controls={`p${i}`}
              aria-selected={i === active}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              onKeyDown={(e) => onKeyDown(e, i)}
            >
              {job.tab}
            </button>
          ))}
          <div id="ind" aria-hidden="true" style={{ '--i': active }} />
        </div>
        <div>
          {jobs.map((job, i) => (
            <div
              className="panel"
              role="tabpanel"
              id={`p${i}`}
              aria-labelledby={`t${i}`}
              hidden={i !== active}
              key={job.tab}
            >
              <Details job={job} />
            </div>
          ))}
        </div>
      </div>

      <div className="accordion">
        {jobs.map((job, i) => {
          const isOpen = open.has(i);
          return (
            <div className="acc-item" key={job.tab}>
              <button
                id={`ah${i}`}
                className="acc-head"
                aria-expanded={isOpen}
                aria-controls={`ap${i}`}
                onClick={() => toggle(i)}
              >
                <span>{job.tab}</span>
                <Chevron />
              </button>
              <div
                id={`ap${i}`}
                className="acc-panel"
                role="region"
                aria-labelledby={`ah${i}`}
                data-open={isOpen}
                inert={!isOpen}
              >
                <div className="acc-inner">
                  <Details job={job} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
