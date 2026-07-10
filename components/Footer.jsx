export default function Footer() {
  return (
    <footer className="nest-footer">
      <div className="nest-footer__inner">
        <div>
          <a className="nest-footer__logo" href="/" aria-label="NEST BildungsBar – Startseite">
            <img className="nest-footer__logo-img" src="/assets/img/Logo/nest-logo.png" alt="NEST" width="598" height="194" />
          </a>
          <p className="nest-footer__desc">
            Kostenfreie Berufsorientierung in lockerer Atmosphäre – über 150 Ausbildungsberufe,
            persönliche Beratung in Wuppertal, Essen, Solingen &amp; Remscheid. Teil des NEST Ökosystems.
          </p>
          <div className="nest-footer__social">
            <a href="https://www.linkedin.com/company/89189682/" target="_blank" rel="noopener" title="LinkedIn" aria-label="LinkedIn">
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="https://www.instagram.com/nest_bildungsbar.wuppertal" target="_blank" rel="noopener" title="Instagram" aria-label="Instagram">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none"/></svg>
            </a>
            <a href="mailto:info@nest-bildungsbar.de" title="E-Mail" aria-label="E-Mail">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
            </a>
          </div>
        </div>
        <div>
          <h4>Angebot</h4>
          <ul className="nest-footer__links">
            <li><a href="/berufswelt">Berufswelt</a></li>
            <li><a href="/fuer-schulen">Für Schulen</a></li>
            <li><a href="/kooperation">Für Unternehmen</a></li>
            <li><a href="/referenzen">Referenzen</a></li>
            <li><a href="/terminbuchung">Termin buchen</a></li>
          </ul>
        </div>
        <div>
          <h4>NEST Ökosystem</h4>
          <ul className="nest-footer__links">
            <li><a href="https://nest-messe.de" target="_blank" rel="noopener">NEST Explore</a></li>
            <li><a href="https://nest-azubiconnect.de" target="_blank" rel="noopener">NEST AzubiConnect</a></li>
            <li><a href="/ueber-uns">Über uns</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/partner-portal">Partner-Login</a></li>
          </ul>
        </div>
        <div>
          <h4>Kontakt</h4>
          <div className="nest-footer__contact-line"><p>NEST GmbH<br />Hochstraße 65<br />42105 Wuppertal</p></div>
          <div className="nest-footer__contact-line"><a href="tel:017641933496">0176 419 334 96</a></div>
          <div className="nest-footer__contact-line"><a href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a></div>
        </div>
      </div>
      <div className="nest-footer__bottom">
        <p>© {new Date().getFullYear()} NEST GmbH · Alle Rechte vorbehalten.</p>
        <span className="nest-footer__badge">Made in Wuppertal</span>
        <div className="nest-footer__bottom-links">
          <a href="/datenschutz">Datenschutz</a>
          <a href="/impressum">Impressum</a>
          <a href="#cookie-einstellungen">Cookie-Einstellungen</a>
        </div>
      </div>
    </footer>
  );
}
