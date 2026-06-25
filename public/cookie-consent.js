/* NEST – DSGVO-Cookie-Einwilligung
 * Selbst-enthaltend: injiziert Styles + Banner, speichert die Auswahl.
 *
 * Öffentliche API (window.NestCookieConsent):
 *   .get()              → aktuelles Einwilligungs-Objekt (oder null)
 *   .hasConsent(cat)    → true/false für 'statistics' | 'marketing' | 'necessary'
 *   .open()             → Einstellungen erneut öffnen
 *   .reset()            → Einwilligung löschen und Banner neu zeigen
 *
 * Re-Open per Link: <a href="#cookie-einstellungen"> oder [data-cookie-settings]
 * Reagieren auf Änderungen: window.addEventListener('nest:cookie-consent', fn)
 *   → e.detail enthält das Einwilligungs-Objekt. Hier künftige Tracking-Skripte
 *     (z. B. Google Analytics) NUR laden, wenn e.detail.statistics === true.
 */
(function () {
  'use strict';

  var STORAGE_KEY = 'nest_cookie_consent';
  var VERSION = 1;
  var DS_LINK = '/datenschutz';

  /* ---------- Speicher ---------- */
  function load() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      var data = JSON.parse(raw);
      if (!data || data.v !== VERSION) return null;
      return data;
    } catch (e) { return null; }
  }
  function save(statistics, marketing) {
    var data = {
      v: VERSION,
      necessary: true,
      statistics: !!statistics,
      marketing: !!marketing,
      date: new Date().toISOString()
    };
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {}
    notify(data);
    return data;
  }
  function notify(data) {
    try {
      window.dispatchEvent(new CustomEvent('nest:cookie-consent', { detail: data }));
    } catch (e) {}
  }

  /* ---------- Styles ---------- */
  function injectStyles() {
    if (document.getElementById('nest-cc-style')) return;
    var css =
'.nest-cc-overlay{position:fixed;inset:0;z-index:99998;background:rgba(8,15,29,.55);opacity:0;visibility:hidden;transition:opacity .25s ease,visibility .25s ease}' +
'.nest-cc-overlay.is-open{opacity:1;visibility:visible}' +
'.nest-cc{position:fixed;z-index:99999;left:50%;bottom:24px;transform:translate(-50%,16px);width:min(680px,calc(100vw - 32px));' +
'background:#fff;color:var(--ink,#0F2145);border:1px solid rgba(15,33,69,.10);border-radius:var(--radius-lg,14px);' +
'box-shadow:0 18px 50px rgba(8,15,29,.30);font-family:inherit;opacity:0;visibility:hidden;transition:opacity .25s ease,transform .25s ease,visibility .25s ease}' +
'.nest-cc.is-open{opacity:1;visibility:visible;transform:translate(-50%,0)}' +
'.nest-cc__bar{height:5px;background:var(--amber,#EFA500);border-radius:var(--radius-lg,14px) var(--radius-lg,14px) 0 0}' +
'.nest-cc__body{padding:22px 24px 20px}' +
'.nest-cc__title{font-size:18px;font-weight:800;margin:0 0 8px;color:var(--navy,#0F2145)}' +
'.nest-cc__text{font-size:14px;line-height:1.6;margin:0 0 16px;color:#3b4660}' +
'.nest-cc__text a{color:var(--amber-dark,#d4920a);font-weight:600;text-decoration:underline}' +
'.nest-cc__actions{display:flex;flex-wrap:wrap;gap:10px}' +
'.nest-cc__btn{flex:1 1 auto;min-width:140px;appearance:none;cursor:pointer;font:inherit;font-size:14px;font-weight:700;' +
'padding:12px 18px;border-radius:999px;border:1px solid transparent;transition:background .15s ease,border-color .15s ease,color .15s ease,transform .15s ease}' +
'.nest-cc__btn:hover{transform:translateY(-1px)}' +
'.nest-cc__btn:focus-visible{outline:3px solid rgba(239,165,0,.45);outline-offset:2px}' +
'.nest-cc__btn--accept{background:var(--amber,#EFA500);color:#fff}' +
'.nest-cc__btn--accept:hover{background:var(--amber-dark,#d4920a)}' +
'.nest-cc__btn--reject{background:#fff;color:var(--navy,#0F2145);border-color:rgba(15,33,69,.20)}' +
'.nest-cc__btn--reject:hover{border-color:var(--amber,#EFA500);color:var(--amber-dark,#d4920a)}' +
'.nest-cc__btn--settings{flex:0 0 auto;min-width:0;background:transparent;color:#5b6678;border-color:transparent;text-decoration:underline;padding:12px 10px}' +
'.nest-cc__btn--settings:hover{color:var(--navy,#0F2145)}' +
'.nest-cc__details{margin:4px 0 18px;border-top:1px solid rgba(15,33,69,.08);display:none}' +
'.nest-cc.is-details .nest-cc__details{display:block}' +
'.nest-cc.is-details .nest-cc__intro-actions{display:none}' +
'.nest-cc__cat{display:flex;align-items:flex-start;gap:12px;padding:14px 0;border-bottom:1px solid rgba(15,33,69,.08)}' +
'.nest-cc__cat-info{flex:1 1 auto}' +
'.nest-cc__cat-name{font-size:14px;font-weight:700;color:var(--navy,#0F2145);margin:0 0 2px}' +
'.nest-cc__cat-desc{font-size:12.5px;line-height:1.5;color:#5b6678;margin:0}' +
'.nest-cc__switch{position:relative;flex:0 0 auto;width:44px;height:24px;margin-top:2px}' +
'.nest-cc__switch input{position:absolute;opacity:0;width:100%;height:100%;margin:0;cursor:pointer}' +
'.nest-cc__slider{position:absolute;inset:0;background:#cbd2de;border-radius:999px;transition:background .15s ease}' +
'.nest-cc__slider::before{content:"";position:absolute;left:3px;top:3px;width:18px;height:18px;background:#fff;border-radius:50%;transition:transform .15s ease;box-shadow:0 1px 3px rgba(0,0,0,.25)}' +
'.nest-cc__switch input:checked + .nest-cc__slider{background:var(--amber,#EFA500)}' +
'.nest-cc__switch input:checked + .nest-cc__slider::before{transform:translateX(20px)}' +
'.nest-cc__switch input:disabled + .nest-cc__slider{background:#aeb7c6;cursor:not-allowed}' +
'.nest-cc__switch input:focus-visible + .nest-cc__slider{outline:3px solid rgba(239,165,0,.45);outline-offset:2px}' +
'@media (max-width:520px){.nest-cc__actions{flex-direction:column}.nest-cc__btn{width:100%}.nest-cc__btn--settings{order:3}}' +
'@media (prefers-reduced-motion:reduce){.nest-cc,.nest-cc__overlay,.nest-cc__btn{transition:none}}';
    var s = document.createElement('style');
    s.id = 'nest-cc-style';
    s.textContent = css;
    document.head.appendChild(s);
  }

  /* ---------- Markup ---------- */
  var overlayEl, bannerEl, statInput, mktInput, lastFocus;

  function build() {
    injectStyles();

    overlayEl = document.createElement('div');
    overlayEl.className = 'nest-cc-overlay';

    bannerEl = document.createElement('section');
    bannerEl.className = 'nest-cc';
    bannerEl.setAttribute('role', 'dialog');
    bannerEl.setAttribute('aria-modal', 'true');
    bannerEl.setAttribute('aria-labelledby', 'nest-cc-title');
    bannerEl.setAttribute('aria-describedby', 'nest-cc-text');
    bannerEl.innerHTML =
      '<div class="nest-cc__bar"></div>' +
      '<div class="nest-cc__body">' +
        '<h2 class="nest-cc__title" id="nest-cc-title">Datenschutz &amp; Cookies</h2>' +
        '<p class="nest-cc__text" id="nest-cc-text">Wir verwenden Cookies und ähnliche Technologien. Einige sind technisch ' +
          'notwendig, andere helfen uns, diese Website zu verbessern. Du entscheidest selbst, was du zulässt. ' +
          'Mehr dazu in unserer <a href="' + DS_LINK + '">Datenschutzerklärung</a>.</p>' +
        '<div class="nest-cc__details">' +
          cat('Notwendig', 'Erforderlich für den Betrieb der Website (z. B. Speicherung deiner Cookie-Auswahl). Immer aktiv.', 'necessary', true, true) +
          cat('Statistik', 'Anonyme Auswertung der Nutzung, damit wir Inhalte und Bedienung verbessern können.', 'statistics', false, false) +
          cat('Marketing', 'Wird genutzt, um Inhalte und ggf. Anzeigen relevanter zu gestalten.', 'marketing', false, false) +
        '</div>' +
        '<div class="nest-cc__actions">' +
          '<button type="button" class="nest-cc__btn nest-cc__btn--reject" data-cc="reject">Nur notwendige</button>' +
          '<button type="button" class="nest-cc__btn nest-cc__btn--settings" data-cc="toggle-details">Einstellungen</button>' +
          '<button type="button" class="nest-cc__btn nest-cc__btn--reject" data-cc="save" style="display:none">Auswahl speichern</button>' +
          '<button type="button" class="nest-cc__btn nest-cc__btn--accept" data-cc="accept">Alle akzeptieren</button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(overlayEl);
    document.body.appendChild(bannerEl);

    statInput = bannerEl.querySelector('#nest-cc-statistics');
    mktInput = bannerEl.querySelector('#nest-cc-marketing');

    bannerEl.addEventListener('click', onClick);
    document.addEventListener('keydown', onKeydown);
  }

  function cat(name, desc, id, checked, disabled) {
    return '<div class="nest-cc__cat">' +
      '<div class="nest-cc__cat-info">' +
        '<p class="nest-cc__cat-name">' + name + '</p>' +
        '<p class="nest-cc__cat-desc">' + desc + '</p>' +
      '</div>' +
      '<label class="nest-cc__switch">' +
        '<input type="checkbox" id="nest-cc-' + id + '"' + (checked ? ' checked' : '') + (disabled ? ' disabled' : '') + '>' +
        '<span class="nest-cc__slider"></span>' +
      '</label>' +
    '</div>';
  }

  /* ---------- Verhalten ---------- */
  function onClick(e) {
    var btn = e.target.closest('[data-cc]');
    if (!btn) return;
    var action = btn.getAttribute('data-cc');
    if (action === 'accept') { save(true, true); close(); }
    else if (action === 'reject') { save(false, false); close(); }
    else if (action === 'save') { save(statInput && statInput.checked, mktInput && mktInput.checked); close(); }
    else if (action === 'toggle-details') showDetails();
  }
  function onKeydown(e) {
    if (e.key === 'Escape' && bannerEl.classList.contains('is-open') && load()) close();
  }

  function showDetails() {
    bannerEl.classList.add('is-details');
    bannerEl.querySelector('[data-cc="toggle-details"]').style.display = 'none';
    bannerEl.querySelector('[data-cc="save"]').style.display = '';
  }

  function open(forceDetails) {
    var saved = load();
    if (statInput) statInput.checked = saved ? !!saved.statistics : false;
    if (mktInput) mktInput.checked = saved ? !!saved.marketing : false;
    bannerEl.classList.remove('is-details');
    bannerEl.querySelector('[data-cc="toggle-details"]').style.display = '';
    bannerEl.querySelector('[data-cc="save"]').style.display = 'none';
    if (forceDetails) showDetails();
    overlayEl.classList.add('is-open');
    bannerEl.classList.add('is-open');
    lastFocus = document.activeElement;
    var focusBtn = bannerEl.querySelector('.nest-cc__btn--accept');
    if (focusBtn) setTimeout(function () { focusBtn.focus(); }, 60);
  }
  function close() {
    overlayEl.classList.remove('is-open');
    bannerEl.classList.remove('is-open');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
  }

  /* ---------- Re-Open-Links ---------- */
  function bindReopenLinks() {
    document.addEventListener('click', function (e) {
      var t = e.target.closest('a[href="#cookie-einstellungen"], [data-cookie-settings]');
      if (!t) return;
      e.preventDefault();
      open(true);
    });
  }

  /* ---------- Public API ---------- */
  window.NestCookieConsent = {
    get: load,
    hasConsent: function (cat) {
      var d = load();
      return !!(d && d[cat]);
    },
    open: function () { open(true); },
    reset: function () {
      try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
      open(false);
    }
  };

  /* ---------- Init ---------- */
  function init() {
    build();
    bindReopenLinks();
    var saved = load();
    if (saved) notify(saved);   // bestehende Einwilligung an Listener melden
    else open(false);           // Erstbesuch: Banner zeigen
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
