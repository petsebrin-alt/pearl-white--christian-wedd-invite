/* =============================================================================
   3. SAVE THE DATE — a slow black-and-white photo slideshow, modelled on the
   couple's reference video: the couple photograph drifts gently upward while
   the invitation text appears letter by letter out of a soft blur; then it
   crossfades to the "Order of the Day". It plays only while on screen, can be
   paused, and never moves for guests who prefer reduced motion.
   Calendar: all-day entry until the ceremony time + timezone are confirmed.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  var HOLD = [10500, 9000];   // ms each slide stays (the first includes its letter reveal)

  function ceremonyCalendar(C) {
    var cer = AD.event('ceremony') || {};
    var venue = AD.venue(cer.venueId);
    var timed = AD.has(cer.startTime) && C.timezone && AD.has(C.timezone.utcOffset);
    var desc = 'Together with their families, ' + C.couple.bride + ' & ' + C.couple.groom + ' invite you to celebrate their marriage.';
    if (!timed) desc += '\nCeremony time and venue to be announced.';
    else if (!AD.venueHasLocation(venue)) desc += '\nVenue to be announced.';
    return AD.calendar.build({
      uid: 'save-the-date',
      title: (timed ? '' : 'Save the Date — ') + C.couple.bride + ' & ' + C.couple.groom + "'s Wedding",
      description: desc,
      date: AD.weddingDate(),
      startTime: cer.startTime,
      endTime: cer.endTime,
      location: AD.venueLine(venue)
    });
  }

  var letters = AD.letters;   // letter-by-letter reveal (core.js)

  function photo(C, n) {
    var list = (C.couplePhotos || []).filter(function (p) { return p && AD.has(p.src); });
    return list.length ? list[Math.min(n, list.length - 1)] : null;
  }

  AD.register('save-the-date', {
    render: function (C) {
      var date = AD.weddingDate();
      if (!AD.has(date)) {
        return '<div class="container">' + AD.sectionHead({ id: 'save-the-date', eyebrow: 'Save the Date', title: 'Save the Date' }) +
          '<p class="std-pending">' + AD.tbp('Wedding date') + '</p></div>';
      }
      var p = AD.dateParts(date);
      var c = C.couple || {};
      var cer = AD.event('ceremony') || {};
      var timed = AD.has(cer.startTime) && C.timezone && AD.has(C.timezone.utcOffset);
      var events = C.events || [];
      var anyUntimed = events.some(function (e) { return !AD.has(e.startTime); });
      var ph1 = photo(C, 0), ph2 = photo(C, 1);

      function shot(ph, n) {
        return '<div class="std-shot std-shot--' + n + (n === 1 ? ' is-active' : '') + '">' +
          (ph ? '<img src="' + AD.esc(ph.src) + '" alt="" decoding="async"' + (n === 1 ? '' : ' loading="lazy"') +
            (ph.position ? ' style="object-position:' + AD.esc(ph.position) + '"' : '') + '>' : '') + '</div>';
      }

      return '<div class="container std">' +
        '<h2 class="sr-only" id="save-the-date-title">Save the Date: ' + AD.esc(AD.formatDate(date)) + '</h2>' +
        '<div class="std-show reveal" role="region" aria-roledescription="carousel" aria-label="Save the Date slideshow">' +
          '<div class="std-show__photos" aria-hidden="true">' + shot(ph1, 1) + shot(ph2 || ph1, 2) + '</div>' +
          (ph1 && ph1.alt ? '<p class="sr-only">Photograph: ' + AD.esc(ph1.alt) + '</p>' : '') +

          // Slide 1 — the invitation
          '<div class="std-slide std-slide--1 is-active" role="group" aria-roledescription="slide" aria-label="1 of 2: Save the Date" data-slide="0">' +
            '<p class="std-cap">' + letters('Save the Date', 0.3) + '</p>' +
            '<p class="std-of">' + letters('The wedding of', 0.9) + '</p>' +
            '<p class="std-names script">' +
              '<span class="std-name std-name--1">' + AD.esc(c.bride) + '</span>' +
              '<span class="std-and" aria-label="and">&amp;</span>' +
              '<span class="std-name std-name--2">' + AD.esc(c.groom) + '</span>' +
            '</p>' +
            '<div class="std-db">' +
              '<p class="std-db__month">' + letters(p.month, 2.9) + '</p>' +
              '<div class="std-db__row">' +
                '<span class="std-db__rule"></span>' +
                '<span class="std-db__side">' + letters(p.weekday, 3.2) + '</span>' +
                '<span class="std-db__day numerals">' + p.day + '</span>' +
                '<span class="std-db__side">' + letters(String(p.year), 3.2) + '</span>' +
                '<span class="std-db__rule"></span>' +
              '</div>' +
            '</div>' +
            '<p class="std-time">' +
              (timed ? AD.esc(AD.formatTimeRange(cer.startTime, cer.endTime)) : 'Ceremony time ' + AD.tbp('Ceremony time')) +
            '</p>' +
          '</div>' +

          // Slide 2 — the order of the day (from the events in content.js)
          '<div class="std-slide std-slide--2" role="group" aria-roledescription="slide" aria-label="2 of 2: Order of the Day" data-slide="1" aria-hidden="true" inert>' +
            '<p class="std-order-title">' +
              '<span class="std-order-title__big">' + letters('Order', 0.3) + '</span>' +
              '<span class="std-order-title__of script">of the</span>' +
              '<span class="std-order-title__big">' + letters('Day', 0.9) + '</span>' +
            '</p>' +
            '<ol class="std-order">' + events.map(function (e, i) {
              return '<li class="std-order__item" style="--k:' + i + '">' +
                '<span class="std-order__when">' + (AD.has(e.startTime) ? AD.esc(AD.formatTime(e.startTime)) : AD.esc(e.kicker || '')) + '</span>' +
                '<span class="std-order__dot" aria-hidden="true"></span>' +
                '<span class="std-order__name">' + AD.esc(e.name) + '</span>' +
              '</li>';
            }).join('') + '</ol>' +
            (anyUntimed ? '<p class="std-order__note">Times ' + AD.tbp('Event times') + '</p>' : '') +
          '</div>' +

          '<div class="std-show__controls">' +
            '<button class="std-dot is-active" type="button" data-go="0" aria-label="Show slide 1: Save the Date" aria-current="true"></button>' +
            '<button class="std-dot" type="button" data-go="1" aria-label="Show slide 2: Order of the Day"></button>' +
            '<button class="std-pause" type="button" data-pause aria-label="Pause the slideshow">' + AD.icon('pause') + '</button>' +
          '</div>' +
        '</div>' +
        '<div class="btn-row std-actions reveal" data-delay="1"><button class="btn btn--primary" type="button" data-std-cal>' + AD.icon('calendar') + 'Add to Calendar</button></div>' +
      '</div>';
    },

    init: function (el, C) {
      var b = el.querySelector('[data-std-cal]');
      if (b) {
        b.addEventListener('click', function () {
          var ev = ceremonyCalendar(C);
          if (ev) AD.calendar.open(ev, b);
        });
      }

      var show = el.querySelector('.std-show');
      if (!show) return;
      var slides = AD.$$('.std-slide', show), shots = AD.$$('.std-shot', show), dots = AD.$$('.std-dot', show);
      var pauseBtn = show.querySelector('[data-pause]');
      var cur = 0, timer = 0, inView = false, paused = false, still = AD.reducedMotion();

      function play(i) {
        // Restart the letter reveal and the photo drift for this slide.
        var s = slides[i];
        s.classList.remove('is-play');
        shots[i].classList.remove('is-drift');
        void s.offsetWidth;
        s.classList.add('is-play');
        shots[i].classList.add('is-drift');
      }

      function go(i, user) {
        if (i === cur && !user) return;
        clearTimeout(timer);
        slides.forEach(function (s, k) {
          var on = k === i;
          s.classList.toggle('is-active', on);
          if (!on) s.classList.remove('is-play');
          s.setAttribute('aria-hidden', on ? 'false' : 'true');
          s.inert = !on;
        });
        shots.forEach(function (sh, k) { sh.classList.toggle('is-active', k === i); });
        dots.forEach(function (d, k) {
          d.classList.toggle('is-active', k === i);
          if (k === i) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
        });
        cur = i;
        play(i);
        schedule();
      }

      function schedule() {
        clearTimeout(timer);
        if (still || paused || !inView) return;
        timer = setTimeout(function () { go((cur + 1) % slides.length); }, HOLD[cur] || 9000);
      }

      function setPaused(p) {
        paused = p;
        show.classList.toggle('is-paused', p);
        pauseBtn.innerHTML = AD.icon(p ? 'play' : 'pause');
        pauseBtn.setAttribute('aria-label', p ? 'Play the slideshow' : 'Pause the slideshow');
        schedule();
      }

      dots.forEach(function (d) {
        d.addEventListener('click', function () { go(Number(d.getAttribute('data-go')), true); });
      });
      pauseBtn.addEventListener('click', function () { setPaused(!paused); });

      if (still) {
        show.classList.add('is-still');
        slides[0].classList.add('is-play');
        pauseBtn.hidden = true;
        return;
      }
      // Plays only while at least a third of it is on screen; starts from the beginning each visit.
      if ('IntersectionObserver' in window) {
        var started = false;
        new IntersectionObserver(function (entries) {
          inView = entries[0].isIntersecting;
          if (inView && !started) { started = true; play(0); }
          show.classList.toggle('is-offscreen', !inView);
          schedule();
        }, { threshold: 0.35 }).observe(show);
      } else {
        inView = true;
        play(0);
        schedule();
      }
    }
  });
})();
