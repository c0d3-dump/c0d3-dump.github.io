import { FOOTER } from '../data/constants';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer__text">{FOOTER.text}</p>
      </div>
    </footer>
  );
}
