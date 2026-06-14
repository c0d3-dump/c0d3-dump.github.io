import SectionHeading from './SectionHeading';
import { STATS } from '../data/constants';

const STATS_HEADING = {
  terminalLabel: '$ stats',
  heading: 'GitHub Stats',
};

export default function Stats() {
  return (
    <section id="stats">
      <div className="container">
        <SectionHeading
          terminalLabel={STATS_HEADING.terminalLabel}
          title={STATS_HEADING.heading}
        />
        <div className="stats__grid">
          {STATS.map((s) => (
            <div key={s.label} className="stat-card">
              <div className="stat-card__value">{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
