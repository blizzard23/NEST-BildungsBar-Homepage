"use client";
import { useEffect } from "react";

/**
 * NEST Ecosystem Bar – Topbar über dem Haupt-Header.
 * Blendet sich beim Scrollen aus; der Header rückt dann nach oben.
 */
export default function EcosystemBar() {
  useEffect(() => {
    const bar = document.getElementById("nest-ecosystem-bar");
    const header = document.querySelector(".site-header");
    if (!bar) return;

    const THRESHOLD = 60;
    let barHidden = false;
    let ticking = false;

    function update() {
      const y = window.scrollY || window.pageYOffset;
      if (y > THRESHOLD && !barHidden) {
        bar.classList.add("nest-bar-hidden");
        if (header) header.classList.add("nest-header-raised");
        barHidden = true;
      } else if (y <= THRESHOLD && barHidden) {
        bar.classList.remove("nest-bar-hidden");
        if (header) header.classList.remove("nest-header-raised");
        barHidden = false;
      }
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="nest-ecosystem-bar" role="banner" aria-label="NEST Ökosystem Navigation">
      <div id="nest-ecosystem-bar-inner">
        <div id="nest-ecosystem-bar-left">
          <span className="nest-bar-label">Teil des NEST Ökosystems</span>
          <div className="nest-bar-divider"></div>
        </div>
        <div id="nest-ecosystem-bar-products">
          <a href="https://nest-explore.de" className="nest-eco-product">NEST Explore</a>
          <div className="nest-eco-dot"></div>
          <span className="nest-eco-product nest-eco-current">NEST BildungsBar</span>
          <div className="nest-eco-dot"></div>
          <a href="https://nest-azubiconnect.de" className="nest-eco-product">NEST AzubiConnect</a>
        </div>
        <a href="https://nest-ausbilden.de" id="nest-ecosystem-bar-cta">
          <span className="nest-bar-cta-icon">↗</span>
          Alle NEST-Angebote
        </a>
      </div>
    </div>
  );
}
