import SectionHeading from './SectionHeading';
import { PROJECTS } from '../data/constants';

const PROJECTS_HEADING = {
  terminalLabel: '$ projects',
  heading: 'Featured Projects',
};

export default function Projects() {
  return (
    <section id="projects">
      <div className="container">
        <SectionHeading
          terminalLabel={PROJECTS_HEADING.terminalLabel}
          title={PROJECTS_HEADING.heading}
        />
        <div className="projects__grid">
          {PROJECTS.map((p) => (
            <div key={p.name} className="project-card">
              <div className="project-card__header">
                <h3 className="project-card__name">{p.name}</h3>
                {p.stars !== null && (
                  <span className="project-card__stars">
                    ★ {p.stars}
                  </span>
                )}
              </div>
              <p className="project-card__desc">{p.description}</p>
              <div className="project-card__tags">
                <span className="project-card__tag">{p.language}</span>
              </div>
              <a
                href={p.url}
                className="project-card__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on GitHub →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
