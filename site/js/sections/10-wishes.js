/* =============================================================================
   10. WISHING WALL — modelled on the couple's reference video: the faces of
   the guests who left a blessing float around a central card that shows one
   wish. Tapping a face flies it into the middle (the previous face takes its
   place) and the new wish appears word by word; ‹ › arrows and a counter
   step through every wish, and the wall turns on its own while it is on
   screen. Every face is black and white (a guest's own photo, or a black or
   white monogram). The form to leave a blessing sits below the wall.
   Demo mode (no backend.endpoint): wishes stay in this browser only and are
   labelled "Preview". Connected mode: saved by the server; with moderation
   they appear only after approval. Guest text is always rendered as text.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  var EVERY = 6500;          // ms between automatic turns
  // Faces around the card: [x %, y %, size px] (the card sits in the middle).
  // Kept to the sides and the space under the card, so no face hides the wish.
  var SLOTS = [[6, 16, 44], [93, 12, 40], [5, 44, 36], [95, 40, 46], [7, 72, 46], [92, 68, 36], [24, 95, 40], [76, 94, 44], [50, 98, 32], [94, 92, 30]];
  var PHOTO_RE = /^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/;

  function shortDate(iso) {
    var d = new Date(iso);
    if (!iso || isNaN(d)) return '';
    return d.getDate() + ' ' + ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][d.getMonth()] + ' ' + d.getFullYear();
  }
  function initials(name) {
    var p = String(name || '?').trim().split(/\s+/);
    return (p[0].charAt(0) + (p.length > 1 ? p[p.length - 1].charAt(0) : '')).toUpperCase();
  }
  function tone(name) {   // black or white monogram, chosen from the name so it stays the same
    var h = 0, s = String(name || '');
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h) % 2 ? 'ink' : 'pearl';
  }

  // A face: the guest's own photo (black and white) or a monogram. DOM only.
  function face(w, cls) {
    var el = document.createElement('span');
    el.className = 'ww-av ' + (cls || '');
    if (w && w.photo && PHOTO_RE.test(w.photo)) {
      var img = document.createElement('img');
      img.src = w.photo; img.alt = ''; img.decoding = 'async';
      el.appendChild(img);
    } else if (w) {
      el.classList.add('ww-av--' + tone(w.name));
      var t = document.createElement('span');
      t.textContent = initials(w.name);
      el.appendChild(t);
    } else {
      el.classList.add('ww-av--empty');
      el.innerHTML = AD.icon('heart');
    }
    return el;
  }

  // Load an image file, crop it square, turn it black and white and shrink it.
  function photoFromFile(file) {
    return new Promise(function (res, rej) {
      if (!file || !/^image\//.test(file.type)) { rej(new Error('Please choose a photo.')); return; }
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () {
        var N = 200, c = document.createElement('canvas'); c.width = c.height = N;
        var g = c.getContext('2d'), s = Math.min(img.naturalWidth, img.naturalHeight);
        g.drawImage(img, (img.naturalWidth - s) / 2, (img.naturalHeight - s) * .35, s, s, 0, 0, N, N);
        var d = g.getImageData(0, 0, N, N), p = d.data;
        for (var i = 0; i < p.length; i += 4) {
          var y = p[i] * .2126 + p[i + 1] * .7152 + p[i + 2] * .0722;
          y = Math.max(0, Math.min(255, (y - 128) * 1.06 + 132));
          p[i] = p[i + 1] = p[i + 2] = y;
        }
        g.putImageData(d, 0, 0);
        URL.revokeObjectURL(url);
        var q = .82, out = c.toDataURL('image/jpeg', q);
        while (out.length > 44000 && q > .4) { q -= .12; out = c.toDataURL('image/jpeg', q); }
        res(out);
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error('That photo could not be read.')); };
      img.src = url;
    });
  }

  AD.register('wishes', {
    render: function (C) {
      var W = C.wishes || {};
      var connected = AD.store.isConnected();
      return '<div class="container">' +
        AD.sectionHead({
          id: 'wishes', eyebrow: 'Wishing Wall', title: 'Leave a Blessing',
          intro: 'Blessings from our family and friends for ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '.'
        }) +
        // The wall
        '<div class="ww reveal" role="region" aria-roledescription="carousel" aria-label="Blessings for ' + AD.esc(C.couple.bride) + ' and ' + AD.esc(C.couple.groom) + '">' +
          '<div class="ww-orbit" data-orbit></div>' +
          '<div class="ww-card">' +
            '<div class="ww-head">' +
              '<svg class="ww-arc" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M8 52C70 10 230 10 292 52"/></svg>' +
              '<button class="ww-arrow ww-arrow--prev" type="button" data-step="-1" aria-label="Previous wish">' + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14.5 6.5L9 12l5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
              '<span class="ww-face" data-face></span>' +
              '<button class="ww-arrow ww-arrow--next" type="button" data-step="1" aria-label="Next wish">' + '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 6.5L15 12l-5.5 5.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg></button>' +
            '</div>' +
            '<p class="ww-count numerals" data-count aria-hidden="true"></p>' +
            '<span class="ww-quote" aria-hidden="true">“</span>' +
            '<p class="ww-rel" data-rel hidden></p>' +
            '<blockquote class="ww-msg" data-msg></blockquote>' +
            '<p class="ww-name" data-name></p>' +
            '<p class="ww-meta" data-meta></p>' +
          '</div>' +
        '</div>' +

        // The form, below the wall
        '<form class="wish-form note reveal" id="wish-form" novalidate>' +
          '<h3 class="wish-form__title">Leave your blessing</h3>' +
          '<div data-errors hidden></div>' +
          '<div class="field">' +
            '<label class="field__label" for="wish-name">Your name</label>' +
            '<input class="input" id="wish-name" name="name" type="text" autocomplete="name" maxlength="' + W.nameMax + '" required aria-describedby="wish-name-err">' +
            '<p class="field__error" id="wish-name-err" hidden></p>' +
          '</div>' +
          '<div class="field">' +
            '<label class="field__label" for="wish-rel">How do you know the couple? <span class="opt">(optional)</span></label>' +
            '<input class="input" id="wish-rel" name="relation" type="text" maxlength="' + (W.relationMax || 60) + '" placeholder="e.g. College friend">' +
          '</div>' +
          '<div class="field">' +
            '<label class="field__label" for="wish-msg">Your wish</label>' +
            '<textarea class="textarea" id="wish-msg" name="message" rows="4" maxlength="' + W.messageMax + '" required aria-describedby="wish-msg-count wish-msg-err"></textarea>' +
            '<p class="field__counter" id="wish-msg-count" aria-live="off"><span data-count-chars>0</span> / ' + W.messageMax + '</p>' +
            '<p class="field__error" id="wish-msg-err" hidden></p>' +
          '</div>' +
          '<div class="field">' +
            '<span class="field__label" id="wish-photo-label">Your photo <span class="opt">(optional)</span></span>' +
            '<div class="ww-pick">' +
              '<span class="ww-pick__preview" data-pick-preview aria-hidden="true">' + AD.icon('user') + '</span>' +
              '<label class="btn btn--secondary btn--sm" for="wish-photo">' + AD.icon('image') + '<span data-pick-label>Add a photo</span></label>' +
              '<input class="sr-only" id="wish-photo" type="file" accept="image/*" aria-labelledby="wish-photo-label">' +
              '<button class="link-btn" type="button" data-pick-remove hidden>Remove</button>' +
            '</div>' +
            '<p class="field__hint">Shown in black and white beside your wish.</p>' +
            '<p class="field__error" id="wish-photo-err" hidden></p>' +
          '</div>' +
          '<div class="hp-field" aria-hidden="true"><label for="wish-website">Website</label><input id="wish-website" name="website" type="text" tabindex="-1" autocomplete="off"></div>' +
          '<button class="btn btn--primary btn--block" type="submit">' + AD.icon('envelope') + '<span>Send Wish</span></button>' +
          '<div data-status aria-live="polite"></div>' +
          (connected
            ? (W.moderation ? '<p class="mode-note">' + AD.icon('info') + '<span>Wishes appear on the wall after the couple approves them.</span></p>' : '')
            : '<p class="mode-note">' + AD.icon('info') + '<span><strong>Preview mode:</strong> wishes are kept only in this browser and are not sent to ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + ' until the wall is connected.</span></p>') +
        '</form>' +
      '</div>';
    },

    init: function (el, C) {
      var W = C.wishes || {};
      var wall = el.querySelector('.ww'), orbit = el.querySelector('[data-orbit]');
      var faceBox = el.querySelector('[data-face]'), countEl = el.querySelector('[data-count]');
      var relEl = el.querySelector('[data-rel]'), msgEl = el.querySelector('[data-msg]');
      var nameEl = el.querySelector('[data-name]'), metaEl = el.querySelector('[data-meta]');
      var arrows = AD.$$('.ww-arrow', el);
      var still = AD.reducedMotion();
      var list = [], cur = 0, slotOf = [], busy = false, timer = 0, inView = false, hold = 0, rot = 0;

      /* ---------- The wall ---------- */
      function setText(w) {
        relEl.hidden = !(w && w.relation);
        relEl.textContent = w && w.relation ? w.relation : '';
        msgEl.textContent = '';
        if (w) {
          String(w.message).split(/(\s+)/).forEach(function (part, i) {
            if (/^\s+$/.test(part)) { msgEl.appendChild(document.createTextNode(part)); return; }
            var s = document.createElement('span');
            s.className = 'ww-w'; s.style.setProperty('--i', i / 2); s.textContent = part;
            msgEl.appendChild(s);
          });
        } else {
          msgEl.textContent = 'No wishes yet — be the first to leave a blessing.';
        }
        msgEl.classList.toggle('is-long', !!w && String(w.message).length > 200);
        nameEl.textContent = w ? w.name : '';
        metaEl.textContent = w ? shortDate(w.submittedAt) + (w.demo ? (w.submittedAt ? ' · ' : '') + 'Preview · this device only' : '') : '';
        countEl.textContent = list.length ? String(cur + 1).padStart(2, '0') + ' / ' + String(list.length).padStart(2, '0') : '';
      }
      function textIn() {
        wall.classList.remove('is-out');
        wall.classList.add('is-in-start');
        void wall.offsetWidth;
        wall.classList.remove('is-in-start');
      }

      function slotButton(s, idx) {
        var b = document.createElement('button');
        b.type = 'button'; b.className = 'ww-slot'; b.setAttribute('data-s', s);
        var sl = SLOTS[s];
        b.style.left = sl[0] + '%'; b.style.top = sl[1] + '%';
        b.style.setProperty('--sz', sl[2] + 'px'); b.style.setProperty('--d', ((s * 7) % 10) / 10 * -6 + 's');
        b.setAttribute('aria-label', 'Show the wish from ' + list[idx].name);
        b.appendChild(face(list[idx]));
        b.addEventListener('click', function () { pause(); go(slotOf[s], s); });
        return b;
      }
      function buildOrbit() {
        orbit.innerHTML = '';
        SLOTS.forEach(function (sl, s) {
          if (slotOf[s] == null || slotOf[s] < 0) return;
          orbit.appendChild(slotButton(s, slotOf[s]));
        });
      }
      function layout(start) {
        cur = start || 0;
        slotOf = [];
        var n = 0;
        for (var k = 1; k < list.length && n < SLOTS.length; k++) slotOf[n++] = (cur + k) % list.length;
        faceBox.innerHTML = ''; faceBox.appendChild(face(list[cur]));
        buildOrbit();
        setText(list[cur]);
        textIn();
        arrows.forEach(function (a) { a.hidden = list.length < 2; });
      }

      function rectIn(node) {
        var r = node.getBoundingClientRect(), b = wall.getBoundingClientRect();
        return { x: r.left - b.left, y: r.top - b.top, w: r.width, h: r.height };
      }
      function fly(w, from, to) {
        var f = face(w, 'ww-fly');
        f.style.left = from.x + 'px'; f.style.top = from.y + 'px'; f.style.width = from.w + 'px'; f.style.height = from.h + 'px';
        wall.appendChild(f);
        var dx = to.x - from.x, dy = to.y - from.y, sc = to.w / from.w;
        var a = f.animate([
          { transform: 'translate(0,0) scale(1)' },
          { transform: 'translate(' + (dx * .5) + 'px,' + (dy * .5 - 30) + 'px) scale(' + ((1 + sc) / 2) + ')', offset: .5 },
          { transform: 'translate(' + dx + 'px,' + dy + 'px) scale(' + sc + ')' }
        ], { duration: 760, easing: 'cubic-bezier(.45,.05,.35,1)', fill: 'forwards' });
        return a.finished.then(function () { f.remove(); });
      }

      // Show wish i; s = the orbit slot it comes from (if it is on the wall).
      function go(i, s) {
        if (busy || !list.length) return;
        i = (i + list.length) % list.length;
        if (i === cur) return;
        if (s == null) s = slotOf.indexOf(i);
        if (s < 0) {      // not among the faces yet: it takes the next slot in turn
          s = rot++ % Math.min(SLOTS.length, Math.max(1, list.length - 1));
          slotOf[s] = i;
          buildOrbit();
        }
        var prev = cur;
        var slotBtn = orbit.querySelector('.ww-slot[data-s="' + s + '"]');
        cur = i;
        if (still || !slotBtn || !Element.prototype.animate) {
          slotOf[s] = prev;
          faceBox.innerHTML = ''; faceBox.appendChild(face(list[cur]));
          buildOrbit(); setText(list[cur]); textIn();
          return;
        }
        busy = true;
        var from = rectIn(slotBtn), to = rectIn(faceBox);
        slotBtn.style.visibility = 'hidden';
        faceBox.style.visibility = 'hidden';
        wall.classList.add('is-out');
        Promise.all([fly(list[i], from, to), fly(list[prev], to, from)]).then(function () {
          slotOf[s] = prev;
          faceBox.innerHTML = ''; faceBox.appendChild(face(list[cur]));
          faceBox.style.visibility = '';
          buildOrbit();
          setText(list[cur]);
          textIn();
          busy = false;
        });
      }

      function schedule() {
        clearTimeout(timer);
        if (still || !inView || list.length < 2) return;
        timer = setTimeout(function () {
          if (Date.now() > hold && !wall.matches(':hover') && !wall.contains(document.activeElement)) go(cur + 1);
          schedule();
        }, EVERY);
      }
      function pause() { hold = Date.now() + 15000; }

      arrows.forEach(function (a) {
        a.addEventListener('click', function () { pause(); go(cur + Number(a.getAttribute('data-step'))); });
      });
      var x0 = null;
      wall.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      wall.addEventListener('touchend', function (e) {
        if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
        if (Math.abs(dx) > 50) { pause(); go(cur + (dx < 0 ? 1 : -1)); }
      });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { inView = en[0].intersectionRatio > .35; schedule(); }, { threshold: [0, .35] }).observe(wall);
      }

      function refresh(showNewest) {
        return AD.store.listWishes().then(function (r) {
          var real = (r.wishes || []).filter(function (w) { return w && AD.has(w.name) && AD.has(w.message); });
          // Sample blessings only while there are no real wishes yet
          list = real.length ? real : (W.showSamples ? (W.samples || []).slice() : []);
          layout(showNewest ? 0 : Math.min(cur, Math.max(0, list.length - 1)));
          schedule();
        });
      }
      refresh();

      /* ---------- The form ---------- */
      var form = el.querySelector('#wish-form');
      var nameI = form.querySelector('#wish-name'), relI = form.querySelector('#wish-rel'), msgI = form.querySelector('#wish-msg');
      var countChars = form.querySelector('[data-count-chars]'), status = form.querySelector('[data-status]'), errors = form.querySelector('[data-errors]');
      var submit = form.querySelector('button[type="submit"]');
      var photoI = form.querySelector('#wish-photo'), preview = form.querySelector('[data-pick-preview]');
      var pickLabel = form.querySelector('[data-pick-label]'), removeB = form.querySelector('[data-pick-remove]'), photoErr = form.querySelector('#wish-photo-err');
      var photo = '', tried = false;

      function showPhoto() {
        preview.innerHTML = '';
        if (photo) { var im = document.createElement('img'); im.src = photo; im.alt = ''; preview.appendChild(im); }
        else preview.innerHTML = AD.icon('user');
        pickLabel.textContent = photo ? 'Change photo' : 'Add a photo';
        removeB.hidden = !photo;
      }
      photoI.addEventListener('change', function () {
        var f = photoI.files && photoI.files[0];
        photoErr.hidden = true;
        if (!f) return;
        photoFromFile(f).then(function (d) { photo = d; showPhoto(); }, function (err) {
          photoErr.hidden = false; photoErr.innerHTML = AD.icon('alert') + '<span>' + AD.esc(err.message) + '</span>';
        });
        photoI.value = '';
      });
      removeB.addEventListener('click', function () { photo = ''; showPhoto(); });

      msgI.addEventListener('input', function () { countChars.textContent = msgI.value.length; if (tried) validate(); });
      nameI.addEventListener('input', function () { if (tried) validate(); });

      function validate() {
        var errs = [];
        var n = nameI.value.trim(), m = msgI.value.trim();
        var ne = !n ? 'Please enter your name.' : (n.length > W.nameMax ? 'Please keep your name under ' + W.nameMax + ' characters.' : '');
        var me = !m ? 'Please write a wish.' : (m.length < 2 ? 'Your wish is a little short.' : '');
        AD.form.setError(nameI, ne);
        AD.form.setError(msgI, me);
        if (ne) errs.push({ id: 'wish-name', msg: ne });
        if (me) errs.push({ id: 'wish-msg', msg: me });
        return errs;
      }

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        tried = true;
        status.innerHTML = '';
        var errs = validate();
        AD.form.errorSummary(errors, errs);
        if (errs.length) { errors.querySelector('.status').focus(); return; }

        var payload = { name: nameI.value.trim(), relation: relI.value.trim(), message: msgI.value.trim(), photo: photo, website: form.querySelector('#wish-website').value };
        submit.classList.add('is-busy');
        submit.disabled = true;
        AD.store.submit('wish', payload).then(function (r) {
          submit.classList.remove('is-busy');
          submit.disabled = false;
          if (!r.ok) {
            status.innerHTML = '<div class="status status--error" role="alert">' + AD.icon('alert') +
              '<div><p><strong>Your wish was not sent.</strong> ' + AD.esc(r.error || '') + '</p><p>Please try again, or share it with the family through the Contact section.</p></div></div>';
            return;
          }
          form.reset();
          photo = ''; showPhoto();
          countChars.textContent = '0';
          tried = false;
          if (r.demo) {
            status.innerHTML = '<div class="status status--demo">' + AD.icon('info') +
              '<div><p><strong>Preview only.</strong> Your wish was kept on this device and has not been sent to ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '.</p></div></div>';
          } else if (r.pending || W.moderation) {
            status.innerHTML = '<div class="status status--success">' + AD.icon('check') +
              '<div><p><strong>Thank you!</strong> Your wish has been received and will appear once approved.</p></div></div>';
          } else {
            status.innerHTML = '<div class="status status--success">' + AD.icon('check') + '<div><p><strong>Thank you!</strong> Your wish has been added to the wall.</p></div></div>';
          }
          refresh(true).then(function () {
            if (r.demo || !(r.pending || W.moderation)) wall.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
          });
        });
      });
    }
  });
})();
