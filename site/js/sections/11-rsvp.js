/* =============================================================================
   11. RSVP — one invitation card and one button. The guest taps "Accept
   Invitation": a light sweeps the card, it turns over, a pearl seal is
   pressed on the back with a tick, "Invitation Accepted" writes itself and
   white rose petals burst from the seal.
   A personal link can carry the guest's name (…/?guest=Anu%20Thomas): the
   card then greets them and the acceptance is saved under that name.
   The acceptance is remembered on this device, so on a later visit the card
   shows the accepted side (the card can be turned back to see it again).
   Saved by AD.store: in this browser until the Google Sheet is connected.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  var KEY = 'ad-rsvp-accepted';
  var V = '?v=20261022b';
  var PETALS = 6;   // rose petal pictures in assets/images/petals/

  function guestName() {
    try {
      var n = new URLSearchParams(window.location.search).get('guest');
      return n ? n.replace(/\s+/g, ' ').trim().slice(0, 80) : '';
    } catch (e) { return ''; }
  }
  function remembered() {
    try { return JSON.parse(localStorage.getItem(KEY) || 'null'); } catch (e) { return null; }
  }
  function remember(v) {
    try { if (v) localStorage.setItem(KEY, JSON.stringify(v)); else localStorage.removeItem(KEY); } catch (e) {}
  }

  AD.register('rsvp', {
    render: function (C) {
      var R = C.rsvp || {};
      var date = AD.weddingDate();
      var cer = (C.events || []).filter(function (e) { return e.id === 'ceremony'; })[0];
      var church = cer && (C.venues || []).filter(function (v) { return v.id === cer.venueId; })[0];
      var guest = guestName();
      return '<div class="container container--narrow">' +
        AD.sectionHead({
          id: 'rsvp', eyebrow: 'RSVP', title: 'Kindly Respond',
          intro: 'Please let us know if you can join us.'
        }) +
        '<div class="rsvp-stage reveal" data-stage>' +
          '<div class="rsvp-card" data-card>' +
            // Front: the invitation and the one button
            '<form class="rsvp-side rsvp-side--front classic" data-front novalidate>' +
              '<span class="rsvp-sheen" aria-hidden="true"></span>' +
              (guest ? '<p class="rsvp-dear">Dear ' + AD.esc(guest) + ',</p>' : '') +
              '<p class="rsvp-kicker">The wedding of</p>' +
              '<p class="rsvp-names script">' + AD.esc(C.couple.bride) + ' <span class="amp">&amp;</span> ' + AD.esc(C.couple.groom) + '</p>' +
              (AD.has(date) ? '<p class="rsvp-date">' + AD.esc(AD.formatDate(date)) + '</p>' : '') +
              (cer && AD.has(cer.startTime) && church ? '<p class="rsvp-place">' + AD.esc(AD.formatTime(cer.startTime)) + ' · ' + AD.esc(church.name) + '</p>' : '') +
              AD.orn.divider() +
              '<p class="rsvp-by">Kindly respond by ' + (AD.has(R.deadline) ? '<strong>' + AD.esc(AD.formatDate(R.deadline)) + '</strong>' : AD.tbp('RSVP deadline')) + '</p>' +
              '<div class="hp-field" aria-hidden="true"><label for="rsvp-website">Website</label><input id="rsvp-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
              '<button class="btn btn--primary rsvp-accept" type="submit">' + AD.icon('check') + '<span>Accept Invitation</span></button>' +
              '<div data-status aria-live="polite"></div>' +
            '</form>' +
            // Back: accepted
            '<div class="rsvp-side rsvp-side--back classic" data-back tabindex="-1" aria-hidden="true">' +
              '<span class="rsvp-seal" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M6 12.6l4 4L18.2 8" pathLength="1"/></svg></span>' +
              '<p class="rsvp-done script"><span>Invitation Accepted</span></p>' +
              '<p class="rsvp-thanks" data-thanks></p>' +
              '<button class="link-btn rsvp-again" type="button" data-again>See the invitation again</button>' +
            '</div>' +
          '</div>' +
          '<div class="rsvp-burst" data-burst aria-hidden="true"></div>' +
        '</div>' +
      '</div>';
    },

    init: function (el, C) {
      var stage = el.querySelector('[data-stage]'), front = el.querySelector('[data-front]'), back = el.querySelector('[data-back]');
      var thanks = el.querySelector('[data-thanks]'), status = el.querySelector('[data-status]'), burst = el.querySelector('[data-burst]');
      var btn = front.querySelector('.rsvp-accept');
      var date = AD.weddingDate();
      var still = AD.reducedMotion();

      function setThanks(name) {
        thanks.textContent = 'Thank you' + (name ? ', ' + name : '') + '! We look forward to celebrating with you' +
          (AD.has(date) ? ' on ' + AD.formatDateShort(date) : '') + '.';
      }
      function showSide(accepted, animate) {
        stage.classList.toggle('is-accepted', accepted);
        stage.classList.toggle('is-animating', !!animate);
        back.setAttribute('aria-hidden', accepted ? 'false' : 'true');
        front.setAttribute('aria-hidden', accepted ? 'true' : 'false');
        front.inert = accepted; back.inert = !accepted;
      }

      // White rose petals burst from the seal and drift down.
      function petals() {
        if (still || !Element.prototype.animate) return;
        var s = back.querySelector('.rsvp-seal').getBoundingClientRect(), b = stage.getBoundingClientRect();
        var cx = s.left + s.width / 2 - b.left, cy = s.top + s.height / 2 - b.top;
        for (var i = 0; i < 22; i++) {
          var p = document.createElement('img');
          p.src = 'assets/images/petals/rose-' + (1 + (i % PETALS)) + '.webp' + V;
          p.alt = ''; p.className = 'rsvp-petal';
          p.style.left = cx + 'px'; p.style.top = cy + 'px';
          burst.appendChild(p);
          var ang = (i / 22) * Math.PI * 2 + Math.random() * .4, dist = 90 + Math.random() * 120;
          var dx = Math.cos(ang) * dist, dy = Math.sin(ang) * dist * .75;
          var rot = (Math.random() - .5) * 540, sz = .55 + Math.random() * .55;
          p.animate([
            { transform: 'translate(-50%,-50%) translate(0,0) rotate(0deg) scale(' + (sz * .3) + ')', opacity: 0 },
            { transform: 'translate(-50%,-50%) translate(' + dx * .7 + 'px,' + (dy * .7 - 30) + 'px) rotate(' + rot * .4 + 'deg) scale(' + sz + ')', opacity: 1, offset: .3 },
            { transform: 'translate(-50%,-50%) translate(' + dx + 'px,' + (dy + 190) + 'px) rotate(' + rot + 'deg) scale(' + sz + ')', opacity: 0 }
          ], { duration: 2600 + Math.random() * 1200, delay: Math.random() * 160, easing: 'cubic-bezier(.2,.6,.35,1)', fill: 'both' })
            .finished.then(function (a) { return function () { a.remove(); }; }(p));
        }
      }

      function accept(name) {
        setThanks(name);
        showSide(true, !still);
        if (still) { back.focus({ preventScroll: true }); return; }
        setTimeout(petals, 1250);
        setTimeout(function () { back.focus({ preventScroll: true }); stage.classList.remove('is-animating'); }, 3200);
      }

      // A guest who has already accepted on this device sees the accepted side.
      var had = remembered();
      if (had) { setThanks(had.name); showSide(true, false); }
      else showSide(false, false);

      front.addEventListener('submit', function (e) {
        e.preventDefault();
        status.innerHTML = '';
        var name = guestName();
        var prev = remembered();
        if (prev) { accept(prev.name || name); return; }   // already sent from this device: only the card turns again
        btn.classList.add('is-busy');
        btn.disabled = true;
        AD.store.submit('rsvp', {
          name: name, attending: 'yes', guests: 1, events: [], dietary: '', message: '',
          website: front.querySelector('#rsvp-website').value
        }).then(function (r) {
          btn.classList.remove('is-busy');
          btn.disabled = false;
          if (!r.ok) {
            status.innerHTML = '<div class="status status--error" role="alert">' + AD.icon('alert') +
              '<div><p><strong>Your response was not sent.</strong> ' + AD.esc(r.error || '') + '</p><p>Please try again. If the problem continues, contact the family through the Contact section.</p></div></div>';
            return;
          }
          remember({ name: name, at: new Date().toISOString() });
          accept(name);
        });
      });

      el.querySelector('[data-again]').addEventListener('click', function () {
        showSide(false, false);
        btn.focus({ preventScroll: true });
      });
    }
  });
})();
