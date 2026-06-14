import SectionHeading from './SectionHeading';
import { SKILLS } from '../data/constants';

const SKILLS_HEADING = {
  terminalLabel: '$ skills',
  heading: 'Skills & Tools',
};

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <SectionHeading
          terminalLabel={SKILLS_HEADING.terminalLabel}
          title={SKILLS_HEADING.heading}
        />
        <div className="skills__grid">
          {SKILLS.map((cat) => (
            <div key={cat.category} className="skills__card">
              <div className="skills__card-category">{cat.category}</div>
              <div className="skills__tags">
                {cat.skills.map((skill) => (
                  <span key={skill} className="skills__tag">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
