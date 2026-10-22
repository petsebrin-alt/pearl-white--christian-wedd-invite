/* =============================================================================
   4. COUNTDOWN
   States (PRD §4.4):
   • pending   — ceremony time or timezone not confirmed: days only + note
   • live      — full countdown to confirmed ceremony start (UTC)
   • today     — pending state on the wedding day
   • ended     — after the ceremony (or after the wedding date when pending)
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;
  var timer = null;

  function target(C) {
    var cer = AD.event('ceremony') || {};
    var date = AD.weddingDate();
    if (!AD.has(date)) return { mode: 'nodate' };
    if (AD.has(cer.startTime) && C.timezone && AD.has(C.timezone.utcOffset)) {
      return { mode: 'live', at: new Date(date + 'T' + cer.startTime + ':00' + C.timezone.utcOffset) };
    }
    return { mode: 'pending', date: date };
  }

  function calendarDaysUntil(iso) {
    var now = new Date();
    var today = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.round((AD.parseDate(iso).getTime() - today) / 864e5);
  }

  // Each number sits in a beaded pearl flower (the couple's reference); the
  // flowers are strung together on a chain of pearls and silver seed beads.
  function tile(unit, label, n) {
    return '<div class="cd-tile" data-unit="' + unit + '" style="--k:' + n + '">' +
      '<span class="cd-tile__pearl">' +
        '<img class="cd-tile__flower" src="assets/images/beaded-flower-cd-' + (n % 2 + 1) + '.webp?v=20261022j" alt="" width="640" height="640" decoding="async">' +
        '<span class="cd-tile__num numerals" data-num>—</span>' +
      '</span>' +
      '<span class="cd-tile__label">' + label + '</span></div>';
  }

  AD.register('countdown', {
    render: function () {
      return '<div class="container">' +
        AD.sectionHead({ id: 'countdown', eyebrow: 'Countdown', title: 'Until We Say “I Do”' }) +
        '<div class="cd reveal" data-delay="1">' +
          '<div class="cd-strand" aria-hidden="true"></div>' +
          '<div class="cd-tiles" aria-hidden="true">' +
            tile('days', 'Days', 0) + tile('hours', 'Hours', 1) + tile('minutes', 'Minutes', 2) + tile('seconds', 'Seconds', 3) +
          '</div>' +
          '<p class="cd-summary sr-only" data-summary></p>' +
          '<p class="cd-message" data-message hidden></p>' +
          '<p class="cd-note" data-note hidden></p>' +
        '</div>' +
      '</div>';
    },
    init: function (el, C) {
      var t = target(C);
      var nums = {};
      AD.$$('.cd-tile', el).forEach(function (tl) { nums[tl.getAttribute('data-unit')] = tl.querySelector('[data-num]'); });
      var tiles = el.querySelector('.cd-tiles');
      var strand = el.querySelector('.cd-strand');
      var msg = el.querySelector('[data-message]');
      var note = el.querySelector('[data-note]');
      var summary = el.querySelector('[data-summary]');
      var lastSummaryMinute = -1;

      // String the flowers together: a chain from each flower's centre to the next.
      function chain() {
        var box = el.querySelector('.cd').getBoundingClientRect();
        var c = AD.$$('.cd-tile__pearl', el).map(function (p) {
          var r = p.getBoundingClientRect();
          return [r.left - box.left + r.width / 2, r.top - box.top + r.height / 2];
        });
        strand.innerHTML = c.slice(1).map(function (b, i) {
          var a = c[i], dx = b[0] - a[0], dy = b[1] - a[1];
          return '<span class="cd-link" style="--k:' + i + ';left:' + a[0].toFixed(1) + 'px;top:' + a[1].toFixed(1) + 'px;width:' +
            Math.sqrt(dx * dx + dy * dy).toFixed(1) + 'px;transform:rotate(' + (Math.atan2(dy, dx) * 180 / Math.PI).toFixed(2) + 'deg)"></span>';
        }).join('');
      }
      chain();
      window.addEventListener('resize', chain);
      if (document.fonts && document.fonts.ready) document.fonts.ready.then(chain);
      document.addEventListener('ad:opened', chain);
      var couple = C.couple.bride + ' & ' + C.couple.groom;

      function showMessage(text) {
        tiles.hidden = true; strand.hidden = true; note.hidden = true;
        msg.hidden = false; msg.textContent = text;
        summary.textContent = text;
      }
      function set(unit, v, pad) {
        var s = v == null ? '—' : (pad ? String(v).padStart(2, '0') : String(v));
        if (nums[unit].textContent !== s) {
          nums[unit].textContent = s;
          // a soft fade as the number changes
          nums[unit].classList.remove('is-tick'); void nums[unit].offsetWidth; nums[unit].classList.add('is-tick');
        }
        nums[unit].parentNode.classList.toggle('is-empty', v == null);
      }

      if (t.mode === 'nodate') { showMessage('The countdown will begin once the wedding date is confirmed.'); return; }

      if (t.mode === 'pending') {
        var days = calendarDaysUntil(t.date);
        if (days > 0) {
          set('days', days); set('hours', null); set('minutes', null); set('seconds', null);
          note.hidden = false;
          note.textContent = 'The exact countdown will begin once the ceremony time is confirmed.';
          summary.textContent = days + (days === 1 ? ' day' : ' days') + ' until the wedding of ' + couple + '.';
        } else if (days === 0) {
          showMessage('Today is the day — ' + couple + ' are getting married.');
        } else {
          showMessage(couple + ' are now joined in Holy Matrimony. Thank you for your prayers and blessings.');
        }
        return;
      }

      // Live countdown
      function tick() {
        var ms = t.at.getTime() - Date.now();
        if (ms <= 0) {
          clearInterval(timer);
          showMessage(couple + ' are now joined in Holy Matrimony. Thank you for your prayers and blessings.');
          return;
        }
        var s = Math.floor(ms / 1000);
        var d = Math.floor(s / 86400), h = Math.floor((s % 86400) / 3600), m = Math.floor((s % 3600) / 60), sec = s % 60;
        set('days', d); set('hours', h, true); set('minutes', m, true); set('seconds', sec, true);
        if (m !== lastSummaryMinute) {
          lastSummaryMinute = m;
          summary.textContent = d + ' days, ' + h + ' hours and ' + m + ' minutes until the ceremony.';
        }
      }
      tick();
      timer = setInterval(tick, 1000);
    }
  });
})();
