import PartnerLoginButton from "@/components/PartnerLoginButton";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav">
          <a className="brand" href="/" aria-label="NEST BildungsBar – Startseite">
            <img className="brand-logo" src="/assets/img/Logo/nest-bildungsbar-logo.png" alt="NEST BildungsBar" width="3173" height="1523" />
          </a>
          <ul className="nav-links">
            <li><a href="/">Home</a></li>
            <li><a href="/ueber-uns">Über uns</a></li>
            <li><a href="/berufswelt">Berufswelt</a></li>
            <li><a href="/fuer-schulen">Schulen</a></li>
            <li><a href="/kooperation">Unternehmen</a></li>
            <li><a href="/referenzen">Referenzen</a></li>
            <li><a href="/blog">Blog</a></li>
            <li><a href="/kontakt">Kontakt</a></li>
            <li className="nav-li-termin"><a className="btn btn-primary nav-li-termin-a" href="/terminbuchung">Termin buchen</a></li>
          </ul>
          <div className="nav-cta">
            <PartnerLoginButton />
            <a className="btn btn-primary" href="/terminbuchung">Termin buchen</a>
          </div>
          <button className="nav-toggle" aria-label="Menü öffnen"><span></span><span></span><span></span></button>
        </nav>
      </div>
    </header>
  );
}
