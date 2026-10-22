/* =============================================================================
   12. TRAVEL & STAY — one large card at a time, after the couple's card video
   ("Sun · Mono · Earth"): a big word, the details beside it (each with a
   Location button that opens Google Maps) and a photograph, with the next
   photograph waiting, softly blurred, below it. The black round button
   brings the next card: the word dissolves letter by letter into the next
   one, the card's colour changes (white, cream, pearl or soft green), the
   photographs slide up and the details follow. Arrows, keys and swipes work
   too. The places are suggestions (content.js → travel.cards).
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  var V = '?v=20261022k';
  var TONES = { white: 1, cream: 1, pearl: 1, green: 1 };

  function mapUrl(q) { return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q + ', Kerala'); }
  function letters(word) {
    return String(word).split('').map(function (ch, i) {
      return '<span class="tv-l" style="--i:' + i + '">' + AD.esc(ch) + '</span>';
    }).join('');
  }
  function items(card) {
    return (card.items || []).map(function (it, i) {
      return '<li class="tv-item" style="--i:' + i + '">' +
        '<p class="tv-item__name">' + AD.esc(it.name) + '</p>' +
        (AD.has(it.note) ? '<p class="tv-item__note">' + AD.esc(it.note) + '</p>' : '<p class="tv-item__note">' + AD.tbp(it.name) + '</p>') +
        (AD.has(it.map) ? '<a class="tv-loc" href="' + AD.esc(mapUrl(it.map)) + '" target="_blank" rel="noopener" aria-label="Location of ' + AD.esc(it.name) + ' (opens Google Maps)">' + AD.icon('pin') + '<span>Location</span></a>' : '') +
      '</li>';
    }).join('');
  }
  var ARROW = function (d) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  };

  AD.register('travel', {
    render: function (C) {
      var T = C.travel || {};
      var cards = (T.cards || []).filter(function (c) { return c && AD.has(c.word); });
      if (!cards.length) {
        return '<div class="container">' + AD.sectionHead({ id: 'travel', eyebrow: 'Travel & Stay', title: 'Getting There', intro: 'Arrangements will be listed here once they are confirmed.' }) + '</div>';
      }
      var first = cards[0];
      return '<div class="container">' +
        AD.sectionHead({ id: 'travel', eyebrow: 'Travel & Stay', title: 'Getting There', intro: AD.esc(T.note || '') }) +
        '<div class="tv reveal tv--' + (TONES[first.tone] ? first.tone : 'white') + '" role="region" aria-roledescription="carousel" aria-label="Travel and stay suggestions">' +
          '<div class="tv__text">' +
            '<div class="tv__head" aria-live="polite">' +
              '<p class="tv__kicker" data-kicker>' + AD.esc(first.kicker || '') + '</p>' +
              '<h3 class="tv__word" data-word aria-label="' + AD.esc(first.word) + '">' + letters(first.word) + '</h3>' +
            '</div>' +
            '<ul class="tv__list" data-list>' + items(first) + '</ul>' +
            '<p class="tv__tag">Suggestions · please confirm before booking</p>' +
          '</div>' +
          '<div class="tv__photos" data-photos>' +
            cards.map(function (c, i) {
              return '<img class="tv-ph" data-i="' + i + '" src="' + AD.esc(c.photo && c.photo.src || '') + V + '" alt="' + AD.esc(c.photo && c.photo.alt || '') + '"' +
                (i ? ' aria-hidden="true"' : '') + ' width="800" height="569" decoding="async"' + (i > 1 ? ' loading="lazy"' : '') + '>';
            }).join('') +
          '</div>' +
          '<div class="tv__nav">' +
            '<button class="tv-btn" type="button" data-step="-1" aria-label="Previous card">' + ARROW('M12 18.5V5.5M6.5 11L12 5.5l5.5 5.5') + '</button>' +
            '<button class="tv-btn tv-btn--main" type="button" data-step="1" aria-label="Next card">' + ARROW('M12 5.5v13M6.5 13l5.5 5.5 5.5-5.5') + '</button>' +
            '<span class="tv__count numerals" data-count>1 / ' + cards.length + '</span>' +
          '</div>' +
        '</div>' +
      '</div>';
    },

    init: function (el, C) {
      var T = C.travel || {};
      var cards = (T.cards || []).filter(function (c) { return c && AD.has(c.word); });
      var box = el.querySelector('.tv');
      if (!box || !cards.length) return;
      var kicker = el.querySelector('[data-kicker]'), word = el.querySelector('[data-word]'), list = el.querySelector('[data-list]');
      var count = el.querySelector('[data-count]'), photos = AD.$$('.tv-ph', el), next = el.querySelector('.tv-btn--main');
      var still = AD.reducedMotion(), cur = 0, busy = false, n = cards.length;

      // the photographs: this one, the next one waiting below, the rest out of sight
      function place() {
        photos.forEach(function (p, i) {
          var r = ((i - cur) % n + n) % n;
          p.className = 'tv-ph ' + (r === 0 ? 'is-now' : r === 1 ? 'is-next' : r === n - 1 ? 'is-gone' : 'is-later');
          if (r === 0) p.removeAttribute('aria-hidden'); else p.setAttribute('aria-hidden', 'true');
        });
        count.textContent = (cur + 1) + ' / ' + n;
        next.setAttribute('aria-label', 'Next: ' + cards[(cur + 1) % n].word);
      }
      // the details keep one height, so the page below does not jump
      function fitList() {
        var m = document.createElement('ul');
        m.className = 'tv__list'; m.style.cssText = 'position:absolute;visibility:hidden;left:0;right:0;';
        list.parentNode.appendChild(m);
        var h = 0;
        cards.forEach(function (c) { m.innerHTML = items(c); h = Math.max(h, m.offsetHeight); });
        m.remove();
        list.style.minHeight = h + 'px';
      }
      fitList();
      var rz = 0;
      window.addEventListener('resize', function () { clearTimeout(rz); rz = setTimeout(fitList, 150); });
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitList);

      function show(i, dir) {
        if (busy) return;
        i = ((i % n) + n) % n;
        if (i === cur) return;
        var c = cards[i];
        cur = i;
        box.classList.remove('tv--white', 'tv--cream', 'tv--pearl', 'tv--green');
        box.classList.add('tv--' + (TONES[c.tone] ? c.tone : 'white'));
        box.classList.toggle('is-back', dir < 0);
        place();
        if (still) {
          kicker.textContent = c.kicker || ''; word.innerHTML = letters(c.word); word.setAttribute('aria-label', c.word); list.innerHTML = items(c);
          return;
        }
        busy = true;
        box.classList.add('is-out');                 // the word and details dissolve…
        setTimeout(function () {
          kicker.textContent = c.kicker || '';
          word.innerHTML = letters(c.word); word.setAttribute('aria-label', c.word);
          list.innerHTML = items(c);
          box.classList.remove('is-out');
          box.classList.add('is-in-start');           // …and the next ones rise into focus
          void box.offsetWidth;
          box.classList.remove('is-in-start');
          setTimeout(function () { busy = false; }, 500);
        }, 420);
      }

      AD.$$('[data-step]', el).forEach(function (b) {
        b.addEventListener('click', function () { var d = Number(b.getAttribute('data-step')); show(cur + d, d); });
      });
      box.addEventListener('keydown', function (e) {
        if (e.target.closest('a')) return;
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); show(cur + 1, 1); }
        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); show(cur - 1, -1); }
      });
      var x0 = null, y0 = null;
      box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
      box.addEventListener('touchend', function (e) {
        if (x0 == null) return;
        var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
        if (Math.abs(dx) > 55 && Math.abs(dx) > Math.abs(dy) * 1.4) show(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1);
      });
      place();
    }
  });
})();
