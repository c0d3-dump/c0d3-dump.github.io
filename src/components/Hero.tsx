import { SITE, HERO } from '../data/constants';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="container">
        <div className="hero__terminal">
          {HERO.terminalLabel}
          <span className="hero__cursor" aria-hidden="true">
            ▌
          </span>
        </div>
        <h1 className="hero__name">{SITE.name}</h1>
        <p className="hero__tagline">
          {HERO.taglineTokens.map((token, i) => (
            <span key={token}>
              {i > 0 && <span className="hero__tagline-sep"> · </span>}
              {token}
            </span>
          ))}
        </p>
        <div className="hero__meta">
          <span role="img" aria-label="alien">
            👾
          </span>{' '}
          <span className="hero__meta-handle">{HERO.metaGitHubLabel}</span>
          <span className="hero__meta-sep">·</span>
          <span role="img" aria-label="location">
            📍
          </span>{' '}
          {SITE.location}
        </div>
        <div className="hero__actions">
          <a
            href={HERO.primaryCta.url}
            className="btn btn--primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {HERO.primaryCta.label}
          </a>
          <a href={HERO.secondaryCta.url} className="btn btn--secondary">
            {HERO.secondaryCta.label}
          </a>
        </div>
      </div>
    </section>
  );
}
