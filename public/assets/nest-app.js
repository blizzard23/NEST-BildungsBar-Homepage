/* NEST BildungsBar – gebündelte App-Logik (Reihenfolge wichtig) */

/* ===== script.js ===== */
/* NEST BildungsBar – Interaktionen (Stil nest-messe.de) */
document.addEventListener('DOMContentLoaded', function () {

  /* Mobile Navigation */
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', function () { links.classList.toggle('open'); });
    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { links.classList.remove('open'); });
    });
  }

  /* FAQ Akkordeon – togglet .active auf .faq-item */
  document.querySelectorAll('.faq-question').forEach(function (q) {
    q.addEventListener('click', function () {
      q.closest('.faq-item').classList.toggle('active');
    });
  });

  /* Kontaktformular (Demo – kein Backend) */
  var form = document.querySelector('#contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var v = function (id) { var el = form.querySelector('#' + id); return el ? el.value.trim() : ''; };
      var empf = window.NEST_TERMIN_MAIL || 'info@nest-bildungsbar.de';
      var subject = 'Kontakt über die Website' + (v('subject') ? ' – ' + v('subject') : '');
      var text = [
        'Neue Kontaktanfrage über die Website:', '',
        'Name: ' + v('name'),
        'E-Mail: ' + v('email'),
        'Telefon: ' + (v('phone') || '—'),
        'Wunschstandort: ' + (v('standort') || '—'),
        'Betreff: ' + (v('subject') || '—'), '',
        'Nachricht:', (v('message') || '—')
      ].join('\n');
      var mailto = 'mailto:' + empf + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
      var note = form.querySelector('.form-note');
      var api = window.NEST_MAIL_API;
      function fertig(ok) {
        if (note) { note.hidden = false; if (!ok) note.innerHTML = 'Dein Mail-Programm öffnet sich – bitte sende die Nachricht ab. ✅'; }
        if (ok) form.reset();
      }
      if (api && window.fetch) {
        fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subject: subject, text: text, replyTo: v('email') }) })
          .then(function (r) { if (r.ok) { fertig(true); } else { window.location.href = mailto; fertig(false); } })
          .catch(function () { window.location.href = mailto; fertig(false); });
      } else { window.location.href = mailto; fertig(false); }
    });
  }

  /* Scroll-Reveal */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -20px 0px' });
    reveals.forEach(function (el) { io.observe(el); });
    /* sofort sichtbar, was schon im Viewport ist */
    requestAnimationFrame(function () {
      reveals.forEach(function (el) {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
      });
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  /* Dunkle "wf"-Sektion (Bausteine) – eigene .in-Animation */
  var wfEls = document.querySelectorAll('.wf-card, .wf-feature, .wf-stat, .wf-result');
  if (wfEls.length) {
    if ('IntersectionObserver' in window) {
      var wfIo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) { e.target.classList.add('in'); wfIo.unobserve(e.target); }
        });
      }, { threshold: 0.07, rootMargin: '0px 0px -20px 0px' });
      wfEls.forEach(function (el) { wfIo.observe(el); });
      requestAnimationFrame(function () {
        wfEls.forEach(function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('in');
        });
      });
    } else {
      wfEls.forEach(function (el) { el.classList.add('in'); });
    }
  }
});

/* FAQ-Tabs (für Unternehmen / Schulen / Technisch) */
function switchFAQ(tab, e) {
  document.querySelectorAll('[data-faq-group]').forEach(function (el) { el.style.display = 'none'; });
  document.querySelectorAll('.faq-tab').forEach(function (t) { t.classList.remove('active'); });
  var target = document.querySelector('[data-faq-group="' + tab + '"]');
  if (target) target.style.display = 'block';
  if (e && e.currentTarget) e.currentTarget.classList.add('active');
}

/* ===== standorte-data.js ===== */
/* =========================================================
   NEST BildungsBar – Standort-Zuordnung (maßgeblich)
   Basierend auf den category-essen / category-wuppertal Tags
   der Original-Seite nest-bildungsbar.de/deine-zukunft/.

   NUR_ESSEN   = Berufe nur in Essen
   AUCH_ESSEN  = Berufe in Wuppertal UND Essen (beide Standorte)
   Alle übrigen Berufe = nur Wuppertal.

   Schlüssel = berufSlug(name) aus berufe-data.js.
   standorteFuer(slug) liefert das Standort-Array für die Filterung.
   ========================================================= */

window.NUR_ESSEN = [
  "anlagenmechaniker-fuer-loeschsystemtechnik",
  "studium-arboristik",
  "bachelor-architektur",
  "bachelor-of-laws-stadtinspektoranwaerter",
  "bachelor-raumplanung",
  "bachelor-vermessung-und-geoinformatik",
  "hauswirtschafter",
  "immobilienkaufleute",
  "informationselektroniker",
  "kombiausbildung-tischler-brandmeister",
  "notfallsanitaeter",
  "servicefachkraft-im-dialogmarketing",
  "stadtsekretaeranwaerter",
  "studium-bauingenieurwesen",
  "studium-landschaftsarchitektur",
  "studium-landschaftsbau-und-gruenflaechenmanagement",
  "studium-raumplanung",
  "studium-soziale-arbeit",
  "studium-technische-gebaeudeausruestung",
  "studium-verwaltungsbetriebswirtschaftslehre",
  "tischler"
];

window.AUCH_ESSEN = [
  "anlagenmechaniker-fuer-sanitaer-heizungs-und-klimatechnik",
  "bauzeichner",
  "brandmeisteranwaerter",
  "duales-studium-angewandte-informatik",
  "duales-studium-business-administration",
  "duales-studium-elektrotechnik",
  "duales-studium-maschinenbau",
  "elektroniker-betriebstechnik",
  "elektroniker-energie-und-gebaeudetechnik",
  "erzieher",
  "fachangestellte-medien-und-informationsdienste-archiv",
  "fachangestellte-medien-und-informationsdienste-bibliothek",
  "fachinformatiker-anwendungsentwicklung",
  "fachinformatiker-systemintegration",
  "fachkraft-fuer-veranstaltungstechnik",
  "forstwirt",
  "freiwilligendienst",
  "gaertner-fachrichtung-garten-und-landschaftsbau",
  "geomatiker",
  "heilerziehungspfleger",
  "industrieelektriker",
  "industriemechaniker",
  "kaufleute-bueromanagement",
  "kaufleute-dialogmarketing",
  "kaufleute-fuer-digitalisierungsmanagement",
  "kaufleute-im-gesundheitswesen",
  "kinderpfleger",
  "mechatroniker",
  "mediengestalter-digital-und-print",
  "medientechnolog-druck",
  "pflegefachassistent",
  "pflegefachkraft",
  "technische-systemplaner-versorgungs-ausruestungstechnik",
  "tierpfleger",
  "umwelttechnolog-rohrleitungsnetze-und-industrieanlagen",
  "umwelttechnolog-abwasserbewirtschaftung",
  "veranstaltungskaufleute",
  "vermessungstechniker",
  "verwaltungsfachangestellte",
  "industriekaufleute",
  "strassenwaerter",
  "fachangestellte-fuer-baederbetriebe"
];

function standorteFuer(slug) {
  if (window.NUR_ESSEN && window.NUR_ESSEN.indexOf(slug) > -1) return ["Essen"];
  if (window.AUCH_ESSEN && window.AUCH_ESSEN.indexOf(slug) > -1) return ["Wuppertal", "Essen"];
  return ["Wuppertal"];
}

/* ===== berufe-bilder.js ===== */
/* =========================================================
   NEST BildungsBar – Berufs-Bilder (LOKAL eingebettet)
   Bilddateien liegen in assets/img/berufe/ (selbst-hostend).
   Schlüssel = berufSlug(name). Genutzt von berufe-ui.js.
   ========================================================= */
window.BERUF_BILDER = {
  "anaesthesietechnische-assistent": "assets/img/berufe/anaesthesietechnische-assistent.png",
  "augenoptiker": "assets/img/berufe/augenoptiker.png",
  "hoergeraeteakustiker": "assets/img/berufe/hoergeraeteakustiker.png",
  "kaufleute-im-gesundheitswesen": "assets/img/berufe/kaufleute-im-gesundheitswesen.png",
  "medizinische-fachangestellte": "assets/img/berufe/medizinische-fachangestellte.png",
  "medizinische-fachangestellte-zahnmedizin": "assets/img/berufe/medizinische-fachangestellte-zahnmedizin.png",
  "medizinische-technolog-fuer-laboratoriumsanalytik": "assets/img/berufe/medizinische-technolog-fuer-laboratoriumsanalytik.png",
  "medizinische-technolog-fuer-radiologie": "assets/img/berufe/medizinische-technolog-fuer-radiologie.png",
  "notfallsanitaeter": "assets/img/berufe/notfallsanitaeter.png",
  "operationstechnische-assistent": "assets/img/berufe/operationstechnische-assistent.png",
  "pflegefachassistent": "assets/img/berufe/pflegefachassistent.png",
  "pflegefachkraft": "assets/img/berufe/pflegefachkraft.png",
  "physiotherapeut": "assets/img/berufe/physiotherapeut.png",
  "studium-hebammenwissenschaften": "assets/img/berufe/studium-hebammenwissenschaften.png",
  "studium-pflegewissenschaften": "assets/img/berufe/studium-pflegewissenschaften.png",
  "anlagenmechaniker-fuer-sanitaer-heizungs-und-klimatechnik": "assets/img/berufe/anlagenmechaniker-fuer-sanitaer-heizungs-und-klimatechnik.png",
  "anlagenmechaniker-rohrsystemtechnik": "assets/img/berufe/anlagenmechaniker-rohrsystemtechnik.webp",
  "baecker": "assets/img/berufe/baecker.png",
  "baeckereifachverkaeufer": "assets/img/berufe/baeckereifachverkaeufer.png",
  "bauzeichner": "assets/img/berufe/bauzeichner.png",
  "dachdecker": "assets/img/berufe/dachdecker.png",
  "elektroniker-automatisierungstechnik": "assets/img/berufe/elektroniker-automatisierungstechnik.png",
  "elektroniker-betriebstechnik": "assets/img/berufe/elektroniker-betriebstechnik.png",
  "elektroniker-energie-und-gebaeudetechnik": "assets/img/berufe/elektroniker-energie-und-gebaeudetechnik.png",
  "elektroniker-fuer-geraete-und-systeme": "assets/img/berufe/elektroniker-fuer-geraete-und-systeme.webp",
  "flachglastechnolog": "assets/img/berufe/flachglastechnolog.webp",
  "fleischer": "assets/img/berufe/fleischer.png",
  "fliesenleger": "assets/img/berufe/fliesenleger.png",
  "gaertner-fachrichtung-garten-und-landschaftsbau": "assets/img/berufe/gaertner-fachrichtung-garten-und-landschaftsbau.webp",
  "glaser": "assets/img/berufe/glaser.webp",
  "industriemechaniker": "assets/img/berufe/industriemechaniker.png",
  "kfz-mechatroniker": "assets/img/berufe/kfz-mechatroniker.png",
  "mechatroniker": "assets/img/berufe/mechatroniker.png",
  "mechatroniker-im-kundendienst": "assets/img/berufe/mechatroniker-im-kundendienst.webp",
  "mechatroniker-kaeltetechnik": "assets/img/berufe/mechatroniker-kaeltetechnik.png",
  "orthopaedieschuhmacher": "assets/img/berufe/orthopaedieschuhmacher.webp",
  "orthopaedietechnik-mechaniker": "assets/img/berufe/orthopaedietechnik-mechaniker.webp",
  "tischler": "assets/img/berufe/tischler.png",
  "werkzeugmechaniker": "assets/img/berufe/werkzeugmechaniker.png",
  "zerspanungsmechaniker": "assets/img/berufe/zerspanungsmechaniker.png",
  "anlagenmechaniker-fuer-loeschsystemtechnik": "assets/img/berufe/anlagenmechaniker-fuer-loeschsystemtechnik.png",
  "kombiausbildung-tischler-brandmeister": "assets/img/berufe/kombiausbildung-tischler-brandmeister.png",
  "erzieher": "assets/img/berufe/erzieher.png",
  "freiwilligendienst": "assets/img/berufe/freiwilligendienst.png",
  "heilerziehungspfleger": "assets/img/berufe/heilerziehungspfleger.png",
  "kinderpfleger": "assets/img/berufe/kinderpfleger.png",
  "sozialassistent": "assets/img/berufe/sozialassistent.png",
  "hauswirtschafter": "assets/img/berufe/hauswirtschafter.png",
  "tierpfleger": "assets/img/berufe/tierpfleger.webp",
  "studium-soziale-arbeit": "assets/img/berufe/studium-soziale-arbeit.png",
  "bachelor-of-arts-verwaltungsinformatik": "assets/img/berufe/bachelor-of-arts-verwaltungsinformatik.png",
  "bachelor-of-engineering-geoinformatik": "assets/img/berufe/bachelor-of-engineering-geoinformatik.webp",
  "bachelor-of-engineering-vermessung": "assets/img/berufe/bachelor-of-engineering-vermessung.png",
  "duales-studium-angewandte-informatik": "assets/img/berufe/duales-studium-angewandte-informatik.png",
  "duales-studium-elektrotechnik": "assets/img/berufe/duales-studium-elektrotechnik.png",
  "duales-studium-fachinformatik-anwendungsentwicklung-b-sc-wirtschaftsinformatik": "assets/img/berufe/duales-studium-fachinformatik-anwendungsentwicklung-b-sc-wirtschaftsinformatik.png",
  "duales-studium-gebaeudetechnik": "assets/img/berufe/duales-studium-gebaeudetechnik.png",
  "duales-studium-informatik": "assets/img/berufe/duales-studium-informatik.png",
  "duales-studium-it-security": "assets/img/berufe/duales-studium-it-security.png",
  "duales-studium-maschinenbau": "assets/img/berufe/duales-studium-maschinenbau.png",
  "duales-studium-maschinenbau-und-digitale-technologien-industriemechaniker": "assets/img/berufe/duales-studium-maschinenbau-und-digitale-technologien-industriemechaniker.png",
  "duales-studium-maschinenbau-und-digitale-technologien-werkzeugmechaniker": "assets/img/berufe/duales-studium-maschinenbau-und-digitale-technologien-werkzeugmechaniker.png",
  "duales-studium-wirtschafts-und-industrieinformatik": "assets/img/berufe/duales-studium-wirtschafts-und-industrieinformatik.png",
  "duales-studium-wirtschaftsinformatik": "assets/img/berufe/duales-studium-wirtschaftsinformatik.png",
  "energieelektroniker": "assets/img/berufe/energieelektroniker.webp",
  "fachinformatiker-anwendungsentwicklung": "assets/img/berufe/fachinformatiker-anwendungsentwicklung.png",
  "fachinformatiker-daten-und-prozessanalyse": "assets/img/berufe/fachinformatiker-daten-und-prozessanalyse.png",
  "fachinformatiker-systemintegration": "assets/img/berufe/fachinformatiker-systemintegration.png",
  "geomatiker": "assets/img/berufe/geomatiker.png",
  "industrieelektriker": "assets/img/berufe/industrieelektriker.png",
  "it-systemelektroniker": "assets/img/berufe/it-systemelektroniker.webp",
  "kis-studium-angewandte-informatik": "assets/img/berufe/kis-studium-angewandte-informatik.png",
  "kis-studium-mechatronische-systeme": "assets/img/berufe/kis-studium-mechatronische-systeme.png",
  "kooperative-ingenieurausbildung": "assets/img/berufe/kooperative-ingenieurausbildung.png",
  "kunststoff-und-kautschuktechnolog": "assets/img/berufe/kunststoff-und-kautschuktechnolog.webp",
  "maschinen-und-anlagenfuehrer": "assets/img/berufe/maschinen-und-anlagenfuehrer.png",
  "mediengestalter-digital-und-print": "assets/img/berufe/mediengestalter-digital-und-print.png",
  "medientechnolog-druck": "assets/img/berufe/medientechnolog-druck.png",
  "oberflaechenbeschichter": "assets/img/berufe/oberflaechenbeschichter.png",
  "papiertechnolog": "assets/img/berufe/papiertechnolog.png",
  "produktionstechnolog": "assets/img/berufe/produktionstechnolog.png",
  "technische-produktdesigner": "assets/img/berufe/technische-produktdesigner.png",
  "technische-systemplaner-versorgungs-ausruestungstechnik": "assets/img/berufe/technische-systemplaner-versorgungs-ausruestungstechnik.webp",
  "verfahrensmechaniker": "assets/img/berufe/verfahrensmechaniker.webp",
  "verfahrensmechaniker-beschichtungstechnik": "assets/img/berufe/verfahrensmechaniker-beschichtungstechnik.webp",
  "verfahrenstechnolog": "assets/img/berufe/verfahrenstechnolog.png",
  "vermessungstechniker": "assets/img/berufe/vermessungstechniker.png",
  "bachelor-architektur": "assets/img/berufe/bachelor-architektur.png",
  "bachelor-raumplanung": "assets/img/berufe/bachelor-raumplanung.png",
  "bachelor-vermessung-und-geoinformatik": "assets/img/berufe/bachelor-vermessung-und-geoinformatik.png",
  "brandmeisteranwaerter": "assets/img/berufe/brandmeisteranwaerter.webp",
  "informationselektroniker": "assets/img/berufe/informationselektroniker.png",
  "studium-arboristik": "assets/img/berufe/studium-arboristik.png",
  "studium-bauingenieurwesen": "assets/img/berufe/studium-bauingenieurwesen.png",
  "studium-landschaftsarchitektur": "assets/img/berufe/studium-landschaftsarchitektur.png",
  "studium-landschaftsbau-und-gruenflaechenmanagement": "assets/img/berufe/studium-landschaftsbau-und-gruenflaechenmanagement.png",
  "studium-raumplanung": "assets/img/berufe/studium-raumplanung.png",
  "studium-technische-gebaeudeausruestung": "assets/img/berufe/studium-technische-gebaeudeausruestung.png",
  "umwelttechnolog-rohrleitungsnetze-und-industrieanlagen": "assets/img/berufe/umwelttechnolog-rohrleitungsnetze-und-industrieanlagen.webp",
  "umwelttechnolog-wasserversorgung": "assets/img/berufe/umwelttechnolog-wasserversorgung.webp",
  "umwelttechnolog-abwasserbewirtschaftung": "assets/img/berufe/umwelttechnolog-abwasserbewirtschaftung.png",
  "vermessungsoberinspektoranwaerter": "assets/img/berufe/vermessungsoberinspektoranwaerter.webp",
  "automobilkaufleute": "assets/img/berufe/automobilkaufleute.png",
  "einzelhandelskaufleute": "assets/img/berufe/einzelhandelskaufleute.png",
  "fachverkaeufer-lebensmittelhandwerk": "assets/img/berufe/fachverkaeufer-lebensmittelhandwerk.png",
  "handelsfachwirt": "assets/img/berufe/handelsfachwirt.png",
  "hotelfachleute": "assets/img/berufe/hotelfachleute.webp",
  "kaufleute-fuer-it-systemmanagement": "assets/img/berufe/kaufleute-fuer-it-systemmanagement.webp",
  "kaufleute-im-e-commerce": "assets/img/berufe/kaufleute-im-e-commerce.png",
  "kaufleute-marketingkommunikation": "assets/img/berufe/kaufleute-marketingkommunikation.png",
  "kaufleute-spedition-logistikdienstleistung": "assets/img/berufe/kaufleute-spedition-logistikdienstleistung.png",
  "veranstaltungskaufleute": "assets/img/berufe/veranstaltungskaufleute.webp",
  "servicefachkraft-im-dialogmarketing": "assets/img/berufe/servicefachkraft-im-dialogmarketing.png",
  "bankkaufleute": "assets/img/berufe/bankkaufleute.png",
  "duales-studium-bachelor-of-arts": "assets/img/berufe/duales-studium-bachelor-of-arts.png",
  "duales-studium-bachelor-of-laws": "assets/img/berufe/duales-studium-bachelor-of-laws.png",
  "duales-studium-business-administration": "assets/img/berufe/duales-studium-business-administration.png",
  "duales-studium-business-administration-bankkaufmann": "assets/img/berufe/duales-studium-business-administration-bankkaufmann.webp",
  "duales-studium-bwl": "assets/img/berufe/duales-studium-bwl.png",
  "duales-studium-general-management": "assets/img/berufe/duales-studium-general-management.png",
  "duales-studium-gesundheitswesen": "assets/img/berufe/duales-studium-gesundheitswesen.png",
  "duales-studium-international-management": "assets/img/berufe/duales-studium-international-management.png",
  "duales-studium-kindheitspaedagogik": "assets/img/berufe/duales-studium-kindheitspaedagogik.png",
  "duales-studium-soziale-arbeit": "assets/img/berufe/duales-studium-soziale-arbeit.webp",
  "fachkraft-fuer-lagerlogistik": "assets/img/berufe/fachkraft-fuer-lagerlogistik.png",
  "fachkraft-fuer-restaurant-und-veranstaltungsgastronomie": "assets/img/berufe/fachkraft-fuer-restaurant-und-veranstaltungsgastronomie.png",
  "fachkraft-fuer-veranstaltungstechnik": "assets/img/berufe/fachkraft-fuer-veranstaltungstechnik.webp",
  "fachkraft-im-fahrbetrieb": "assets/img/berufe/fachkraft-im-fahrbetrieb.webp",
  "fachkraft-leistungsgewaehrung": "assets/img/berufe/fachkraft-leistungsgewaehrung.png",
  "fachlagerist": "assets/img/berufe/fachlagerist.png",
  "forstwirt": "assets/img/berufe/forstwirt.png",
  "kaufleute-bueromanagement": "assets/img/berufe/kaufleute-bueromanagement.png",
  "kaufleute-dialogmarketing": "assets/img/berufe/kaufleute-dialogmarketing.png",
  "kaufleute-fuer-digitalisierungsmanagement": "assets/img/berufe/kaufleute-fuer-digitalisierungsmanagement.png",
  "kaufleute-fuer-versicherungen-und-finanzanlagen": "assets/img/berufe/kaufleute-fuer-versicherungen-und-finanzanlagen.png",
  "kaufleute-fuer-versicherungen-und-finanzanlagen-b-sc-risk-and-insurance": "assets/img/berufe/kaufleute-fuer-versicherungen-und-finanzanlagen-b-sc-risk-and-insurance.png",
  "kaufleute-gross-und-aussenhandelsmanagement": "assets/img/berufe/kaufleute-gross-und-aussenhandelsmanagement.png",
  "koch-koechin": "assets/img/berufe/koch-koechin.png",
  "steuerfachangestellte-studium-taxation": "assets/img/berufe/steuerfachangestellte-studium-taxation.png",
  "verwaltungsfachangestellte": "assets/img/berufe/verwaltungsfachangestellte.webp",
  "verwaltungsfachangestellte-im-ordnungsdienst": "assets/img/berufe/verwaltungsfachangestellte-im-ordnungsdienst.webp",
  "verwaltungswirt": "assets/img/berufe/verwaltungswirt.png",
  "verwaltungswirt-im-ordnungsdienst": "assets/img/berufe/verwaltungswirt-im-ordnungsdienst.webp",
  "bachelor-of-laws-stadtinspektoranwaerter": "assets/img/berufe/bachelor-of-laws-stadtinspektoranwaerter.png",
  "stadtsekretaeranwaerter": "assets/img/berufe/stadtsekretaeranwaerter.png",
  "studium-verwaltungsbetriebswirtschaftslehre": "assets/img/berufe/studium-verwaltungsbetriebswirtschaftslehre.png",
  "fachangestellte-medien-und-informationsdienste-archiv": "assets/img/berufe/fachangestellte-medien-und-informationsdienste-archiv.png",
  "fachangestellte-medien-und-informationsdienste-bibliothek": "assets/img/berufe/fachangestellte-medien-und-informationsdienste-bibliothek.png",
  "immobilienkaufleute": "assets/img/berufe/immobilienkaufleute.png",
  "industriekaufleute": "assets/img/berufe/industriekaufleute.png",
  "strassenwaerter": "assets/img/berufe/strassenwaerter.png",
  "fachangestellte-fuer-baederbetriebe": "assets/img/berufe/fachangestellte-fuer-baederbetriebe.png"
};

