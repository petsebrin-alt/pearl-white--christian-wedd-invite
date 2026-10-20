/* =============================================================================
   MAIN — render every section from content.js, then wire up navigation.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  if (!AD || !AD.content) return;
  var C = AD.content;
  var root = document.documentElement;

  var NAV = [
    ['welcome', 'Welcome'], ['save-the-date', 'Save the Date'], ['countdown', 'Countdown'],
    ['family', 'Our Families'], ['events', 'Wedding Events'], ['dress-code', 'Dress Code'],
    ['gifting', 'Gifting'], ['venues', 'Venues & Directions'], ['wishes', 'Wishing Wall'],
    ['rsvp', 'RSVP'], ['travel', 'Travel & Stay'], ['contact', 'Contact'], ['thank-you', 'Thank You']
  ];

  function syncMotionClass() {
    root.classList.toggle('motion-ok', !AD.reducedMotion());
  }

  function renderSections() {
    AD.sections.forEach(function (s) {
      var el = document.getElementById(s.id);
      if (!el) return;
      try {
        if (s.render) el.innerHTML = s.render(C);
        if (s.init) s.init(el, C);
      } catch (err) {
        console.error('[' + s.id + '] could not render', err);
        el.innerHTML = '<div class="container"><p class="render-error">This part of the invitation could not be displayed. Please refresh the page.</p></div>';
      }
    });
  }

  function initHeader() {
    var header = document.getElementById('site-header');
    var mono = header.querySelector('[data-content="monogram"]');
    if (mono && C.couple) mono.textContent = C.couple.monogram || (C.couple.bride.charAt(0) + ' & ' + C.couple.groom.charAt(0));

    var ticking = false;
    function onScroll() {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    var menu = AD.dialog.create({
      id: 'menu-dialog',
      title: '<span class="script menu-title">' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '</span>',
      className: 'dlg--menu',
      body: '<nav aria-label="Sections"><ul class="menu-list">' + NAV.map(function (n) {
        return '<li><a href="#' + n[0] + '"><span class="pearl" aria-hidden="true"></span>' + AD.esc(n[1]) + '</a></li>';
      }).join('') + '</ul></nav>' +
      (AD.has(AD.weddingDate()) ? '<div class="menu-foot"><p class="eyebrow">' + AD.esc(AD.formatDate(AD.weddingDate())) + '</p></div>' : '')
    });
    menu.querySelector('.dlg__title').setAttribute('aria-label', 'Menu — ' + C.couple.bride + ' and ' + C.couple.groom);
    var btn = document.getElementById('menu-btn');
    btn.addEventListener('click', function () { AD.dialog.open(menu, btn); });
    AD.$$('.menu-list a', menu).forEach(function (a) {
      a.addEventListener('click', function (e) {
        e.preventDefault();
        var id = a.getAttribute('href').slice(1);
        menu._opener = null; // focus goes to the chosen section instead
        AD.dialog.close(menu);
        setTimeout(function () {
          var t = document.getElementById(id);
          if (!t) return;
          t.scrollIntoView({ behavior: AD.reducedMotion() ? 'auto' : 'smooth' });
          if (history.replaceState) history.replaceState(null, '', '#' + id);
          var h = t.querySelector('h1, h2');
          if (h) { if (!h.hasAttribute('tabindex')) h.setAttribute('tabindex', '-1'); h.focus({ preventScroll: true }); }
        }, AD.reducedMotion() ? 10 : 230);
      });
    });
  }

  function initPreviewNote() {
    var note = document.getElementById('preview-note');
    if (!note || !(C.site && C.site.previewNotice)) return;
    note.innerHTML = AD.icon('info') +
      '<span>Preview version — details marked <em>“To be provided”</em> are awaiting confirmation' +
      (AD.store.isConnected() ? '.' : ', and the RSVP and wishing-wall forms are in preview mode.') + '</span>' +
      '<button type="button" aria-label="Dismiss preview note">' + AD.icon('close') + '</button>';
    note.hidden = false;
    note.querySelector('button').addEventListener('click', function () { note.hidden = true; });
  }

  syncMotionClass();
  if (window.matchMedia) {
    var mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mq.addEventListener) mq.addEventListener('change', syncMotionClass);
  }
  if (C.site && C.site.title) document.title = C.site.title;

  AD.orn.injectDefs();
  renderSections();
  initHeader();
  initPreviewNote();
  // Small heading lines spell themselves out as they scroll in (as in the reference video).
  AD.$$('#main .section-head .eyebrow, #welcome .eyebrow').forEach(function (el) { AD.splitLetters(el, 0.15); });
  if (AD.decor) AD.decor.init();
  window.__AD_READY = true;
  AD.splash.init();
})();
