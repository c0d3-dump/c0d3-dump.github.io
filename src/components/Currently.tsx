import SectionHeading from './SectionHeading';
import { CURRENTLY } from '../data/constants';

export default function Currently() {
  return (
    <section id="currently" className="currently">
      <div className="container">
        <div className="currently__grid">
          <div>
            <SectionHeading
              terminalLabel={CURRENTLY.building.terminalLabel}
              title={CURRENTLY.building.heading}
            />
            <ul className="currently__items">
              {CURRENTLY.building.items.map((item) => (
                <li key={item.title} className="currently__item">
                  <span className="currently__bullet" aria-hidden="true">
                    ▸
                  </span>
                  <div className="currently__item-content">
                    <span className="currently__item-title">
                      {item.title}
                    </span>
                    {item.detail && (
                      <span className="currently__item-detail">
                        {item.detail}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading
              terminalLabel={CURRENTLY.learning.terminalLabel}
              title={CURRENTLY.learning.heading}
            />
            <ul className="currently__items">
              {CURRENTLY.learning.items.map((item) => (
                <li key={item.title} className="currently__item">
                  <span className="currently__bullet" aria-hidden="true">
                    ▸
                  </span>
                  <div className="currently__item-content">
                    <span className="currently__item-title">
                      {item.title}
                    </span>
                    {item.detail && (
                      <span className="currently__item-detail">
                        {item.detail}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