/* ===== unternehmen-data.js ===== */
/* =========================================================
   NEST BildungsBar – Unternehmens-Register
   Zuordnung: Firmenname  ->  Karriere-/Ausbildungsseite (URL)
   Wird auf den Beruf-Detailseiten genutzt: Partnerfirmen mit
   hinterlegter URL werden zu anklickbaren Links.

   Pflege: Einfach Name (exakt wie im Beruf "partner") + URL ergänzen.
   Firmen ohne Eintrag erscheinen als normaler Chip ohne Link.
   ========================================================= */

window.UNTERNEHMEN = {
  "Helios Kliniken Wuppertal": "https://www.helios-gesundheit.de/kliniken/wuppertal/unser-haus-karriere-presse/karriere/stellenangebote/",
  "Bergische Diakonie": "http://karriere.bergische-diakonie.de/",
  "Theodor Fliedner Stiftung": "https://www.fliedner.de/karriere",
  "Radprax": "https://www.radprax.de/karriere/ausbildung-bei-radprax/",
  "Blaues Kreuz": "https://www.blaues-kreuz.de/de/blaues-kreuz/stellenangebote/",
  "Beuthel": "https://beuthel.de/stellenangebote-beuthel/",
  "Stadt Wuppertal": "https://www.wuppertal.de/microsite/wuppertalent/ausbildungsberufe/",
  "Stadt Remscheid": "https://www.remscheid.de/neuigkeiten-wissenswertes/karriere/",
  "Stadtwerke Remscheid": "https://www.sr-karriere.de/ausbildung-und-berufseinstieg/ausbildungsplaetze-und-praktika/",
  "Wuppertaler Stadtwerke": "https://www.wsw-online.de/ueber-uns/karriere/ausbildung/ausbildungsangebote/",
  "AWG": "https://awg-wuppertal.de/karriere/ausbildung.html",
  "Wupperverband": "https://www.wupperverband.de/ueber-uns/personal/ausbildung",
  "Erfurt": "https://erfurt.talention.com/jobs",
  "WKW Group": "https://www.wkw.de/karriere/ausbildung-1/unsere-ausbildungsberufe",
  "Gebrüder Becker": "https://www.becker-international.com/de/de/111/ausbildung-duales-studium.htm",
  "Gebr. Schmidt": "https://www.gsfedern.com/de/karriere/ausbildung/",
  "Knipex": "https://www.die-lehre-deines-lebens.de/",
  "Stahlwille": "https://stahlwille.com/de_de/karriere/ausbildung/6c637dad",
  "Walther Pilot": "https://walther-pilot.de/de/karriere/",
  "Karl Deutsch": "https://karriere.karldeutsch.de/",
  "Muckenhaupt & Nusselt": "https://karriere.munu-kabel.de/auszubildende/",
  "Wilkinson Sword": "https://careers.edgewell.com/search/?createNewAlert=false&q=ausbildung&locationsearch=",
  "Emil Kreiskott GmbH": "https://nest-bildungsbar.de/wp-content/uploads/2026/03/Flyer-Gezaie.pdf",
  "Schmersal": "https://www.schmersal.com/karriere/ausbildung",
  "Vaillant": "https://jobs.vaillant-group.com/content/schueler/?locale=de_DE",
  "Coroplast": "https://jobs.coroplast.de/",
  "Vorwerk": "https://career-vorwerkgroups.com/",
  "WASI": "https://karriere.wasi.de/jobs",
  "Vollmann Group": "https://karriere.vollmann-group.com/berufsausbildung/",
  "Schmahl": "https://www.schmahl.biz/de/karriere/",
  "Autohaus Lackmann": "https://www.lackmanngruppe.de/unternehmen/",
  "Procar Automobile": "https://karriere.procar-automobile.de/stellenangebote.html",
  "Peter Barth GmbH": "https://barth-wuppertal.de/karriere/",
  "Alex & Greiff GmbH": "https://www.alex-greiff.de/",
  "E/D/E": "https://karriere.ede.de/Ausbildung",
  "Barmenia Versicherungen": "https://karriere.barmenia.blog/innendienst/ausbildung/",
  "BUCS-IT": "https://karriere.bucs-it.de/ausbildung",
  "Conmetall Meister": "https://www.conmetallmeister.de/de/website/unternehmen/karriere.html",
  "GEPA": "https://www.gepa.de/karriere/ausbildung",
  "Wiesemann & Theis": "https://www.wut.de/jobs/",
  "Martin GmbH": "https://martin-gmbh.de/karriere",
  "Stadt Essen": "https://karriere.essen.de/",
  "Huth Etiketten": "https://www.huth-wuppertal.de/jobsuche.html",
  "Büro Longjaloux": "https://longjaloux.de/buero/",
  "Laré": "https://www.lare.de/",
  "Mencke": "https://www.mencke.de/ausbildung",
  "Akzenta": "https://rundum-akzenta.de/karriere/ausbildung/",
  "Culinaria": "https://culinaria-wuppertal.de/karriere",
  "Stadtsparkasse Wuppertal": "https://sparkasse.mein-check-in.de/sparkasse-wuppertal",
  "Sparkasse Wuppertal": "https://www.sparkasse-wuppertal.de/de/home/ihre-sparkasse/karriere/ausbildung-bei-deiner-sparkasse.html",
  "Volksbank im Bergischen Land": "https://www.bergische-volksbank.de/karriere/ausbildung_duales_studium.html",
  "Jobcenter Wuppertal": "https://karriere.wuppertal.de/jobs",
  "Fohrer": "https://karriere.zander.online/standort-fohrer-panno/",
  "Freund": "https://www.freund-cie.com/i/j",
  "PE Automotive": "https://www.pe.de/karriere/ausbildung/",
  "Metaq": "https://www.metaq.de/karriere/",
  "Reeder und Kamp": "https://reeder-kamp.de/karriere",
  "Rinke Treuhand GmbH": "https://www.rinke.eu/karriere-einstiegsmoeglichkeiten",
  "Kaut": "https://www.kaut.de/karriere/ausbildungen/",
  "Minimax": "https://www.minimax.com/de/de/karriere/ausbildung-bei-minimax/",
  "Allbau": "https://www.allbau.de/karriere/ausbildung-und-schuelerpraktika/",
  "020 EPOS": "https://www.020epos.de/karriere/aus-weiterbildung/"
};

/* ===== berufe-data.js ===== */
/* =========================================================
   NEST BildungsBar – Berufe-Datenbank
   Eine zentrale Quelle für die "Deine Zukunft"-Übersicht
   und die einzelnen Berufs-Detailseiten (beruf.html?b=<slug>).

   Jeder Beruf hat einen individuellen Text (info) und eine
   typische Dauer (dauer). Optional kannst du ein Bild ergänzen:
     bild: "assets/img/berufe/pflegefachkraft.jpg"
   Fehlt ein Bild, zeigt die Seite einen farbigen Platzhalter
   mit dem Kategorie-Icon.
   ========================================================= */

