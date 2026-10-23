/* =============================================================================
   13. CONTACT — after the couple's "hover me" video: three round buttons
   (the bride's family, the groom's family, the event coordinator), each with
   a picture, strung together on a pearl-and-bead chain. Hovering a button
   (or tapping it on a phone) grows it into a card — the small round picture
   becomes a large photograph and the details appear: name, number and the
   Call and WhatsApp buttons. Moving away (or tapping outside, or ×) shrinks
   it back. Call and WhatsApp work only with real numbers; until then they
   are shown faded with "To be provided".
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  var V = '?v=20261023d';

  function digits(n) { return String(n || '').replace(/[^\d]/g, ''); }
  function initials(s) { return String(s || '').split(/\s+/).filter(Boolean).map(function (w) { return w.charAt(0); }).join('').slice(0, 2).toUpperCase(); }

  function picture(p, cls) {
    return AD.has(p.photo)
      ? '<img class="' + cls + '" src="' + AD.esc(p.photo) + V + '" alt="" decoding="async">'
      : '<span class="' + cls + ' ct-mono" aria-hidden="true">' + AD.esc(initials(p.label || p.role)) + '</span>';
  }

  function card(p, i, C) {
    var phone = AD.has(p.phone) ? p.phone : null;
    var wa = AD.has(p.whatsapp) ? p.whatsapp : phone;
    var waText = encodeURIComponent('Hello, I have a question about ' + C.couple.bride + ' & ' + C.couple.groom + '’s wedding.');
    var id = 'ct-card-' + i;
    return '<li class="ct-item" data-ct>' +
      '<button class="ct-pill" type="button" aria-expanded="false" aria-controls="' + id + '">' +
        picture(p, 'ct-av') +
        '<span class="ct-pill__label">' + AD.esc(p.label || p.role) + '</span>' +
      '</button>' +
      AD.tapHand('ct-hand') +
      '<div class="ct-card" id="' + id + '" role="group" aria-label="' + AD.esc(p.role) + '" hidden>' +
        picture(p, 'ct-card__photo') +
        '<div class="ct-card__body">' +
          '<p class="ct-card__role">' + AD.esc(p.role) + '</p>' +
          '<p class="ct-card__name">' + (AD.has(p.name) ? AD.esc(p.name) : AD.tbp('Name')) + '</p>' +
          (AD.has(p.relationship) ? '<p class="ct-card__rel">' + AD.esc(p.relationship) + '</p>' : '') +
          '<p class="ct-card__phone">' + (phone ? '<span class="numerals">' + AD.esc(phone) + '</span>' : 'Phone ' + AD.tbp('Phone number')) + '</p>' +
          '<div class="ct-card__actions">' +
            (phone
              ? '<a class="btn btn--primary btn--sm" href="tel:+' + digits(phone) + '">' + AD.icon('phone') + 'Call</a>'
              : '<span class="btn btn--sm ct-off" aria-disabled="true" data-off>' + AD.icon('phone') + 'Call</span>') +
            (wa
              ? '<a class="btn btn--secondary btn--sm" href="https://wa.me/' + digits(wa) + '?text=' + waText + '" target="_blank" rel="noopener">' + AD.icon('whatsapp') + 'WhatsApp</a>'
              : '<span class="btn btn--sm ct-off" aria-disabled="true" data-off>' + AD.icon('whatsapp') + 'WhatsApp</span>') +
          '</div>' +
        '</div>' +
        '<button class="ct-card__close" type="button" aria-label="Close">' + AD.icon('close') + '</button>' +
      '</div>' +
    '</li>';
  }

  AD.register('contact', {
    render: function (C) {
      var people = (C.contacts || []).filter(function (p) { return p && AD.has(p.role); });
      return '<div class="container">' +
        AD.sectionHead({
          id: 'contact', eyebrow: 'Contact', title: 'Questions?',
          intro: 'For anything you need, please reach out to the family.'
        }) +
        '<p class="ct-hint reveal" aria-hidden="true"><span class="ct-hint--hover">Hover over a name</span><span class="ct-hint--tap">Tap a name</span> to see the details</p>' +
        '<ul class="ct-row reveal">' + people.map(function (p, i) {
          return (i ? '<li class="ct-chain" aria-hidden="true"></li>' : '') + card(p, i, C);
        }).join('') + '</ul>' +
      '</div>';
    },

    init: function (el) {
      var items = AD.$$('[data-ct]', el), row = el.querySelector('.ct-row');
      var still = AD.reducedMotion();
      var hoverable = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
      var openItem = null;

      // Where the card sits: centred on its button, kept inside the section.
      function position(item, card) {
        var pill = item.querySelector('.ct-pill');
        var ir = item.getBoundingClientRect(), pr = pill.getBoundingClientRect();
        var w = card.offsetWidth, h = card.offsetHeight, edge = 12;
        var left = pr.left + pr.width / 2 - w / 2;
        left = Math.max(edge, Math.min(left, document.documentElement.clientWidth - edge - w));
        card.style.left = (left - ir.left) + 'px';
        card.style.top = (pr.top + pr.height / 2 - h / 2 - ir.top) + 'px';
      }

      function open(item) {
        if (openItem === item) return;
        if (openItem) close(openItem);
        openItem = item;
        var pill = item.querySelector('.ct-pill'), card = item.querySelector('.ct-card');
        var av = pill.querySelector('.ct-av'), ph = card.querySelector('.ct-card__photo');
        clearTimeout(item._t);
        card.hidden = false;
        card.classList.remove('is-closing');
        position(item, card);
        // grow out of the button: the card starts clipped to the button and
        // the large photograph starts where the small round picture is
        var pr = pill.getBoundingClientRect(), cr = card.getBoundingClientRect();
        var ar = av.getBoundingClientRect(), fr = ph.getBoundingClientRect();
        card.style.setProperty('--from', 'inset(' + (pr.top - cr.top) + 'px ' + (cr.right - pr.right) + 'px ' + (cr.bottom - pr.bottom) + 'px ' + (pr.left - cr.left) + 'px round 999px)');
        card.style.setProperty('--ph', 'translate(' + (ar.left - fr.left) + 'px,' + (ar.top - fr.top) + 'px) scale(' + (ar.width / fr.width) + ',' + (ar.height / fr.height) + ')');
        if (!still) {
          card.classList.add('is-from');
          void card.offsetWidth;
          card.classList.remove('is-from');
        }
        item.classList.add('is-open');
        pill.setAttribute('aria-expanded', 'true');
      }
      function close(item) {
        if (!item) return;
        var pill = item.querySelector('.ct-pill'), card = item.querySelector('.ct-card');
        item.classList.remove('is-open');
        pill.setAttribute('aria-expanded', 'false');
        if (openItem === item) openItem = null;
        if (still) { card.hidden = true; return; }
        card.classList.add('is-closing');
        clearTimeout(item._t);
        item._t = setTimeout(function () { card.hidden = true; card.classList.remove('is-closing'); }, 380);
      }

      items.forEach(function (item) {
        var pill = item.querySelector('.ct-pill'), card = item.querySelector('.ct-card');
        if (hoverable) {
          item.addEventListener('mouseenter', function () { clearTimeout(item._leave); open(item); });
          item.addEventListener('mouseleave', function () { item._leave = setTimeout(function () { close(item); }, 140); });
        }
        pill.addEventListener('click', function () { if (item.classList.contains('is-open') && !hoverable) close(item); else open(item); });
        card.querySelector('.ct-card__close').addEventListener('click', function () { close(item); pill.focus({ preventScroll: true }); });
        AD.$$('[data-off]', card).forEach(function (b) {
          b.addEventListener('click', function () { AD.announce('Phone number to be provided.'); });
        });
      });
      // tap outside or press Escape: the card shrinks back
      document.addEventListener('click', function (e) { if (openItem && !openItem.contains(e.target)) close(openItem); });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && openItem) { var p = openItem.querySelector('.ct-pill'); close(openItem); p.focus({ preventScroll: true }); }
      });
      window.addEventListener('resize', function () { if (openItem) position(openItem, openItem.querySelector('.ct-card')); });
    }
  });
})();
