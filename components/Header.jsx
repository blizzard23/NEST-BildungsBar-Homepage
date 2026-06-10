import PartnerLoginButton from "@/components/PartnerLoginButton";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container">
        <nav className="nav">
          <a className="brand" href="/">
            <span className="logo-mark">N</span>
            <span>NEST <small>BildungsBar</small></span>
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