window.BERUFE_KATEGORIEN = [
  {
    name: "Gesundheitswesen",
    icon: "health",
    beschreibung: "Berufe rund um Pflege, Medizin und Gesundheit – für Menschen, die helfen wollen.",
    berufe: [
      { name: "Anästhesietechnische:r Assistent:in", dauer: "3 Jahre", info: "Als anästhesietechnische:r Assistent:in (ATA) unterstützt du das Anästhesie-Team bei Vorbereitung, Durchführung und Nachsorge von Narkosen: Du bereitest Medikamente und Geräte vor, überwachst Patient:innen während der Narkose und dokumentierst alles in steriler Umgebung.", partner: ["Helios Kliniken Wuppertal"] },
      { name: "Augenoptiker:in", dauer: "3 Jahre", info: "Als Augenoptiker:in bist du für die Anpassung und Herstellung von Brillen und Kontaktlinsen zuständig: Du führst Sehtests durch, berätst Kund:innen bei der Auswahl von Fassungen und Gläsern und nimmst Maß für die individuelle Anpassung." },
      { name: "Hörgeräteakustiker:in", dauer: "3 Jahre", info: "Als Hörgeräteakustiker:in versorgst du Menschen individuell mit Hörgeräten: Du machst Hörtests, berätst Kund:innen, fertigst Otoplastiken und Gehörschutz an und installierst, wartest und reparierst die Geräte." },
      { name: "Kaufleute im Gesundheitswesen", dauer: "3 Jahre", info: "Kaufleute im Gesundheitswesen übernehmen die kaufmännischen Aufgaben in medizinischen Einrichtungen: Du rechnest Leistungen mit den Krankenkassen ab, erstellst Rechnungen, überwachst Zahlungseingänge und organisierst Termine, Material und Patientendokumentation.", partner: ["Radprax", "Helios Kliniken Wuppertal", "Blaues Kreuz", "Beuthel"] },
      { name: "Medizinische:r Fachangestellte:r", dauer: "3 Jahre", info: "Als Medizinische:r Fachangestellte:r (MFA) unterstützt du in Arztpraxen und Kliniken bei Untersuchungen und Behandlungen und übernimmst administrative Aufgaben. Du arbeitest mit medizinischen Geräten, im Labor und achtest auf Hygiene.", partner: ["Stadt Wuppertal", "Radprax", "Helios Kliniken Wuppertal", "Wuppertaler Stadtwerke", "Stadt Remscheid"] },
      { name: "Medizinische:r Fachangestellte:r Zahnmedizin", dauer: "3 Jahre", info: "Als Zahnmedizinische:r Fachangestellte:r (ZFA) unterstützt du Zahnärzt:innen bei der Behandlung, bereitest Instrumente vor, organisierst die Praxisabläufe, vergibst Termine und kümmerst dich um die Abrechnung.", partner: ["Klein Sälzer Zahnärzte"] },
      { name: "Medizinische:r Technolog:in für Laboratoriumsanalytik", dauer: "3 Jahre", info: "Als medizinische:r Technolog:in für Laboratoriumsanalytik arbeitest du im medizinischen Labor und unterstützt bei der Diagnose von Krankheiten: Du untersuchst Proben, analysierst Ergebnisse, dokumentierst sie und wartest die Laborgeräte.", partner: ["Helios Kliniken Wuppertal"] },
      { name: "Medizinische:r Technolog:in für Radiologie", dauer: "3 Jahre", info: "Als medizinische:r Technolog:in für Radiologie führst du bildgebende Untersuchungen wie Röntgen, MRT und Ultraschall durch: Du bereitest Patient:innen vor, bedienst hochmoderne Geräte und trägst Verantwortung für Strahlenschutz und Patientensicherheit.", partner: ["Helios Kliniken Wuppertal"] },
      { name: "Notfallsanitäter:in", dauer: "3 Jahre", info: "Als Notfallsanitäter:in bist du erste Ansprechperson in medizinischen Notfällen: Du versorgst Patient:innen in akuten Notlagen, stabilisierst sie medizinisch und begleitest sie ins Krankenhaus. Die Ausbildung vermittelt Notfallmedizin, Medizintechnik und Stressmanagement.", partner: ["Stadt Essen"], standorte: ["Essen"] },
      { name: "Operationstechnische:r Assistent:in", dauer: "3 Jahre", info: "Als operationstechnische:r Assistent:in (OTA) unterstützt du Ärzt:innen und Chirurg:innen bei Operationen: Du bereitest den OP-Saal vor, stellst Instrumente bereit, betreust Patient:innen und sorgst für sterile Bedingungen.", partner: ["Helios Kliniken Wuppertal"] },
      { name: "Pflegefachassistent:in", dauer: "1–2 Jahre", info: "Als Pflegefachassistent:in unterstützt du Pflegefachkräfte bei der Betreuung und Pflege von Menschen in Kliniken und Seniorenheimen – etwa bei Körperpflege, Essen und Medikamenteneinnahme. Ein guter Einstieg, der sich zur Pflegefachkraft ausbauen lässt.", partner: ["Helios Kliniken Wuppertal", "Theodor Fliedner Stiftung"] },
      { name: "Pflegefachkraft", dauer: "3 Jahre", info: "Als Pflegefachkraft betreust und pflegst du Menschen in Krankenhäusern, Kliniken und Seniorenheimen. Du unterstützt sie bei alltäglichen Aufgaben wie Körperpflege, Essen und Medikamenteneinnahme und arbeitest im Schichtdienst – auch nachts, am Wochenende und an Feiertagen.", partner: ["Bergische Diakonie", "Helios Kliniken Wuppertal", "Theodor Fliedner Stiftung"] },
      { name: "Physiotherapeut:in", dauer: "3 Jahre", info: "Als Physiotherapeut:in hilfst du Menschen, ihre körperliche Gesundheit wiederherzustellen oder zu verbessern: Mit gezielten Übungen und Behandlungen linderst du Schmerzen, förderst Beweglichkeit, stärkst die Muskulatur und erstellst individuelle Therapiepläne.", partner: ["Helios Kliniken Wuppertal"] },
      { name: "Studium Hebammenwissenschaften", dauer: "3–4 Jahre (dual, B.Sc.)", info: "Im dualen Studium Hebammenwissenschaften lernst du, Schwangere zu betreuen, Geburten zu begleiten und das Wochenbett zu betreuen. Theoriephasen an der Hochschule wechseln mit Praxiseinsätzen in Geburtskliniken und Hebammenpraxen.", partner: ["Helios Kliniken Wuppertal"] },
      { name: "Studium Pflegewissenschaften", dauer: "3–4 Jahre (B.Sc.)", info: "Das duale Studium Pflegewissenschaften verbindet die praktische Pflege mit wissenschaftlichem Wissen. Du betreust Patient:innen in unterschiedlichen Lebenslagen und qualifizierst dich für Gesundheitsförderung, Prävention und Pflegemanagement.", partner: ["Helios Kliniken Wuppertal"] }
    ]
  },
  {
    name: "Handwerk",
    icon: "tools",
    beschreibung: "Anpacken, gestalten, reparieren – vielfältige Handwerksberufe mit Zukunft.",
    berufe: [
      { name: "Anlagenmechaniker:in für Sanitär-, Heizungs- und Klimatechnik", dauer: "3,5 Jahre", info: "Als Anlagenmechaniker:in SHK installierst, wartest und reparierst du moderne Anlagen und sorgst für warmes Wasser, funktionierende Heizungen und angenehme Raumtemperatur. Du verlegst Rohrleitungen und montierst Heizkörper und sanitäre Einrichtungen – zunehmend digital unterstützt.", partner: ["Peter Barth GmbH", "Stadt Wuppertal", "Alex & Greiff GmbH"] },
      { name: "Anlagenmechaniker:in Rohrsystemtechnik", dauer: "3,5 Jahre", info: "In der Rohrsystemtechnik lernst du, Rohre zu verlegen, zu montieren und zu verschweißen sowie Anlagen zu prüfen und instand zu halten – in Heizungs-, Sanitär- und industriellen Anlagen.", partner: ["Wuppertaler Stadtwerke"] },
      { name: "Bäcker:in", dauer: "3 Jahre", info: "Als Bäcker:in stellst du Brot, Brötchen, Kuchen und andere Backwaren her: Du wiegst und mischst Zutaten, knetest den Teig, formst ihn und überwachst den Backprozess für die richtige Kruste – oft schon früh am Morgen.", partner: ["Policks Backstube"] },
      { name: "Koch / Köchin", dauer: "3 Jahre", info: "Köch:innen bereiten Speisen in der Gastronomie zu, planen Speisepläne, kaufen Zutaten ein und richten Gerichte an: Du beachtest Hygienevorschriften und arbeitest unter Zeitdruck im Team.", partner: ["Stadt Wuppertal", "Barmenia Versicherungen", "Culinaria"] },
      { name: "Forstwirt:in", dauer: "3 Jahre", info: "Als Forstwirt:in pflegst und bewirtschaftest du Wälder: Bäume pflanzen und ernten, Wege anlegen und Naturschutz betreiben. Die Ausbildung dauert drei Jahre und wird dual durchgeführt.", partner: ["Stadt Wuppertal", "Wupperverband", "Stadt Remscheid"] },
      { name: "Bäckereifachverkäufer:in", dauer: "3 Jahre", info: "Als Bäckereifachverkäufer:in verkaufst du frische Backwaren: Du berätst Kund:innen, nimmst Bestellungen entgegen, kassierst, präsentierst die Ware ansprechend und sorgst für eine saubere Verkaufsfläche.", partner: ["Policks Backstube"] },
      { name: "Bauzeichner:in", dauer: "3,5 Jahre", info: "Bauzeichner:innen erstellen präzise Baupläne nach den Entwürfen von Architekt:innen und Ingenieur:innen. Die Ausbildung umfasst technisches Zeichnen, baurechtliche Vorschriften und Kenntnisse über Baustoffe.", partner: ["Wupperverband", "Stadt Remscheid"] },
      { name: "Dachdecker:in", dauer: "3 Jahre", info: "Als Dachdecker:in bist du für die Bedeckung und Instandhaltung von Dächern, Fassaden und Dachkonstruktionen zuständig. Du arbeitest mit Materialien wie Ziegeln, Schiefer, Metall und Kunststoff – oft im Freien und in der Höhe.", partner: ["Mager Bedachungen"] },
      { name: "Elektroniker:in Automatisierungstechnik", dauer: "3,5 Jahre", info: "Als Elektroniker:in für Automatisierungstechnik planst, installierst und wartest du automatisierte Systeme und Anlagen: Du programmierst Steuerungen, überwachst Prozesse, analysierst Fehler und führst Inspektionen durch.", partner: ["Vorwerk", "Knipex", "Coroplast", "Stadt Remscheid", "Wuppertaler Stadtwerke", "AWG"] },
      { name: "Elektroniker:in Betriebstechnik", dauer: "3,5 Jahre", info: "Elektroniker:innen für Betriebstechnik installieren, warten und reparieren elektrische Anlagen in Unternehmen: Du arbeitest mit Schaltplänen, installierst Schaltschränke, führst Messungen durch und behebst Störungen.", partner: ["Wupperverband", "Erfurt", "WKW Group", "Schmersal", "Vaillant", "Coroplast", "Stahlwille", "Wuppertaler Stadtwerke", "Stadt Remscheid", "Stadtwerke Remscheid", "AWG"] },
      { name: "Elektroniker:in Energie- und Gebäudetechnik", dauer: "3,5 Jahre", info: "Du installierst und wartest die elektronischen Anlagen in Gebäuden – Verkabelung, Schalter, Sicherungen sowie Steuer- und Regelsysteme – und prüfst sie regelmäßig auf Fehler.", partner: ["Stadt Wuppertal", "Elektroinnung Wuppertal"] },
      { name: "Elektroniker:in für Geräte und Systeme", dauer: "3,5 Jahre", info: "Hier lernst du Montage, Wartung und Reparatur elektronischer Geräte: Du installierst elektrische Komponenten, verlegst Leitungen und baust Schaltkreise zusammen.", partner: ["Schmersal", "Wiesemann & Theis"] },
      { name: "Flachglastechnolog:in", dauer: "3 Jahre", info: "Als Flachglastechnolog:in stellst und veredelst du Flachglasprodukte wie Fenster, Spiegel und Glasfassaden: Du schneidest, schleifst, polierst und bohrst Glas und übernimmst Veredelung wie Bedrucken und Beschichten.", partner: ["Reeder und Kamp"] },
      { name: "Fleischer:in", dauer: "3 Jahre", info: "Als Fleischer:in verarbeitest du Fleisch und Wurstwaren: Du zerlegst Fleisch, bereitest es für den Verkauf vor, stellst Wurstsorten her und berätst Kund:innen – mit Verantwortung für Qualität und Hygiene.", partner: ["Akzenta"] },
      { name: "Fliesenleger:in", dauer: "3 Jahre", info: "Fliesenleger:innen verlegen Fliesen auf Böden, Wänden und Fassaden: Du berechnest den Materialbedarf, bearbeitest Untergründe, erstellst Dämm- und Sperrschichten und verfugst die Fliesen – mit Raum für kreative Gestaltung." },
      { name: "Gärtner:in – Fachrichtung Garten- und Landschaftsbau", dauer: "3 Jahre", info: "Im Garten- und Landschaftsbau gestaltest, legst und pflegst du Gärten, Parks und Grünanlagen. Du lernst Pflanzen- und Bodenkunde, bedienst Maschinen und übernimmst Planung und Kostenberechnung.", partner: ["Leonhards"] },
      { name: "Glaser:in", dauer: "3 Jahre", info: "Als Glaser:in stellst, montierst und reparierst du Glasprodukte – im Bauwesen, Fahrzeugbau und in der Möbelindustrie. Du schneidest, schleifst und bearbeitest Glas und verbindest es mit anderen Materialien.", partner: ["Reeder und Kamp"] },
      { name: "Industriemechaniker:in", dauer: "3,5 Jahre", info: "Als Industriemechaniker:in bist du für Montage, Instandhaltung und Reparatur von Maschinen und Anlagen in Industriebetrieben zuständig. Die Ausbildung verbindet Berufsschule mit viel betrieblicher Praxis.", partner: ["Wupperverband", "Erfurt", "WKW Group", "Gebrüder Becker", "Gebr. Schmidt", "Knipex", "Stahlwille", "Walther Pilot", "Karl Deutsch", "Wuppertaler Stadtwerke", "Muckenhaupt & Nusselt", "Wilkinson Sword", "AWG", "Emil Kreiskott GmbH"] },
      { name: "Kfz-Mechatroniker:in", dauer: "3,5 Jahre", info: "Als Kfz-Mechatroniker:in wartest und reparierst du Fahrzeuge: Du diagnostizierst technische Probleme, tauschst defekte Teile aus und arbeitest an Motoren, Bremsen, Fahrwerken und elektronischen Systemen.", partner: ["Stadt Wuppertal", "Autohaus Lackmann", "Procar Automobile", "Wuppertaler Stadtwerke", "Stadt Remscheid", "Stadtwerke Remscheid"] },
      { name: "Mechatroniker:in", dauer: "3,5 Jahre", info: "Mechatroniker:innen montieren, warten und reparieren mechatronische Systeme aus mechanischen, elektronischen und informatischen Komponenten: Du installierst Steuerungen, prüfst Sensoren und behebst Störungen.", partner: ["Gebrüder Becker", "Vorwerk", "Knipex", "Schmersal", "Vaillant", "Coroplast", "WASI", "Vollmann Group"] },
      { name: "Mechatroniker:in im Kundendienst", dauer: "3,5 Jahre", info: "Als Mechatroniker:in im Kundendienst löst du technische Probleme direkt beim Kunden: Du wartest und reparierst mechatronische Systeme wie Maschinen oder Roboter, analysierst Fehler, installierst neue Systeme und schulst die Anwender:innen.", partner: ["Vaillant"] },
      { name: "Mechatroniker:in Kältetechnik", dauer: "3,5 Jahre", info: "Als Mechatroniker:in für Kältetechnik planst, montierst, wartest und reparierst du Kälteanlagen: Du führst Fehlerdiagnosen durch, tauschst Komponenten aus und installierst Systeme – mit Wissen aus Elektronik, Mechanik und Regelungstechnik.", partner: ["Laré", "Kaut"] },
      { name: "Orthopädieschuhmacher:in", dauer: "3,5 Jahre", info: "Als Orthopädieschuhmacher:in fertigst und passt du orthopädische Schuhe und Einlagen an: Du machst Fußanalysen, wählst Materialien, bearbeitest Leder und betreust Kund:innen eng im Gesundheitsbereich.", partner: ["Beuthel"] },
      { name: "Orthopädietechnik-Mechaniker:in", dauer: "3,5 Jahre", info: "In der Orthopädietechnik fertigst und passt du orthopädische Hilfsmittel wie Prothesen und Orthesen an: Du misst, modellierst, reparierst und arbeitest eng mit Patient:innen und Fachärzt:innen zusammen.", partner: ["Beuthel"] },
      { name: "Tischler:in", dauer: "3 Jahre", info: "Als Tischler:in arbeitest du mit Holz und stellst Möbel, Türen, Fenster und Innenausbauten her: Du sägst, hobelst, schleifst und verbindest Holzteile – oft mit modernen Maschinen.", partner: ["Stadt Essen", "Emschergenossenschaft"], standorte: ["Essen"] },
      { name: "Werkzeugmechaniker:in", dauer: "3,5 Jahre", info: "Als Werkzeugmechaniker:in stellst du Werkzeuge her und hältst sie instand: Du arbeitest mit Maschinen und Präzisionswerkzeugen in der Metallverarbeitung und fertigst z. B. Stanz-, Schneid- oder Biegevorrichtungen.", partner: ["Vorwerk", "WKW Group", "Knipex", "Schmersal", "Gebr. Schmidt", "Vollmann Group", "Wilkinson Sword"] },
      { name: "Zerspanungsmechaniker:in", dauer: "3,5 Jahre", info: "Als Zerspanungsmechaniker:in bedienst und programmierst du CNC-Maschinen, um Werkstücke nach Plan zu bearbeiten: Du drehst, fräst, bohrst und schleifst Metall und übernimmst die Qualitätskontrolle.", partner: ["WKW Group", "Gebrüder Becker", "Vorwerk", "Knipex", "Schmahl", "Stahlwille", "Wilkinson Sword", "Emil Kreiskott GmbH"] },
      { name: "Anlagenmechaniker:in für Löschsystemtechnik", dauer: "3,5 Jahre", info: "Als Anlagenmechaniker:in für Löschsystemtechnik installierst, wartest und reparierst du stationäre Brandschutz- und Löschanlagen (Wasser, Schaum, Gas): Du verlegst Rohrleitungen, montierst Komponenten und nutzt digitale Diagnosewerkzeuge.", partner: ["Minimax"], standorte: ["Essen"] },
      { name: "Kombiausbildung Tischler:in / Brandmeister:in", dauer: "ca. 4–5 Jahre", info: "Diese Ausbildung verbindet das Tischlerhandwerk mit der feuerwehrtechnischen Ausbildung: Du lernst zunächst Möbelbau und Holzbearbeitung, dann Brandbekämpfung, Rettungstechniken und Notfallhandeln.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/ausbildung_1/kombiausbildungtischlerinbrandmeisterin.de.html" }], standorte: ["Essen"] },
      { name: "Straßenwärter:in", dauer: "3 Jahre", info: "Straßenwärter:innen sind für die Instandhaltung und Sicherheit von Straßen und Verkehrswegen zuständig: Du kontrollierst Fahrbahnen, behebst Schäden und arbeitest im Schichtdienst mit Schutzkleidung in Signalfarben.", partner: ["Stadt Wuppertal", "Stadt Remscheid"] },
      { name: "Fachangestellte:r für Bäderbetriebe", dauer: "3 Jahre", info: "Als Fachangestellte:r für Bäderbetriebe sorgst du für den reibungslosen Ablauf in Schwimm- und Freizeitbädern: Du überwachst den Badebetrieb, führst Wasserrettungsmaßnahmen durch, kontrollierst die Technik und betreust die Gäste.", partner: ["Stadt Wuppertal", "Stadt Remscheid", "Stadtwerke Remscheid"] }
    ]
  },
  {
    name: "Sozialer Bereich",
    icon: "people",
    beschreibung: "Mit Menschen arbeiten, begleiten und fördern – Berufe mit Sinn.",
    berufe: [
      { name: "Erzieher:in", dauer: "3–5 Jahre (Fachschule)", info: "Als Erzieher:in begleitest und förderst du Kinder in ihrer Entwicklung – in Kindergärten, Schulen oder Jugendhilfeeinrichtungen. Du begleitest Spiel und kreative Aktivitäten, löst Konflikte, beobachtest das Sozialverhalten, organisierst Ausflüge und führst Elterngespräche.", partner: ["Stadt Wuppertal", "Karawane", "Stadt Remscheid"] },
      { name: "Freiwilligendienst", dauer: "6–18 Monate", info: "Im Freiwilligendienst (FSJ/BFD) unterstützt du Fachkräfte in sozialen Einrichtungen bei der Betreuung und Pflege von Kindern, Jugendlichen sowie älteren oder hilfsbedürftigen Menschen. Du übernimmst praktische Aufgaben, begleitest Freizeitaktivitäten und sammelst wertvolle Berufserfahrung.", partner: ["Internationaler Bund"] },
      { name: "Heilerziehungspfleger:in", dauer: "3 Jahre", info: "Als Heilerziehungspfleger:in unterstützt du Menschen mit Behinderung in verschiedenen Lebensbereichen: individuelle Pflege, pädagogische Betreuung, therapeutische Maßnahmen sowie die Förderung von Selbstständigkeit und Freizeitgestaltung.", partner: ["Lebenshilfe Wuppertal", "Theodor Fliedner Stiftung"] },
      { name: "Kinderpfleger:in", dauer: "2 Jahre", info: "Als Kinderpfleger:in unterstützt du Erzieher:innen bei der Betreuung und Förderung von Kindern: Du begleitest den Alltag, übernimmst Körperpflege, spielst und dokumentierst die Entwicklung – in Kindergärten, Krippen und Horten.", partner: ["Stadt Wuppertal"] },
      { name: "Sozialassistent:in", dauer: "2 Jahre", info: "Als Sozialassistent:in unterstützt du Menschen in sozialen Bereichen wie Kindergärten, Altenheimen oder Wohngruppen: Du begleitest sie im Alltag, assistierst bei Körperpflege und Mahlzeiten und förderst ihre soziale Integration.", partner: ["Bergische Diakonie"] },
      { name: "Hauswirtschafter:in", dauer: "3 Jahre", info: "Als Hauswirtschafter:in sorgst du dafür, dass in sozialen Einrichtungen, Haushalten oder Hotels alles rundläuft – von Reinigung und Verpflegung bis zur Wohnraumgestaltung. Einsatz z. B. in Pflegeheimen, Kitas und Krankenhäusern.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/ausbildung_1/hauswirtschafter.de.html" }], standorte: ["Essen"] },
      { name: "Tierpfleger:in", dauer: "3 Jahre", info: "Als Tierpfleger:in betreust und versorgst du Tiere: Du fütterst sie, sorgst für saubere Gehege, unterstützt bei der medizinischen Versorgung und beobachtest das Verhalten, um ihre Lebensumstände zu verbessern.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/ausbildung_1/tierpflegerin.de.html" }], standorte: ["Essen"] },
      { name: "Studium Soziale Arbeit", dauer: "3–4 Jahre", info: "Im Studium der Sozialen Arbeit berätst, begleitest und förderst du Menschen in schwierigen Lebenslagen – in Jugendhilfe, Schulen oder Altenpflege: Du erwirbst pädagogisches, psychologisches und rechtliches Wissen.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/studium_1/bachelorofartssozialearbeit.de.html" }], standorte: ["Essen"] }
    ]
  },
  {
    name: "Technische Berufe",
    icon: "cpu",
    beschreibung: "Technik, IT und Ingenieurwesen – Ausbildungen und duale Studiengänge für Tüftler:innen.",
    berufe: [
      { name: "Bachelor of Arts Verwaltungsinformatik", dauer: "3 Jahre (dual)", info: "Im dualen Studium erwirbst du Kenntnisse in IT-Systemen der öffentlichen Verwaltung, Datenbanken, Softwareentwicklung, Projektmanagement und IT-Sicherheit. Danach arbeitest du z. B. als IT-Projektmanager:in oder Berater:in für Verwaltungsprozesse.", partner: ["Stadt Wuppertal"] },
      { name: "Bachelor of Engineering Geoinformatik", dauer: "3–4 Jahre (dual)", info: "Im dualen Studium kombinierst du digitale Kartographie mit theoretischer Ausbildung: Du lernst Datenverarbeitung, Programmierung und die Erstellung digitaler Karten und sammelst Praxis in Vermessung, Katasteramt und Geodaten.", partner: ["Stadt Wuppertal"] },
      { name: "Bachelor of Engineering Vermessung", dauer: "3–4 Jahre (dual)", info: "Das duale Studium verbindet Hochschule und Praxis: Du führst Vermessungsarbeiten durch, nutzt digitale Techniken wie GPS und Laserscanning und arbeitest in Bauwesen, Stadtplanung oder Umweltschutz.", partner: ["Stadt Wuppertal"] },
      { name: "Duales Studium Angewandte Informatik", dauer: "3–4 Jahre", info: "Im Studium lernst du, informatische Lösungen für verschiedene Anwendungsbereiche zu entwickeln: Du programmierst Software, analysierst Daten und entwickelst IT-Systeme – im Wechsel zwischen Hochschule und Unternehmenspraxis.", partner: ["Vorwerk", "Wuppertaler Stadtwerke"] },
      { name: "Duales Studium Elektrotechnik", dauer: "3–4 Jahre", info: "Das duale Studium verbindet Hochschulphasen mit Praxis im Unternehmen: Du arbeitest an Planung, Installation und Wartung elektrischer Anlagen und kannst später als Elektroingenieur:in, Projektmanager:in oder Systemtechniker:in arbeiten.", partner: ["Vaillant"] },
      { name: "Duales Studium Fachinformatik Anwendungsentwicklung + B. Sc. Wirtschaftsinformatik", dauer: "ca. 4–4,5 Jahre", info: "Im dualen Studium wirst du in Softwareentwicklung und IT-Anwendungen ausgebildet: Du analysierst Anforderungen, programmierst, testest und dokumentierst Softwarelösungen und optimierst betriebswirtschaftliche Prozesse.", partner: ["Barmenia Versicherungen"] },
      { name: "Duales Studium Gebäudetechnik", dauer: "3,5–4 Jahre", info: "Das duale Studium vermittelt Planung, Installation und Wartung technischer Gebäudesysteme. Du arbeitest später als Gebäudetechniker:in, Projektleiter:in oder Energieberater:in für funktionierende, energieeffiziente Anlagen.", partner: ["Vaillant"] },
      { name: "Duales Studium Informatik", dauer: "3–4 Jahre", info: "Im dualen Studium Informatik lernst du Entwicklung und Anwendung von Software, Datenanalyse und die Gestaltung von IT-Systemen. Danach arbeitest du z. B. als Softwareentwickler:in, IT-Berater:in oder Datenanalyst:in.", partner: ["Vaillant", "Stadt Essen"] },
      { name: "Duales Studium IT-Security", dauer: "3–4 Jahre", info: "Das duale Studium vermittelt Wissen über IT-Systeme und Netzwerksicherheit: Du identifizierst Cyber-Bedrohungen und implementierst Schutzmaßnahmen, um Vertraulichkeit, Integrität und Verfügbarkeit von Daten und Systemen zu sichern.", partner: ["Coroplast"] },
      { name: "Duales Studium Maschinenbau", dauer: "3–4 Jahre", info: "Im dualen Studium erwirbst du Kenntnisse in Konstruktion, Entwicklung und Produktion von Maschinen: Du planst technische Projekte, führst Berechnungen durch und optimierst Produktionsprozesse – Theorie und Praxis im Wechsel.", partner: ["Vaillant"] },
      { name: "Duales Studium Maschinenbau & Digitale Technologien + Industriemechaniker", dauer: "ca. 4,5 Jahre", info: "Das duale Studium verbindet einen Bachelor in Maschinenbau & Digitale Technologien mit der IHK-Ausbildung zum/zur Industriemechaniker:in. Du lernst klassische Ingenieurskompetenzen sowie Automatisierung, Industrie 4.0 und datengetriebene Produktion.", partner: ["Wilkinson Sword"] },
      { name: "Duales Studium Maschinenbau & Digitale Technologien + Werkzeugmechaniker", dauer: "ca. 4,5 Jahre", info: "Diese Kombination vereint den Bachelor Maschinenbau & Digitale Technologien mit der IHK-Ausbildung zum/zur Werkzeugmechaniker:in: Konstruktion moderner Maschinen, digitale Technologien und handwerkliches Know-how in Fertigung und Werkzeugbau.", partner: ["Wilkinson Sword"] },
      { name: "Duales Studium Wirtschafts- und Industrieinformatik", dauer: "3–4 Jahre", info: "Im dualen Studium lernst du, betriebswirtschaftliche Prozesse mit IT-Systemen zu optimieren und IT-Lösungen in Unternehmen zu integrieren. Danach folgen Karrieren als IT-Consultant, Business Analyst oder Projektmanager:in.", partner: ["Schmersal"] },
      { name: "Duales Studium Wirtschaftsinformatik", dauer: "3–4 Jahre", info: "Das duale Studium verbindet Wirtschaft und Informatik: Du entwickelst Softwarelösungen, die Unternehmen helfen, ihre Geschäftsprozesse effizienter zu gestalten – und arbeitest später z. B. als IT-Consultant, Softwareentwickler:in oder Projektmanager:in.", partner: ["Vaillant", "E/D/E"] },
      { name: "Energieelektroniker:in", dauer: "3,5 Jahre", info: "Energieelektroniker:innen spezialisieren sich auf Installation, Wartung und Reparatur elektrischer Anlagen der Energieverteilung und -steuerung. Du arbeitest mit Hoch- und Niederspannungsanlagen sowie erneuerbaren Energiesystemen.", partner: ["Muckenhaupt & Nusselt"] },
      { name: "Fachkraft für Veranstaltungstechnik", dauer: "3 Jahre", info: "Als Veranstaltungstechniker:in planst, baust und betreust du die Technik von Events: Du installierst und steuerst Licht-, Ton- und Videotechnik und sorgst für die Sicherheit aller Beteiligten.", partner: ["Stadt Remscheid"] },
      { name: "Fachinformatiker:in Anwendungsentwicklung", dauer: "3 Jahre", info: "Als Fachinformatiker:in für Anwendungsentwicklung entwickelst du Software nach Kundenvorgaben: Du programmierst, testest und optimierst Lösungen, bleibst über aktuelle Technologien informiert und unterstützt Unternehmen bei der Prozessoptimierung.", partner: ["Vorwerk", "Stadt Wuppertal", "Barmenia Versicherungen", "Wuppertaler Stadtwerke", "WASI", "E/D/E"] },
      { name: "Fachinformatiker:in Daten- und Prozessanalyse", dauer: "3 Jahre", info: "Als Fachinformatiker:in für Daten- und Prozessanalyse untersuchst du Geschäftsprozesse und Datenquellen: Du entwickelst datengestützte Lösungen für digitale Prozesse und hilfst Unternehmen, ihre Abläufe zu optimieren.", partner: ["Knipex", "Schmersal"] },
      { name: "Fachinformatiker:in Systemintegration", dauer: "3 Jahre", info: "Als Fachinformatiker:in für Systemintegration installierst du Hard- und Software, vernetzt Computer und sorgst dafür, dass alle Systeme reibungslos laufen. Du bist Ansprechpartner:in bei IT-Problemen und schulst Mitarbeitende.", partner: ["Stadt Wuppertal", "Wupperverband", "Erfurt", "WKW Group", "WASI", "BUCS-IT", "Knipex", "Radprax", "Barmenia Versicherungen", "Stadt Remscheid", "Conmetall Meister", "Wuppertaler Stadtwerke", "Beuthel", "Wiesemann & Theis", "Stadtwerke Remscheid", "GEPA", "E/D/E"] },
      { name: "Geomatiker:in", dauer: "3 Jahre", info: "Als Geomatiker:in erfasst und verarbeitest du geografische Daten: Du erstellst digitale Karten und Pläne, misst Gelände und Gebäude aus und unterstützt bei der Planung von Bauprojekten.", partner: ["Stadt Wuppertal", "Stadt Remscheid"] },
      { name: "Industrieelektriker:in", dauer: "2 Jahre", info: "Als Industrieelektriker:in installierst, wartest und reparierst du elektrische Systeme in Industriebetrieben: Du arbeitest mit Schaltplänen, verdrahtest Schaltschränke, misst, programmierst Steuerungen und behebst Störungen.", partner: ["Vaillant", "Vollmann Group", "Wuppertaler Stadtwerke", "Martin GmbH"] },
      { name: "IT-Systemelektroniker:in", dauer: "3 Jahre", info: "Als IT-Systemelektroniker:in planst, installierst und wartest du IT-Systeme wie Computer und Telefonanlagen: Du konfigurierst komplexe Systeme, achtest auf Sicherheit und Energieversorgung und behebst Störungen.", partner: ["Wuppertaler Stadtwerke"] },
      { name: "KIS Studium Angewandte Informatik", dauer: "ca. 4,5 Jahre", info: "Das KIS-Programm vermittelt die Entwicklung von Softwarelösungen für spezifische Anwendungsgebiete. Du arbeitest in Softwareentwicklung, IT-Beratung und Systemadministration und hilfst Unternehmen, ihre Prozesse zu optimieren.", partner: ["Schmersal"] },
      { name: "KIS Studium Mechatronische Systeme", dauer: "ca. 4,5 Jahre", info: "Das Studium vermittelt die Entwicklung und Optimierung komplexer Systeme aus Mechanik, Elektronik und Informatik. Du arbeitest später als Entwicklungsingenieur:in, Projektleiter:in oder Systemintegrator:in – etwa in Automobil, Medizintechnik und Robotik.", partner: ["Schmersal"] },
      { name: "Kooperative Ingenieurausbildung", dauer: "ca. 4,5 Jahre", info: "Die Kooperative Ingenieurausbildung verbindet theoretisches Wissen an Hochschule/Berufsschule mit Praxisphasen im Unternehmen. Du erhältst einen Berufs- und einen akademischen Abschluss und arbeitest z. B. in Maschinenbau, Elektrotechnik oder Bauwesen.", partner: ["WKW Group"] },
      { name: "Kunststoff- und Kautschuktechnolog:in", dauer: "3 Jahre", info: "Du erwirbst Kenntnisse über Herstellung und Verarbeitung von Kunststoffen und Kautschuk: Du bedienst Produktionsanlagen, kontrollierst Prozessparameter, verarbeitest Materialien und prüfst die Qualität der Produkte.", partner: ["Schmersal", "Wilkinson Sword"] },
      { name: "Maschinen- und Anlagenführer:in", dauer: "2 Jahre", info: "Als Maschinen- und Anlagenführer:in richtest du Fertigungsmaschinen und -anlagen ein, bedienst sie und hältst sie instand: Du rüstest Maschinen um, überwachst Produktionsprozesse und führst Wartungsarbeiten durch.", partner: ["Erfurt", "WKW Group", "Gebrüder Becker", "Coroplast", "Gebr. Schmidt", "Muckenhaupt & Nusselt", "Huth Etiketten"] },
      { name: "Mediengestalter:in Digital und Print", dauer: "3 Jahre", info: "Als Mediengestalter:in Digital und Print gestaltest du digitale und gedruckte Medienprodukte: Du erstellst Layouts, entwirfst Grafiken und bearbeitest Bilder mit professioneller Software.", partner: ["Erfurt", "Büro Longjaloux", "Schmersal", "Wiesemann & Theis", "E/D/E"] },
      { name: "Medientechnolog:in Druck", dauer: "3 Jahre", info: "Medientechnolog:innen Druck setzen (digitale) Druckaufträge technisch um und realisieren sie qualitativ hochwertig: Du verantwortest den Workflow von der Datenvorbereitung bis zur fertigen Publikation inkl. Maschinenüberwachung, Qualitätskontrolle und Wartung.", partner: ["Huth Etiketten"] },
      { name: "Oberflächenbeschichter:in", dauer: "3 Jahre", info: "Als Oberflächenbeschichter:in veredelst du Oberflächen durch Verfahren wie Galvanisieren: Du schleifst, polierst und reinigst Werkstücke, gibst ihnen eine neue Optik und schützt sie vor Witterung und Korrosion.", partner: ["WKW Group", "Knipex"] },
      { name: "Papiertechnolog:in", dauer: "3 Jahre", info: "Als Papiertechnolog:in stellst du Papier her: Du arbeitest in Papierfabriken und bedienst Maschinen, die aus Holzfasern Papier, Karton und Pappe produzieren." },
      { name: "Produktionstechnolog:in", dauer: "3 Jahre", info: "Produktionstechnolog:innen optimieren und überwachen Produktionsprozesse: Du analysierst Abläufe, entwickelst Verbesserungen, arbeitest mit verschiedenen Abteilungen zusammen und sorgst für Qualitätskontrolle und Sicherheit.", partner: ["Knipex"] },
      { name: "Technische:r Produktdesigner:in", dauer: "3,5 Jahre", info: "Als Technische:r Produktdesigner:in gestaltest und entwickelst du technische Produkte: Du arbeitest mit Ingenieur:innen zusammen, modellierst in CAD, testest Prototypen und optimierst nach Ergonomie und Funktion.", partner: ["Vaillant", "Walther Pilot", "Schmersal"] },
      { name: "Technische:r Systemplaner:in Versorgungs- / Ausrüstungstechnik", dauer: "3,5 Jahre", info: "Als Technische:r Systemplaner:in planst und konstruierst du technische Anlagen der Versorgungstechnik (Heizung, Lüftung, Sanitär) und Ausrüstungstechnik (Elektro, Gebäudeautomation): Du arbeitest mit CAD-Software, hältst Normen ein und stimmst dich mit Fachplaner:innen ab.", partner: ["Laré", "Stadt Remscheid"] },
      { name: "Verfahrensmechaniker:in", dauer: "3,5 Jahre", info: "Als Verfahrensmechaniker:in stellst du Kunststoff- und Gummiprodukte her: Du bedienst und überwachst Maschinen, die die Rohstoffe zu fertigen Produkten verarbeiten.", partner: ["Vorwerk", "Schmersal", "Coroplast"] },
      { name: "Verfahrensmechaniker:in Beschichtungstechnik", dauer: "3,5 Jahre", info: "In der Beschichtungstechnik stellst du Beschichtungen auf verschiedensten Materialien her – durch Mischen, Auftragen und Trocknen: Du überwachst Produktionsprozesse, kontrollierst die Qualität und wartest die Anlagen." },
      { name: "Verfahrenstechnolog:in", dauer: "3 Jahre", info: "Als Verfahrenstechnolog:in steuerst du komplexe Produktionsprozesse und optimierst Anlagen: Du wirst in modernen Technologien geschult und entwickelst Verfahren zur Herstellung u. a. chemischer Produkte.", partner: ["Knipex"] },
      { name: "Vermessungstechniker:in", dauer: "3 Jahre", info: "Als Vermessungstechniker:in führst du Vermessungen von Grundstücken und Bauwerken durch, erstellst Pläne und unterstützt die Bauprojektplanung: Du arbeitest mit modernen Geräten im Büro und im Freien.", partner: ["Stadt Wuppertal", "Wupperverband", "Wuppertaler Stadtwerke"] },
      { name: "Bachelor Architektur", dauer: "3–4 Jahre", info: "Als Bachelor of Science Architektur planst und gestaltest du Gebäude und Lebensräume: Du entwickelst Entwürfe, begleitest Bauprojekte und verbindest Kreativität mit technischem Wissen, Nachhaltigkeit und modernem Design.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/studium_1/bachelorofsciencearchitektur.de.html" }], standorte: ["Essen"] },
      { name: "Bachelor Raumplanung", dauer: "3–4 Jahre", info: "Als Bachelor of Science Raumplanung gestaltest du die Entwicklung von Städten und Regionen: Du planst Wohngebiete, Verkehrswege und Grünflächen nachhaltig, nutzt digitale Planungstools und koordinierst mit Behörden und Bürger:innen.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/studium_1/bachelorofscienceraumplanung.de.html" }], standorte: ["Essen"] },
      { name: "Bachelor Vermessung & Geoinformatik", dauer: "3–4 Jahre", info: "Als Bachelor of Engineering erfasst und analysierst du geografische Daten mit moderner Technik wie GPS und Drohnen: Du arbeitest im Feld und im Büro mit Geoinformationssystemen für Bauprojekte und Stadtplanung.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/studium_1/bachelorofengineeringvermessungundgeoinformatik.de.html" }], standorte: ["Essen"] },
      { name: "Brandmeisteranwärter:in", dauer: "ca. 1,5 Jahre", info: "Die Ausbildung vermittelt Brandbekämpfung, technische Hilfeleistung und Erste Hilfe: Du lernst den Umgang mit Feuerwehrgeräten, Gefahrstoffen und Rettungseinsätzen.", partner: ["Stadt Remscheid"] },
      { name: "Informationselektroniker:in", dauer: "3,5 Jahre", info: "Als Informationselektroniker:in installierst, wartest und reparierst du informations- und kommunikationstechnische Systeme: Alarmanlagen, Videoüberwachung und Smart-Home-Technik – du richtest Netzwerke ein und behebst Störungen.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/ausbildung_1/informationselektronikerin.de.html" }], standorte: ["Essen"] },
      { name: "Studium Arboristik", dauer: "3–4 Jahre", info: "Das Studium dreht sich um Pflege, Entwicklung und Erhalt von Bäumen – besonders in Städten und Parks: Du kombinierst botanisches Wissen mit Technik und Umweltmanagement und planst Pflegemaßnahmen.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/studium_1/bachelorofsciencearboristik.de.html" }], standorte: ["Essen"] },
      { name: "Studium Bauingenieurwesen", dauer: "3–4 Jahre", info: "Im Bauingenieurwesen lernst du, wie Bauwerke entstehen – von der Planung bis zur fertigen Konstruktion: Du beschäftigst dich mit Statik, Baustoffen und Tragwerksplanung und arbeitest im Team an Brücken, Tunneln und Wohnhäusern.", partner: [{ name: "Stadt Essen", url: "https://www.essen.de/essenaktuell/job_und_karriere_/ausbildungsberufe/aktuelle_ausbildungsangebote.de.html" }], standorte: ["Essen"] },
      { name: "Studium Landschaftsarchitektur", dauer: "3–4 Jahre", info: "Im Studium gestaltest du grüne Lebensräume – von Parkanlagen bis zu urbanen Freiräumen: Du planst Freiflächen, berücksichtigst ökologische Aspekte und verbindest Natur, Design, Technik und Nachhaltigkeit.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/studium_1/bachelorofsciencelandschaftsarchitektur.de.html" }], standorte: ["Essen"] },
      { name: "Studium Landschaftsbau und Grünflächenmanagement", dauer: "3–4 Jahre", info: "Du lernst, Parks, Sportplätze, Spielanlagen und Grünzüge nachhaltig zu planen, zu bauen und zu pflegen: Das Studium verbindet gärtnerisches Fachwissen mit Betriebswirtschaft und Umweltschutz.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/studium_1/bachelorofengineeringlandschaftsbauundgruenflaechenmanagement.de.html" }], standorte: ["Essen"] },
      { name: "Studium Raumplanung", dauer: "3–4 Jahre", info: "Im Raumplanung-Studium lernst du, Städte und Regionen zukunftsfähig zu gestalten: Du entwickelst Nutzungskonzepte und arbeitest an Flächennutzungsplänen, Verkehrsprojekten und nachhaltiger Stadtentwicklung.", partner: [{ name: "Stadt Essen", url: "https://www.essen.de/essenaktuell/job_und_karriere_/ausbildungsberufe/aktuelle_ausbildungsangebote.de.html" }], standorte: ["Essen"] },
      { name: "Studium technische Gebäudeausrüstung", dauer: "3–4 Jahre", info: "Du lernst, moderne Gebäude technisch auszustatten und nachhaltig zu betreiben – von Heizung und Klima bis Stromversorgung und Brandschutz: Du planst komplexe Systeme und analysierst den Energieverbrauch.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/studium_1/bachelorofengineeringtechnischegebaeudeausruestung.de.html" }], standorte: ["Essen"] },
      { name: "Umwelttechnolog:in Rohrleitungsnetze und Industrieanlagen", dauer: "3 Jahre", info: "Du planst und überwachst umweltfreundliche Systeme in Rohrleitungsnetzen und Industrieanlagen: Du reduzierst Energieverbrauch und Emissionen und verbesserst die Effizienz – unter Einhaltung umweltrechtlicher Vorgaben.", partner: ["Stadt Remscheid"] },
      { name: "Umwelttechnolog:in Wasserversorgung", dauer: "3 Jahre", info: "In der Wasserversorgungstechnik betreibst du Wasserwerke, wartest Wasserleitungen und behebst Störungen: Du überwachst Aufbereitungsanlagen, führst chemische Analysen durch und bedienst technische Systeme.", partner: ["Wuppertaler Stadtwerke"] },
      { name: "Umwelttechnolog:in Abwasserbewirtschaftung", dauer: "3 Jahre", info: "In der Abwasserbewirtschaftung überwachst und wartest du Abwasseranlagen, kontrollierst die Wasserqualität und führst Reparaturen durch. Die Ausbildung erfordert handwerkliches Geschick und technisches Verständnis.", partner: ["Wupperverband", "Wuppertaler Stadtwerke"] },
      { name: "Vermessungsoberinspektoranwärter:in", dauer: "3 Jahre (dual)", info: "Die Ausbildung bereitet dich auf anspruchsvolle Aufgaben in Vermessungstechnik und Geoinformatik vor: Du lernst Geodäsie, Kartografie und Landesvermessung und arbeitest mit modernen Instrumenten und Software.", partner: ["Stadt Remscheid"] }
    ]
  },
  {
    name: "Verkauf und Vertrieb",
    icon: "cart",
    beschreibung: "Verkaufen, beraten, organisieren – kaufmännische Berufe mit Kundenkontakt.",
    berufe: [
      { name: "Automobilkaufleute", dauer: "3 Jahre", info: "Automobilkaufleute sind für den Verkauf von Autos und die Kundenberatung zuständig: Du präsentierst Fahrzeuge, führst Verkaufsgespräche, erstellst Angebote und kümmerst dich um Finanzierungen und administrative Aufgaben.", partner: ["Autohaus Lackmann", "Procar Automobile"] },
      { name: "Einzelhandelskaufleute", dauer: "3 Jahre", info: "Einzelhandelskaufleute sind für den Verkauf von Waren zuständig: Du berätst Kund:innen, präsentierst Produkte, kassierst, verwaltest Bestände und führst Inventuren durch.", partner: ["Mencke", "Akzenta", "Beuthel"] },
      { name: "Fachverkäufer:in Lebensmittelhandwerk", dauer: "3 Jahre", info: "Als Fachverkäufer:in im Lebensmittelhandwerk verkaufst du in Bäckereien, Fleischereien oder Konditoreien: Du berätst Kund:innen zu Produkten und deren Zubereitung und wickelst den Verkauf ab.", partner: ["Akzenta"] },
      { name: "Handelsfachwirt:in", dauer: "ca. 3 Jahre", info: "Als Handelsfachwirt:in arbeitest du auf der mittleren Führungsebene im Handel: Du übernimmst kaufmännische Aufgaben wie Marketingplanung und Personalwesen sowie Verkauf und Kundenberatung – mit guten Chancen auf eine leitende Position.", partner: ["Akzenta"] },
      { name: "Hotelfachleute", dauer: "3 Jahre", info: "Die Ausbildung zu Hotelfachleuten vermittelt vielseitige Fähigkeiten für den Hotelbetrieb: Gästebetreuung, Restaurant- und Veranstaltungsmanagement sowie Zimmerwirtschaft.", partner: ["Wuppertaler Stadtwerke", "Culinaria"] },
      { name: "Fachkraft für Restaurant und Veranstaltungsgastronomie", dauer: "3 Jahre", info: "Du sorgst dafür, dass sich Gäste in Restaurants und bei Veranstaltungen wohlfühlen: Tische eindecken, Gläser polieren, Dekoration und Gästebetreuung gehören zu deinen Aufgaben.", partner: ["Barmenia Versicherungen", "Culinaria"] },
      { name: "Kaufleute für IT-Systemmanagement", dauer: "3 Jahre", info: "Als Kaufmann/-frau für IT-System-Management planst und betreust du IT-Systeme, analysierst Unternehmensanforderungen und entwickelst effiziente Lösungen – eine Kombination aus technischer Expertise und wirtschaftlichem Know-how.", partner: ["Stahlwille", "Stadt Wuppertal", "Wiesemann & Theis"] },
      { name: "Kaufleute im E-Commerce", dauer: "3 Jahre", info: "Als Kaufmann/-frau im E-Commerce baust und verwaltest du Online-Shops: Du pflegst das Sortiment, gibst Produkte ein, gestaltest Preise, analysierst Daten und übernimmst kaufmännische Aufgaben wie Rechnungen und Marketing.", partner: ["Schmersal", "Conmetall Meister", "E/D/E", "Wiesemann & Theis"] },
      { name: "Kaufleute Marketingkommunikation", dauer: "3 Jahre", info: "Kaufleute für Marketingkommunikation planen, setzen um und kontrollieren Marketingmaßnahmen: Du entwickelst Werbekonzepte, gestaltest Materialien, organisierst Veranstaltungen und betreust die Online-Präsenz von Unternehmen.", partner: ["Erfurt", "E/D/E"] },
      { name: "Kaufleute Spedition / Logistikdienstleistung", dauer: "3 Jahre", info: "Als Kaufmann/-frau für Spedition und Logistikdienstleistung organisierst und planst du Transporte: Du disponierst Waren, planst Touren, überwachst Transporte, berätst Kund:innen und erstellst Rechnungen.", partner: ["Erfurt"] },
      { name: "Veranstaltungskaufleute", dauer: "3 Jahre", info: "Als Veranstaltungskaufleute planst und organisierst du Events wie Konferenzen, Messen und Konzerte: Du verantwortest die gesamte Organisation von der Idee über die Budgetplanung bis zur Durchführung und Nachbereitung.", partner: ["Stadt Remscheid"] },
      { name: "Servicefachkraft im Dialogmarketing", dauer: "2 Jahre", info: "Die Ausbildung vermittelt professionelle Kundenkommunikation über Telefon, E-Mail und Chat: Du berätst Kund:innen, bearbeitest Anfragen und Reklamationen und unterstützt bei Vertriebs- und Marketingkampagnen.", partner: ["020 EPOS"], standorte: ["Essen"] }
    ]
  },
  {
    name: "Wirtschaft & Verwaltung",
    icon: "briefcase",
    beschreibung: "Büro, Finanzen, Verwaltung und duale Studiengänge – strukturiert in die Karriere.",
    berufe: [
      { name: "Bankkaufleute", dauer: "2,5–3 Jahre", info: "Bankkaufleute beraten Kund:innen in Finanzangelegenheiten, informieren über Produkte wie Konten und Kredite und wickeln Kundenaufträge ab. Die Ausbildung erfolgt im Betrieb und in der Berufsschule.", partner: ["Stadtsparkasse Wuppertal", "Volksbank im Bergischen Land"] },
      { name: "Duales Studium Bachelor of Arts", dauer: "3 Jahre", info: "Ein duales Studium in geisteswissenschaftlich-wirtschaftlichen Bereichen (z. B. Kommunikation, Psychologie, Management): Du wechselst zwischen Hochschulphasen und Praxis in Unternehmen, Kultur- oder Medieneinrichtungen." },
      { name: "Duales Studium Bachelor of Laws", dauer: "3 Jahre", info: "Das duale Studium vermittelt umfassende Kenntnisse in Zivil-, Straf- und Verwaltungsrecht: Du wechselst zwischen Hochschule und Praxis in Verwaltung, Gerichten oder Unternehmen.", partner: ["Stadt Wuppertal", "Jobcenter Wuppertal", "Stadt Remscheid"] },
      { name: "Duales Studium Business Administration", dauer: "3 Jahre", info: "Das Studium vermittelt betriebswirtschaftliche Kenntnisse in Marketing, Finanzwesen, Personalmanagement und Unternehmensführung – im Wechsel aus Hochschultheorie und Praxis im Unternehmen.", partner: ["Fohrer", "Wilkinson Sword", "Freund"] },
      { name: "Duales Studium Business Administration + Bankkaufmann", dauer: "ca. 4 Jahre", info: "Im dualen Studium kombinierst du betriebswirtschaftliches Wissen mit Bankfachkenntnissen: Du wechselst zwischen Hochschule und Praxis in Finanzinstituten und arbeitest danach in vielfältigen Positionen bei Banken oder Versicherungen.", partner: ["Volksbank im Bergischen Land"] },
      { name: "Duales Studium BWL", dauer: "3 Jahre", info: "Im dualen Studium BWL erwirbst du Kenntnisse in Wirtschaft und Unternehmensführung und wendest sie in Bereichen wie Marketing, Finanzwesen und Personal an – im Wechsel zwischen Hochschule und Betrieb.", partner: ["Vaillant", "Blaues Kreuz", "Conmetall Meister"] },
      { name: "Duales Studium General Management", dauer: "3 Jahre", info: "Das duale Studium vermittelt betriebswirtschaftliche Kenntnisse in Marketing, Finanzwesen und Personal: Nach dem Wechsel aus Theorie und Praxis arbeitest du z. B. in Unternehmensberatung, Controlling oder Projektmanagement.", partner: ["E/D/E"] },
      { name: "Duales Studium Gesundheitswesen", dauer: "3 Jahre", info: "Das duale Studium verbindet Theorie und Praxis rund um Organisation und Verwaltung im Gesundheitsbereich – mit Fokus auf Gesundheitsmanagement, -ökonomie und -politik. Du arbeitest später in Kliniken, Pflegeeinrichtungen oder Krankenkassen.", partner: ["Blaues Kreuz"] },
      { name: "Duales Studium International Management", dauer: "3–4 Jahre", info: "Im dualen Studium lernst du, wie international tätige Unternehmen erfolgreich agieren: Du planst internationale Geschäftsstrategien, managst interkulturelle Teams und analysierst ausländische Märkte.", partner: ["Coroplast"] },
      { name: "Duales Studium Kindheitspädagogik", dauer: "3 Jahre", info: "Das duale Studium kombiniert Hochschulphasen mit Praxis in Kitas: Du arbeitest später als pädagogische Fachkraft, Einrichtungsleitung oder in der frühkindlichen Bildungsforschung.", partner: ["Stadt Wuppertal"] },
      { name: "Duales Studium Soziale Arbeit", dauer: "3–4 Jahre", info: "Das duale Studium verbindet Hochschulausbildung mit Praxis in sozialen Einrichtungen: Du erwirbst Fachwissen in Pädagogik, Psychologie und Recht und wendest es z. B. bei Jugendämtern und Beratungsstellen an.", partner: ["Stadt Remscheid"] },
      { name: "Fachkraft für Lagerlogistik", dauer: "3 Jahre", info: "Als Fachkraft für Lagerlogistik organisierst und verwaltest du Waren: Wareneingang, Bestandskontrolle, Kommissionierung und Versand – eine vielseitige Rolle zwischen Lager und Büro.", partner: ["Erfurt", "WASI", "Gebrüder Becker", "Knipex", "PE Automotive", "Coroplast", "Metaq", "Freund", "Procar Automobile", "Stadt Wuppertal", "WKW Group", "Conmetall Meister", "Wiesemann & Theis", "Kaut", "E/D/E"] },
      { name: "Fachkraft im Fahrbetrieb", dauer: "3 Jahre", info: "Die Ausbildung vermittelt Kompetenzen im öffentlichen Nahverkehr: Du beförderst Fahrgäste sicher, hältst den Fahrplan ein und wartest Fahrzeugtechnik. Ein Führerschein der Klasse B ist erforderlich.", partner: ["Wuppertaler Stadtwerke", "Stadtwerke Remscheid"] },
      { name: "Fachkraft Leistungsgewährung", dauer: "ca. 2 Jahre", info: "Als Fachkraft für Leistungsgewährung bearbeitest du Anträge in der Sozialversicherung: Du prüfst Ansprüche, berücksichtigst gesetzliche Bestimmungen und entscheidest über Leistungen – eng mit den Antragstellenden.", partner: ["Jobcenter Wuppertal"] },
      { name: "Fachlagerist:in", dauer: "2 Jahre", info: "Als Fachlagerist:in verwaltest du Waren: Du lagerst ein, kommissionierst und hältst die Lagerplätze ordentlich – mit praktischer Lagerarbeit und Büroaufgaben.", partner: ["Schmersal", "Conmetall Meister", "Beuthel", "GEPA", "E/D/E"] },
      { name: "Kaufleute Büromanagement", dauer: "3 Jahre", info: "Als Kaufmann/-frau für Büromanagement organisierst du Büroabläufe: Du bearbeitest Schriftverkehr, planst Termine, unterstützt die Buchhaltung, koordinierst Kommunikation und kümmerst dich um Personalverwaltung und Veranstaltungen.", partner: ["Peter Barth GmbH", "Erfurt", "Autohaus Lackmann", "Wupperverband", "Vorwerk", "Mencke", "Coroplast", "Karl Deutsch", "Laré", "Stahlwille", "Wuppertaler Stadtwerke", "Beuthel", "Alex & Greiff GmbH", "Martin GmbH"] },
      { name: "Kaufleute Dialogmarketing", dauer: "3 Jahre", info: "Als Kaufmann/-frau für Dialogmarketing betreust du Kund:innen am Telefon oder per Chat, informierst über Produkte und entwickelst Strategien zur Kundenbindung.", partner: ["Stadt Wuppertal", "Stadtsparkasse Wuppertal", "Beuthel"] },
      { name: "Kaufleute für Digitalisierungsmanagement", dauer: "3 Jahre", info: "Als Kaufmann/-frau für Digitalisierungsmanagement verbindest du IT und kaufmännische Aufgaben: Du planst und verwaltest IT-Systeme, analysierst Anforderungen, berätst bei der Hard- und Software-Auswahl und führst Vertragsverhandlungen.", partner: ["Wupperverband", "Sparkasse Wuppertal", "Wuppertaler Stadtwerke"] },
      { name: "Kaufleute für Versicherungen und Finanzanlagen", dauer: "3 Jahre", info: "Du berätst Kund:innen zu Versicherungs- und Finanzprodukten, erstellst maßgeschneiderte Konzepte und kümmerst dich um Schadensregulierung und Vertragsverwaltung.", partner: ["Barmenia Versicherungen"] },
      { name: "Kaufleute für Versicherungen und Finanzanlagen + B. Sc. Risk and Insurance", dauer: "ca. 4 Jahre", info: "Im dualen Studium lernst du die Versicherungs- und Finanzbranche kennen – inkl. Kundenberatung, Konzepterstellung und Vertragsabwicklung – und absolvierst parallel einen Bachelor in Risk and Insurance mit Fokus Risikomanagement.", partner: ["Barmenia Versicherungen"] },
      { name: "Kaufleute Groß- & Außenhandelsmanagement", dauer: "3 Jahre", info: "Im Groß- und Außenhandel verwaltest du den Warenhandel: Du kaufst und verkaufst, erstellst Angebote, verhandelst mit Geschäftspartnern, überwachst den Warenfluss und bearbeitest Im- und Exportgeschäfte.", partner: ["WASI", "PE Automotive", "Fohrer", "Karl Deutsch", "Reeder und Kamp", "Conmetall Meister", "Kaut", "GEPA", "E/D/E"] },
      { name: "Steuerfachangestellte:r + Studium Taxation", dauer: "ca. 4–4,5 Jahre", info: "Die Ausbildung zum/zur Steuerfachangestellten mit dualem Studium Taxation verbindet Praxis und Theorie: Du erwirbst Fähigkeiten in Steuererklärungen und Mandantenberatung und vertiefst dein Wissen im Steuerrecht.", partner: ["Rinke Treuhand GmbH"] },
      { name: "Verwaltungsfachangestellte", dauer: "3 Jahre", info: "Verwaltungsfachangestellte sind zentrale Stützen der öffentlichen Verwaltung: Du bearbeitest verwaltungstechnische Aufgaben, erledigst Schriftverkehr, führst Akten und arbeitest direkt mit Bürger:innen – mit viel Sinn für Datenschutz.", partner: ["Stadt Remscheid", "Stadt Wuppertal", "Jobcenter Wuppertal"] },
      { name: "Verwaltungsfachangestellte im Ordnungsdienst", dauer: "3 Jahre", info: "Hier sorgst du für Sicherheit und Ordnung in Behörden und Ordnungsämtern: Du überwachst die Einhaltung von Gesetzen und Verordnungen, führst Kontrollen durch und erteilst Bußgelder.", partner: ["Stadt Remscheid"] },
      { name: "Verwaltungswirt:in", dauer: "2–3 Jahre", info: "Als Verwaltungswirt:in organisierst du Abläufe in öffentlichen Verwaltungen: Aktenverwaltung, Materialbestellung und Rechnungsbuchung gehören dazu. Die Ausbildung kombiniert theoretische und praktische Phasen.", partner: ["Stadt Wuppertal", "Jobcenter Wuppertal", "Stadt Remscheid"] },
      { name: "Verwaltungswirt:in im Ordnungsdienst", dauer: "ca. 2 Jahre", info: "Als Verwaltungswirt:in im Ordnungsdienst sorgst du für Sicherheit und Ordnung – etwa im Straßenverkehr oder bei Veranstaltungen: Du überwachst die Einhaltung von Vorschriften, kontrollierst Ausweise und erteilst Bußgelder.", partner: ["Stadt Wuppertal"] },
      { name: "Bachelor of Laws – Stadtinspektoranwärter:in", dauer: "3 Jahre (dual)", info: "In diesem dualen Studium arbeitest du an der Schnittstelle von Verwaltung, Recht und Bürgerdiensten: Du wendest Gesetze an, triffst Verwaltungsentscheidungen, bearbeitest Anträge und berätst Bürger:innen – mit Beamtenstatus.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/studium_1/boa_stadtinspektoranwaerterin.de.html" }], standorte: ["Essen"] },
      { name: "Stadtsekretäranwärter:in", dauer: "2 Jahre", info: "Diese duale Ausbildung im mittleren Verwaltungsdienst vermittelt städtische Prozesse – von der Antragsverwaltung bis zur Wahlorganisation: Praxis im Rathaus und Unterricht an der Verwaltungsschule, mit viel Bürgerkontakt.", partner: [{ name: "Stadt Essen", url: "https://karriere.essen.de/karrieremoeglichkeiten/schueler_innen/ausbildung_1/stadtsekretaeranwaerterin.de.html" }], standorte: ["Essen"] },
      { name: "Studium Verwaltungsbetriebswirtschaftslehre", dauer: "3 Jahre", info: "Das Studium verbindet wirtschaftliches Denken mit öffentlicher Verantwortung: Du lernst, wie Verwaltungen effizient arbeiten, und wirst auf Führungsaufgaben in Kommunen, Ministerien oder öffentlichen Unternehmen vorbereitet.", partner: [{ name: "Stadt Essen", url: "https://www.essen.de/essenaktuell/job_und_karriere_/ausbildungsberufe/aktuelle_ausbildungsangebote.de.html" }], standorte: ["Essen"] },
      { name: "Fachangestellte Medien- und Informationsdienste Archiv", dauer: "3 Jahre", info: "Als Fachangestellte:r für Medien- und Informationsdienste (Archiv) beschaffst, verwaltest und stellst du Medien und Informationen bereit: Du erfasst und ordnest Dokumente, machst sie zugänglich und berätst Nutzer:innen.", partner: ["Stadt Wuppertal", "Stadt Remscheid"] },
      { name: "Fachangestellte Medien- und Informationsdienste Bibliothek", dauer: "3 Jahre", info: "Als Fachangestellte:r für Medien- und Informationsdienste (Bibliothek) beschaffst und verwaltest du Medien, berätst Nutzer:innen bei der Recherche und organisierst Veranstaltungen.", partner: ["Stadt Wuppertal", "Stadt Remscheid"] },
      { name: "Immobilienkaufleute", dauer: "3 Jahre", info: "Immobilienkaufleute sind für Kauf, Verkauf und Vermietung von Immobilien zuständig: Du berätst Kund:innen, erstellst Exposés, führst Besichtigungen durch, verhandelst Verträge und übernimmst die kaufmännische Verwaltung.", partner: ["Allbau"], standorte: ["Essen"] },
      { name: "Industriekaufleute", dauer: "3 Jahre", info: "Industriekaufleute übernehmen kaufmännische und betriebswirtschaftliche Aufgaben: Steuerung der Betriebsabläufe, Materialwirtschaft, Vertrieb und Marketing, Personalwesen sowie Finanz- und Rechnungswesen.", partner: ["Gebrüder Becker", "Knipex", "WKW Group", "Vorwerk", "Vaillant", "Coroplast", "Metaq", "Gebr. Schmidt", "Schmersal", "Freund", "Vollmann Group", "Stahlwille", "Wuppertaler Stadtwerke", "Muckenhaupt & Nusselt", "Stadtwerke Remscheid", "Martin GmbH", "Emil Kreiskott GmbH", "Walther Pilot"] }
    ]
  }
];

