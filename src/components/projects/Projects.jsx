import Project from './Project.jsx';

const PROJECTS = [
  {
    title: 'Automated Linux & Containerized Home Lab',
    description:
      'A multi-node home lab that separates compute from storage and runs 30+ containerized services, with CI/CD checks, secure external ingress, and full-stack monitoring.',
    tech: [
      'Docker Compose',
      'TrueNAS',
      'ZFS',
      'NFSv4',
      'OPNsense',
      'Nginx',
      'Prometheus',
      'Grafana',
    ],
    href: 'https://github.com/fevazquez/homelab',
  },
  {
    flip: true,
    title: 'fernandovazquez.dev (v3)',
    description:
      'Personal portfolio website with Qlty, Dependabot, and CI/CD checks for full deployment automation.',
    tech: ['Astro', 'React', 'Dependabot', 'CircleCI', 'CloudFlare'],
    href: 'https://github.com/fevazquez/v3',
  },
];

export default function Projects({ pictures = [] }) {
  return (
    <section className="s wide" id="projects">
      <h2 className="t">Projects</h2>
      {PROJECTS.map((project, index) => {
        const pic = pictures[index];
        return (
          <Project
            key={project.title}
            {...project}
            visual={
              pic && (
                <img
                  src={pic.src}
                  srcSet={pic.srcSet}
                  width={pic.width}
                  height={pic.height}
                  alt={pic.alt}
                  loading="lazy"
                  decoding="async"
                />
              )
            }
          />
        );
      })}
    </section>
  );
}
