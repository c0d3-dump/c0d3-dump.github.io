import SectionHeading from './SectionHeading';
import { CONTACT } from '../data/constants';

export default function Contact() {
  return (
    <section id="contact" className="contact">
      <div className="container">
        <div className="contact__heading">
          <SectionHeading
            terminalLabel={CONTACT.terminalLabel}
            title={CONTACT.heading}
          />
        </div>
        <div className="contact__links">
          {CONTACT.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              className="btn btn--secondary"
            >
              {link.icon} {link.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
