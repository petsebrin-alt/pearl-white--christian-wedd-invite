/* =============================================================================
   10. WISHING WALL — after the couple's "arc dial" reference video. The faces
   of the guests who left a blessing sit on a large ring that turns like a
   globe: the face at the top is the wish being read, and every few seconds
   the ring turns on its own, carrying the next face up to the top while its
   wish appears word by word beneath it. No card and no tapping needed (the
   ‹ › arrows are there for anyone who wants them). Faces further round the
   ring are smaller and fade away, as if going round the far side.
   Every face is black and white (a guest's own photo, or a monogram).
   Behind it all: white roses that sway gently (the couple's "Order of the
   Day" video); the form sits over them on frosted paper.
   Wishes are kept by AD.store — in this browser until the Google Sheet is
   connected; once connected they are saved there, and with moderation they
   appear for everyone after approval (the sender sees theirs straight away).
   A new wish joins the ring at the top. Guest text is always set as text.
   ========================================================================== */
(function () {
  'use strict';
  var AD = window.AD;

  var TURN = 1300;                  // ms the ring takes to bring the next face up
  var PHOTO_RE = /^data:image\/jpeg;base64,[A-Za-z0-9+\/=]+$/;
  var ASSET_RE = /^assets\/images\/wishes\/[a-z0-9-]+\.webp$/;
  var V = '?v=20261023a';
  var OTHER = 'Other';

  function initials(name) {
    var p = String(name || '?').trim().split(/\s+/);
    return (p[0].charAt(0) + (p.length > 1 ? p[p.length - 1].charAt(0) : '')).toUpperCase();
  }
  function tone(name) {   // black or white monogram, chosen from the name so it stays the same
    var h = 0, s = String(name || '');
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
    return Math.abs(h) % 2 ? 'ink' : 'pearl';
  }
  // How long a wish stays at the top: long enough to read it.
  function dwell(w) { return Math.min(11000, Math.max(5200, 3000 + String(w.message).length * 45)); }
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  // A face: the guest's photo (black and white) or a monogram. DOM only.
  function face(w) {
    var el = document.createElement('span');
    el.className = 'ww-av';
    var src = w && w.photo && (PHOTO_RE.test(w.photo) ? w.photo : ASSET_RE.test(w.photo) ? w.photo + V : '');
    if (src) {
      var img = document.createElement('img');
      img.src = src; img.alt = ''; img.decoding = 'async'; img.draggable = false;
      el.appendChild(img);
    } else {
      el.classList.add('ww-av--' + tone(w && w.name));
      var t = document.createElement('span');
      t.textContent = initials(w && w.name);
      el.appendChild(t);
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

  var ARROW = function (d) {
    return '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="' + d + '" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
  };

  AD.register('wishes', {
    render: function (C) {
      var W = C.wishes || {};
      var rel = (W.relations || []).filter(function (r) { return AD.has(r) && r !== OTHER; });
      return '' +
        // White roses, swaying gently behind the whole section
        '<div class="ww-bg" aria-hidden="true"><div class="ww-bg__stage">' +
          '<span class="ww-bg__roses ww-bg__roses--a"></span><span class="ww-bg__roses ww-bg__roses--b"></span>' +
        '</div></div>' +
        '<div class="container">' +
        AD.sectionHead({
          id: 'wishes', eyebrow: 'Wishing Wall', title: 'Leave a Blessing',
          intro: 'Blessings from our family and friends for ' + AD.esc(C.couple.bride) + ' &amp; ' + AD.esc(C.couple.groom) + '.'
        }) +
        // The ring of faces and the wish being read
        '<div class="ww reveal" role="region" aria-roledescription="carousel" aria-label="Blessings for ' + AD.esc(C.couple.bride) + ' and ' + AD.esc(C.couple.groom) + '">' +
          '<svg class="ww-ring" aria-hidden="true"><defs><linearGradient id="ww-ring-fade" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="0" y2="1">' +
            '<stop offset="0" stop-color="#b9b0a2" stop-opacity=".9"/><stop offset=".55" stop-color="#b9b0a2" stop-opacity=".55"/><stop offset="1" stop-color="#b9b0a2" stop-opacity="0"/>' +
          '</linearGradient></defs><path data-ring/></svg>' +
          '<div class="ww-faces" data-faces aria-hidden="true"></div>' +
          '<div class="ww-nav">' +
            '<button class="ww-arrow" type="button" data-step="-1" aria-label="Previous wish">' + ARROW('M14.5 6.5L9 12l5.5 5.5') + '</button>' +
            '<p class="ww-count numerals" data-count aria-hidden="true"></p>' +
            '<button class="ww-arrow" type="button" data-step="1" aria-label="Next wish">' + ARROW('M9.5 6.5L15 12l-5.5 5.5') + '</button>' +
          '</div>' +
          '<div class="ww-text" data-text aria-live="off">' +
            '<span class="ww-quote" aria-hidden="true">“</span>' +
            '<blockquote class="ww-msg" data-msg></blockquote>' +
            '<button class="ww-more" type="button" data-more hidden>Read more</button>' +
            '<p class="ww-name" data-name></p>' +
            '<p class="ww-rel" data-rel></p>' +
          '</div>' +
        '</div>' +
        // every wish at once, in a pop-up card (for when there are many)
        '<div class="ww-all"><button class="btn btn--secondary btn--sm" type="button" data-all hidden>' + AD.icon('heart') + '<span>View all wishes</span> <span class="ww-all__n numerals" data-all-n></span></button></div>' +

        // The form, on frosted paper over the roses
        '<form class="wish-form classic reveal" id="wish-form" novalidate>' +
          '<p class="wish-form__eyebrow">With love</p>' +
          '<h3 class="wish-form__title">Leave your blessing</h3>' +
          '<div data-errors hidden></div>' +
          '<div class="field">' +
            '<label class="field__label" for="wish-name">Your name</label>' +
            '<input class="input" id="wish-name" name="name" type="text" autocomplete="name" maxlength="' + W.nameMax + '" required aria-describedby="wish-name-err">' +
            '<p class="field__error" id="wish-name-err" hidden></p>' +
          '</div>' +
          '<div class="field">' +
            '<label class="field__label" for="wish-rel">How do you know the couple? <span class="opt">(optional)</span></label>' +
            '<select class="input select" id="wish-rel" name="relation">' +
              '<option value="">Choose one</option>' +
              rel.map(function (r) { return '<option>' + AD.esc(r) + '</option>'; }).join('') +
              '<option value="' + OTHER + '">Other</option>' +
            '</select>' +
          '</div>' +
          '<div class="field ww-other" data-other hidden>' +
            '<label class="field__label" for="wish-rel-other">Please tell us</label>' +
            '<input class="input" id="wish-rel-other" name="relationOther" type="text" maxlength="' + (W.relationMax || 60) + '" placeholder="e.g. Cousin from Kottayam" aria-describedby="wish-rel-other-err">' +
            '<p class="field__error" id="wish-rel-other-err" hidden></p>' +
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
        '</form>' +
      '</div>';
    },

    init: function (el, C) {
      var W = C.wishes || {};
      var wall = el.querySelector('.ww'), facesBox = el.querySelector('[data-faces]'), ringPath = el.querySelector('[data-ring]');
      var ringSvg = el.querySelector('.ww-ring'), grad = el.querySelector('#ww-ring-fade');
      var textBox = el.querySelector('[data-text]'), countEl = el.querySelector('[data-count]');
      var msgEl = el.querySelector('[data-msg]'), moreB = el.querySelector('[data-more]');
      var nameEl = el.querySelector('[data-name]'), relEl = el.querySelector('[data-rel]');
      var arrows = AD.$$('.ww-arrow', el);
      var still = AD.reducedMotion();
      var list = [], nodes = [], mine = [];
      var pos = 0, cur = 0, spacing = 30, g = {};
      var anim = 0, timer = 0, textTimer = 0, inView = false, hold = 0;

      /* ---------- The ring ---------- */
      function measure() {
        var Wd = wall.clientWidth, phone = Wd < 520;
        g.big = phone ? 74 : 92;
        g.ring = phone ? 44 : 54;
        g.R = Math.min(Wd / 2 - g.ring / 2 - 4, 270);
        g.cx = Wd / 2;
        g.top = g.big / 2 + 4;                // centre of the face at the top
        g.cy = g.top + g.R;
        wall.style.setProperty('--ww-under', (g.top + g.big / 2) + 'px');
        wall.style.setProperty('--ww-text', Math.round(Math.min(2 * (g.R - g.ring * .6) - 12, 430)) + 'px');
        wall.style.setProperty('--ww-min', Math.round(g.cy + g.R * .62) + 'px');
        // the hairline the faces travel on, fading away towards the bottom
        var a0 = -122 * Math.PI / 180, a1 = 122 * Math.PI / 180;
        ringPath.setAttribute('d', 'M' + (g.cx + g.R * Math.sin(a0)).toFixed(1) + ' ' + (g.cy - g.R * Math.cos(a0)).toFixed(1) +
          'A' + g.R.toFixed(1) + ' ' + g.R.toFixed(1) + ' 0 1 1 ' + (g.cx + g.R * Math.sin(a1)).toFixed(1) + ' ' + (g.cy - g.R * Math.cos(a1)).toFixed(1));
        grad.setAttribute('y1', (g.cy - g.R).toFixed(1));
        grad.setAttribute('y2', (g.cy + g.R * .55).toFixed(1));
      }

      // Each wish has one face; its place on the ring follows from pos.
      function draw() {
        var n = list.length;
        for (var i = 0; i < n; i++) {
          var nd = nodes[i]; if (!nd) continue;
          var rel = ((i - pos) % n + n) % n;
          if (rel > n / 2) rel -= n;
          var th = rel * spacing, ab = Math.abs(th);
          if (ab > 150) { if (nd.style.visibility !== 'hidden') nd.style.visibility = 'hidden'; continue; }
          var a = th * Math.PI / 180;
          var depth = (1 + Math.cos(a)) / 2;   // 1 at the top, 0 at the bottom
          var t = Math.max(0, 1 - ab / spacing); t = t * t * (3 - 2 * t);
          var size = g.ring * (.68 + .32 * depth); size += (g.big - size) * t;
          var op = ab <= 98 ? 1 : Math.max(0, 1 - (ab - 98) / 42);
          nd.style.visibility = op > .01 ? 'visible' : 'hidden';
          nd.style.opacity = op.toFixed(3);
          nd.style.zIndex = String(Math.round(depth * 100));
          nd.style.transform = 'translate3d(' + (g.cx + g.R * Math.sin(a) - g.big / 2).toFixed(2) + 'px,' + (g.cy - g.R * Math.cos(a) - g.big / 2).toFixed(2) + 'px,0) scale(' + (size / g.big).toFixed(4) + ')';
          nd.classList.toggle('is-top', ab < spacing / 2);
        }
      }

      function build() {
        var n = list.length;
        // Faces spread so that, when the ring turns, each one leaves and
        // returns round the far side (never jumping in plain sight).
        spacing = n >= 10 ? 30 : Math.max(30, 288 / Math.max(n, 2));
        facesBox.innerHTML = '';
        nodes = list.map(function (w) {
          var nd = document.createElement('span');
          nd.className = 'ww-dot';
          nd.style.width = nd.style.height = g.big + 'px';
          nd.appendChild(face(w));
          facesBox.appendChild(nd);
          return nd;
        });
        arrows.forEach(function (a) { a.hidden = n < 2; });
        draw();
      }

      /* ---------- The wish under the top face ---------- */
      function setText(w) {
        msgEl.textContent = '';
        wall.classList.remove('is-open');
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
        nameEl.textContent = w ? w.name : '';
        relEl.textContent = w ? [w.relation, w.pending ? 'Awaiting approval' : ''].filter(Boolean).join(' · ') : '';
        relEl.hidden = !relEl.textContent;
        countEl.textContent = list.length ? String(cur + 1).padStart(2, '0') + ' / ' + String(list.length).padStart(2, '0') : '';
        // "Read more" only when the wish is longer than the lines shown (a line
        // is ~25px; the words' small entrance lift must not count as overflow)
        moreB.textContent = 'Read more';
        requestAnimationFrame(function () { moreB.hidden = msgEl.scrollHeight <= msgEl.clientHeight + 14; });
      }
      function textIn() {
        wall.classList.remove('is-out');
        wall.classList.add('is-in-start');
        void wall.offsetWidth;
        wall.classList.remove('is-in-start');
      }
      moreB.addEventListener('click', function () {
        var open = wall.classList.toggle('is-open');
        moreB.textContent = open ? 'Show less' : 'Read more';
        if (open) pause(30000);
      });

      // Turn the ring so that wish i comes to the top (dir: which way round).
      function go(i, dir, from) {
        var n = list.length;
        if (!n) return;
        i = ((i % n) + n) % n;
        var start = from != null ? from : pos;
        var steps = dir || 1;
        if (!dir) { steps = i - cur; if (steps > n / 2) steps -= n; if (steps < -n / 2) steps += n; }
        var target = start + steps;
        cur = i;
        cancelAnimationFrame(anim); clearTimeout(textTimer);
        if (still || !steps) {
          pos = Math.round(target); draw(); setText(list[cur]); textIn(); schedule();
          return;
        }
        wall.classList.add('is-out');
        textTimer = setTimeout(function () { setText(list[cur]); textIn(); }, TURN * .55);
        var t0 = performance.now(), dur = TURN * Math.min(2, Math.max(1, Math.abs(steps) * .6));
        (function frame(now) {
          var p = Math.min(1, (now - t0) / dur);
          pos = start + (target - start) * ease(p);
          draw();
          if (p < 1) anim = requestAnimationFrame(frame);
          else { pos = target; schedule(); }
        })(t0);
      }

      function schedule() {
        clearTimeout(timer);
        if (still || !inView || list.length < 2) return;
        timer = setTimeout(function () {
          if (Date.now() < hold || wall.contains(document.activeElement)) { schedule(); return; }
          textBox.setAttribute('aria-live', 'off');
          go(cur + 1, 1);
        }, Math.max(dwell(list[cur]), hold - Date.now()));
      }
      function pause(ms) { hold = Date.now() + (ms || 12000); }

      arrows.forEach(function (a) {
        a.addEventListener('click', function () {
          textBox.setAttribute('aria-live', 'polite');
          pause(); go(cur + Number(a.getAttribute('data-step')), Number(a.getAttribute('data-step')));
        });
      });
      var x0 = null;
      wall.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
      wall.addEventListener('touchend', function (e) {
        if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null;
        if (Math.abs(dx) > 50) { pause(); go(cur + (dx < 0 ? 1 : -1), dx < 0 ? 1 : -1); }
      });
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (en) { inView = en[0].intersectionRatio > .3; if (inView) schedule(); else clearTimeout(timer); }, { threshold: [0, .3] }).observe(wall);
      }
      var rw = 0;
      window.addEventListener('resize', function () {
        cancelAnimationFrame(rw);
        rw = requestAnimationFrame(function () { measure(); nodes.forEach(function (nd) { nd.style.width = nd.style.height = g.big + 'px'; }); draw(); });
      });

      // The newest wishes first: this guest's own, then (in this browser
      // only, until the wall is connected) local ones, then the saved wall —
      // or the sample blessings while nothing real has been saved yet.
      function refresh(spinIn) {
        return AD.store.listWishes().then(function (r) {
          var got = (r.wishes || []).filter(function (w) { return w && AD.has(w.name) && AD.has(w.message); });
          var local = got.filter(function (w) { return w.demo; }), saved = got.filter(function (w) { return !w.demo; });
          list = mine.concat(local, saved.length ? saved : (W.showSamples ? (W.samples || []).slice() : []));
          measure();
          build();
          countAll();
          if (spinIn && list.length > 1 && !still) {
            // the ring spins round and brings the new wish up to the top
            cur = 0; pos = 0; draw();
            nodes[0].classList.add('is-new');
            go(0, Math.min(3, list.length - 1), -Math.min(3, list.length - 1));
          } else {
            cur = 0; pos = 0; draw(); setText(list[0]); textIn(); schedule();
          }
        });
      }
      refresh();

      /* ---------- All the wishes, in a pop-up card ---------- */
      var allBtn = el.querySelector('[data-all]'), allN = el.querySelector('[data-all-n]'), dlg = null;
      function fillAll() {
        var ul = document.createElement('ul');
        ul.className = 'ww-list';
        list.forEach(function (w) {
          var li = document.createElement('li'); li.className = 'ww-li';
          var f = document.createElement('span'); f.className = 'ww-li__face'; f.appendChild(face(w));
          var t = document.createElement('div');
          var m = document.createElement('blockquote'); m.className = 'ww-li__msg'; m.textContent = w.message;
          var n = document.createElement('p'); n.className = 'ww-li__name'; n.textContent = w.name;
          t.appendChild(m); t.appendChild(n);
          if (AD.has(w.relation) || w.pending) {
            var r = document.createElement('p'); r.className = 'ww-li__rel';
            r.textContent = [w.relation, w.pending ? 'Awaiting approval' : ''].filter(Boolean).join(' · ');
            t.appendChild(r);
          }
          li.appendChild(f); li.appendChild(t); ul.appendChild(li);
        });
        var body = dlg.querySelector('.dlg__body');
        body.innerHTML = '';
        body.appendChild(ul);
        dlg.querySelector('.dlg__title').textContent = 'All Wishes (' + list.length + ')';
      }
      allBtn.addEventListener('click', function () {
        if (!dlg) dlg = AD.dialog.create({ id: 'wishes-dialog', title: 'All Wishes', size: 'md', className: 'dlg--wishes' });
        pause(30000);
        fillAll();
        AD.dialog.open(dlg, allBtn);
      });
      // keep the button's count in step with the wall
      function countAll() { allBtn.hidden = list.length < 2; allN.textContent = '(' + list.length + ')'; }

      /* ---------- The form ---------- */
      var form = el.querySelector('#wish-form');
      var nameI = form.querySelector('#wish-name'), relI = form.querySelector('#wish-rel'), msgI = form.querySelector('#wish-msg');
      var otherBox = form.querySelector('[data-other]'), otherI = form.querySelector('#wish-rel-other');
      var countChars = form.querySelector('[data-count-chars]'), status = form.querySelector('[data-status]'), errors = form.querySelector('[data-errors]');
      var submit = form.querySelector('button[type="submit"]');
      var photoI = form.querySelector('#wish-photo'), preview = form.querySelector('[data-pick-preview]');
      var pickLabel = form.querySelector('[data-pick-label]'), removeB = form.querySelector('[data-pick-remove]'), photoErr = form.querySelector('#wish-photo-err');
      var photo = '', tried = false;

      // "Other" opens one more box for the guest's own answer
      relI.addEventListener('change', function () {
        var other = relI.value === OTHER;
        otherBox.hidden = !other;
        relI.classList.toggle('is-chosen', !!relI.value);
        if (other) otherI.focus();
        else AD.form.setError(otherI, '');
      });
      otherI.addEventListener('input', function () { if (tried) validate(); });

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
        var n = nameI.value.trim(), m = msgI.value.trim(), o = otherI.value.trim();
        var ne = !n ? 'Please enter your name.' : (n.length > W.nameMax ? 'Please keep your name under ' + W.nameMax + ' characters.' : '');
        var oe = relI.value === OTHER && !o ? 'Please tell us how you know the couple.' : '';
        var me = !m ? 'Please write a wish.' : (m.length < 2 ? 'Your wish is a little short.' : '');
        AD.form.setError(nameI, ne);
        AD.form.setError(otherI, oe);
        AD.form.setError(msgI, me);
        if (ne) errs.push({ id: 'wish-name', msg: ne });
        if (oe) errs.push({ id: 'wish-rel-other', msg: oe });
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

        var relation = relI.value === OTHER ? otherI.value.trim() : relI.value;
        var payload = { name: nameI.value.trim(), relation: relation, message: msgI.value.trim(), photo: photo, website: form.querySelector('#wish-website').value };
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
          var pending = !r.demo && !!(r.pending || W.moderation);
          // Saved on the server: show it to this guest at once, at the top.
          if (!r.demo) mine.unshift({ name: payload.name, relation: payload.relation, message: payload.message, photo: payload.photo, submittedAt: new Date().toISOString(), pending: pending });
          form.reset();
          relI.classList.remove('is-chosen');
          otherBox.hidden = true;
          photo = ''; showPhoto();
          countChars.textContent = '0';
          tried = false;
          status.innerHTML = '<div class="status status--success">' + AD.icon('check') + '<div><p><strong>Thank you!</strong> ' +
            (pending ? 'Your blessing is at the top of the wall, and everyone will see it once it is approved.' : 'Your blessing is now at the top of the wall.') + '</p></div></div>';
          // Up to the wall, where the ring turns and brings the new wish to the top
          wall.scrollIntoView({ behavior: still ? 'auto' : 'smooth', block: 'center' });
          setTimeout(function () { refresh(true); }, still ? 0 : 650);
        });
      });
    }
  });
})();