/* ---- Hilfsfunktionen (von Übersicht & Detailseite genutzt) ---- */

function berufSlug(name) {
  return String(name)
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/:innen|:in|:r|\*in/g, "")
    .replace(/&/g, "und")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function berufTyp(name, dauer) {
  var n = String(name).toLowerCase();
  var d = String(dauer || "").toLowerCase();
  if (n.indexOf("freiwilligendienst") > -1) return "Freiwilligendienst";
  var istStudium = n.indexOf("studium") > -1 || n.indexOf("bachelor") === 0 ||
    n.indexOf("b. sc") > -1 || n.indexOf("b.sc") > -1 ||
    n.indexOf("kooperative ingenieur") > -1 || n.indexOf("kis studium") > -1;
  if (n.indexOf("duales studium") > -1 || n.indexOf("kooperative ingenieur") > -1 || n.indexOf("kis studium") > -1) return "Duales Studium";
  if (istStudium && d.indexOf("dual") > -1) return "Duales Studium";
  if (istStudium) return "Studium";
  return "Ausbildung";
}

/* Liefert ein flaches Array aller Berufe inkl. Kategorie & Slug. */
function alleBerufe() {
  var out = [];
  window.BERUFE_KATEGORIEN.forEach(function (kat) {
    kat.berufe.forEach(function (b) {
      var name = (typeof b === "string") ? b : b.name;
      var entry = (typeof b === "string") ? {} : b;
      out.push({
        name: name,
        slug: berufSlug(name),
        typ: berufTyp(name, entry.dauer),
        kategorie: kat.name,
        kategorieIcon: kat.icon,
        dauer: entry.dauer || null,
        info: entry.info || null,
        erwartet: entry.erwartet || null,
        mitbringen: entry.mitbringen || null,
        partner: entry.partner || null,
        bild: entry.bild || null,
        standorte: (typeof standorteFuer === "function") ? standorteFuer(berufSlug(name)) : (entry.standorte || ["Wuppertal"])
      });
    });
  });
  return out;
}

