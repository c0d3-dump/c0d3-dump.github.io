import SectionHeading from './SectionHeading';
import { ABOUT } from '../data/constants';

export default function About() {
  return (
    <section id="about">
      <div className="container">
        <SectionHeading
          terminalLabel={ABOUT.terminalLabel}
          title={ABOUT.heading}
        />
        <p className="about__bio">{ABOUT.bio}</p>
        <div className="about__contact-links">
          {ABOUT.contactLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="about__contact-link"
            >
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
