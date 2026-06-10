export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <a className="brand" href="/"><span className="logo-mark">N</span><span>NEST <small>BildungsBar</small></span></a>
            <p>Kostenlose Berufsorientierung in lockerer Atmosphäre. Teil des NEST Ökosystems.</p>
            <div className="socials">
              <a href="https://www.instagram.com/nest_bildungsbar.wuppertal" aria-label="Instagram">IG</a>
              <a href="https://www.facebook.com/BildungsBar" aria-label="Facebook">f</a>
              <a href="https://www.linkedin.com/company/89189682/" aria-label="LinkedIn">in</a>
            </div>
          </div>
          <div>
            <h4>Angebot</h4>
            <ul>
              <li><a href="/berufswelt">Berufswelt</a></li>
              <li><a href="/fuer-schulen">Für Schulen</a></li>
              <li><a href="/kooperation">Für Unternehmen</a></li>
              <li><a href="/referenzen">Referenzen</a></li>
            </ul>
          </div>
          <div>
            <h4>NEST</h4>
            <ul>
              <li><a href="/ueber-uns">Über uns</a></li>
              <li><a href="/terminbuchung">Termin buchen</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/kontakt">Kontakt</a></li>
              <li><a href="/partner-portal">Partner-Login</a></li>
            </ul>
          </div>
          <div>
            <h4>Kontakt</h4>
            <ul>
              <li><a href="mailto:info@nest-bildungsbar.de">info@nest-bildungsbar.de</a></li>
              <li><a href="tel:017641933496">0176 419 334 96</a></li>
              <li>Hochstraße 65, 42105 Wuppertal</li>
              <li>Kopstadtplatz 12, 45127 Essen</li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} NEST GmbH · NEST BildungsBar</span>
          <span><a href="#">Datenschutz</a> · <a href="#">Impressum</a></span>
        </div>
      </div>
    </footer>
  );
}