function findeBeruf(slug) {
  var all = alleBerufe();
  for (var i = 0; i < all.length; i++) {
    if (all[i].slug === slug) return all[i];
  }
  return null;
}

/* ===== berufe-ui.js ===== */
/* =========================================================
   NEST BildungsBar – Berufe-UI
   Übersicht (Suche, Interessen-Finder, Filter, Merkliste)
   + Detailseiten. Benötigt berufe-data.js und icons.js.
   ========================================================= */

/* ---------------- kleine Helfer ---------------- */
function escHtml(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
function escAttr(s) { return escHtml(s).replace(/"/g, "&quot;"); }
function ic(name, size, cls) { return (typeof svgIcon === "function") ? svgIcon(name, size, cls) : ""; }

/* ---------------- Link-Ziele (statisch vs. WordPress) ----------------
   In WordPress wird window.NEST_LINKS gesetzt (z. B. { beruf: "/beruf/",
   zukunft: "/deine-zukunft/", kontakt: "/kontakt/" }). Ohne diese Variable
   greifen die statischen .html-Dateinamen. */
function nestLinks() { return (window.NEST_LINKS && typeof window.NEST_LINKS === "object") ? window.NEST_LINKS : {}; }
function linkBeruf(slug) {
  var base = nestLinks().beruf || "beruf.html";
  var sep = base.indexOf("?") > -1 ? "&" : "?";
  return base + sep + "b=" + encodeURIComponent(slug);
}
function linkZukunft() { return nestLinks().zukunft || "deine-zukunft.html"; }
/* Studierenden-CTA: führt zur Terminbuchung (Fallback: Kontakt-Anker) */
function linkKontaktTermin() { return nestLinks().termin || (nestLinks().kontakt || "kontakt.html") + "#termin"; }

/* ---------------- Merkliste (localStorage) ---------------- */
function ladeMerkliste() {
  try { return JSON.parse(localStorage.getItem("bb_merkliste") || "[]"); } catch (e) { return []; }
}
function speichereMerkliste(arr) {
  try { localStorage.setItem("bb_merkliste", JSON.stringify(arr)); } catch (e) {}
}
function istGemerkt(slug) { return ladeMerkliste().indexOf(slug) > -1; }
function toggleMerk(slug) {
  var a = ladeMerkliste(); var i = a.indexOf(slug);
  if (i > -1) a.splice(i, 1); else a.push(slug);
  speichereMerkliste(a);
  return a.indexOf(slug) > -1;
}

/* ---------------- Interessen-Finder ---------------- */
var INTERESSEN = [
  { id: "menschen",   label: "Mit Menschen",       icon: "people",    cats: ["Gesundheitswesen", "Sozialer Bereich"] },
  { id: "gesundheit", label: "Gesundheit & Helfen", icon: "heart",     cats: ["Gesundheitswesen"], keywords: ["pflege", "sanität", "therapie", "rettung"] },
  { id: "technik",    label: "Technik & Maschinen", icon: "tools",     cats: ["Handwerk", "Technische Berufe"] },
  { id: "it",         label: "Computer & IT",       icon: "monitor",   keywords: ["informatik", "it-", "it ", "digital", "system", "daten"] },
  { id: "natur",      label: "Draußen & Natur",     icon: "leaf",      keywords: ["gärtner", "garten", "forst", "tier", "umwelt", "landschaft", "wasser", "arboristik"] },
  { id: "kreativ",    label: "Kreativ & Gestalten", icon: "palette",   keywords: ["mediengestalter", "glaser", "tischler", "bäcker", "koch", "architektur", "produktdesign", "gestalt", "veranstaltung"] },
  { id: "buero",      label: "Büro & Organisation", icon: "briefcase", cats: ["Wirtschaft & Verwaltung"], keywords: ["kaufleute", "verwaltung", "büro"] },
  { id: "verkauf",    label: "Verkauf & Kontakt",   icon: "cart",      cats: ["Verkauf und Vertrieb"] }
];
function interessePasst(interest, name, katName) {
  if (!interest) return true;
  var def = null;
  for (var i = 0; i < INTERESSEN.length; i++) { if (INTERESSEN[i].id === interest) def = INTERESSEN[i]; }
  if (!def) return true;
  if (def.cats && def.cats.indexOf(katName) > -1) return true;
  if (def.keywords) {
    var n = name.toLowerCase();
    for (var k = 0; k < def.keywords.length; k++) { if (n.indexOf(def.keywords[k]) > -1) return true; }
  }
  return false;
}

/* ---------------- Bild-Helfer ---------------- */
function berufBildStyle(slug) {
  var h = 0;
  for (var i = 0; i < slug.length; i++) { h = (h * 31 + slug.charCodeAt(i)) % 360; }
  var h2 = (h + 38) % 360;
  return "background:linear-gradient(135deg,hsl(" + h + ",48%,38%),hsl(" + h2 + ",54%,24%));";
}
function berufBildHtml(beruf, klass, iconSize) {
  var bild = beruf.bild || (window.BERUF_BILDER && window.BERUF_BILDER[beruf.slug]) || null;
  if (bild) {
    // In WordPress (window.NEST_ASSETS gesetzt) relative Pfade absolut machen:
    if (window.NEST_ASSETS && /^assets\//.test(bild)) { bild = window.NEST_ASSETS + bild; }
    return '<div class="' + klass + '"><img src="' + escAttr(bild) +
      '" alt="' + escAttr(beruf.name) + '" loading="lazy"></div>';
  }
  return '<div class="' + klass + '" style="' + berufBildStyle(beruf.slug) +
    '"><span class="bild-ic">' + ic(beruf.kategorieIcon, iconSize || 30) + "</span></div>";
}

/* ---------------- Übersicht ---------------- */
function renderBerufeUebersicht() {
  var root = document.getElementById("berufe-browser");
  if (!root || !window.BERUFE_KATEGORIEN) return;

  var kategorien = window.BERUFE_KATEGORIEN;
  var alle = alleBerufe();

  var arten = [];
  alle.forEach(function (b) { if (arten.indexOf(b.typ) < 0) arten.push(b.typ); });
  var artReihenfolge = ["Ausbildung", "Duales Studium", "Studium", "Freiwilligendienst"];
  arten.sort(function (a, b) { return artReihenfolge.indexOf(a) - artReihenfolge.indexOf(b); });

  var state = { q: "", cat: "*", typ: "*", ort: "*", interest: null, nurMerk: false };

  var interestTags = INTERESSEN.map(function (it) {
    return '<button class="interest-tag" data-int="' + it.id + '">' + ic(it.icon, 18) + "<span>" + escHtml(it.label) + "</span></button>";
  }).join("");

  var artOptions = '<option value="*">Alle Arten</option>' +
    arten.map(function (t) { return '<option value="' + escAttr(t) + '">' + escHtml(t) + "</option>"; }).join("");
  var catOptions = '<option value="*">Alle Berufsfelder</option>' +
    kategorien.map(function (k) { return '<option value="' + escAttr(k.name) + '">' + escHtml(k.name) + "</option>"; }).join("");

  root.innerHTML =
    '<div class="berufe-tools">' +
      '<div class="bt-searchrow">' +
        '<div class="berufe-search">' + ic("search", 18, "search-ic") +
          '<input type="text" id="beruf-suche" placeholder="Beruf suchen, z. B. Mechatroniker, Pflege, Informatik" autocomplete="off"></div>' +
        '<button class="merk-toggle" id="merk-toggle">' + ic("heart", 17) + '<span>Merkliste</span><b id="merk-count">0</b></button>' +
      "</div>" +
      '<div class="berufe-interests" id="berufe-interests">' + interestTags + "</div>" +
      '<div class="bt-filterrow">' +
        '<div class="select-wrap">' + ic("briefcase", 15, "sel-ic") + '<select id="f-cat" aria-label="Berufsfeld">' + catOptions + "</select></div>" +
        '<div class="select-wrap">' + ic("cap", 15, "sel-ic") + '<select id="f-art" aria-label="Art">' + artOptions + "</select></div>" +
        '<div class="select-wrap">' + ic("pin", 15, "sel-ic") + '<select id="f-ort" aria-label="Standort"><option value="*">Alle Standorte</option><option value="Wuppertal">Wuppertal</option><option value="Essen">Essen</option></select></div>' +
        '<button class="reset-btn" id="reset-btn" hidden>Zurücksetzen</button>' +
        '<span class="berufe-count" id="beruf-count"></span>' +
      "</div>" +
    "</div>" +
    '<div id="beruf-list"></div>';

  function aktualisiereMerkToggle() {
    var n = ladeMerkliste().length;
    var btn = document.getElementById("merk-toggle");
    document.getElementById("merk-count").textContent = n;
    btn.classList.toggle("active", state.nurMerk);
    btn.classList.toggle("has", n > 0);
  }
  function filterAktiv() {
    return state.q || state.cat !== "*" || state.typ !== "*" || state.ort !== "*" || state.interest || state.nurMerk;
  }

  function draw() {
    var q = state.q.trim().toLowerCase();
    var merk = ladeMerkliste();
    var html = "";
    var total = 0;

    kategorien.forEach(function (k) {
      if (state.cat !== "*" && state.cat !== k.name) return;

      var items = k.berufe.map(function (b) {
        var name = (typeof b === "string") ? b : b.name;
        var entry = (typeof b === "string") ? {} : b;
        var st = (typeof standorteFuer === "function") ? standorteFuer(berufSlug(name)) : (entry.standorte || ["Wuppertal"]);
        return { name: name, slug: berufSlug(name), typ: berufTyp(name, entry.dauer), kategorieIcon: k.icon, bild: entry.bild || null, standorte: st };
      }).filter(function (it) {
        if (q && it.name.toLowerCase().indexOf(q) < 0) return false;
        if (state.typ !== "*" && it.typ !== state.typ) return false;
        if (state.ort !== "*" && it.standorte.indexOf(state.ort) < 0) return false;
        if (!interessePasst(state.interest, it.name, k.name)) return false;
        if (state.nurMerk && merk.indexOf(it.slug) < 0) return false;
        return true;
      }).sort(function (a, b) { return a.name.localeCompare(b.name, "de"); });

      if (!items.length) return;
      total += items.length;

      html += '<div class="beruf-cat">';
      html += '<div class="beruf-cat-head"><div class="ic">' + ic(k.icon, 22) + "</div><div><h3>" +
        escHtml(k.name) + "</h3><p>" + escHtml(k.beschreibung) + '</p></div><span class="cat-count">' +
        items.length + " Berufe</span></div>";
      html += '<div class="beruf-grid">';
      items.forEach(function (it) {
        var gem = merk.indexOf(it.slug) > -1;
        html += '<div class="beruf-card-wrap">' +
          '<a class="beruf-link" href="' + linkBeruf(it.slug) + '">' +
            berufBildHtml(it, "beruf-thumb", 30) +
            '<span class="bl-body"><span class="bl-text"><span class="bl-name">' + escHtml(it.name) + "</span>" +
            '<span class="bl-typ">' + escHtml(it.typ) + "</span></span>" +
            '<span class="bl-arrow">&rarr;</span></span></a>' +
          '<button class="merk-heart' + (gem ? " on" : "") + '" data-slug="' + it.slug +
            '" aria-label="Merken" title="Merken">' + ic("heart", 17) + "</button>" +
          "</div>";
      });
      html += "</div></div>";
    });

    var listEl = document.getElementById("beruf-list");
    if (total) {
      listEl.innerHTML = html;
    } else if (state.nurMerk) {
      listEl.innerHTML = '<div class="beruf-empty">Deine Merkliste ist noch leer. Tippe bei einem Beruf auf das Herz, um ihn dir zu merken – so kannst du deine Auswahl mit zur Beratung bringen.</div>';
    } else {
      listEl.innerHTML = '<div class="beruf-empty">Keine Berufe gefunden. Versuch einen anderen Suchbegriff oder setz die Filter zurück.</div>';
    }

    document.getElementById("beruf-count").textContent =
      total + (state.nurMerk ? " gemerkt" : " von " + alle.length);
    document.getElementById("reset-btn").hidden = !filterAktiv();
  }

  // ---- Events ----
  root.querySelector("#beruf-suche").addEventListener("input", function (e) { state.q = e.target.value; draw(); });

  root.querySelectorAll(".interest-tag").forEach(function (tag) {
    tag.addEventListener("click", function () {
      var id = tag.getAttribute("data-int");
      var aktiv = state.interest === id;
      root.querySelectorAll(".interest-tag").forEach(function (t) { t.classList.remove("active"); });
      state.interest = aktiv ? null : id;
      if (!aktiv) tag.classList.add("active");
      draw();
    });
  });

  root.querySelector("#f-cat").addEventListener("change", function (e) { state.cat = e.target.value; draw(); });
  root.querySelector("#f-art").addEventListener("change", function (e) { state.typ = e.target.value; draw(); });
  root.querySelector("#f-ort").addEventListener("change", function (e) { state.ort = e.target.value; draw(); });

  document.getElementById("merk-toggle").addEventListener("click", function () {
    state.nurMerk = !state.nurMerk; aktualisiereMerkToggle(); draw();
  });

  document.getElementById("reset-btn").addEventListener("click", function () {
    state = { q: "", cat: "*", typ: "*", ort: "*", interest: null, nurMerk: false };
    root.querySelector("#beruf-suche").value = "";
    root.querySelector("#f-cat").value = "*";
    root.querySelector("#f-art").value = "*";
    root.querySelector("#f-ort").value = "*";
    root.querySelectorAll(".interest-tag").forEach(function (t) { t.classList.remove("active"); });
    aktualisiereMerkToggle(); draw();
  });

  document.getElementById("beruf-list").addEventListener("click", function (e) {
    var heart = e.target.closest(".merk-heart");
    if (!heart) return;
    e.preventDefault(); e.stopPropagation();
    var jetzt = toggleMerk(heart.getAttribute("data-slug"));
    heart.classList.toggle("on", jetzt);
    aktualisiereMerkToggle();
    if (state.nurMerk && !jetzt) draw();
  });

  aktualisiereMerkToggle();
  draw();
}

/* ---------------- Detailseite ---------------- */
function renderBerufDetail() {
  var root = document.getElementById("beruf-detail");
  if (!root) return;

  var slug = new URLSearchParams(window.location.search).get("b");
  var beruf = slug ? findeBeruf(slug) : null;

  if (!beruf) {
    document.title = "Beruf nicht gefunden – NEST BildungsBar";
    root.innerHTML =
      '<section class="bg-white"><div class="container" style="text-align:center;padding:40px 0;">' +
      "<h1 style='color:var(--navy);'>Beruf nicht gefunden</h1>" +
      "<p>Diesen Beruf konnten wir leider nicht finden.</p>" +
      '<a class="btn btn-primary" href="' + linkZukunft() + '">Zur Berufsübersicht</a>' +
      "</div></section>";
    return;
  }

  document.title = beruf.name + " – NEST BildungsBar";

  var standorte = (beruf.standorte && beruf.standorte.length ? beruf.standorte : ["Wuppertal", "Essen"]).join(" & ");
  var dauer = beruf.dauer || standardDauer(beruf.typ);
  var intro = beruf.info ? escHtml(beruf.info) : standardIntro(beruf);
  var gem = istGemerkt(beruf.slug);

  var hero =
    '<section class="hero"><div class="container"><div class="hero-inner">' +
    '<div class="hero-text">' +
    '<div class="breadcrumb"><a href="' + linkZukunft() + '">Berufswelt</a> · ' + escHtml(beruf.kategorie) + "</div>" +
    '<span class="hero-badge">' + escHtml(beruf.typ) + "</span>" +
    "<h1>" + escHtml(beruf.name) + "</h1>" +
    '<p class="lead">' + escHtml(beruf.kategorie) +
    " – wir beraten dich kostenlos und vermitteln dich an passende Betriebe.</p>" +
    '<div class="hero-actions"><a class="btn btn-primary" href="' + linkKontaktTermin() + '">Beratung buchen</a>' +
    '<button class="btn btn-ghost detail-merk">' + ic("heart", 16) + "<span>" + (gem ? "Gemerkt" : "Merken") + "</span></button></div>" +
    "</div></div></div></section>";

  var body =
    '<section class="bg-white"><div class="container"><div class="beruf-layout">' +
    '<div class="beruf-main">' +
    berufBildHtml(beruf, "beruf-hero-img", 56) +
    "<h2>Worum geht's?</h2><p>" + intro + "</p>" +
    "<h2>Das erwartet dich</h2>" + standardErwartet(beruf) +
    "<h2>Das solltest du mitbringen</h2>" + standardMitbringen(beruf) +
    (beruf.partner && beruf.partner.length
      ? "<h2>Mögliche Arbeitgeber</h2><p>Diese Unternehmen aus unserem Netzwerk bilden in diesem Beruf aus – klick für die Karriereseite:</p><div class=\"partner-chips\">" +
        beruf.partner.map(function (p) {
          var name = (typeof p === "string") ? p : p.name;
          var url = (p && typeof p === "object" && p.url) ? p.url
            : ((window.UNTERNEHMEN && window.UNTERNEHMEN[name]) ? window.UNTERNEHMEN[name] : null);
          return url
            ? '<a class="partner-chip is-link" href="' + escAttr(url) + '" target="_blank" rel="noopener">' + escHtml(name) + ' <span class="ext">&#8599;</span></a>'
            : '<span class="partner-chip">' + escHtml(name) + "</span>";
        }).join("") + "</div>"
      : "") +
    "<h2>So unterstützt dich die BildungsBar</h2><p>Wir helfen dir, herauszufinden, ob „" +
    escHtml(beruf.name) + "“ zu dir passt, bereiten dich auf die Bewerbung vor und stellen den Kontakt zu passenden Unternehmen aus unserem Netzwerk her – alles kostenlos und auf Augenhöhe.</p>" +
    "</div>" +
    '<aside><div class="steckbrief"><h3>Steckbrief</h3>' +
    sbRow("cap", "Art", beruf.typ) +
    sbRow("compass", "Berufsfeld", beruf.kategorie) +
    sbRow("clock", "Dauer", dauer) +
    sbRow("pin", "Standorte", standorte) +
    '<a class="btn btn-primary" href="' + linkKontaktTermin() + '">Termin buchen</a>' +
    '<button class="btn btn-outline detail-merk" style="width:100%;justify-content:center;margin-top:8px;">' + ic("heart", 16) + "<span>" + (gem ? "Gemerkt" : "Merken") + "</span></button>" +
    "</div></aside>" +
    "</div></div></section>";

  var cta =
    '<section class="cta-section on-white"><div class="container"><div class="cta-inner">' +
    '<span class="section-label" style="display:flex;justify-content:center;">Interesse geweckt?</span>' +
    "<h2>Starte mit „<em>" + escHtml(beruf.name) + "</em>“</h2>" +
    "<p>Buch dir einen kostenlosen Termin an der BildungsBar – wir finden gemeinsam heraus, ob dieser Weg zu dir passt.</p>" +
    '<div class="cta-actions"><a class="btn btn-primary" href="' + linkKontaktTermin() + '">Termin buchen</a>' +
    '<a class="btn btn-ghost" href="' + linkZukunft() + '">Weitere Berufe</a></div>' +
    "</div></div></section>";

  root.innerHTML = hero + body + cta;

  var btns = root.querySelectorAll(".detail-merk");
  btns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var jetzt = toggleMerk(beruf.slug);
      btns.forEach(function (b) {
        b.classList.toggle("on", jetzt);
        var sp = b.querySelector("span"); if (sp) sp.textContent = jetzt ? "Gemerkt" : "Merken";
      });
    });
    if (gem) btn.classList.add("on");
  });
}

