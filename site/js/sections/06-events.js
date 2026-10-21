/* =============================================================================
   6. WEDDING EVENTS — a "switching tabs card" modelled on the couple's
   reference video: a menu of the events (Haldi, Mehendi, Sangeet, Wedding,
   Reception) along the top of a detail card, which overlaps a photo card
   behind it. Choosing an event (tab, arrows, swipe or arrow keys) blurs the
   old details out and the new ones in, and cross-fades the photo with a soft
   zoom. The detail card holds the date, time, venue, "View Location" and
   "Add to Calendar". Missing details show "To be provided".
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  function fact(icon, label, value) {
    return '<div class="ev-fact"><dt>' + AD.icon(icon) + '<span>' + label + '</span></dt><dd>' + value + '</dd></div>';
  }

  // The event's picture as the photo card background, centred on its focal point.
  function photoStyle(ev) {
    var ph = ev.photo || {};
    return 'background-image:url(\'' + AD.esc(ph.src || '') + '\');background-position:' + AD.esc(ph.position || '50% 50%');
  }

  function panel(ev, i, n) {
    var venue = AD.venue(ev.venueId);
    var hasLoc = AD.venueHasLocation(venue);
    var venueText = venue && (AD.has(venue.name) || AD.has(venue.address))
      ? [venue.name, venue.address].filter(AD.has).map(AD.esc).join('<br>')
      : AD.tbp('Venue');
    // The church has its own card in the Venue section; other venues open Google Maps directly.
    var loc = hasLoc && venue.showInVenues === false
      ? '<a class="btn btn--primary ev-btn" href="' + AD.esc(AD.mapUrl(venue)) + '" target="_blank" rel="noopener">' + AD.icon('pin') + 'View Location</a>'
      : hasLoc
      ? '<a class="btn btn--primary ev-btn" href="#venue-' + AD.esc(venue.id) + '">' + AD.icon('pin') + 'View Location</a>'
      : '<button class="btn btn--primary ev-btn" type="button" aria-disabled="true" title="Location to be announced">' + AD.icon('pin') + 'Location to be announced</button>';
    var cal = AD.has(ev.date)
      ? '<button class="ev-link" type="button" data-cal="' + AD.esc(ev.id) + '">' + AD.icon('calendar') + 'Add to Calendar</button>'
      : '<button class="ev-link" type="button" aria-disabled="true">' + AD.icon('calendar') + 'Date to be announced</button>';
    return '<p class="eyebrow ev-in" style="--s:0"><span class="ev-num numerals">' + String(i + 1).padStart(2, '0') + '</span> ' + AD.esc(ev.kicker) + '</p>' +
      '<h3 class="ev-title ev-in" style="--s:1">' + AD.esc(ev.name) + '</h3>' +
      '<p class="ev-desc ev-in" style="--s:2">' + AD.esc(ev.description) + '</p>' +
      '<dl class="ev-facts ev-in" style="--s:3">' +
        fact('calendar', 'Date', AD.has(ev.date) ? AD.esc(AD.formatDate(ev.date)) : AD.tbp('Date')) +
        fact('clock', 'Time', AD.has(ev.startTime) ? AD.esc(AD.formatTimeRange(ev.startTime, ev.endTime)) : AD.tbp('Time')) +
        fact('pin', 'Venue', venueText) +
      '</dl>' +
      '<div class="ev-actions ev-in" style="--s:4">' + loc + cal + '</div>';
  }

  AD.register('events', {
    render: function (C) {
      var events = C.events || [];
      if (!events.length) return '';
      var first = events[0];
      return '<div class="container">' +
        AD.sectionHead({
          id: 'events', eyebrow: 'Celebrations', title: 'Wedding Events',
          intro: 'Five gatherings, one joyful journey. Choose an event to see its details.'
        }) +
        // anchors so links such as #event-haldi open that event
        events.map(function (e) { return '<span class="ev-anchor" id="event-' + AD.esc(e.id) + '"></span>'; }).join('') +
        '<div class="ev reveal" data-delay="1">' +
          '<div class="ev-photo" role="img" aria-label="' + AD.esc(first.photo && first.photo.alt || '') + '">' +
            '<div class="ev-photo__img is-on" style="' + photoStyle(first) + '"></div>' +
          '</div>' +
          '<article class="ev-card">' +
            '<div class="ev-tabs" role="tablist" aria-label="Wedding events">' +
              events.map(function (e, i) {
                return '<button class="ev-tab" type="button" role="tab" id="ev-tab-' + AD.esc(e.id) + '" aria-controls="ev-panel" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? 0 : -1) + '" data-i="' + i + '">' +
                  AD.esc(e.tab || e.name) + '</button>';
              }).join('') +
              '<span class="ev-tabs__bar" aria-hidden="true"></span>' +
            '</div>' +
            '<div class="ev-panel" id="ev-panel" role="tabpanel" aria-labelledby="ev-tab-' + AD.esc(first.id) + '" aria-live="polite">' + panel(first, 0, events.length) + '</div>' +
          '</article>' +
          '<div class="ev-nav">' +
            '<button class="ev-arrow" type="button" data-step="-1" aria-label="Previous event"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5L9 12l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
            '<span class="ev-count numerals" aria-hidden="true"><b>01</b> / ' + String(events.length).padStart(2, '0') + '</span>' +
            '<button class="ev-arrow ev-arrow--next" type="button" data-step="1" aria-label="Next event"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 6.5L15 12l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
          '</div>' +
        '</div>' +
      '</div>';
    },

    init: function (el, C) {
      var events = C.events || [];
      var box = el.querySelector('.ev');
      if (!box) return;
      var tabs = AD.$$('.ev-tab', el), bar = el.querySelector('.ev-tabs__bar'), tablist = el.querySelector('.ev-tabs');
      var pnl = el.querySelector('.ev-panel'), photo = el.querySelector('.ev-photo'), count = el.querySelector('.ev-count b');
      var cur = 0, busy = 0, still = AD.reducedMotion();

      // Preload every backdrop so switching is instant.
      events.forEach(function (e) { if (e.photo && e.photo.src) { var im = new Image(); im.src = e.photo.src; } });

      function moveBar() {
        var t = tabs[cur]; if (!t) return;
        bar.style.width = t.offsetWidth + 'px';
        bar.style.transform = 'translateX(' + t.offsetLeft + 'px)';
        // keep the active tab in view on narrow screens
        var l = t.offsetLeft - tablist.scrollLeft, r = l + t.offsetWidth;
        if (l < 0 || r > tablist.clientWidth) tablist.scrollTo({ left: t.offsetLeft - 12, behavior: still ? 'auto' : 'smooth' });
      }

      function wire() {
        AD.$$('[data-cal]', pnl).forEach(function (b) {
          b.addEventListener('click', function () {
            var ev = AD.event(b.getAttribute('data-cal'));
            var venue = AD.venue(ev.venueId);
            var timed = AD.has(ev.startTime) && C.timezone && AD.has(C.timezone.utcOffset);
            var desc = ev.description + (timed ? '' : '\nTime to be announced.') + (AD.venueHasLocation(venue) ? '' : '\nVenue to be announced.');
            var cal = AD.calendar.build({
              uid: 'event-' + ev.id,
              title: ev.name + ' — ' + C.couple.bride + ' & ' + C.couple.groom,
              description: desc,
              date: ev.date, startTime: ev.startTime, endTime: ev.endTime,
              location: AD.venueLine(venue)
            });
            if (cal) AD.calendar.open(cal, b);
          });
        });
        AD.$$('[aria-disabled="true"]', pnl).forEach(function (b) {
          b.addEventListener('click', function (e) { e.preventDefault(); AD.announce(b.textContent.trim() + '.'); });
        });
      }

      function go(i, focusTab) {
        i = (i + events.length) % events.length;
        if (i === cur) { if (focusTab) tabs[i].focus(); return; }
        var ev = events[i], dir = i > cur ? 1 : -1;
        cur = i;
        tabs.forEach(function (t, k) {
          var on = k === i;
          t.setAttribute('aria-selected', String(on));
          t.tabIndex = on ? 0 : -1;
        });
        if (focusTab) tabs[i].focus();
        moveBar();
        count.textContent = String(i + 1).padStart(2, '0');
        pnl.setAttribute('aria-labelledby', tabs[i].id);
        photo.setAttribute('aria-label', ev.photo && ev.photo.alt || '');

        // The photo: the new one fades in over the old with a soft zoom.
        var next = document.createElement('div');
        next.className = 'ev-photo__img';
        next.setAttribute('style', photoStyle(ev));
        photo.appendChild(next);
        void next.offsetWidth;
        next.classList.add('is-on');
        var olds = AD.$$('.ev-photo__img', photo).filter(function (n) { return n !== next; });
        setTimeout(function () { olds.forEach(function (n) { n.remove(); }); }, still ? 0 : 900);

        // The details: blur out, then the new ones blur in line by line.
        clearTimeout(busy);
        box.style.setProperty('--dir', dir);
        pnl.classList.add('is-out');
        busy = setTimeout(function () {
          pnl.innerHTML = panel(ev, i, events.length);
          wire();
          pnl.classList.remove('is-out');
          pnl.classList.add('is-in');
          void pnl.offsetWidth;
          pnl.classList.remove('is-in');
        }, still ? 0 : 220);
      }

      tabs.forEach(function (t) {
        t.addEventListener('click', function () { go(Number(t.getAttribute('data-i'))); });
      });
      tablist.addEventListener('keydown', function (e) {
        var k = e.key;
        if (k === 'ArrowRight' || k === 'ArrowLeft') { e.preventDefault(); go(cur + (k === 'ArrowRight' ? 1 : -1), true); }
        if (k === 'Home') { e.preventDefault(); go(0, true); }
        if (k === 'End') { e.preventDefault(); go(events.length - 1, true); }
      });
      AD.$$('.ev-arrow', el).forEach(function (b) {
        b.addEventListener('click', function () { go(cur + Number(b.getAttribute('data-step'))); });
      });
      // Swipe left / right on the photo or the card
      var x0 = null, y0 = null;
      box.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
      box.addEventListener('touchend', function (e) {
        if (x0 == null) return;
        var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null;
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.4) go(cur + (dx < 0 ? 1 : -1));
      });

      // Links to #event-<id> (from the venues) open that event.
      function fromHash(h) {
        var id = (h || '').replace('#event-', '');
        var i = events.map(function (e) { return e.id; }).indexOf(id);
        if (i > -1) { go(i); box.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'start' }); return true; }
        return false;
      }
      document.addEventListener('click', function (e) {
        var a = e.target.closest && e.target.closest('a[href^="#event-"]');
        if (a && fromHash(a.getAttribute('href'))) e.preventDefault();
      });
      if (/^#event-/.test(window.location.hash)) document.addEventListener('ad:opened', function () { fromHash(window.location.hash); }, { once: true });

      wire();
      moveBar();
      window.addEventListener('resize', moveBar);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(moveBar);
      document.addEventListener('ad:opened', moveBar);
    }
  });
})();
