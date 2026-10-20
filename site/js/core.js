/* =============================================================================
   CORE — shared helpers used by every section
   (namespace, formatting, icons, placeholders, dialogs, calendar, storage)
   ========================================================================== */
(function () {
  'use strict';

  var AD = (window.AD = window.AD || {});
  var C = (AD.content = window.WEDDING || {});

  /* ---------- Section registry ---------- */
  AD.sections = [];
  AD.register = function (id, def) { AD.sections.push(Object.assign({ id: id }, def)); };

  /* ---------- DOM + string helpers ---------- */
  AD.$ = function (sel, root) { return (root || document).querySelector(sel); };
  AD.$$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  AD.esc = function (v) {
    return String(v == null ? '' : v).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  AD.has = function (v) {
    if (v == null) return false;
    if (Array.isArray(v)) return v.length > 0;
    return String(v).trim() !== '';
  };
  AD.reducedMotion = function () {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  };
  AD.announce = function (msg) {
    var el = document.getElementById('announcer');
    if (!el) return;
    el.textContent = '';
    setTimeout(function () { el.textContent = msg; }, 60);
  };

  /* ---------- Placeholders ---------- */
  // <span class="tbp">To be provided</span> with an optional screen-reader label.
  AD.tbp = function (label) {
    return '<span class="tbp">' + (label ? '<span class="sr-only">' + AD.esc(label) + ': </span>' : '') + 'To be provided</span>';
  };
  AD.valueOr = function (v, label) { return AD.has(v) ? AD.esc(v) : AD.tbp(label); };

  AD.mediaPlaceholder = function (label, ratio) {
    return '<div class="ph-media" style="--ratio:' + (ratio || '4 / 5') + '" role="img" aria-label="' + AD.esc(label) + ' — to be provided">' +
      '<div><span class="ph-media__icon">' + AD.icon('image') + '</span>' +
      '<span class="ph-media__label">' + AD.esc(label) + '</span>' + AD.tbp() + '</div></div>';
  };

  /* ---------- Letter-by-letter reveal (as in the reference video) ----------
     Each letter fades in out of a soft blur, one after another, when its
     container is revealed (.is-in) or played (.is-play). Screen readers get
     the plain words. `start` is the delay in seconds before the first letter. */
  AD.letters = function (text, start) {
    var i = 0;
    var words = String(text).split(' ').map(function (w) {
      return '<span class="lt-word">' + w.split('').map(function (ch) {
        return '<span class="lt" style="--i:' + (i++) + '">' + AD.esc(ch) + '</span>';
      }).join('') + '</span>';
    }).join(' ');
    return '<span class="sr-only">' + AD.esc(text) + '</span><span class="lt-line" aria-hidden="true" style="--d0:' + (start || 0) + 's">' + words + '</span>';
  };
  // Converts an element's plain text in place.
  AD.splitLetters = function (el, start) {
    if (!el || el.querySelector('.lt-line') || el.children.length) return;
    el.innerHTML = AD.letters(el.textContent.trim(), start);
  };

  AD.sectionHead = function (o) {
    return '<header class="section-head reveal">' +
      (o.eyebrow ? '<p class="eyebrow">' + AD.esc(o.eyebrow) + '</p>' : '') +
      '<h2 class="section-title" id="' + o.id + '-title">' + o.title + '</h2>' +
      (AD.orn ? AD.orn.divider() : '') +
      (o.intro ? '<p class="section-intro">' + o.intro + '</p>' : '') +
      '</header>';
  };

  /* ---------- Dates and times ---------- */
  var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  AD.parseDate = function (iso) {
    var p = String(iso).split('-').map(Number);
    return new Date(Date.UTC(p[0], p[1] - 1, p[2]));
  };
  AD.dateParts = function (iso) {
    var d = AD.parseDate(iso);
    return { day: d.getUTCDate(), month: MONTHS[d.getUTCMonth()], monthIndex: d.getUTCMonth(), year: d.getUTCFullYear(), weekday: DAYS[d.getUTCDay()] };
  };
  AD.formatDate = function (iso) {
    if (!AD.has(iso)) return '';
    var p = AD.dateParts(iso);
    return p.weekday + ', ' + p.day + ' ' + p.month + ' ' + p.year;
  };
  AD.formatDateShort = function (iso) {
    var p = AD.dateParts(iso);
    return p.day + ' ' + p.month + ' ' + p.year;
  };
  AD.formatTime = function (hhmm) {
    if (!AD.has(hhmm)) return '';
    var t = hhmm.split(':').map(Number);
    var h12 = ((t[0] + 11) % 12) + 1;
    return h12 + ':' + String(t[1] || 0).padStart(2, '0') + ' ' + (t[0] >= 12 ? 'pm' : 'am');
  };
  AD.formatTimeRange = function (start, end) {
    if (!AD.has(start)) return '';
    var tz = C.timezone && AD.has(C.timezone.label) ? ' ' + C.timezone.label : '';
    return AD.formatTime(start) + (AD.has(end) ? ' – ' + AD.formatTime(end) : '') + tz;
  };
  AD.weddingDate = function () { return C.wedding && C.wedding.date; };
  AD.event = function (id) { return (C.events || []).filter(function (e) { return e.id === id; })[0]; };
  AD.venue = function (id) { return (C.venues || []).filter(function (v) { return v.id === id; })[0]; };
  AD.venueHasLocation = function (v) { return !!v && (AD.has(v.address) || AD.has(v.mapUrl)); };
  AD.mapUrl = function (v) {
    if (!v) return null;
    if (AD.has(v.mapUrl)) return v.mapUrl;
    if (AD.has(v.address)) {
      var q = [v.name, v.address].filter(AD.has).join(', ');
      return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q);
    }
    return null;
  };
  AD.venueLine = function (v) {
    if (!v) return '';
    return [v.name, v.address].filter(AD.has).join(', ');
  };

  /* ---------- Icons (24 × 24, 1.5 px line) ---------- */
  var ICONS = {
    calendar: '<rect x="3.5" y="5" width="17" height="15.5" rx="1.6"/><path d="M3.5 9.5h17M8 3v4M16 3v4"/>',
    pin: '<path d="M12 21s-6.5-6.1-6.5-11.1a6.5 6.5 0 0 1 13 0C18.5 14.9 12 21 12 21z"/><circle cx="12" cy="9.9" r="2.3"/>',
    clock: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>',
    phone: '<path d="M5.6 4h3l1.5 4-2 1.3a10.5 10.5 0 0 0 6.6 6.6l1.3-2 4 1.5v3a1.6 1.6 0 0 1-1.7 1.6A16.4 16.4 0 0 1 4 5.7 1.6 1.6 0 0 1 5.6 4z"/>',
    whatsapp: '<path d="M4.2 19.8l1.1-3.7a8.1 8.1 0 1 1 3 2.8z"/><path d="M9.3 8.4c.2 2.7 3.2 5.7 5.9 6.2.6.1 1.2-.4 1.4-1l.1-.5-1.8-.9-.8.9c-1.1-.4-2.3-1.6-2.8-2.7l.9-.8-.9-1.8-.5.1c-.6.2-1.1.8-1.1 1.4z"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    menu: '<path d="M4 9h16M4 15h16"/>',
    up: '<path d="M12 19V5M6.5 10.5L12 5l5.5 5.5"/>',
    check: '<path d="M5 12.5l4.2 4.2L19 7"/>',
    info: '<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.1"/>',
    alert: '<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5v5.5M12 16.2v.1"/>',
    copy: '<rect x="8.5" y="8.5" width="11" height="11" rx="1.5"/><path d="M15.5 8.5V6a1.5 1.5 0 0 0-1.5-1.5H6A1.5 1.5 0 0 0 4.5 6v8A1.5 1.5 0 0 0 6 15.5h2.5"/>',
    image: '<rect x="3.5" y="5" width="17" height="14" rx="1.5"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 3.5 3 3-2.5L20 17"/>',
    leaf: '<path d="M5 19c0-8 5.5-13 14-14-1 8.5-6 14-14 14z"/><path d="M5 19c3-4 6-7 10-10"/>',
    compass: '<circle cx="12" cy="12" r="8.5"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    parking: '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M10 16.5v-9h3a2.6 2.6 0 0 1 0 5.2h-3"/>',
    bus: '<rect x="5" y="3.5" width="14" height="14" rx="2.5"/><path d="M5 11h14M8 17.5V20M16 17.5V20"/><circle cx="8.5" cy="14.3" r=".8"/><circle cx="15.5" cy="14.3" r=".8"/>',
    route: '<circle cx="6.5" cy="6.5" r="2.2"/><circle cx="17.5" cy="17.5" r="2.2"/><path d="M8.7 6.5h6a3 3 0 0 1 0 6h-5.4a3 3 0 0 0 0 6h6"/>',
    bed: '<path d="M3.5 18.5V6M3.5 14.5h17v4M20.5 14.5v-3a2.5 2.5 0 0 0-2.5-2.5h-7.5v6"/><circle cx="7" cy="11.2" r="1.8"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1"/>',
    user: '<circle cx="12" cy="8.5" r="3.5"/><path d="M5 20c.8-3.6 3.6-5.5 7-5.5s6.2 1.9 7 5.5"/>',
    users: '<circle cx="9" cy="9" r="3"/><circle cx="16.5" cy="10" r="2.4"/><path d="M3.5 19c.6-3 2.8-4.7 5.5-4.7s4.9 1.7 5.5 4.7M14.5 15c2.6-.4 5 1 5.8 4"/>',
    envelope: '<rect x="3.5" y="6" width="17" height="12.5" rx="1.5"/><path d="M4 7l8 6 8-6"/>',
    heart: '<path d="M12 19.5s-7.5-4.6-7.5-10A4.2 4.2 0 0 1 12 7a4.2 4.2 0 0 1 7.5 2.5c0 5.4-7.5 10-7.5 10z"/>',
    external: '<path d="M14 4.5h5.5V10M19.5 4.5L11 13M17 13.5V19a1 1 0 0 1-1 1H5.5a1 1 0 0 1-1-1V8.5a1 1 0 0 1 1-1H11"/>',
    download: '<path d="M12 4.5v10M7.5 10.5L12 15l4.5-4.5M5 19.5h14"/>',
    tree: '<circle cx="12" cy="5.5" r="2"/><circle cx="6" cy="17.5" r="2"/><circle cx="18" cy="17.5" r="2"/><path d="M12 7.5v4M6 15.5v-2h12v2"/>'
  };
  AD.icon = function (name, cls) {
    return '<svg class="' + (cls || 'icon') + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + (ICONS[name] || '') + '</svg>';
  };

  /* ---------- Scroll lock ---------- */
  var lockCount = 0;
  AD.lockScroll = function () { if (lockCount++ === 0) document.documentElement.classList.add('is-locked'); };
  AD.unlockScroll = function () { if (lockCount > 0 && --lockCount === 0) document.documentElement.classList.remove('is-locked'); };

  /* ---------- Dialogs ----------
     Native <dialog>.showModal() places overlays in the browser's top layer,
     above every element, so no section can clip them. */
  AD.dialog = {
    create: function (o) {
      var d = document.createElement('dialog');
      d.className = 'dlg ' + (o.size ? 'dlg--' + o.size : '') + ' ' + (o.className || '');
      d.id = o.id;
      d.setAttribute('aria-labelledby', o.id + '-title');
      d.innerHTML =
        '<div class="dlg__panel">' +
          '<div class="dlg__head">' +
            '<h2 class="dlg__title" id="' + o.id + '-title">' + o.title + '</h2>' +
            '<button class="dlg__close" type="button" data-close>' + AD.icon('close') + '<span>Close</span></button>' +
          '</div>' +
          '<div class="dlg__body">' + (o.body || '') + '</div>' +
        '</div>';
      document.body.appendChild(d);

      // Backdrop tap: the <dialog> itself fills the screen; the panel sits inside.
      d.addEventListener('click', function (e) { if (e.target === d) AD.dialog.close(d); });
      d.addEventListener('cancel', function (e) { e.preventDefault(); AD.dialog.close(d); });
      d.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && !d.showModal) AD.dialog.close(d);
      });
      d.querySelector('[data-close]').addEventListener('click', function () { AD.dialog.close(d); });
      return d;
    },
    open: function (d, opener) {
      if (d.open) return;
      d._opener = opener || document.activeElement;
      AD.lockScroll();
      if (typeof d.showModal === 'function') {
        d.showModal();
      } else {
        d.setAttribute('open', '');
        d.classList.add('dlg--fallback');
      }
      var body = d.querySelector('.dlg__body');
      if (body) body.scrollTop = 0;
      // Focus the close button so the visible exit is always the first stop.
      var close = d.querySelector('[data-close]');
      if (close) close.focus({ preventScroll: true });
      requestAnimationFrame(function () { d.classList.add('is-open'); });
      d.dispatchEvent(new CustomEvent('dlg:open'));
    },
    close: function (d) {
      if (!d.open || d._closing) return;
      d._closing = true;
      d.classList.remove('is-open');
      setTimeout(function () {
        if (typeof d.close === 'function') d.close(); else d.removeAttribute('open');
        d._closing = false;
        AD.unlockScroll();
        if (d._opener && document.contains(d._opener)) d._opener.focus({ preventScroll: true });
        d.dispatchEvent(new CustomEvent('dlg:close'));
      }, AD.reducedMotion() ? 0 : 200);
    }
  };

  /* ---------- Calendar ----------
     Rules (PRD §4.3): no date → no entry; date without confirmed time or
     timezone → all-day entry; date + time + timezone → timed entry in UTC. */
  function pad(n) { return String(n).padStart(2, '0'); }
  function utcStamp(d) {
    return d.getUTCFullYear() + pad(d.getUTCMonth() + 1) + pad(d.getUTCDate()) + 'T' +
      pad(d.getUTCHours()) + pad(d.getUTCMinutes()) + pad(d.getUTCSeconds()) + 'Z';
  }
  function icsEscape(s) { return String(s || '').replace(/\\/g, '\\\\').replace(/\n/g, '\\n').replace(/([,;])/g, '\\$1'); }
  function icsFold(line) {
    var out = [];
    while (line.length > 74) { out.push(line.slice(0, 74)); line = ' ' + line.slice(74); }
    out.push(line);
    return out.join('\r\n');
  }

  AD.calendar = {
    build: function (o) {
      if (!AD.has(o.date)) return null;
      var tz = C.timezone || {};
      var timed = AD.has(o.startTime) && AD.has(tz.utcOffset);
      var ev = { uid: o.uid, title: o.title, description: o.description || '', location: o.location || '' };
      if (!timed) {
        var next = AD.parseDate(o.date);
        next.setUTCDate(next.getUTCDate() + 1);
        ev.allDay = true;
        ev.start = o.date.replace(/-/g, '');
        ev.end = next.toISOString().slice(0, 10).replace(/-/g, '');
        return ev;
      }
      var s = new Date(o.date + 'T' + o.startTime + ':00' + tz.utcOffset);
      var e = AD.has(o.endTime) ? new Date(o.date + 'T' + o.endTime + ':00' + tz.utcOffset) : new Date(s.getTime() + 2 * 3600e3);
      if (e <= s) e = new Date(e.getTime() + 24 * 3600e3);
      if (!AD.has(o.endTime)) ev.description += (ev.description ? '\n' : '') + 'End time approximate.';
      ev.allDay = false;
      ev.start = utcStamp(s);
      ev.end = utcStamp(e);
      return ev;
    },
    googleUrl: function (ev) {
      var p = new URLSearchParams({ action: 'TEMPLATE', text: ev.title, dates: ev.start + '/' + ev.end, details: ev.description });
      if (ev.location) p.set('location', ev.location);
      if (!ev.allDay && C.timezone && C.timezone.iana) p.set('ctz', C.timezone.iana);
      return 'https://calendar.google.com/calendar/render?' + p.toString();
    },
    ics: function (ev) {
      var lines = [
        'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Angel and David//Wedding Invitation//EN', 'CALSCALE:GREGORIAN', 'METHOD:PUBLISH',
        'BEGIN:VEVENT',
        'UID:' + ev.uid + '@angel-david-wedding',
        'DTSTAMP:' + utcStamp(new Date()),
        ev.allDay ? 'DTSTART;VALUE=DATE:' + ev.start : 'DTSTART:' + ev.start,
        ev.allDay ? 'DTEND;VALUE=DATE:' + ev.end : 'DTEND:' + ev.end,
        'SUMMARY:' + icsEscape(ev.title),
        'DESCRIPTION:' + icsEscape(ev.description)
      ];
      if (ev.location) lines.push('LOCATION:' + icsEscape(ev.location));
      lines.push('TRANSP:' + (ev.allDay ? 'TRANSPARENT' : 'OPAQUE'), 'END:VEVENT', 'END:VCALENDAR');
      return lines.map(icsFold).join('\r\n') + '\r\n';
    },
    download: function (ev) {
      var ics = AD.calendar.ics(ev);
      var name = (ev.uid || 'wedding') + '.ics';
      var isIOS = /iP(hone|ad|od)/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
      if (isIOS) {
        window.location.href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
        return;
      }
      var blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' });
      var url = URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url; a.download = name;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(url); }, 1500);
    },
    // Bottom sheet offering Google Calendar or an .ics file.
    open: function (ev, opener) {
      var d = document.getElementById('calendar-dialog');
      if (!d) d = AD.dialog.create({ id: 'calendar-dialog', title: 'Add to Calendar', size: 'sheet' });
      var when = ev.allDay
        ? AD.formatDate(ev.start.slice(0, 4) + '-' + ev.start.slice(4, 6) + '-' + ev.start.slice(6, 8)) + ' · All day'
        : 'Timed event';
      d.querySelector('.dlg__body').innerHTML =
        '<div class="sheet-summary"><strong>' + AD.esc(ev.title) + '</strong><span>' + AD.esc(when) + '</span></div>' +
        '<div class="sheet-actions">' +
          '<a class="btn btn--primary btn--block" href="' + AD.esc(AD.calendar.googleUrl(ev)) + '" target="_blank" rel="noopener">' + AD.icon('calendar') + 'Google Calendar</a>' +
          '<button class="btn btn--secondary btn--block" type="button" data-ics>' + AD.icon('download') + 'Apple / Outlook (.ics)</button>' +
        '</div>' +
        (ev.allDay ? '<p class="sheet-note">Saved as an all-day entry. The time and venue will be shared here once confirmed — please check back.</p>' : '');
      d.querySelector('[data-ics]').addEventListener('click', function () {
        AD.calendar.download(ev);
        AD.announce('Calendar file prepared.');
      });
      AD.dialog.open(d, opener);
    }
  };

  /* ---------- Storage (RSVP + wishes) ----------
     Connected mode: content.backend.endpoint is set → POST to it; success only
     when the server answers { ok: true }.
     Demo mode: no endpoint → kept in this browser only and labelled as preview. */
  var DEMO_KEYS = { rsvp: 'ad-demo-rsvps', wish: 'ad-demo-wishes' };
  function readLocal(key) {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch (e) { return []; }
  }
  AD.store = {
    isConnected: function () { return !!(C.backend && AD.has(C.backend.endpoint)); },
    submit: function (type, data) {
      if (!AD.store.isConnected()) {
        try {
          var list = readLocal(DEMO_KEYS[type]);
          list.unshift(Object.assign({ submittedAt: new Date().toISOString(), demo: true }, data));
          localStorage.setItem(DEMO_KEYS[type], JSON.stringify(list.slice(0, 50)));
          return Promise.resolve({ ok: true, demo: true });
        } catch (e) {
          return Promise.resolve({ ok: false, demo: true, error: 'Preview storage is not available in this browser.' });
        }
      }
      var ctrl = window.AbortController ? new AbortController() : null;
      var timer = setTimeout(function () { if (ctrl) ctrl.abort(); }, 15000);
      return fetch(C.backend.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' }, // avoids a CORS preflight
        body: JSON.stringify(Object.assign({ type: type }, data)),
        signal: ctrl ? ctrl.signal : undefined
      }).then(function (res) {
        return res.json().catch(function () { return null; }).then(function (json) {
          if (!res.ok || !json || json.ok !== true) {
            return { ok: false, error: (json && json.error) || 'The server could not save this (status ' + res.status + ').' };
          }
          return { ok: true, pending: !!json.pending };
        });
      }).catch(function (err) {
        return { ok: false, error: err && err.name === 'AbortError' ? 'The request timed out.' : 'We could not reach the server. Please check your connection.' };
      }).then(function (r) { clearTimeout(timer); return r; });
    },
    listWishes: function () {
      if (!AD.store.isConnected()) {
        return Promise.resolve({ ok: true, demo: true, wishes: readLocal(DEMO_KEYS.wish) });
      }
      var url = C.backend.endpoint + (C.backend.endpoint.indexOf('?') > -1 ? '&' : '?') + 'action=wishes';
      return fetch(url).then(function (r) { return r.json(); }).then(function (json) {
        if (!json || json.ok !== true) throw new Error('bad response');
        return { ok: true, wishes: json.wishes || [] };
      }).catch(function () { return { ok: false, wishes: [] }; });
    }
  };

  /* ---------- Scroll reveal ---------- */
  AD.reveal = {
    io: null,
    start: function () {
      var els = AD.$$('.reveal:not(.is-in)');
      if (!('IntersectionObserver' in window) || AD.reducedMotion()) {
        els.forEach(function (el) { el.classList.add('is-in'); });
        return;
      }
      if (!AD.reveal.io) {
        AD.reveal.io = new IntersectionObserver(function (entries) {
          entries.forEach(function (en) {
            if (en.isIntersecting) {
              en.target.classList.add('is-in');
              en.target.dispatchEvent(new CustomEvent('reveal'));
              AD.reveal.io.unobserve(en.target);
            }
          });
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
      }
      els.forEach(function (el) { AD.reveal.io.observe(el); });
    }
  };

  /* ---------- Small form helpers ---------- */
  AD.form = {
    setError: function (field, msg) {
      var wrap = field.closest('.field');
      if (!wrap) return;
      var err = wrap.querySelector('.field__error');
      wrap.classList.toggle('is-invalid', !!msg);
      var controls = wrap.querySelectorAll('input, textarea');
      controls.forEach(function (c) { if (msg) c.setAttribute('aria-invalid', 'true'); else c.removeAttribute('aria-invalid'); });
      if (err) {
        err.hidden = !msg;
        err.innerHTML = msg ? AD.icon('alert') + '<span>' + AD.esc(msg) + '</span>' : '';
      }
    },
    errorSummary: function (container, errors) {
      if (!errors.length) { container.hidden = true; container.innerHTML = ''; return; }
      container.hidden = false;
      container.innerHTML = '<div class="status status--error error-summary" role="alert">' + AD.icon('alert') +
        '<div><p><strong>Please check ' + (errors.length === 1 ? 'one detail' : errors.length + ' details') + ':</strong></p><ul>' +
        errors.map(function (e) { return '<li><a href="#' + e.id + '">' + AD.esc(e.msg) + '</a></li>'; }).join('') +
        '</ul></div></div>';
      AD.$$('a', container).forEach(function (a) {
        a.addEventListener('click', function (ev) {
          ev.preventDefault();
          var t = document.getElementById(a.getAttribute('href').slice(1));
          if (t) { t.focus(); t.scrollIntoView({ block: 'center', behavior: AD.reducedMotion() ? 'auto' : 'smooth' }); }
        });
      });
      var first = container.querySelector('a');
      if (first) container.querySelector('.status').setAttribute('tabindex', '-1');
    }
  };
})();