/* ---- Standardtexte (Fallback) ---- */
function standardDauer(typ) {
  if (typ === "Duales Studium") return "ca. 3–4 Jahre";
  if (typ === "Studium") return "ca. 3–4 Jahre (Bachelor)";
  if (typ === "Freiwilligendienst") return "6–18 Monate";
  return "i. d. R. 3 – 3,5 Jahre";
}
function standardIntro(b) {
  return "Die Ausbildung zum/zur „" + escHtml(b.name) + "“ findet im Bereich " + escHtml(b.kategorie) +
    " statt. Du lernst praxisnah im Betrieb und in der Berufsschule.";
}
/* Liste aus Array bauen */
function ulCheck(arr) {
  return "<ul class='list-check'>" + arr.map(function (x) { return "<li>" + escHtml(x) + "</li>"; }).join("") + "</ul>";
}
/* Erstes passendes Schlüsselwort -> Text */
function matchKW(name, map) {
  var n = name.toLowerCase();
  for (var i = 0; i < map.length; i++) {
    var keys = map[i][0];
    for (var k = 0; k < keys.length; k++) { if (n.indexOf(keys[k]) > -1) return map[i][1]; }
  }
  return null;
}

/* Schlüsselwort-Bausteine: "Das erwartet dich" (Tätigkeit/Umfeld) */
var ERWARTET_KW = [
  [["fachinformatik", "informatik", "it-", "it ", "it-s", "digital", "system", "daten"], "Programmieren, Konfigurieren und Arbeit mit IT-Systemen"],
  [["elektronik", "elektro", "energieelektro", "mechatronik"], "Arbeit an Schaltungen, Steuerungen und elektrischer Technik"],
  [["zerspan", "werkzeugmech", "industriemech", "maschinen", "anlagenmech", "metall", "verfahrensmech", "produktionstech"], "Arbeit an Maschinen, Anlagen und Bauteilen aus Metall & Co."],
  [["gärtner", "garten", "landschaft", "forst", "tier", "umwelt", "wasser", "arboristik", "abwasser"], "Arbeit draußen in der Natur, mit Pflanzen, Tieren oder Umwelt"],
  [["dachdeck", "fliesen", "tischler", "glaser", "bauzeichn", "bauingenieur", "hochbau", "maurer", "anlagenmechaniker für sanitär"], "Handwerkliche Arbeit auf der Baustelle und in der Werkstatt"],
  [["koch", "köch", "bäck", "fleisch", "konditor", "gastro", "hotel", "restaurant", "lebensmittel", "hauswirtschaft"], "Arbeit mit Lebensmitteln und Gästen – mit Sinn für Qualität"],
  [["pflege", "sanität", "therapie", "anästhesie", "operationstech", "radiolog", "laboratorium", "zahn", "hebamme", "medizin"], "Direkter Umgang mit Patient:innen und medizinische Aufgaben"],
  [["erzieh", "kinder", "sozial", "heilerziehung", "pädagog", "freiwillig"], "Pädagogische und betreuende Arbeit mit und für Menschen"],
  [["vermessung", "geomat", "geoinformatik", "raumplanung", "architektur"], "Planen, Messen und Arbeit mit Karten, Plänen und Geodaten"],
  [["mediengestalter", "medientech", "veranstaltung"], "Kreative Arbeit an Medien, Gestaltung oder Events"],
  [["verkauf", "einzelhandel", "handel", "marketing", "dialogmarketing", "e-commerce", "automobilkaufleute"], "Beratung, Verkauf und viel Kontakt zu Kund:innen"],
  [["brandmeister", "löschsystem", "feuerwehr"], "Einsätze für Brandschutz, Sicherheit und Rettung"],
  [["bank", "versicher", "steuer", "kaufleute", "büromanagement", "verwaltung", "immobilien", "logistik", "lager", "spedition", "management", "business", "bwl"], "Organisierende Tätigkeiten im Büro, mit Zahlen und Kund:innen"]
];
/* Schlüsselwort-Bausteine: "Das solltest du mitbringen" (Interesse/Stärke) */
var MITBRINGEN_KW = [
  [["fachinformatik", "informatik", "it-", "it ", "digital", "system", "daten"], "Spaß am Programmieren und logischem Denken"],
  [["elektronik", "elektro", "energieelektro"], "Interesse an Strom, Schaltungen und Technik"],
  [["zerspan", "werkzeugmech", "industriemech", "mechatronik", "maschinen", "anlagenmech", "metall", "verfahrensmech"], "Technisches Verständnis und handwerkliches Geschick"],
  [["gärtner", "garten", "landschaft", "forst", "tier", "umwelt", "wasser", "arboristik", "abwasser"], "Freude an der Arbeit im Freien und an der Natur"],
  [["dachdeck", "fliesen", "tischler", "glaser", "bau", "hochbau", "maurer", "sanitär"], "Handwerkliches Geschick und körperliche Fitness"],
  [["koch", "köch", "bäck", "fleisch", "konditor", "gastro", "hotel", "restaurant", "lebensmittel", "hauswirtschaft"], "Freude an Lebensmitteln, Sauberkeit und Service"],
  [["pflege", "sanität", "therapie", "anästhesie", "operationstech", "radiolog", "laboratorium", "zahn", "hebamme", "medizin"], "Einfühlungsvermögen und Sorgfalt im Umgang mit Menschen"],
  [["erzieh", "kinder", "sozial", "heilerziehung", "pädagog", "freiwillig"], "Geduld, Empathie und Freude an der Arbeit mit Menschen"],
  [["vermessung", "geomat", "geoinformatik", "raumplanung", "architektur", "bauingenieur"], "Interesse an Mathematik und genauem, sorgfältigem Arbeiten"],
  [["mediengestalter", "medientech", "veranstaltung"], "Kreativität und Organisationstalent"],
  [["verkauf", "einzelhandel", "handel", "marketing", "dialogmarketing", "e-commerce", "automobilkaufleute"], "Kommunikationsstärke und Freundlichkeit"],
  [["brandmeister", "löschsystem", "feuerwehr"], "Körperliche Fitness und Verantwortungsbewusstsein"],
  [["bank", "versicher", "steuer", "kaufleute", "büromanagement", "verwaltung", "immobilien", "logistik", "lager", "spedition", "management", "business", "bwl"], "Organisationstalent und Zahlenverständnis"]
];

var ERWARTET_UMFELD = {
  "Gesundheitswesen": "Arbeit im Team mit Ärzt:innen und Pflegekräften",
  "Handwerk": "Abwechslung zwischen Werkstatt, Baustelle und Kund:innen",
  "Sozialer Bereich": "Abwechslungsreiche Tage mit viel menschlichem Kontakt",
  "Technische Berufe": "Arbeit im Team an technischen Projekten",
  "Verkauf und Vertrieb": "Arbeit im Team mit direktem Kundenkontakt",
  "Wirtschaft & Verwaltung": "Strukturierter Arbeitsalltag im Büro und Team"
};
var MITBRINGEN_SOFT = {
  "Gesundheitswesen": "Verantwortungsbewusstsein und Belastbarkeit",
  "Handwerk": "Sorgfalt, Zuverlässigkeit und Teamgeist",
  "Sozialer Bereich": "Kommunikationsstärke und Verantwortungsbewusstsein",
  "Technische Berufe": "Sorgfalt, Teamgeist und Lernbereitschaft",
  "Verkauf und Vertrieb": "Zuverlässigkeit und Organisationstalent",
  "Wirtschaft & Verwaltung": "Sorgfalt, Zuverlässigkeit und Teamgeist"
};

function standardErwartet(b) {
  if (b.erwartet && b.erwartet.length) return ulCheck(b.erwartet);
  if (b.typ === "Freiwilligendienst")
    return ulCheck(["Praktischer Einblick in ein Berufsfeld deiner Wahl", "Begleitseminare und persönliche Weiterentwicklung", "Taschengeld und ggf. Verpflegung oder Unterkunft", "Orientierung für deine spätere Berufswahl"]);

  var akademisch = (b.typ === "Duales Studium" || b.typ === "Studium");
  var domain = matchKW(b.name, ERWARTET_KW) || "Abwechslungsreiche, fachbezogene Aufgaben";
  var umfeld = ERWARTET_UMFELD[b.kategorie] || "Arbeit im Team mit erfahrenen Fachleuten";
  var typeBullet = akademisch
    ? (b.typ === "Duales Studium" ? "Wechsel aus Studium an der Hochschule und bezahlten Praxisphasen" : "Theorie an der Hochschule kombiniert mit praktischer Anwendung")
    : "Praxis im Betrieb und Theorie in der Berufsschule – mit Ausbildungsvergütung";
  var outcome = akademisch
    ? "Anerkannter Bachelor-Abschluss mit besten Karrierechancen"
    : "Anerkannter Berufsabschluss mit guten Übernahmechancen";
  return ulCheck([domain, umfeld, typeBullet, outcome]);
}

function standardMitbringen(b) {
  if (b.mitbringen && b.mitbringen.length) return ulCheck(b.mitbringen);
  if (b.typ === "Freiwilligendienst")
    return ulCheck(["Offenheit, Engagement und Zuverlässigkeit", "Freude an der Arbeit mit Menschen", "Teamgeist und Eigeninitiative", "Mindestalter je nach Einsatzstelle"]);

  var akademisch = (b.typ === "Duales Studium" || b.typ === "Studium");
  var domain = matchKW(b.name, MITBRINGEN_KW) || ("Interesse am Bereich " + b.kategorie);
  var soft = MITBRINGEN_SOFT[b.kategorie] || "Motivation, Zuverlässigkeit und Teamgeist";
  var abschluss = akademisch
    ? "Hochschulzugangsberechtigung (Abitur oder Fachabitur)"
    : "Den passenden Schulabschluss (je nach Betrieb)";
  return ulCheck([domain, soft, abschluss, "Lust, Neues zu lernen und anzupacken"]);
}
function sbRow(icon, lbl, val) {
  return '<div class="sb-row"><span class="ic">' + ic(icon, 18) + '</span><span><span class="lbl">' +
    escHtml(lbl) + '</span><br><span class="val">' + val + "</span></span></div>";
}

document.addEventListener("DOMContentLoaded", function () {
  renderBerufeUebersicht();
  renderBerufDetail();
});

/* ===== stellen-ui.js ===== */
/* =========================================================
   NEST BildungsBar – Aktuelle Stellen (UI, horizontale Leiste)
   Filtert abgelaufene Stellen automatisch heraus und verlinkt
   auf die Berufs-Detailseite. Benötigt stellen-data.js,
   icons.js und (optional) berufe-data.js für die Links.
   ========================================================= */

(function () {
  var TAGE = window.STELLEN_SICHTBAR_TAGE || 30;
  var MS_TAG = 86400000;

  function heute0() { var d = new Date(); d.setHours(0, 0, 0, 0); return d; }
  function tageRest(a) {
    var s = new Date(a + "T00:00:00"); if (isNaN(s)) return -1;
    return Math.ceil((new Date(s.getTime() + TAGE * MS_TAG) - heute0()) / MS_TAG);
  }
  function tageAlt(a) {
    var s = new Date(a + "T00:00:00"); if (isNaN(s)) return 9999;
    return Math.floor((heute0() - s) / MS_TAG);
  }
  function esc(s) { return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  function escA(s) { return esc(s).replace(/"/g, "&quot;"); }
  function icn(n, s) { return (typeof svgIcon === "function") ? svgIcon(n, s) : ""; }

  /* Link-Ziele: in WordPress via window.NEST_LINKS, sonst statische .html */
  function nl() { return (window.NEST_LINKS && typeof window.NEST_LINKS === "object") ? window.NEST_LINKS : {}; }
  function lBeruf(slug) { var b = nl().beruf || "beruf.html"; return b + (b.indexOf("?") > -1 ? "&" : "?") + "b=" + encodeURIComponent(slug); }
  function lKontakt() { return (nl().kontakt || "kontakt.html") + "#termin"; }
  function lKoop() { return nl().kooperation || "kooperation.html"; }

  /* Monogramm aus dem Firmennamen (1–2 Buchstaben). */
  function monogramm(firma) {
    var w = String(firma).replace(/&/g, " ").split(/\s+/).filter(Boolean);
    var m = (w[0] ? w[0][0] : "") + (w[1] ? w[1][0] : "");
    return m.toUpperCase() || "•";
  }
  /* deterministische Farbe je Firma */
  function logoStyle(firma) {
    var h = 0; for (var i = 0; i < firma.length; i++) h = (h * 31 + firma.charCodeAt(i)) % 360;
    return "background:linear-gradient(135deg,hsl(" + h + ",55%,42%),hsl(" + ((h + 30) % 360) + ",58%,30%));";
  }
  function berufLink(beruf) {
    if (typeof berufSlug === "function" && typeof findeBeruf === "function") {
      var slug = berufSlug(beruf);
      if (findeBeruf(slug)) return lBeruf(slug);
    }
    return null;
  }
  function artClass(art) {
    var a = (art || "").toLowerCase();
    if (a.indexOf("dual") > -1) return "art-dual";
    if (a.indexOf("praktikum") > -1) return "art-prakt";
    return "art-azubi";
  }

  function karte(s) {
    var rest = tageRest(s.aktiviertAm);
    var neu = tageAlt(s.aktiviertAm) <= 7;
    var baldAb = rest <= 5;
    var flag = neu ? '<span class="sc-flag neu">Neu</span>'
      : (baldAb ? '<span class="sc-flag bald">Endet bald</span>' : "");
    var restTxt = (baldAb ? "noch " + rest + (rest === 1 ? " Tag" : " Tage") : "noch " + rest + " Tage");
    var link = s.url || berufLink(s.beruf) || lKontakt();

    return '<a class="stellen-card" href="' + escA(link) + '">' +
      '<div class="sc-top"><span class="sc-logo" style="' + logoStyle(s.firma) + '">' + esc(monogramm(s.firma)) + "</span>" + flag + "</div>" +
      '<div class="sc-titel">' + esc(s.beruf) + "</div>" +
      '<div class="sc-firma">' + esc(s.firma) + "</div>" +
      '<div class="sc-meta">' +
      '<span class="sc-art ' + artClass(s.art) + '">' + esc(s.art) + "</span>" +
      '<span class="sc-tag">' + icn("pin", 13) + esc(s.ort) + "</span>" +
      (s.start ? '<span class="sc-tag">' + icn("calendar", 13) + esc(s.start) + "</span>" : "") +
      "</div>" +
      '<div class="sc-foot"><span class="sc-rest">' + icn("clock", 13) + restTxt + "</span>" +
      '<span class="sc-go">Details &rarr;</span></div>' +
      "</a>";
  }

  /* Lädt Stellen aus WordPress (window.NEST_STELLEN_API) oder nutzt lokale Demo-Daten. */
  function ladeStellen(cb) {
    var api = window.NEST_STELLEN_API;
    if (api && window.fetch) {
      fetch(api).then(function (r) { return r.json(); })
        .then(function (d) { cb(Array.isArray(d) ? d : (window.STELLEN || [])); })
        .catch(function () { cb(window.STELLEN || []); });
    } else { cb(window.STELLEN || []); }
  }

  function render(daten) {
    var root = document.getElementById("stellen-section");
    if (!root || !daten) return;

    var aktiv = daten
      .filter(function (s) { return tageRest(s.aktiviertAm) >= 0; })
      .sort(function (a, b) { return new Date(b.aktiviertAm) - new Date(a.aktiviertAm); });

    var orte = ["*", "Wuppertal", "Essen"];
    var ortFilter = "*";

    var chips = orte.map(function (o) {
      return '<button class="ort-chip' + (o === "*" ? " active" : "") + '" data-ort="' + o + '">' +
        (o === "*" ? "Alle Standorte" : icn("pin", 13) + o) + "</button>";
    }).join("");

    root.innerHTML =
      '<div class="stellen-strip-head">' +
        '<div><span class="section-label">Jobbörse</span>' +
        "<h2>Aktuelle Stellen</h2>" +
        "<p>" + aktiv.length + " offene Plätze von Unternehmen aus unserem Netzwerk · 30 Tage aktuell</p></div>" +
        '<a class="btn btn-outline" href="' + lKoop() + '">Stelle eintragen</a>' +
      "</div>" +
      '<div class="stellen-orte">' + chips + "</div>" +
      '<div class="stellen-strip" id="stellen-strip"></div>';

    function zeichne() {
      var liste = aktiv.filter(function (s) { return ortFilter === "*" || s.ort === ortFilter; });
      var html = liste.length ? liste.map(karte).join("")
        : '<div class="stellen-empty">Für „' + esc(ortFilter) + "“ sind aktuell keine Stellen ausgeschrieben.</div>";
      document.getElementById("stellen-strip").innerHTML = html;
    }

    root.querySelectorAll(".ort-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        root.querySelectorAll(".ort-chip").forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        ortFilter = chip.getAttribute("data-ort");
        zeichne();
      });
    });

    if (!aktiv.length) {
      document.getElementById("stellen-strip").innerHTML =
        '<div class="stellen-empty">Aktuell sind keine Stellen ausgeschrieben. Schau bald wieder vorbei!</div>';
    } else {
      zeichne();
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    ladeStellen(render);
  });
})();

/* ===== termin.js ===== */
/* =========================================================
   NEST BildungsBar – Terminbuchung (Schüler:innen)
   Erzeugt die nächsten Dienstags-/Donnerstags-Termine,
   verwaltet Standort/Datum/Uhrzeit und baut eine vorab
   ausgefüllte E-Mail-Anfrage (kein Backend nötig).
   Optional: an ein Buchungs-Plugin (Amelia, Bookly …) koppeln.
   ========================================================= */
(function () {
  var app = document.getElementById("termin-app");
  if (!app) return;

  var EMPFAENGER = (window.NEST_TERMIN_MAIL || "info@nest-bildungsbar.de");
  var WDAYS = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  var MONS  = ["Jan", "Feb", "März", "Apr", "Mai", "Juni", "Juli", "Aug", "Sept", "Okt", "Nov", "Dez"];
  var MONS_LANG = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  // Nur EIN Slot: 17:00 Uhr. Kapazität pro Tag: Wuppertal 4, Essen 2.
  var UHRZEIT = "17:00 Uhr";
  var KAPAZITAET = { "Wuppertal": 4, "Essen": 2 };
  var ANZAHL = 8; // wie viele Di/Do-Termine angeboten werden

  var state = { ort: "", adr: "", datum: null, datumText: "", zeit: "" };
  var belegung = {};   // { "YYYY-MM-DD": anzahl } für den gewählten Standort
  var kapazitaet = 0;  // max. Buchungen pro Tag am gewählten Standort

  /* ---------- nächste Di/Do-Termine erzeugen ---------- */
  function naechsteTermine(n) {
    var out = [];
    var d = new Date(); d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 1); // ab morgen
    var guard = 0;
    while (out.length < n && guard < 120) {
      var wd = d.getDay();
      if (wd === 2 || wd === 4) out.push(new Date(d));
      d.setDate(d.getDate() + 1);
      guard++;
    }
    return out;
  }
  function iso(d) {
    return d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
  }
  function langText(d) {
    return WDAYS[d.getDay()] + ", " + d.getDate() + ". " + MONS_LANG[d.getMonth()] + " " + d.getFullYear();
  }
  var TERMINE = naechsteTermine(ANZAHL);

  /* ---------- Datums-Kacheln (inkl. „ausgebucht") ---------- */
  var dateList = document.getElementById("tb-date-list");
  function renderDates() {
    dateList.innerHTML = "";
    TERMINE.forEach(function (d) {
      var key = iso(d);
      var frei = kapazitaet > 0 ? Math.max(0, kapazitaet - (belegung[key] || 0)) : -1;
      var voll = kapazitaet > 0 && frei <= 0;
      var b = document.createElement("button");
      b.type = "button";
      b.className = "tb-date" + (voll ? " tb-date--full" : "") + (state.datum === key ? " active" : "");
      b.disabled = voll;
      var restHtml = voll
        ? '<div class="d-full">ausgebucht</div>'
        : (frei >= 0 ? '<div class="d-rest' + (frei === 1 ? ' d-rest--knapp' : '') + '">' + (frei === 1 ? "1 Platz frei" : frei + " Plätze frei") + '</div>' : '');
      b.innerHTML = '<div class="d-wday">' + WDAYS[d.getDay()] + '</div>' +
                    '<div class="d-day">' + d.getDate() + '</div>' +
                    '<div class="d-mon">' + MONS[d.getMonth()] + '</div>' +
                    restHtml;
      if (!voll) {
        b.addEventListener("click", function () {
          dateList.querySelectorAll(".tb-date").forEach(function (x) { x.classList.remove("active"); });
          b.classList.add("active");
          state.datum = key;
          state.datumText = langText(d);
          update();
        });
      }
      dateList.appendChild(b);
    });
  }

  /* ---------- Uhrzeit: einziger Slot 17:00 Uhr (vorausgewählt) ---------- */
  var timeList = document.getElementById("tb-time-list");
  function renderZeit() {
    timeList.innerHTML = "";
    state.zeit = UHRZEIT;
    var b = document.createElement("button");
    b.type = "button";
    b.className = "tb-time active";
    b.textContent = UHRZEIT;
    b.addEventListener("click", function () { b.classList.add("active"); state.zeit = UHRZEIT; update(); });
    timeList.appendChild(b);
  }

  /* ---------- Belegung des Standorts laden (für „ausgebucht") ---------- */
  function ladeVerfuegbarkeit(ort, cb) {
    belegung = {};
    kapazitaet = KAPAZITAET[ort] || 0;
    var api = window.NEST_VERFUEGBARKEIT_API;
    if (!api || !window.fetch) { if (cb) cb(); return; }
    fetch(api + "?standort=" + encodeURIComponent(ort))
      .then(function (r) { return r.json(); })
      .then(function (d) {
        if (d && d.belegung) belegung = d.belegung;
        if (d && typeof d.kapazitaet === "number") kapazitaet = d.kapazitaet;
        if (cb) cb();
      })
      .catch(function () { if (cb) cb(); });
  }

  /* ---------- Standort ---------- */
  app.querySelectorAll(".tb-ort").forEach(function (btn) {
    btn.addEventListener("click", function () {
      app.querySelectorAll(".tb-ort").forEach(function (x) { x.classList.remove("active"); });
      btn.classList.add("active");
      state.ort = btn.getAttribute("data-ort");
      state.adr = btn.getAttribute("data-adr") || "";
      state.datum = null; state.datumText = "";
      renderZeit();
      ladeVerfuegbarkeit(state.ort, function () { renderDates(); update(); });
      update();
    });
  });

  renderDates(); // Startansicht (alle Tage, Schritt ist bis zur Standortwahl gesperrt)

  /* ---------- Felder ---------- */
  var fName = document.getElementById("tb-name");
  var fMail = document.getElementById("tb-email");
  var fPhone = document.getElementById("tb-phone");
  var fSchule = document.getElementById("tb-schule");
  var fMsg = document.getElementById("tb-msg");
  var fPriv = document.getElementById("tb-privacy");
  [fName, fMail, fPhone, fSchule, fMsg].forEach(function (el) {
    if (el) el.addEventListener("input", update);
  });
  if (fPriv) fPriv.addEventListener("change", update);

  /* ---------- Zusammenfassung + Validierung ---------- */
  var sumOrt = document.getElementById("sum-ort");
  var sumDat = document.getElementById("sum-datum");
  var sumZeit = document.getElementById("sum-zeit");
  var sumName = document.getElementById("sum-name");
  var btn = document.getElementById("tb-submit");
  var stepDate = document.getElementById("step-date");
  var stepTime = document.getElementById("step-time");

  function setVal(el, txt) {
    if (!el) return;
    if (txt) { el.textContent = txt; el.classList.remove("empty"); }
    else { el.textContent = "noch offen"; el.classList.add("empty"); }
  }
  function mailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

  function update() {
    setVal(sumOrt, state.ort);
    setVal(sumDat, state.datumText);
    setVal(sumZeit, state.zeit);
    setVal(sumName, fName && fName.value.trim());

    // Folgeschritte erst freischalten, wenn Standort gewählt
    if (stepDate) stepDate.classList.toggle("tb-locked", !state.ort);
    if (stepTime) stepTime.classList.toggle("tb-locked", !state.datum);

    var ready = state.ort && state.datum && state.zeit &&
      fName && fName.value.trim() && fMail && mailOk(fMail.value.trim()) &&
      fPriv && fPriv.checked;
    if (btn) btn.disabled = !ready;
    return ready;
  }

  /* ---------- Absenden -> SMTP-Versand (mit mailto-Fallback) ---------- */
  function nestSendMail(payload) {
    var api = window.NEST_MAIL_API;
    if (!api || !window.fetch) return Promise.resolve(false);
    return fetch(api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return r.ok; }).catch(function () { return false; });
  }
  function baueDaten() {
    var betreff = "Terminbuchung BildungsBar – " + state.ort + " · " + state.datumText + " · " + state.zeit;
    var text = [
      "Neue Terminbuchung über die Website:", "",
      "Standort: " + state.ort + (state.adr ? " (" + state.adr + ")" : ""),
      "Datum: " + state.datumText,
      "Uhrzeit: " + state.zeit, "",
      "Name: " + (fName ? fName.value.trim() : ""),
      "E-Mail: " + (fMail ? fMail.value.trim() : ""),
      "Telefon: " + (fPhone && fPhone.value.trim() ? fPhone.value.trim() : "—"),
      "Schule/Klasse: " + (fSchule && fSchule.value.trim() ? fSchule.value.trim() : "—"), "",
      "Nachricht: " + (fMsg && fMsg.value.trim() ? fMsg.value.trim() : "—")
    ].join("\n");
    return { subject: betreff, text: text, replyTo: (fMail ? fMail.value.trim() : "") };
  }
  function mailtoVon(d) {
    return "mailto:" + EMPFAENGER + "?subject=" + encodeURIComponent(d.subject) + "&body=" + encodeURIComponent(d.text);
  }
  /* Buchung strukturiert an /api/buchung (speichert in Supabase + mailt) */
  function baueBuchung() {
    return {
      standort: state.ort, adresse: state.adr,
      datum: state.datum, datumText: state.datumText, uhrzeit: state.zeit,
      name: fName ? fName.value.trim() : "",
      email: fMail ? fMail.value.trim() : "",
      telefon: fPhone ? fPhone.value.trim() : "",
      schule: fSchule ? fSchule.value.trim() : "",
      nachricht: fMsg ? fMsg.value.trim() : ""
    };
  }
  function sendBuchung(payload) {
    var api = window.NEST_BUCHUNG_API;
    if (!api || !window.fetch) return Promise.resolve({ ok: false, status: 0 });
    return fetch(api, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) })
      .then(function (r) { return { ok: r.ok, status: r.status }; })
      .catch(function () { return { ok: false, status: 0 }; });
  }

  var form = document.getElementById("termin-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!update()) return;
      var fehler = document.getElementById("tb-fehler");
      if (fehler) fehler.style.display = "none";
      if (btn) { btn.disabled = true; btn.textContent = "Wird gebucht …"; }

      sendBuchung(baueBuchung()).then(function (res) {
        if (btn) { btn.disabled = false; btn.textContent = "Jetzt verbindlich buchen"; }

        // Tag ausgebucht (Kapazität erreicht) -> Formular bleibt, Hinweis + neu laden
        if (res.status === 409) {
          if (fehler) { fehler.textContent = "Dieser Termin ist leider ausgebucht. Bitte wähle einen anderen Tag."; fehler.style.display = "block"; }
          ladeVerfuegbarkeit(state.ort, function () { renderDates(); update(); });
          return;
        }

        var d = baueDaten();
        var mailto = mailtoVon(d);
        var recap = document.getElementById("tb-recap");
        if (recap) {
          recap.innerHTML =
            "<div><b>Standort:</b> " + state.ort + "</div>" +
            "<div><b>Datum:</b> " + state.datumText + "</div>" +
            "<div><b>Uhrzeit:</b> " + state.zeit + "</div>" +
            "<div><b>Name:</b> " + (fName ? fName.value.trim() : "") + "</div>";
        }
        var sendBtn = document.getElementById("tb-send-mail");
        if (sendBtn) sendBtn.setAttribute("href", mailto);
        var box = document.getElementById("tb-success");
        var formCard = document.getElementById("tb-formcard");
        if (box) box.classList.add("show");
        if (formCard) formCard.style.display = "none";
        if (box) box.scrollIntoView({ behavior: "smooth", block: "start" });

        var statusP = box ? box.querySelector("p") : null;
        if (res.ok) {
          if (statusP) statusP.textContent = "Dein Termin ist gebucht ✅ – du bekommst gleich eine Bestätigung per E-Mail. Am Tag vorher erinnern wir dich nochmal.";
          if (sendBtn) sendBtn.style.display = "none";
        } else {
          if (statusP) statusP.textContent = "Fast geschafft! Schick uns deine Buchung mit einem Klick – wir bestätigen dir den Termin per E-Mail.";
          if (sendBtn) sendBtn.style.display = "";
        }
      });
    });
  }

  /* ---------- Sonderanfrage-Formular ---------- */
  var anfrage = document.getElementById("anfrage-form");
  if (anfrage) {
    anfrage.addEventListener("submit", function (e) {
      e.preventDefault();
      var g = function (id) { var el = document.getElementById(id); return el ? el.value.trim() : ""; };
      var d = {
        subject: "Anfrage BildungsBar – " + (g("an-name") || "Schüler:in"),
        text: [
          "Neue Anfrage über die Website:", "",
          g("an-msg") || "(keine Nachricht)", "",
          "Name: " + g("an-name"),
          "E-Mail: " + g("an-email"),
          "Telefon: " + (g("an-phone") || "—"),
          "Wunschstandort: " + (g("an-ort") || "—")
        ].join("\n"),
        replyTo: g("an-email")
      };
      var mailto = mailtoVon(d);
      var note = anfrage.querySelector(".form-note");
      var sb = document.getElementById("an-send-mail");
      if (sb) sb.setAttribute("href", mailto);
      if (note) note.hidden = false;
      nestSendMail(d).then(function (ok) {
        if (ok) {
          if (note) note.innerHTML = "Danke! Deine Anfrage wurde gesendet – wir melden uns zeitnah bei dir. ✅";
          anfrage.reset();
        } else {
          window.location.href = mailto;
        }
      });
    });
  }

  update();
})();

/* ===== about.js ===== */
/* NEST – Über-uns: interaktiver Team-Foto-Wechsler (IIFE, DOM ist bereit) */
(function () {
  var items = document.querySelectorAll(".nest-about .team-member-item");
  var display = document.getElementById("teamPhotoDisplay");
  var photo = document.getElementById("teamPhoto");
  var nameEl = document.getElementById("teamOverlayName");
  var roleEl = document.getElementById("teamOverlayRole");
  if (!display || !items.length) return;

  items.forEach(function (item) {
    item.addEventListener("click", function () {
      if (this.classList.contains("active")) return;
      items.forEach(function (i) { i.classList.remove("active"); });
      this.classList.add("active");
      display.classList.add("fading");
      var newImg = this.dataset.img, newName = this.dataset.name, newRole = this.dataset.role;
      setTimeout(function () {
        photo.src = newImg; photo.alt = newName;
        nameEl.textContent = newName; roleEl.textContent = newRole;
        display.classList.remove("fading");
      }, 250);
    });
  });
})();

/* ===== Boot-Guard für Next/SPA ===== */
(function () {
  if (document.readyState === "loading") return; /* echtes DOMContentLoaded feuert noch */
  try { document.dispatchEvent(new Event("DOMContentLoaded")); } catch (e) {}
})();
